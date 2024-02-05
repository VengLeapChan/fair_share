import Mongoose from "mongoose";

interface IFriendRequest extends Mongoose.Document {
  requestID: string,
  sender: string,
  receiver: string,
  status: string,
}

export {IFriendRequest};