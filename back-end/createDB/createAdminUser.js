// get the admin db
db = db.getSiblingDB("admin");

// create an admin user
db.createUser({
  user: "anotherAdmin",
  pwd: "test",
  roles: ["readWriteAnyDatabase", "dbAdminAnyDatabase", "clusterAdmin"],
});
