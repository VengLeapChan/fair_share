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
            receiptName: String,
            receiptTotalAmount: Number,
            date: Date,
            receiptUsersList: [String],
            userID: String,
            receiptSplitList: [String],
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
    getAllReceiptForSpecificUser(response, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.dbConnectionString);
            console.log("Getting all receipts for this user");
            const query = this.model.find({ userID: userID });
            try {
                const receiptList = yield query.exec();
                response.json(receiptList);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    deleteOneReceiptForASpecificUser(response, userID, receiptID) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Deleting A Receipt with ID: " + receiptID);
            const query = this.model.deleteOne({ userID: userID, receiptID: receiptID });
            try {
                const res = yield query.exec();
                response.status(200).json(res);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    // get a specific receipt
    getSpecificReceipt(response, userID, receiptID) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.findOne({ userID: userID, receiptID: receiptID });
            console.log("getting receipt: ", receiptID, " from user: ", userID);
            try {
                const receipt = yield query.exec();
                return receipt;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    addSpecificReceipt(newReceiptData, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Adding a receipt for " + userID);
            newReceiptData.userID = userID;
            const newDate = new Date();
            newReceiptData.date = newDate;
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
    getAllReceipt(response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Getting all receipts");
            const query = this.model.find({});
            try {
                const receiptList = yield query.exec();
                console.log(receiptList);
                response.json(receiptList);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.ReceiptModel = ReceiptModel;
//# sourceMappingURL=ReceiptModel.js.map