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
exports.App = void 0;
const express = require("express");
const UserModel_1 = require("./models/UserModel");
const ReceiptModel_1 = require("./models/ReceiptModel");
const FriendRequestModel_1 = require("./models/FriendRequestModel");
const ReceiptItemModel_1 = require("./models/ReceiptItemModel");
const bodyParser = require("body-parser");
const crypto = require("crypto");
class App {
    constructor(mongoDBConnection) {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.User = new UserModel_1.UserModel(mongoDBConnection);
        this.ReceiptItem = new ReceiptItemModel_1.ReceiptItemModel(mongoDBConnection);
        this.Receipt = new ReceiptModel_1.ReceiptModel(mongoDBConnection);
        this.FriendRequest = new FriendRequestModel_1.FriendRequestModel(mongoDBConnection);
    }
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use((req, res, next) => {
            // Set the Access-Control-Allow-Origin header to allow all domains to access resources
            res.header("Access-Control-Allow-Origin", "*");
            // Set the Access-Control-Allow-Headers to specify which headers can be used in the actual request
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }
    routes() {
        let router = express.Router();
        //ROUTES FOR DEMONSTRATION 
        // Get All Receipt For A User
        router.get('/app/user/:userID/receipt', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = req.params.userID;
                yield this.Receipt.getAllReceiptForSpecificUser(res, userID);
            }
            catch (e) {
                console.error(e);
            }
        }));
        // Get Specific Receipt -- need to change
        router.get('/app/user/:userID/receipt/:receiptID', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userID = req.params.userID;
            const receiptID = req.params.receiptID;
            console.log("getting receipt: ", receiptID, " from user: ", userID);
            try {
                const receipt = yield this.Receipt.getSpecificReceipt(res, userID, receiptID);
                if (receipt) {
                    res.send(receipt);
                }
                else {
                    res.json("This user does not have that receipt.");
                }
            }
            catch (e) {
                console.log(e);
                throw e;
            }
        }));
        // Add A Receipt
        router.post('/app/user/:userID/receipt', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newReceiptId = crypto.randomBytes(16).toString("hex");
            const userID = req.params.userID;
            var receiptObject = req.body;
            receiptObject.receiptID = newReceiptId;
            try {
                const addedReceipt = yield this.Receipt.addSpecificReceipt(receiptObject, userID);
                res.send(addedReceipt);
            }
            catch (e) {
                console.error(e);
            }
        }));
        // add receipt item
        router.post('/app/user/:userID/receipt/:receiptID/receiptItem', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newReceiptItemId = crypto.randomBytes(16).toString("hex");
            const receiptID = req.params.receiptID;
            const userID = req.params.userID;
            var receiptItemObject = req.body;
            receiptItemObject.receiptID = receiptID;
            receiptItemObject.receiptItemID = newReceiptItemId;
            try {
                const addedReceiptItem = yield this.ReceiptItem.addReceiptItem(receiptItemObject, userID, receiptID);
                res.send(addedReceiptItem);
            }
            catch (e) {
                console.error(e);
            }
        }));
        // ROUTES FOR USER
        // router.get("/app/user", async (req, res) => {
        //   console.log('Query All User');
        //   await this.User.retreiveAllUsers(res);
        // })
        router.get("/app/user/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Query Single User");
            const id = req.params.id;
            yield this.User.retreiveSpecificUser(res, id);
        }));
        router.post('/app/user/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Adding a user");
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.userID = id;
            const doc = new this.User.model(jsonObj);
            try {
                yield doc.save();
                res.send('{"id":"' + id + '"}');
            }
            catch (e) {
                console.log('object creation failed');
                console.error(e);
            }
        }));
        // router.post('/app/:userID/:receiptID/splitItems', async (req, res) => {
        //   const id = crypto.randomBytes(16).toString("hex");
        //   const userID = req.params.userID;
        //   const receiptID = req.params.receiptID;
        //   var jsonObj = req.body;
        //   const receiptSplitID = id;
        //   const receiptSplitAmount = jsonObj.receiptSplitAmount;
        //   const receiptTargetID = jsonObj.receiptTargetID;
        //   try {
        //     await this.Receipt.addSplitsItem(res, receiptSplitID, receiptSplitAmount, receiptTargetID, receiptID);
        //     await this.User.addDebtsOwed(res, userID, receiptTargetID, receiptSplitAmount, receiptSplitID);
        //     await this.User.addDebtsOwedTo(res, userID, receiptTargetID, receiptSplitAmount, receiptSplitID);
        //     res.json({ message: "Split item added successfully." });
        //   } catch (e) {
        //     console.error(e);
        //     throw e;
        //   }
        // });
        // // ROUTES FOR FRIENDS
        // router.get("/app/friendRequest", async (req, res) => {
        //   console.log('Query All Friend Requests');
        //   await this.FriendRequest.retrieveAllFriendRequests(res);
        // });
        // router.get("/app/friendRequest/:id", async (req, res) => {
        //   console.log('Get Friend Request By ID');
        //   const id = req.params.id;
        //   await this.FriendRequest.retrieveSpecificFriendRequest(res, id);
        // });
        // router.post("/app/friendRequest", async (req, res) => {
        //   console.log("Create Friend Request");
        //   const newFriendRequest = req.body;
        //   const id = crypto.randomBytes(16).toString("hex");
        //   newFriendRequest.requestID = id;
        //   const senderId = newFriendRequest.friendRequestSenderID;
        //   const receiverId = newFriendRequest.friendRequestReceiverID;
        //   const doc = new this.FriendRequest.model(newFriendRequest);
        //   try {
        //     await doc.save();
        //     this.User.addToFriendRequestReceived(res, receiverId, senderId, newFriendRequest.requestID)
        //     this.User.addToFriendRequestSent(res, receiverId, senderId, newFriendRequest.requestID)
        //     res.send('{"id":"' + id + '"}');
        //   }
        //   catch (e) {
        //     console.log('object creation failed');
        //     console.error(e);
        //   }
        // })
        router.get('/app/receipt', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("getting all receipt: ");
            try {
                yield this.Receipt.getAllReceipt(res);
            }
            catch (e) {
                console.log(e);
                throw e;
            }
        }));
        this.expressApp.use('/', router);
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map