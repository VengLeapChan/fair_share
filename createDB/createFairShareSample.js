// get fairShare db 
db = db.getSiblingDB('fairShare');

// create a user collection
db.createCollection('users')

usersCollection = db.getCollection("user")
// remove all users
usersCollection.remove({})

usersCollection.insertOne({
  username: "Veng Leap Chan",
  email: "leapvchan@gmail.com",
  debtsOwed: [],
  debtsOwedTo: [],
  receiptsList: [],
  balance: 0,
  friendRequestsSent: [],
  friendRequestsReceived:[],
  groupsList: []
})