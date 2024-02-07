import Mongoose from "mongoose";

interface IReceiptModel extends Mongoose.Document {
  receiptID: string,
  receiptName: string,
  totalAmount: number,
  date: Date,
  usersList: [{userID: string}],
  owner: {userID: string},
  splitList: [
    {
      splitID: string,
      splitAmount: number,
      targetID: {userID: string},
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

export {IReceiptModel};