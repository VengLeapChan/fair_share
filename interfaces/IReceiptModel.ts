import Mongoose from "mongoose";

interface IReceiptModel extends Mongoose.Document {
  receiptID: string,
  totalAmount: number,
  date: Date,
  usersList: [string],
  owner: string,
  debtsList: [string],
  itemsList: [
    {
      itemID: string,
      itemName: string,
      quantity: number,
      unitPrice: number,
      totalPrice: number,
    }
  ],
}

export {IReceiptModel};