import Transaction from '../model/txModel';
import User from '../model/userModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import Email from '../utils/email';
import sendTokens from './sendTokens';

export const createTx = catchAsync(async (req, res, next) => {
  //we got the req.user from protected route adding sender id to req.body
  req.body.from = req.user._id;

  //here user is the sender

  // 1) get the reciever and check
  const receiver = await User.findOne({ address: req.body.beneficiary });
  if (!receiver) {
    return next(new AppError(403, 'Reciever Does not exit'));
  }
  

  //1) send the token from admin
  const tx = await sendTokens(
    req.body.senderPrivateKey,
    receiver.address,
    req.body.TokenAmount
  );

 //add some details to the tx
  tx['to'] = receiver.address;
  tx['TokenAmount'] = req.body.TokenAmount;
  tx['TransactionHash'] = tx.hash;

  //save the transaction
  await Transaction.create(tx);

  //find admin
  const sender = await User.findOne({ address: tx.from });

  //send success email to sender
  await new Email(sender).sendTxSuccess({
    coinRecieverName: receiver.name,
    sendToSender: true,
  });

  // send success email to reciever
  await new Email(receiver).sendTxSuccess({
    coinSenderName: sender.name,
    amount: req.body.TokenAmount,
  });

  //send the responce
  res.status(201).json({
    status: 'success',
    tx,
  });
});

export const myTransaction = catchAsync(async (req, res, next) => {
  //get all the transaction where from or to filed matched to the user id
  const txs = await Transaction.find({
    $or: [{ from: req.user.address }, { to: req.user.address }],
  });

  //send the responce
  res.status(200).json({
    status: 'success',
    result: txs.length,
    data: {
      Transactions: txs,
    },
  });
});

export const getAllTransactions = catchAsync(async (req, res, next) => {
  //get all the transactions
  const txs = await Transaction.find();

  //send the responce
  res.status(200).json({
    status: 'success',
    result: txs.length,
    data: {
      Transactions: txs,
    },
  });
});

export const getTransaction = catchAsync(async (req, res, next) => {
  //get a Transaction based on the id
  const tx = await Transaction.findById(req.params.id)
    .populate({ path: 'from' })
    .populate('to');

  //if no transaction is found return error
  if (!tx) {
    return next(new AppError(404, 'No data found!!'));
  }

  //if every thing is ok send responce
  res.status(200).json({
    status: 'success',
    data: {
      Transaction: tx,
    },
  });
});
