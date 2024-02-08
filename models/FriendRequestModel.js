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
exports.FriendRequestModel = void 0;
const Mongoose = require("mongoose");
class FriendRequestModel {
    constructor(dbConnectionString) {
        this.dbConnectionString = dbConnectionString;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            requestID: String,
            senderID: { userID: String },
            receiverID: { userID: String },
            status: String,
        }, { collection: "friendRequests" });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("FriendRequests", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveAllFriendRequests(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find({});
            try {
                const friendRequestsArray = yield query.exec();
                response.json(friendRequestsArray);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    retrieveSpecificFriendRequest(response, requestID) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.findOne({ "requestID": requestID });
            try {
                const friendRequest = yield query.exec();
                response.json(friendRequest);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.FriendRequestModel = FriendRequestModel;
//# sourceMappingURL=FriendRequestModel.js.map