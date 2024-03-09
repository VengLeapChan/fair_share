import * as Mongoose from "mongoose";
import { IReceiptModel } from '../interfaces/IReceiptModel';

class ReceiptModel {
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
      receiptID: String,
      receiptName: String,
      receiptTotalAmount: Number,
      date: Date,
      receiptUsersList: [String],
      userID: String,
      receiptSplitList: [String],
    }, { collection: "receipts" }
    )
  }

  public async createModel() {
    try {
      await Mongoose.connect(this.dbConnectionString);
      this.model = Mongoose.model<IReceiptModel>("Receipt", this.schema);
    } catch (e) {
      console.error(e);
    }
  }

  public async getAllReceiptForSpecificUser(response: any, userID: string) {
    console.log(this.dbConnectionString);
    console.log("Getting all receipts for this user")
    const query = this.model.find({userID: userID});
    try {
      const receiptList = await query.exec();
      response.json(receiptList);
    } catch (e) {
      console.log(e)
    }
  }

  public async deleteOneReceiptForASpecificUser(response: any, userID: string, receiptID:string) {
    console.log("Deleting A Receipt with ID: " + receiptID)
    const query = this.model.deleteOne({userID: userID, receiptID: receiptID});
    try {
      const res = await query.exec();
      response.status(200).json(res);
    } catch (e) {
      console.log(e)
    }
  }

  // get a specific receipt
  public async getSpecificReceipt(response: any, userID:string, receiptID: string) {
    const query = this.model.findOne({userID: userID, receiptID: receiptID});
    try {
      const receipt = await query.exec();
      return receipt;
    } catch (e) {
      console.log(e)
    }
  }



  public async addSpecificReceipt(newReceiptData: any, userID: string) {
    console.log("Adding a receipt");
    console.log("addspecificreceipt", newReceiptData);
    newReceiptData.userID = userID;
    const newDate = new Date();
    newReceiptData.date = newDate;
    try {
      const newReceipt = new this.model(newReceiptData);
      const savedReceipt = await newReceipt.save();
      return savedReceipt; // Return the saved receipt instead of sending a response
    } catch (e) {
      console.log(e)
    }
  }

  public async getAllReceipt(response: any) {
    console.log("Getting all receipts")
    const query = this.model.find({});
    try {
      const receiptList = await query.exec();
      console.log(receiptList);
      response.json(receiptList);
    } catch (e) {
      console.log(e)
    }
  }


  
  // public async addSplitsItem(response: any, receiptSplitID: string, receiptSplitAmount: number, receiptTargetID: string, receiptID: string) {
  //   console.log("adding to split list");
  //   const query = this.model.findOneAndUpdate(
  //     { receiptID: receiptID },
  //     {
  //       $push: {
  //         //FIX THIS: add a query to add into split, call it after calling this function
  //         receiptSplitList: receiptSplitID,
  //         receiptUsersList: receiptTargetID
  //       }
  //     },
  //     { new: true }
  //   );
  //   try {

  //     return await query.exec();

  //   } catch (e) {
  //     console.log(e)
  //     throw e;
  //   }
  // }

}

export { ReceiptModel };