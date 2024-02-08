import Mongoose from "mongoose";

interface IReceiptModel extends Mongoose.Document {
  receiptID: string,
  receiptName: string,
  receiptTotalAmount: number,
  date: Date,
  receiptUsersList: [string],
  receiptOwnerID: string,
  receiptSplitList: [
    {
      receiptSplitID: string,
      receiptSplitAmount: number,
      receiptTargetID: { userID: string },
    }
  ],
  receiptItemsList:[string],
}

export { IReceiptModel };