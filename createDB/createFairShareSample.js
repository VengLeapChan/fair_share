// get fairShare db 
db = db.getSiblingDB('fairShare');

// create a user collection
db.createCollection('users')

usersCollection = db.getCollection("users")
// remove all users
// usersCollection.remove({})

usersCollection.deleteMany({});

usersCollection.insertMany(
  [
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
      balance: 0,
      friendRequestsSent: [],
      friendRequestsReceived: [],
      groupsList: []
    }
  ]
)

db.createCollection("receipts");

receiptsCollection = db.getCollection("receipts")
receiptsCollection.deleteMany({});

receiptsCollection.insertMany([
  {
    receiptID: "1",
    totalAmount: 5,
    date: Date,
    usersList: [],
    ownerID:"1",
    debtsList: [],
    itemsList: [
      {
        itemID:"1",
        itemName: "Apple",
        quantity: 1,
        unitPrice: 5,
        totalPrice: 5,
      }
    ],
  },
  {
    receiptID: "2",
    totalAmount: 7,
    date: Date,
    usersList: [],
    ownerID: "2",
    debtsList: [],
    itemsList: [
      {
        itemID:"2",
        itemName: "Kiwi",
        quantity: 1,
        unitPrice: 7,
        totalPrice: 7,
      }
    ],
  },
  {
    receiptID:"3",
    totalAmount: 7,
    date: Date,
    usersList: [],
    ownerID: "3",
    debtsList: [],
    itemsList: [
      {
        itemID: "3",
        itemName: "Grapes",
        quantity: 10,
        unitPrice: 0.5,
        totalPrice: 5,
      }
    ],
  }
])

db.createCollection("friendRequest");

friendRequestCollection = db.getCollection("friendRequest");
friendRequestCollection.deleteMany({});

friendRequestCollection.insertMany([
  {
    requestID: "1",
    senderID: "1",
    receiverID: "3",
    status: "pending",
  },
  {
    requestID: "2",
    senderID: "1",
    receiverID: "2",
    status: "pending",
  }
])
