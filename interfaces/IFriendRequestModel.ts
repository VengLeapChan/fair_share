import Mongoose from "mongoose";

interface IFriendRequest extends Mongoose.Document {
  requestID: string,
  sender: {userID: string},
  receiver: {userID: string},
  status: string,
}

export {IFriendRequest};