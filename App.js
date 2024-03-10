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
const session = require("express-session");
const cookieParser = require("cookie-parser");
const UserModel_1 = require("./models/UserModel");
const ReceiptModel_1 = require("./models/ReceiptModel");
const FriendRequestModel_1 = require("./models/FriendRequestModel");
const ReceiptItemModel_1 = require("./models/ReceiptItemModel");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const GooglePassport_1 = require("./GooglePassport");
const passport = require("passport");
class App {
    constructor(mongoDBConnection) {
        this.googlePassportObj = new GooglePassport_1.default();
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.User = new UserModel_1.UserModel(mongoDBConnection);
        this.ReceiptItem = new ReceiptItemModel_1.ReceiptItemModel(mongoDBConnection);
        this.Receipt = new ReceiptModel_1.ReceiptModel(mongoDBConnection);
        this.FriendRequest = new FriendRequestModel_1.FriendRequestModel(mongoDBConnection);
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(session({ secret: 'keyboard cat' }));
        this.expressApp.use((req, res, next) => {
            // Set the Access-Control-Allow-Origin header to allow all domains to access resources
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            next();
        });
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    }
    validateAuth(req, res, next) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            return next();
        }
        console.log("user is not authenticated");
        res.redirect('/#/');
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
        router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/#/' }), (req, res) => {
            console.log("successfully authenticated user and returned to callback page.");
            console.log("redirecting to home");
            const profile = JSON.stringify(req.user);
            const userObject = JSON.parse(profile);
            const userEmail = userObject.emails;
            const displayName = userObject.displayName;
            const userID = userObject.id;
            console.log("User Email: " + userEmail[0].value);
            console.log("User ID: " + userID);
            console.log("Display Name: " + displayName);
            res.redirect('/#/');
        });
        router.get('/app/logout', this.validateAuth, (req, res) => {
            req.logout((err) => {
                console.log("Logging Out User");
                if (err) {
                    console.error(err);
                    res.status(500).send('Error logging out');
                    return;
                }
                res.status(200).json({ success: true });
            });
        });
        router.get('/app/user/count', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield this.User.retreiveAllUsersCount(res);
                console.log('Query all users count: ' + count);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'An error occurred while retrieving user count' });
            }
        }));
        router.get('/app/check-auth', this.validateAuth, (req, res) => {
            const profile = JSON.stringify(req.user);
            const userObject = JSON.parse(profile);
            const userEmail = userObject.emails;
            const displayName = userObject.displayName;
            res.status(200).json({ authenticated: true, username: displayName, userEmail: userEmail, profileImage: userObject.photos });
        });
        //ROUTES FOR DEMONSTRATION 
        // Get All Receipt For A User
        // Needs to make test 
        router.get('/app/receipt', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const profile = JSON.stringify(req.user);
            const userObject = JSON.parse(profile);
            const userId = userObject.id;
            try {
                yield this.Receipt.getAllReceiptForSpecificUser(res, userId);
            }
            catch (e) {
                console.error(e);
            }
        }));
        // Get Specific Receipt
        // Needs to make test 
        router.get('/app/receipt/:receiptID', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const profile = JSON.stringify(req.user);
            const userObject = JSON.parse(profile);
            const userId = userObject.id;
            const receiptID = req.params.receiptID;
            try {
                const receipt = yield this.Receipt.getSpecificReceipt(res, userId, receiptID);
                if (receipt) {
                    res.send(receipt);
                }
                else {
                    res.status(404).json("This user does not have that receipt.");
                }
            }
            catch (e) {
                console.error(e);
            }
        }));
        // retreiveItems of a specific receipt
        router.get('/app/receipt/:receiptID/receiptItems', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const receiptID = req.params.receiptID;
            const profile = JSON.stringify(req.user);
            const userObject = JSON.parse(profile);
            const userId = userObject.id;
            try {
                const receipt = yield this.Receipt.getSpecificReceipt(res, userId, receiptID);
                if (receipt) {
                    const items = yield this.ReceiptItem.retreiveItems(receiptID);
                    res.send(items);
                }
                else {
                    res.json("This user does not have that receipt.");
                }
            }
            catch (e) {
                console.error(e);
            }
        }));
        // Add A Receipt
        router.post('/app/receipt', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newReceiptId = crypto.randomBytes(16).toString("hex");
            const profile = JSON.stringify(req.user);
            const userObject = JSON.parse(profile);
            const userID = userObject.id;
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
        // delete A specific receipt 
        router.delete("/app/receipt/:receiptID", this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const profile = JSON.stringify(req.user);
            const userObject = JSON.parse(profile);
            const userId = userObject.id;
            const receiptID = req.params.receiptID;
            console.log("Deleting Receipt wiht Receipt ID: " + receiptID);
            try {
                yield this.Receipt.deleteOneReceiptForASpecificUser(res, userId, receiptID);
            }
            catch (e) {
                console.error(e);
            }
        }));
        // add receipt item
        router.post('/app/receipt/:receiptID/receiptItem', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newReceiptItemId = crypto.randomBytes(16).toString("hex");
            const receiptID = req.params.receiptID;
            const profile = JSON.stringify(req.user);
            const userObject = JSON.parse(profile);
            const userId = userObject.id;
            var receiptItemObject = req.body;
            receiptItemObject.receiptID = receiptID;
            receiptItemObject.receiptItemID = newReceiptItemId;
            receiptItemObject.userID = userId;
            try {
                const addedReceiptItem = yield this.ReceiptItem.addReceiptItem(receiptItemObject, userId, receiptID);
                res.send(addedReceiptItem);
            }
            catch (e) {
                console.error(e);
            }
        }));
        //Unprotected Routes
        //routes to go get a list of receipts
        router.get('/app/:userID/receipt', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userID;
            try {
                yield this.Receipt.getAllReceiptForSpecificUser(res, userId);
            }
            catch (e) {
                console.error(e);
            }
        }));
        //routes to a single receipt
        router.get('/app/:userID/receipt/:receiptID', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userID;
            const receiptID = req.params.receiptID;
            console.log("getting receipt: ", receiptID, " from user: ", userId);
            try {
                const receipt = yield this.Receipt.getSpecificReceipt(res, userId, receiptID);
                if (receipt) {
                    res.send(receipt);
                }
                else {
                    res.status(404).json("This user does not have that receipt.");
                }
            }
            catch (e) {
                console.error(e);
            }
        }));
        //routes to post a new receipt 
        router.post('/app/:userID/receipt', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newReceiptId = crypto.randomBytes(16).toString("hex");
            const userID = req.params.userID;
            console.log("userID", userID);
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
        //routes to post a new receipt item
        router.post('/app/:userID/receipt/:receiptID/receiptItem', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newReceiptItemId = crypto.randomBytes(16).toString("hex");
            const receiptID = req.params.receiptID;
            const userId = req.params.userID;
            var receiptItemObject = req.body;
            receiptItemObject.receiptID = receiptID;
            receiptItemObject.receiptItemID = newReceiptItemId;
            receiptItemObject.userID = userId;
            try {
                const addedReceiptItem = yield this.ReceiptItem.addReceiptItem(receiptItemObject, userId, receiptID);
                res.send(addedReceiptItem);
            }
            catch (e) {
                console.error(e);
            }
        }));
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/angularDist/fair-share-angular/browser'));
    }
}
exports.App = App;
// ROUTES FOR USER
// router.get("/app/user", async (req, res) => {
//   console.log('Query All User');
//   await this.User.retreiveAllUsers(res);
// })
// router.get("/app/user/:id", async (req, res) => {
//   console.log("Query Single User");
//   const id = req.params.id;
//   await this.User.retreiveSpecificUser(res, id);
// })
// router.post('/app/user/', async (req, res) => {
//   console.log("Adding a user");
//   const id = crypto.randomBytes(16).toString("hex");
//   console.log(req.body);
//   var jsonObj = req.body;
//   jsonObj.userID = id;
//   const doc = new this.User.model(jsonObj);
//   try {
//     await doc.save();
//     res.send('{"id":"' + id + '"}');
//   }
//   catch (e) {
//     console.log('object creation failed');
//     console.error(e);
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
//# sourceMappingURL=App.js.map