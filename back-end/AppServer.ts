import * as dotenv from 'dotenv';
import { App } from './App';

dotenv.config();

const port = process.env.PORT || 8080;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD || "test";
const dbProtocol = process.env.DB_PROTOCOL;
const mongoDBConnection = dbProtocol + dbUser + ':' + encodeURIComponent(dbPassword) + process.env.DB_INFO;

console.log("server db connection URL " + mongoDBConnection);

let server: any = new App(mongoDBConnection);
server.expressApp.listen(port);
console.log("server running in port " + port);