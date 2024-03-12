import * as Mongoose from "mongoose";
import {IReceiptItemModel} from '../interfaces/IReceiptItemModel';

class ReceiptItemModel {
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
      receiptItemID: String,
      receiptID: String,
      receiptItemName: String,
      receiptItemQuantity: Number,
      receiptItemUnitPrice: Number,
      receiptItemTotalPrice: Number,
      userID: Number
    }, {collection: "receiptItems"} 
    )
  }

  public async createModel(){
    try {
      await Mongoose.connect(this.dbConnectionString);
      this.model = Mongoose.model<IReceiptItemModel>("Item", this.schema);
    } catch (e) {
      console.error(e);
    }
  }

  public async addReceiptItem(newReceiptItemData: any, userID: string, receiptID: string) {
    newReceiptItemData.receiptOwnerID = userID;
    newReceiptItemData.receiptID = receiptID;

    console.log("Receipt Item: "+ newReceiptItemData.receiptItemID +"is added to receipt: "+ newReceiptItemData.receiptID+ " ");
      try {
        const newReceiptItem = new this.model(newReceiptItemData);
        const savedReceiptItem = await newReceiptItem.save();
        return savedReceiptItem; 
      } catch (e) {
        console.log(e)
      }
  }

  public async retreiveItems(receiptID: string) {
    console.log("retreiving list of items for a specific receipt");
    const query = this.model.find({receiptID: receiptID});

    try {
      const items = await query.exec();
      console.log(items);
      return items; 
    } catch (e) {
      console.error(e);
    }
  }

}

export {ReceiptItemModel};