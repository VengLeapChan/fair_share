import * as Mongoose from "mongoose";
import {IUserModel} from '../interfaces/IUserModel';

class UserModel {
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
      userID: String,
      username: String,
      userEmail: String,
      //User Receipt List: All the Receipt Owned By the User

      userDebtsOwed: [String],
      userDebtsOwedTo: [String],
      userBalance: Number,
      userFriendRequestsSent: [String],
      userFriendRequestsReceived: [String],
      userGroupsList: [String]
    }, {collection: "users"} 
    )
  }


  public async createModel(){
    try {
      await Mongoose.connect(this.dbConnectionString);
      this.model = Mongoose.model<IUserModel>("Users", this.schema);
    } catch (e) {
      console.error(e);
    }
  }

  public async retreiveAllUsers(response: any){
    const query = this.model.find({});
    try {
      const usersArray = await query.exec();
      response.json(usersArray)
    } catch (e) {
      console.log(e)
    }
  }

  public async retreiveSpecificUser(response: any, userID: string) {
    const query = this.model.findOne({"userID": userID});
    
    try {
      const user = await query.exec();
      response.json(user);
    } catch (e) {
      console.log(e)
    }
  }
  public async returnSpecificUser(response: any, userID: string) {
    const query = this.model.findOne({"userID": userID});
    
    try {
      const user = await query.exec();
      console.log("returning specific user successfully");
      return user
    } catch (e) {
      console.log(e)
    }
  }


  public async retreiveAllUsersCount(response: any) {
    const query = this.model.find({});
    try {
      const userList = await query.exec();
      const count = userList.length;
      console.log(count)
      response.json({"count": count});
    } catch (e) {
      console.log(e)
    }
  }

  // public async addReceiptID(receiptID: string, userID: string){
  //   // query to find user based on userID and updated the receiptList 
  //   const query = this.model.findOneAndUpdate(
  //     {userID: userID}, {$push: {userReceiptsList: receiptID}},  { new:true } );
  //   try {
  //     const user = await query.exec();
  //     return user;
  //   } catch (e) {
  //   }
  // }










  

  public async addDebtsOwed(response: any, receiverID: string, senderID: string, amount: number, debtOwedID: string){
    
    const query = this.model.findOneAndUpdate(
      { userID: receiverID },
      {
        $push: {
          //Fix This: create a query in debtowed model that adds to it after this function is called
          userDebtsOwed: debtOwedID,
        }
      },
      { new: true }
    );
    try {
      return await query.exec();

    } catch (e) {
      console.log(e);
      throw e;
    }
  }


  public async addDebtsOwedTo(response: any, receiverID: string, senderID: string, amount: number, debtOwedToID: string){
    const query = this.model.findOneAndUpdate(
      { userID: senderID },
      {
        $push: {
          //Fix This: create a query in debtowedto model that adds to it after this function is called
          userDebtsOwedTo: debtOwedToID,
        }
      },
      { new: true }
    );
    try {
      return await query.exec();
    } catch (e) {
      console.log(e);
      throw e;
    }

  }

  public async addToFriendRequestSent(response: any, receiverID: string, senderID: string, friendRequestID: string){
    const query = this.model.findOneAndUpdate(
      { userID: senderID },
      {
        $push: {
          userFriendRequestsSent: friendRequestID,
        }
      },
      { new: true }
    );
    try {
      return await query.exec();
    } catch (e) {
      console.log(e);
      throw e;
    }

  }

  public async addToFriendRequestReceived(response: any, receiverID: string, senderID: string, friendRequestID: string){
    const query = this.model.findOneAndUpdate(
      { userID: receiverID },
      {
        $push: {
          userFriendRequestsReceived: friendRequestID,
        }
      },
      { new: true }
    );
    try {
      return await query.exec();
    } catch (e) {
      console.log(e);
      throw e;
    }

  }
}



export {UserModel};