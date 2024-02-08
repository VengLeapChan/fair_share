import Mongoose from "mongoose";

interface IUserModel extends Mongoose.Document {
  userID: string,
  username: string,
  userEmail: string,
  userDebtsOwed: [
    {
    debtID: string,
    loanAmount: number,
    senderID: string,
    receiverID: string
  }
  ],
  userDebtsOwedTo: [
    {
    debtID: string,
    debtAmount: number,
    receiverID: string,
    senderID: string
  }
  ],
userReceiptsList: [string],
userBalance: number,
userFriendRequestsSent: [{requestID: string}],
userFriendRequestsReceived: [{requestId: string}],
userGroupsList: [{groupID: string}]
}

export {IUserModel};