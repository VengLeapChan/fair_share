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
      userID: 1,
      username: "Veng Leap Chan",
      email: "leapvchan@gmail.com",
      debtsOwed: [],
      debtsOwedTo: [],
      balance: 0,
      friendRequestsSent: [],
      friendRequestsReceived: [],
      groupsList: []
    },
    {
      userID: 2,
      username: "Robert Widjaja",
      email: "rw@gmail.com",
      debtsOwed: [],
      debtsOwedTo: [],
      balance: 0,
      friendRequestsSent: [],
      friendRequestsReceived: [],
      groupsList: []
    },
    {
      userID: 3,
      username: "Summer Xia",
      email: "summer@gmail.com",
      debtsOwed: [],
      debtsOwedTo: [],
      balance: 0,
      friendRequestsSent: [],
      friendRequestsReceived: [],
      groupsList: []
    }
  ]
)