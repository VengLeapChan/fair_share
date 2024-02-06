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
receiptsList: [{receiptID: string}],
balance: number,
friendRequestsSent: [{requestID: string}],
friendRequestsReceived: [{requestId: string}],
groupsList: [{groupID: string}]
}

export {IUserModel};