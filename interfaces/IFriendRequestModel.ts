import Mongoose from "mongoose";

interface IFriendRequest extends Mongoose.Document {
  requestID: string,
  friendRequestSenderID: string,
  friendRequestReceiverID: string,
  status: string,
}

export {IFriendRequest};