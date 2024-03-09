const dotenv = require('dotenv');
const { App } = require('./App');

dotenv.config();

const port = process.env.PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbProtocol = process.env.DB_PROTOCOL;
const mongoDBConnection = dbProtocol + dbUser + ':' + encodeURIComponent(dbPassword) + process.env.DB_INFO;

console.log("server db connection URL " + mongoDBConnection);

let server = new App(mongoDBConnection);
server.expressApp.listen(port);
console.log("server running in port " + port);
