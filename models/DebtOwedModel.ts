import * as Mongoose from "mongoose";
import { IDebtOwedModel } from "../interfaces/IDebtOwedModel";

class DebtOwedModel {
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
          debtOwedID: String,
          loanAmount: Number,
          debtOwedSenderID: String,
          debtOwedReceiverID: String

        }, { collection: "debtOwed" });
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IDebtOwedModel>("DebtOwed", this.schema);
        } catch (e) {
            console.error(e);
        }
    }

}

export { DebtOwedModel };