import Mongoose from "mongoose";

interface IUserModel extends Mongoose.Document {
  userID: string,
  username: string,
  email: string,
  debtsOwed: [
    {debtID: string,
    amount: number,
    debtorID: string,
    creditorID: string}
  ],
  debtsOwedTo: [
    {debtID: string,
    amount: number,
    debtorID: string,
    creditorID: string}
  ],
receiptsList: [string],
balance: number,
friendRequestsSent: [string],
friendRequestsReceived: [string],
groupsList: [string]
}

export {IUserModel};