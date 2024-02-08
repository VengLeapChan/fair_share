import Mongoose from "mongoose";

interface IReceiptModel extends Mongoose.Document {
  receiptID: string,
  receiptName: string,
  receiptTotalAmount: number,
  date: Date,
  receiptUsersList: [{ userID: string }],
  receiptOwnerID: { userID: string },
  receiptSplitList: [
    {
      receiptSplitID: string,
      receiptSplitAmount: number,
      receiptTargetID: { userID: string },
    }
  ],
  receiptItemsList:
  [
    {
      itemID: string,
      itemName: string,
      itemQuantity: number,
      itemUnitPrice: number,
      itemTotalPrice: number,
    }
  ],
}

export { IReceiptModel };