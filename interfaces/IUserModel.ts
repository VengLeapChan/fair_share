import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
  userID: string;
  username: string;
  email: string;
  debtsOwed: Debt[];
  debtsOwedTo: Debt[];
  receiptsList: Receipt[];
  balance: number;
  friendRequestsSent: FriendRequest[];
  friendRequestsReceived: FriendRequest[];
  groupsList: Group[];
}

export {IUserModel};