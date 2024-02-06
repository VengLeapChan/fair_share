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
exports.UserModel = void 0;
const Mongoose = require("mongoose");
class UserModel {
    constructor(dbConnectionString) {
        this.dbConnectionString = dbConnectionString;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            userID: String,
            username: String,
            email: String,
            debtsOwed: [
                { debtID: String,
                    amount: Number,
                    debtorID: String,
                    creditorID: String }
            ],
            debtsOwedTo: [
                { debtID: String,
                    amount: Number,
                    debtorID: String,
                    creditorID: String }
            ],
            receiptsList: [{ receiptID: String }],
            balance: Number,
            friendRequestsSent: [{ requestID: String }],
            friendRequestsReceived: [{ requestID: String }],
            groupsList: [{ groupID: String }]
        }, { collection: "users" });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("Users", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retreiveAllUsers(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find({});
            try {
                const usersArray = yield query.exec();
                response.json(usersArray);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    retreiveSpecificUser(response, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.findOne({ "userID": userID });
            try {
                const user = yield query.exec();
                response.json(user);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    // public async addUser(response: any, newUser: IUserModel) {
    //   try {
    //     const user = new this.model(newUser);
    //     await user.save();
    //     response.json({ message: "User added successfully", user });
    //   } catch (e) {
    //     console.error(e);
    //     response.status(500).json({ error: "Error adding user" });
    //   }
    // }
    retreiveAllUsersCount(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find({});
            try {
                const userList = yield query.exec();
                const count = userList.length;
                console.log(count);
                response.json({ "count": count });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    addReceiptID(response, receiptID, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find({ userID: userID });
        });
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=UserModel.js.map