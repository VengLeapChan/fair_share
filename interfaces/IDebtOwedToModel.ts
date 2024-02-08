import Mongoose from "mongoose";

interface IDebtOwedToModel extends Mongoose.Document {

  debtOwedToID: string,
  debtAmount: number,
  debtOwedToReceiverID: string,
  debtOwedToSenderID: string
  
}

export { IDebtOwedToModel };