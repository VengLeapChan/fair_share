import * as express from 'express';
import { UserModel } from "./models/UserModel";
import { ReceiptModel } from './models/ReceiptModel';
import { FriendRequestModel } from './models/FriendRequestModel';
import * as  bodyParser from "body-parser";
import * as crypto from 'crypto';
import { json } from 'stream/consumers';

class App {
  public expressApp: express.Application;
  public User: UserModel;
  public Receipt: ReceiptModel;

  constructor(mongoDBConnection: string) {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.User = new UserModel(mongoDBConnection);
    this.Receipt = new ReceiptModel(mongoDBConnection);

  }

  private middleware(): void {
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

  private routes(): void {
    let router = express.Router();

    router.get("/app/user", async (req, res) => {
      console.log('Query All User');
      await this.User.retreiveAllUsers(res);
    })

    router.get("/app/user/:id", async (req, res) => {
      console.log("Query Single User");
      const id = req.params.id;
      await this.User.retreiveSpecificUser(res, id);
    })

    router.post('/app/user/', async (req, res) => {
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
        await doc.save();
        res.send('{"id":"' + id + '"}');
      }
      catch (e) {
        console.log('object creation failed');
        console.error(e);
      }
    });

    router.get('/app/receipt', async (req, res) => {
      try {
        await this.Receipt.getAllReceipt(res);
      } catch (e) {
        console.error(e)
      }
    })

    router.get('/app/receipt/:receiptID', async (req, res) => {

      const receiptID = req.params.receiptID;
      console.log("get specific receipt ", receiptID)
      try {
        await this.Receipt.getSpecificReceipt(res, receiptID)
      } catch (e) {
        console.error(e)
      }
    })
    router.post('/app/receipt', async (req, res) => {
      const id = crypto.randomBytes(16).toString("hex");

      var jsonObj = req.body;

      jsonObj.receiptID = id;

      try {
        const addedReceipt = await this.Receipt.addSpecificReceipt(res, jsonObj);
        console.log(addedReceipt);
        await this.User.addReceiptID(res, id, addedReceipt.ownerID.userID)

      } catch (e) {
        console.error(e);

      }
    });


    router.get('/app/receipt', async (req, res) => {
      try {
        await this.Receipt.getAllReceipt(res);
      } catch (e) {
        console.error(e)
      }
    })

    router.get('/app/receipt/:receiptID', async (req, res) => {

      const receiptID = req.params.receiptID;
      console.log("get specific receipt ", receiptID)
      try {
        await this.Receipt.getSpecificReceipt(res, receiptID)
      } catch (e) {
        console.error(e)
      }
    })
    router.post('/app/receipt', async (req, res) => {
      const id = crypto.randomBytes(16).toString("hex");

      var jsonObj = req.body;

      jsonObj.receiptID = id;

      try {
        const addedReceipt = await this.Receipt.addSpecificReceipt(res, jsonObj);
        console.log(addedReceipt);
        await this.User.addReceiptID(res, id, addedReceipt.ownerID.userID)

      } catch (e) {
        console.error(e);

      }
    });


    // Add routes for FriendRequestModel
    router.get("/app/friendrequest", async (req, res) => {
      console.log('Query All Friend Requests');
      const friendRequests = await this.FriendRequest.retrieveAllFriendRequests(res);
    });

    router.post("/app/friendrequest", async (req, res) => {
      console.log('Creating a new Friend Request');
      const id = crypto.randomBytes(16).toString("hex");
      const newFriendRequest = await this.FriendRequest.retrieveSpecificFriendRequest(express.response, id);
      res.json(newFriendRequest);
    });

    this.expressApp.use('/', router);
  }


}

export { App }