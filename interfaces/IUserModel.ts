import Mongoose from "mongoose";

interface IUserModel extends Mongoose.Document {
  userID: string,
  username: string,
  email: string,
  debtsOwed: [
    debtID: string,
    amount: number,
    debtorID: number,
    creditorID: number
  ],
  debtsOwedTo: [
    debtID: string,
    amount: number,
    debtorID: number,
    creditorID: number
  ],
  receiptsList: number[],
  balance: number,
  friendRequestsSent: number[],
  friendRequestsReceived: number[],
  groupsList: number[]
}

export {IUserModel};