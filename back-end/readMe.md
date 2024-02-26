# Start Mongo DB: 
brew services start mongodb-community@7.0

# Start MongoDB Shell: 
mongosh

# Load Script to Add Admin User from MongoDB Shell: 
load("createDB/createAdminUser.js");

# Load Script to Seed Items: 
load("createDB/createFairShareSample.js");

