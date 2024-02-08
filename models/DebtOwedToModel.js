"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebtOwedToModel = void 0;
const Mongoose = require("mongoose");
class DebtOwedToModel {
    constructor(dbConnectionString) {
        this.dbConnectionString = dbConnectionString;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            debtOwedToID: String,
            debtAmount: Number,
            debtOwedToSenderID: String,
            debtOwedToReceiverID: String
        }, { collection: "debtOwedTo" });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("DebtOwedTo", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.DebtOwedToModel = DebtOwedToModel;
//# sourceMappingURL=DebtOwedToModel.js.map