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
      userDebtsOwed: [
        {debtID: String,
        loanAmount: Number,
        senderID: String,
        receiverID: String
        }
      ],
      userDebtsOwedTo: [
        {debtID: String,
        debtAmount: Number,
        receiverID: String,
        senderID: String}
      ],
    userReceiptsList: [{receiptID: String}],
    userBalance: Number,
    userFriendRequestsSent: [{requestID: String}],
    userFriendRequestsReceived: [{requestID: String}],
    userGroupsList: [{groupID: String}]
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
      response.json(user)
    } catch (e) {
      console.log(e)
    }
  }
  // public async addUser(response: any, newUser: IUserModel) {
  //   try {
  //     const user = new this.model(newUser);
  //     await user.save();
  //     response.json({ message: "User added successfully", user });
  //   } catch (e) {
  //     console.error(e);
  //     response.status(500).json({ error: "Error adding user" });
  //   }
  // }

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

  public async addReceiptID(response: any, receiptID: string, userID: string){
    // query to find user based on userID and updated the receiptList 
    const query = this.model.findOneAndUpdate(
      {userID: userID}, 
      {$push: {
        userReceiptsList: {
          receiptID: receiptID
        },
      }
    },  
    { new:true } );
    try {
      const user = await query.exec();
      response.json(user);
    } catch (e) {
      console.log(e);
    }
  }

  public async addDebtsOwed(response: any, receiverID: string, senderID: string, amount: number, debtID: string){
    
    const query = this.model.findOneAndUpdate(
      { userID: receiverID },
      {
        $push: {
          userDebtsOwed: {
            debtID: debtID,
            loanAmount: amount,
            receiverID: receiverID,
            senderID: senderID
          }
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


  public async addDebtsOwedTo(response: any, receiverID: string, senderID: string, amount: number, debtID: string){
    const query = this.model.findOneAndUpdate(
      { userID: senderID },
      {
        $push: {
          userDebtsOwedTo: {
            debtID: debtID,
            debtAmount: amount,
            receiverID: receiverID,
            senderID: senderID
          }
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