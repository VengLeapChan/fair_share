import Mongoose from "mongoose";

interface IFriendRequest extends Mongoose.Document {
  requestID: string,
  senderID: {userID: string},
  receiverID: {userID: string},
  status: string,
}

export {IFriendRequest};