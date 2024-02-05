import Mongoose from "mongoose";

interface IReceipt extends Mongoose.Document {
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

export {IReceipt};