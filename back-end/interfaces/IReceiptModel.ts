import Mongoose from "mongoose";

interface IReceiptModel extends Mongoose.Document {
  receiptID: string,
  receiptName: string,
  receiptTotalAmount: number,
  date: Date,
  receiptUsersList: [string],
  userID: string,
  receiptSplitList: [string],
}

export { IReceiptModel };