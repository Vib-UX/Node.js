import mongoose from "mongoose";
const txSchema = new mongoose.Schema({
  from: {
    type: String,
    ref: 'User',
    required: [true, 'Transaction sender is required'],
  },
  to: {
    type: String,
    ref: 'User',
    required: [true, 'Transaction reciever is required'],
  },
  TokenAmount: {
    type: String,
    required: [true, 'transaction amount is required'],
  },
  TransactionHash:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


// txSchema.pre('findOne',function(next){
//     this.populate({path:'from'})
//     next();
// })

const Transaction = mongoose.model('Transaction', txSchema);

export default Transaction;
