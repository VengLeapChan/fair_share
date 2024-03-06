"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const App_1 = require("./App");
dotenv.config();
const port = process.env.PORT || 8080;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD || "test";
const mongoDBConnection = 'mongodb+srv://' + dbUser + ':' + encodeURIComponent(dbPassword) + process.env.DB_INFO;
console.log("server db connection URL " + mongoDBConnection);
let server = new App_1.App(mongoDBConnection);
server.expressApp.listen(port);
console.log("server running in port " + port);
//# sourceMappingURL=AppServer.js.map