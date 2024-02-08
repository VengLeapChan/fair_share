import Mongoose from "mongoose";

interface IGroupModel extends Mongoose.Document {
  groupID: string,
  groupName: string,
  usersInGroup: [string],
}

export {IGroupModel};