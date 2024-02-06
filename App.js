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
const bodyParser = require("body-parser");
const crypto = require("crypto");
class App {
    constructor(mongoDBConnection) {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.User = new UserModel_1.UserModel(mongoDBConnection);
        this.Receipt = new ReceiptModel_1.ReceiptModel(mongoDBConnection);
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
        router.get("/app/user", (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Query All User');
            yield this.User.retreiveAllUsers(res);
        }));
        router.get("/app/user/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Query Single User");
            const id = req.params.id;
            yield this.User.retreiveSpecificUser(res, id);
        }));
        router.get("/app/usersCount", (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Query All User Count");
            yield this.User.retreiveAllUsersCount(res);
        }));
        router.post('/app/user/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Adding a user");
            // generate a unique userID 
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            // get the payload 
            var jsonObj = req.body;
            // set the payload's userID
            jsonObj.userID = id;
            // create a new model 
            const doc = new this.User.model(jsonObj);
            try {
                // save it in the db 
                yield doc.save();
                res.send('{"id":"' + id + '"}');
            }
            catch (e) {
                console.log('object creation failed');
                console.error(e);
            }
        }));
        router.get('/app/receipt', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.Receipt.getAllReceipt(res);
            }
            catch (e) {
                console.error(e);
            }
        }));
        router.get('/app/receipt/:receiptID', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const receiptID = req.params.receiptID;
            console.log("get specific receipt ", receiptID);
            try {
                yield this.Receipt.getSpecificReceipt(res, receiptID);
            }
            catch (e) {
                console.error(e);
            }
        }));
        router.post('/app/receipt', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = crypto.randomBytes(16).toString("hex");
            var jsonObj = req.body;
            jsonObj.receiptID = id;
            try {
                const addedReceipt = yield this.Receipt.addSpecificReceipt(res, jsonObj);
                console.log(addedReceipt);
                yield this.User.addReceiptID(res, id, addedReceipt.ownerID.userID);
            }
            catch (e) {
                console.error(e);
            }
        }));
        router.get("/app/userAddReceipt", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userID = "1";
            const receiptID = "2";
            try {
                yield this.User.addReceiptID(res, userID, receiptID);
            }
            catch (e) {
                console.log(e);
            }
        }));
        this.expressApp.use('/', router);
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map