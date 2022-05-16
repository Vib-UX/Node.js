import express from 'express';
import { createTx,myTransaction,getAllTransactions,getTransaction } from '../controllers/txController';
import { restrictTo,protect } from '../controllers/authController';

const txRouter = express.Router();

//Only logged in user can access transactions
txRouter.use(protect)
//get logged in user transaction
txRouter.get('/myTransaction',myTransaction)
//create a transaction
txRouter.post('/create',createTx)

//restricted to admin
txRouter.use(restrictTo('admin'))

//get All transactions
txRouter.get('/',getAllTransactions)

//get transaction based on transaction id
txRouter.get('/:id',getTransaction)

export default txRouter;
