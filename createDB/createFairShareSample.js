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
    email: "leapvchan@gmail.com",
    debtsOwed: [],
    debtsOwedTo: [],
    receiptsList: [],
    balance: 0,
    friendRequestsSent: [],
    friendRequestsReceived: [],
    groupsList: [],
  },
  {
    userID: "2",
    username: "summerxia",
    email: "summer@gmail.com",
    debtsOwed: [],
    debtsOwedTo: [],
    receiptsList: [],
    balance: 0,
    friendRequestsSent: [],
    friendRequestsReceived: [],
    groupsList: [],
  },
  {
    userID: "3",
    username: "robertWidjaja",
    email: "robertWidjaja@gmail.com",
    debtsOwed: [],
    debtsOwedTo: [],
    receiptsList: [],
    balance: 0,
    friendRequestsSent: [],
    friendRequestsReceived: [],
    groupsList: [],
  },
]);

db.createCollection("receipts");

receiptsCollection = db.getCollection("receipts");
receiptsCollection.deleteMany({});

receiptsCollection.insertMany([
  {
    receiptID: "1",
    totalAmount: 5,
    date: Date,
    usersList: [],
    ownerID: { userID: "1" },
    splitList: [],
    itemsList: [
      {
        itemID: "1",
        itemName: "Apple",
        quantity: 1,
        unitPrice: 5,
        totalPrice: 5,
      },
    ],
  },
  {
    receiptID: "2",
    totalAmount: 7,
    date: Date,
    usersList: [],
    ownerID: { userID: "2" },
    splitList: [],
    itemsList: [
      {
        itemID: "2",
        itemName: "Kiwi",
        quantity: 1,
        unitPrice: 7,
        totalPrice: 7,
      },
    ],
  },
  {
    receiptID: "3",
    totalAmount: 7,
    date: Date,
    usersList: [],
    ownerID: { userID: "3" },
    splitList: [],
    itemsList: [
      {
        itemID: "3",
        itemName: "Grapes",
        quantity: 10,
        unitPrice: 0.5,
        totalPrice: 5,
      },
    ],
  },
]);

// update owner's receipt ID
usersCollection.findOneAndUpdate({userID: "1"}, {$push: {receiptsList: {receiptID: "1"}}});

usersCollection.findOneAndUpdate({userID: "2"}, {$push: {receiptsList: {receiptID: "2"}}});

usersCollection.findOneAndUpdate({userID: "3"}, {$push: {receiptsList: {receiptID: "3"}}});

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

usersCollection.findOneAndUpdate({userID: "1"}, {$push: {friendRequestsSent: {requestID: "1"}}})

usersCollection.findOneAndUpdate({userID: "3"}, {$push: {friendRequestsReceived: {requestID: "1"}}})

usersCollection.findOneAndUpdate({userID: "1"}, {$push: {friendRequestsSent: {requestID: "2"}}})

usersCollection.findOneAndUpdate({userID: "2"}, {$push: {friendRequestsReceived: {requestID: "2"}}})
