<<<<<<< HEAD
const dotenv = require('dotenv');
const { App } = require('./App');
dotenv.config();
const port = process.env.PORT || 8080;
=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const App_1 = require("./App");
dotenv.config();
>>>>>>> cdf08bc4d5a55297572a63be6adb8f9f1d627e53
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD || "test";
const dbProtocol = process.env.DB_PROTOCOL;
const mongoDBConnection = dbProtocol + dbUser + ':' + encodeURIComponent(dbPassword) + process.env.DB_INFO;
console.log("server db connection URL " + mongoDBConnection);
<<<<<<< HEAD
let server = new App(mongoDBConnection);
server.expressApp.listen(port);
console.log("server running in port " + port);
=======
let server = new App_1.App(mongoDBConnection);
server.expressApp.listen(process.env.PORT || 8080);
console.log("server running in port " + process.env.PORT || 8080);
>>>>>>> cdf08bc4d5a55297572a63be6adb8f9f1d627e53
//# sourceMappingURL=AppServer.js.map