db = db.getSiblingDB("fairShare");

db.getCollectionNames().forEach(function (collection) {
  db[collection].drop();
});
