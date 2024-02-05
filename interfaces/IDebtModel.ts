import Mongoose = require("mongoose");
import { IUserModel } from "./IUserModel";

interface IDebtModel extends Document {
  debtID: string;
  amount: number;
  debtor: User;
  creditor: User;
}

export default mongoose.model<Debt>('Debt', debtSchema);