import * as express from 'express';
import { UserModel } from "./models/UserModel";
import { ReceiptModel } from './models/ReceiptModel';
import { FriendRequestModel } from './models/FriendRequestModel';
import {ReceiptItemModel} from './models/ReceiptItemModel';
import * as  bodyParser from "body-parser";
import * as crypto from 'crypto';

class App {
  public expressApp: express.Application;
  public User: UserModel;
  public Receipt: ReceiptModel;
  public FriendRequest: FriendRequestModel;
  public ReceiptItem: ReceiptItemModel;

  constructor(mongoDBConnection: string) {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.User = new UserModel(mongoDBConnection);
    this.ReceiptItem = new ReceiptItemModel(mongoDBConnection);
    this.Receipt = new ReceiptModel(mongoDBConnection);
    this.FriendRequest = new FriendRequestModel(mongoDBConnection);
  }

  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use((req, res, next) => {
      // Set the Access-Control-Allow-Origin header to allow all domains to access resources
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      next();
    });
  }

  private routes(): void {
    let router = express.Router();

     //ROUTES FOR DEMONSTRATION 
     // Get All Receipt For A User
     // Needs to make test 
    router.get('/app/user/:userID/receipt', async (req, res) => {
      try {
        const userID = req.params.userID;
        await this.Receipt.getAllReceiptForSpecificUser(res, userID);
      } catch (e) {
        console.error(e)
      }
    })
    
    // Get Specific Receipt
    // Needs to make test 
    router.get('/app/user/:userID/receipt/:receiptID', async( req, res) => {

      const userID = req.params.userID;
      const receiptID = req.params.receiptID;

      console.log("getting receipt: ", receiptID, " from user: ", userID);

      try {
        const receipt = await this.Receipt.getSpecificReceipt(res, userID, receiptID);
        if(receipt){
          res.send(receipt);
        } else {
          res.status(404).json("This user does not have that receipt.")
        }
      } catch (e) {
        console.error(e);
        throw e;
      }

    }); 

    // retreiveItems of a specific receipt
    router.get('/app/user/:userID/receipt/:receiptID/receiptItems', async (req, res) => {
      const receiptID = req.params.receiptID;
      const userID = req.params.userID;

      try {
        const receipt = await this.Receipt.getSpecificReceipt(res, userID, receiptID);

        if (receipt) {
          const items = await this.ReceiptItem.retreiveItems(receiptID);
          res.send(items);
        }

        res.json("This user does not have that receipt.")

      } catch (e) {
        console.error(e);
      }
    })

    // Add A Receipt
    router.post('/app/user/:userID/receipt', async (req, res) => {
      const newReceiptId: string = crypto.randomBytes(16).toString("hex");
      const userID: string = req.params.userID;
      var receiptObject = req.body;

      receiptObject.receiptID = newReceiptId;
      
      try {
        const addedReceipt = await this.Receipt.addSpecificReceipt(receiptObject, userID);
        res.send(addedReceipt);
      } catch (e) {
        console.error(e);
      }
    });

    // delete A specific receipt 
    router.delete("/app/user/:userID/receipt/:receiptID", async (req, res) => {
      
      const userID = req.params.userID;
      const receiptID = req.params.receiptID;
      console.log("Deleting Receipt wiht Receipt ID: " + receiptID); 
      try {
        await this.Receipt.deleteOneReceiptForASpecificUser(res, userID, receiptID);
      } catch (e) {
        console.error(e);
      }

    })

    // add receipt item
    router.post('/app/user/:userID/receipt/:receiptID/receiptItem', async (req, res) => {
      const newReceiptItemId: string = crypto.randomBytes(16).toString("hex");
      const receiptID = req.params.receiptID;
      const userID: string = req.params.userID;

      var receiptItemObject = req.body;
      receiptItemObject.receiptID = receiptID; 
      receiptItemObject.receiptItemID = newReceiptItemId;
      
      try {
        const addedReceiptItem = await this.ReceiptItem.addReceiptItem(receiptItemObject, userID, receiptID);
        res.send(addedReceiptItem);
      } catch (e) {
        console.error(e);
      }
    });

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

    this.expressApp.use('/', router);

    this.expressApp.use('/', express.static(__dirname + '/angularDist/fair-share-angular/browser'));
  }
}

export { App }