import Mongoose from "mongoose";

interface IFriendRequest extends Mongoose.Document {
  requestID: number;
  sender: number;
  receiver: number;
  status: string;
}

export {IFriendRequest};