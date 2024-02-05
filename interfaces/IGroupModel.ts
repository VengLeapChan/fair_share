import Mongoose from "mongoose";

interface IGroupModel extends Mongoose.Document {
  requestID: number;
  sender: number;
  receiver: number;
  status: string;
}

export {IGroupModel};