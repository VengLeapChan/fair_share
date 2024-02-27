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
exports.ReceiptItemModel = void 0;
const Mongoose = require("mongoose");
class ReceiptItemModel {
    constructor(dbConnectionString) {
        this.dbConnectionString = dbConnectionString;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            receiptItemID: String,
            receiptID: String,
            receiptItemName: String,
            receiptItemQuantity: Number,
            receiptItemUnitPrice: Number,
            receiptItemTotalPrice: Number,
        }, { collection: "receiptItems" });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("Item", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    addReceiptItem(newReceiptItemData, userID, receiptID) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("add Receipt Item to Receipt Item Collection");
            newReceiptItemData.receiptOwnerID = userID;
            console.log("this is addReceiptItem", newReceiptItemData);
            try {
                const newReceiptItem = new this.model(newReceiptItemData);
                const savedReceiptItem = yield newReceiptItem.save();
                return savedReceiptItem;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    retreiveItems(receiptID) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("retreiving list of items for a specific receipt");
            const query = this.model.find({ receiptID: receiptID });
            try {
                const items = yield query.exec();
                console.log(items);
                return items;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.ReceiptItemModel = ReceiptItemModel;
//# sourceMappingURL=ReceiptItemModel.js.map