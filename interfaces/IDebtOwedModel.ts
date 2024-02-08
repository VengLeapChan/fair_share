import Mongoose from "mongoose";

interface IDebtOwedModel extends Mongoose.Document {
  
  debtOwedID: string,
  loanAmount: number,
  debtOwedSenderID: string,
  debtOwedReceiverID: string

}

export { IDebtOwedModel };