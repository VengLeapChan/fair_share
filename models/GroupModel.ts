import * as Mongoose from "mongoose";
import {IGroupModel} from '../interfaces/IGroupModel';

class GroupModel {
  public schema: any;
  public model: any;
  public dbConnectionString: string;

  public constructor(dbConnectionString: string) {
    this.dbConnectionString = dbConnectionString;
    this.createSchema();
    this.createModel();
  }

  public createSchema() {
    this.schema = new Mongoose.Schema({
      groupID: String,
      groupName: String,
      usersInGroup: [{userID: String}],
    }, {collection: "groups"} 
    )
  }

  public async createModel(){
    try {
      await Mongoose.connect(this.dbConnectionString);
      this.model = Mongoose.model<IGroupModel>("Group", this.schema);
    } catch (e) {
      console.error(e);
    }
  }

}

export {GroupModel};