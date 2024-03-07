import * as Mongoose from "mongoose";
import { IDebtOwedToModel } from "../interfaces/IDebtOwedToModel";

class DebtOwedToModel {
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
          debtOwedToID: String,
          debtAmount: Number,
          debtOwedToSenderID: String,
          debtOwedToReceiverID: String

        }, { collection: "debtOwedTo" });
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IDebtOwedToModel>("DebtOwedTo", this.schema);
        } catch (e) {
            console.error(e);
        }
    }

}

export { DebtOwedToModel };