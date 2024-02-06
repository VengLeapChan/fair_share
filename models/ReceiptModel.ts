import * as Mongoose from "mongoose";
import * as crypto from 'crypto';
import {IReceiptModel} from '../interfaces/IReceiptModel';

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
      totalAmount: Number,
      date: Date,
      usersList: [{userID: String}],
      ownerID: {userID: String},
      splitList: [{
        splitID: String,
        splitAmount: Number,
        targetID: {userID: String},
      }],
      itemsList: [
        {
          itemID: String,
          itemName: String,
          quantity: Number,
          unitPrice: Number,
          totalPrice: Number,
        }
      ]
    }, {collection: "receipts"} 
    )
  }

  public async createModel(){
    try {
      await Mongoose.connect(this.dbConnectionString);
      this.model = Mongoose.model<IReceiptModel>("Receipt", this.schema);
    } catch (e) {
      console.error(e);
    }
  }

  public async getAllReceipt(response: any) {
    console.log("Getting all receipts")
    const query = this.model.find({});
    try {
      const receiptList = await query.exec();
      response.json({"receiptList": receiptList });
    } catch (e) {
      console.log(e)
    }
  }
  public async getSpecificReceipt(response: any, receiptID: string) {
    const query = this.model.find({"receiptID": receiptID});
    try {
      const receipt = await query.exec();
      response.json({"receipt": receipt });
    } catch (e) {
      console.log(e)
    }
  }

  public async addSpecificReceipt(response: any, newReceiptData: any) {
    console.log("Adding a receipt");
    try {
      const newReceipt = new this.model(newReceiptData);
      const savedReceipt = await newReceipt.save();
      return savedReceipt; // Return the saved receipt instead of sending a response
    } catch (e) {
      console.log(e)
    }
  }

  public async addSplitsItem(response: any, splitID: string, splitAmount: number, targetID: string, receiptID: string) {
    console.log("adding to split list");
    const query = this.model.findOneAndUpdate(
      { receiptID: receiptID},
      {
        $push: {
          splitList: {
            splitID: splitID,
            splitAmount: splitAmount,
            targetID: {userID: targetID},
          }
        }
      },
      { new: true }
    );
    try {

        return await query.exec();

    } catch (e) {
      console.log(e)
      throw e;
    }
  }

}

export {ReceiptModel};