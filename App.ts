import * as express from 'express';
import { UserModel } from "./models/UserModel";
import { ReceiptModel } from './models/ReceiptModel';
import { FriendRequestModel } from './models/FriendRequestModel';
import * as  bodyParser from "body-parser";
import * as crypto from 'crypto';

class App {
  public expressApp: express.Application;
  public User: UserModel;
  public Receipt: ReceiptModel;
  public FriendRequest: FriendRequestModel;

  constructor(mongoDBConnection: string) {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.User = new UserModel(mongoDBConnection);
    this.Receipt = new ReceiptModel(mongoDBConnection);
    this.FriendRequest = new FriendRequestModel(mongoDBConnection);
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

    // ROUTES FOR USER

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
      const id = crypto.randomBytes(16).toString("hex");
      console.log(req.body);

      var jsonObj = req.body;

      jsonObj.userID = id;
      const doc = new this.User.model(jsonObj);
      try {
        await doc.save();
        res.send('{"id":"' + id + '"}');
      }
      catch (e) {
        console.log('object creation failed');
        console.error(e);
      }
    });

    // ROUTES FOR RECEIPT
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

    router.post('/app/:userID/:receiptID/splitItems', async (req, res) => {
      const id = crypto.randomBytes(16).toString("hex");

      const userID = req.params.userID;
      const receiptID = req.params.receiptID;
      var jsonObj = req.body;

      const splitID = id;
      const splitAmount = jsonObj.splitAmount;
      const targetID = jsonObj.targetID.userID;

      try {
        await this.Receipt.addSplitsItem(res, splitID, splitAmount, targetID, receiptID);
        await this.User.addDebtsOwed(res, userID, targetID, splitAmount, splitID);
        await this.User.addDebtsOwedTo(res, userID, targetID, splitAmount, splitID);

        res.json({ message: "Split item added successfully." });
      } catch (e) {
        console.error(e);
        throw e;
      }
    });


    // ROUTES FOR FRIENDS

    router.get("/app/friendRequest", async (req, res) => {
      console.log('Query All Friend Requests');
      const friendRequests = await this.FriendRequest.retrieveAllFriendRequests(res);
    });

    router.get("/app/friendRequest/:id", async (req, res) => {
      console.log('Get Friend Request By ID');
      const id = req.params.id;
      await this.FriendRequest.retrieveSpecificFriendRequest(res, id);
    });

    router.post("/app/friendRequest", async (req, res) => {
      console.log("Create Friend Request");
      const newFriendRequest = req.body;
      const id = crypto.randomBytes(16).toString("hex");
      newFriendRequest.userID = id;

      const doc = new this.FriendRequest.model(newFriendRequest);

      try {
        // save it in the db 
        await doc.save();
        res.send('{"id":"' + id + '"}');
      }
      catch (e) {
        console.log('object creation failed');
        console.error(e);
      }
    })


    this.expressApp.use('/', router);
    this.expressApp.use('/', express.static(__dirname+'/pages'));
  }
}

export { App }