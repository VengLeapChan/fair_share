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
    userID: "100",
    username: "leapvchan",
    userEmail: "leapvchan@gmail.com",
    userReceiptsList: [],
    userDebtsOwed: [],
    userDebtsOwedTo: [],
    userBalance: 0,
    userFriendRequestsSent: [],
    userFriendRequestsReceived: [],
    userGroupsList: [],
  },
  {
    userID: "200",
    username: "summerxia",
    userEmail: "summer@gmail.com",
    userReceiptsList: [],

    userDebtsOwed: [],
    userDebtsOwedTo: [],
    userBalance: 0,
    userFriendRequestsSent: [],
    userFriendRequestsReceived: [],
    userGroupsList: [],
  },
  {
    userID: "300",
    username: "robertWidjaja",
    userEmail: "robertWidjaja@gmail.com",
    userReceiptsList: [],

    userDebtsOwed: [],
    userDebtsOwedTo: [],
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
    receiptName: "Grocery Store",
    receiptTotalAmount: 5,
    date: new Date(),
    receiptUsersList: [],
    receiptOwnerID: "100",
    receiptSplitList: [],
    receiptItemsList: [],
  },
  {
    receiptID: "2",
    receiptName: "Trader Joe's",
    receiptTotalAmount: 7,
    date: new Date(),
    receiptUsersList: [],
    receiptOwnerID: "200",
    receiptSplitList: [],
    receiptItemsList: [],
  },
  {
    receiptID: "3",
    receiptName: "Safeway",
    receiptTotalAmount: 5,
    date: new Date(),
    receiptUsersList: [],
    receiptOwnerID: "300",
    receiptSplitList: [],
    receiptItemsList: [],
  },
  {
    receiptID: "4",
    receiptName: "Fred Meyer's",
    receiptTotalAmount: 5,
    date: new Date(),
    receiptUsersList: [],
    receiptOwnerID: "100",
    receiptSplitList: [],
    receiptItemsList: [],
  },
  {
    receiptID: "5",
    receiptName: "Crumble Cookie",
    receiptTotalAmount: 5,
    date: new Date(),
    receiptUsersList: [],
    receiptOwnerID: "100",
    receiptSplitList: [],
    receiptItemsList: [],
  },
]);

// update owner's receipt ID
receiptsCollection.find({}).forEach((receipt) => {
  usersCollection.findOneAndUpdate(
    { userID: receipt.receiptOwnerID },
    { $push: { userReceiptsList: receipt.receiptID } }
  );
});

db.createCollection("receiptItems");
receiptItemsCollection = db.getCollection("receiptItems");
receiptItemsCollection.deleteMany({});
receiptItemsCollection.insertMany([
  {
    receiptItemID: "10",
    receiptID: "1",
    receiptItemName: "Apple",
    receiptItemQuantity: 1,
    receiptItemUnitPrice: 5.0,
    receiptItemTotalPrice: 5.0,
  },

  {
    receiptItemID: "11",
    receiptID: "4",
    receiptItemName: "Banana",
    receiptItemQuantity: 1,
    receiptItemUnitPrice: 2.22,
    receiptItemTotalPrice: 2.22,
  },

  {
    receiptItemID: "12",
    receiptID: "5",
    receiptItemName: "Orange",
    receiptItemQuantity: 1,
    receiptItemUnitPrice: 4.32,
    receiptItemTotalPrice: 4.32,
  },

  {
    receiptItemID: "13",
    receiptID: "5",
    receiptItemName: "Grapes",
    receiptItemQuantity: 1,
    receiptItemUnitPrice: 9.99,
    receiptItemTotalPrice: 9.99,
  },
  {
    receiptItemID: "14",
    receiptID: "1",
    receiptItemName: "Raisins",
    receiptItemQuantity: 1,
    receiptItemUnitPrice: 7.52,
    receiptItemTotalPrice: 7.52,
  },
  {
    receiptItemID: "15",
    receiptID: "3",
    receiptItemName: "Curry Cubes",
    receiptItemQuantity: 1,
    receiptItemUnitPrice: 4.99,
    receiptItemTotalPrice: 4.99,
  },
]);

receiptItemsCollection.find({}).forEach((item) => {
  const { receiptID, receiptItemID } = item;
  receiptsCollection.findOneAndUpdate(
    { receiptID: receiptID },
    { $push: { receiptItemsList: receiptItemID } }
  );
});



// db.createCollection("friendRequests");
// friendRequestCollection = db.getCollection("friendRequests");
// friendRequestCollection.deleteMany({});

// friendRequestCollection.insertMany([
//   {
//     requestID: "1000",
//     friendRequestSenderID: "100",
//     friendRequestReceiverID: "300",
//     status: "pending",
//   },
//   {
//     requestID: "2000",
//     friendRequestSenderID: "100",
//     friendRequestReceiverID: "200",
//     status: "pending",
//   },
// ]);

// friendRequestCollection.find({}).map((FR) => {
//   console.log(FR.friendRequestSenderID.userID);
//   usersCollection.findOneAndUpdate(
//     { userID: FR.friendRequestSenderID },
//     { $push: { userFriendRequestsSent: { requestID: FR.requestID } } }
//   );
//   usersCollection.findOneAndUpdate(
//     { userID: FR.friendRequestReceiverID },
//     { $push: { userFriendRequestsReceived: { requestID: FR.requestID } } }
//   );
// });

// db.createCollection("debtOwed");
// debtOwedCollection = db.getCollection("debtOwed");
// debtOwedCollection.deleteMany({});

// db.createCollection("debtOwedTo");
// debtOwedToCollection = db.getCollection("debtOwedTo");
// debtOwedToCollection.deleteMany({});

// db.createCollection("receiptSplits");
// receiptSplitCollection = db.getCollection("receiptSplits");
// receiptSplitCollection.deleteMany({});

// db.createCollection("groups");
// groupsCollection = db.getCollection("groups");
// groupsCollection.deleteMany({});
