import Mongoose from "mongoose";

interface IReceiptModel extends Mongoose.Document {
  receiptID: string,
  receiptName: string,
  totalAmount: number,
  date: Date,
  receiptSplitUsersList: [{ userID: string }],
  owner: { userID: string },
  receiptSplitList: [
    {
      receiptSplitID: string,
      receiptSplitAmount: number,
      receiptSplitUserID: { userID: string },
    }
  ],
  itemsList:
  [
    {
      itemID: string,
      itemName: string,
      quantity: number,
      unitPrice: number,
      totalPrice: number,
    }
  ],
}

export { IReceiptModel };