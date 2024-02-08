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
      receiptUsersList: [{ userID: String }],
      receiptOwnerID: { userID: String },
      receiptSplitList: [{
        receiptSplitID: String,
        receiptSplitAmount: Number,
        receiptTargetID: { userID: String },
      }],
      receiptItemsList: [
        {
          itemID: String,
          itemName: String,
          itemQuantity: Number,
          itemUnitPrice: Number,
          itemTotalPrice: Number,
        }
      ]
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

  public async getAllReceipt(response: any) {
    console.log("Getting all receipts")
    const query = this.model.find({});
    try {
      const receiptList = await query.exec();
      response.json({ "receiptList": receiptList });
    } catch (e) {
      console.log(e)
    }
  }
  public async getSpecificReceipt(response: any, receiptID: string) {
    const query = this.model.find({ "receiptID": receiptID });
    try {
      const receipt = await query.exec();
      response.json({ "receipt": receipt });
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

  public async addSplitsItem(response: any, receiptSplitID: string, receiptSplitAmount: number, receiptTargetID: string, receiptID: string) {
    console.log("adding to split list");
    const query = this.model.findOneAndUpdate(
      { receiptID: receiptID },
      {
        $push: {
          receiptSplitList: {
            receiptSplitID: receiptSplitID,
            receiptSplitAmount: receiptSplitAmount,
            receiptTargetID: { userID: receiptTargetID },
          },
          receiptUsersList: {
            userID: receiptTargetID
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

export { ReceiptModel };