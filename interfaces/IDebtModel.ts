import Mongoose = require("mongoose");

interface Debt extends Document {
  debtID: string;
  amount: number;
  debtor: User;
  creditor: User;
}

export default mongoose.model<Debt>('Debt', debtSchema);