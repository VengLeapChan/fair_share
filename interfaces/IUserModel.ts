import Mongoose from "mongoose";

interface IUserModel extends Mongoose.Document {
  userID: string,
  username: string,
  userEmail: string,
  userDebtsOwed: [string],
  userDebtsOwedTo: [string],
  userReceiptsList: [string],
  userBalance: number,
  userFriendRequestsSent: [string],
  userFriendRequestsReceived: [string],
  userGroupsList: [string]
}

export {IUserModel};