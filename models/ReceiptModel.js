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
exports.ReceiptModel = void 0;
const Mongoose = require("mongoose");
class ReceiptModel {
    constructor(dbConnectionString) {
        this.dbConnectionString = dbConnectionString;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            receiptID: String,
            totalAmount: Number,
            date: Date,
            usersList: [{ userID: String }],
            ownerID: { userID: String },
            splitList: [{
                    splitID: String,
                    splitAmount: Number,
                    targetID: { userID: String },
                }],
            itemsList: [
                {
                    itemID: String,
                    itemName: String,
                    quantity: Number,
                    unitPrice: Number,
                    totalPrice: Number,
                }
            ]
        }, { collection: "receipts" });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("Receipt", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    getAllReceipt(response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Getting all receipts");
            const query = this.model.find({});
            try {
                const receiptList = yield query.exec();
                response.json({ "receiptList": receiptList });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getSpecificReceipt(response, receiptID) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find({ "receiptID": receiptID });
            try {
                const receipt = yield query.exec();
                response.json({ "receipt": receipt });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    addSpecificReceipt(response, newReceiptData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Adding a receipt");
            try {
                const newReceipt = new this.model(newReceiptData);
                const savedReceipt = yield newReceipt.save();
                return savedReceipt; // Return the saved receipt instead of sending a response
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    addSplitsItem(response, splitID, splitAmount, targetID, ownerID) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("adding to split list");
            const query = this.model.findOneAndUpdate({ userID: ownerID }, {
                $push: {
                    splitList: {
                        splitID: splitID,
                        splitAmount: splitAmount,
                        targetID: { userID: targetID },
                    }
                }
            }, { new: true });
            try {
                return yield query.exec();
            }
            catch (e) {
                console.log(e);
                throw e;
            }
        });
    }
}
exports.ReceiptModel = ReceiptModel;
//# sourceMappingURL=ReceiptModel.js.map