import Mongoose from "mongoose";

interface IGroupModel extends Mongoose.Document {
  groupID: string,
  groupName: string,
  usersInGroup: [{userID: string}],
}

export {IGroupModel};