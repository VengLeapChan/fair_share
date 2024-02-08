// get fairShare db
db = db.getSiblingDB("fairShare");

// create a user collection
db.createCollection("users");

usersCollection = db.getCollection("users");
// remove all users
// usersCollection.remove({})

usersCollection.deleteMany({});

usersCollection.insertMany([
  {
    userID: "1",
    username: "leapvchan",
    userEmail: "leapvchan@gmail.com",
    userDebtsOwed: [],
    userDebtsOwedTo: [],
    userReceiptsList: [],
    userBalance: 0,
    userFriendRequestsSent: [],
    userFriendRequestsReceived: [],
    userGroupsList: [],
  },
  {
    userID: "2",
    username: "summerxia",
    userEmail: "summer@gmail.com",
    userDebtsOwed: [],
    userDebtsOwedTo: [],
    userReceiptsList: [],
    userBalance: 0,
    userFriendRequestsSent: [],
    userFriendRequestsReceived: [],
    userGroupsList: [],
  },
  {
    userID: "3",
    username: "robertWidjaja",
    userEmail: "robertWidjaja@gmail.com",
    userDebtsOwed: [],
    userDebtsOwedTo: [],
    userReceiptsList: [],
    userBalance: 0,
    userFriendRequestsSent: [],
    userFriendRequestsReceived: [],
    userGroupsList: [],
  },
]);

db.createCollection("receipts");

receiptsCollection = db.getCollection("receipts");
receiptsCollection.deleteMany({});

receiptsCollection.insertMany([
  {
    receiptID: "1",
    receiptName: "Carmelo's Taco",
    receiptTotalAmount: 5,
    date: Date,
    receiptUsersList: [],
    receiptOwnerID: { userID: "1" },
    receiptSplitList: [],
    receiptItemsList: [
      {
        itemID: "1",
        itemName: "Apple",
        itemQuantity: 1,
        itemUnitPrice: 5,
        itemTotalPrice: 5,
      },
    ],
  },
  {
    receiptID: "2",
    receiptName: "Trader Joe's",
    receiptTotalAmount: 7,
    date: Date,
    receiptUsersList: [],
    receiptOwnerID: { userID: "2" },
    receiptSplitList: [],
    receiptItemsList: [
      {
        itemID: "2",
        itemName: "Kiwi",
        itemQuantity: 1,
        itemUnitPrice: 7,
        itemTotalPrice: 7,
      },
    ],
  },
  {
    receiptID: "3",
    receiptName: "Safeway",
    receiptTotalAmount: 5,
    date: Date,
    receiptUsersList: [],
    receiptOwnerID: { userID: "3" },
    receiptSplitList: [],
    receiptItemsList: [
      {
        itemID: "3",
        itemName: "Grapes",
        itemQuantity: 10,
        itemUnitPrice: 0.5,
        itemTotalPrice: 5,
      },
    ],
  },
]);

// update owner's receipt ID
usersCollection.findOneAndUpdate(
  { userID: "1" },
  { $push: { userReceiptsList: { receiptID: "1" } } }
);

usersCollection.findOneAndUpdate(
  { userID: "2" },
  { $push: { userReceiptsList: { receiptID: "2" } } }
);

usersCollection.findOneAndUpdate(
  { userID: "3" },
  { $push: { userReceiptsList: { receiptID: "3" } } }
);

db.createCollection("friendRequests");
friendRequestCollection = db.getCollection("friendRequests");
friendRequestCollection.deleteMany({});

friendRequestCollection.insertMany([
  {
    requestID: "1",
    senderID: { userID: "1" },
    receiverID: { userID: "3" },
    status: "pending",
  },
  {
    requestID: "2",
    senderID: { userID: "1" },
    receiverID: { userID: "2" },
    status: "pending",
  },
]);

usersCollection.findOneAndUpdate(
  { userID: "1" },
  { $push: { userFriendRequestsSent: { requestID: "1" } } }
);

usersCollection.findOneAndUpdate(
  { userID: "3" },
  { $push: { userFriendRequestsReceived: { requestID: "1" } } }
);

usersCollection.findOneAndUpdate(
  { userID: "1" },
  { $push: { userFriendRequestsSent: { requestID: "2" } } }
);

usersCollection.findOneAndUpdate(
  { userID: "2" },
  { $push: { userFriendRequestsReceived: { requestID: "2" } } }
);
