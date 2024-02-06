import * as Mongoose from "mongoose";
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
      usersList: [String],
      owner: String,
      debtsList: [String],
      itemsList: [
        {
          itemID: String,
          itemName: String,
          quantity: Number,
          unitPrice: Number,
          totalPrice: Number,
        }
      ]
    }, {collection: "receipt"} 
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

}

export {ReceiptModel};