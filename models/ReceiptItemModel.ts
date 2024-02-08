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
    }, {collection: "items"} 
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

}

export {ReceiptItemModel};