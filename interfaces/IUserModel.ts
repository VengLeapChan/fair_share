import Mongoose from "mongoose";

interface IUserModel extends Mongoose.Document {
  userID: number,
  username: string,
  email: string,
  debtsOwed: number[],
  debtsOwedTo: number[],
  receiptsList: Receipt[],
  balance: number,
  friendRequestsSent: number[],
  friendRequestsReceived: number[];
  groupsList: number[];
}

export {IUserModel};