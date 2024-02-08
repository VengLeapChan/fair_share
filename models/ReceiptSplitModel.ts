import * as Mongoose from "mongoose";
import { IReceiptSplitModel } from "../interfaces/IReceiptSplitModel";

class ReceiptSplitModel {
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
          receiptSplitID: String,
          receiptSplitAmount: Number,
          receiptTargetID: String ,

        }, { collection: "receiptSplits" });
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IReceiptSplitModel>("ReceiptSplits", this.schema);
        } catch (e) {
            console.error(e);
        }
    }

}

export { ReceiptSplitModel };