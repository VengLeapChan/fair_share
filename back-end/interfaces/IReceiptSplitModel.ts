import Mongoose from "mongoose";

interface IReceiptSplitModel extends Mongoose.Document {
  receiptSplitID: string,
  receiptSplitAmount: number,
  receiptTargetID: string ,
}

export { IReceiptSplitModel };