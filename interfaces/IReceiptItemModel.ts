import Mongoose from "mongoose";

interface IReceiptItemModel extends Mongoose.Document {
  receiptItemID: string,
  receiptID: string,
  receiptItemName: string,
  receiptItemQuantity: number,
  receiptItemUnitPrice: number,
  receiptItemTotalPrice: number,
}

export {IReceiptItemModel};