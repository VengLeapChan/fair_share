import * as Mongoose from "mongoose";
import { IFriendRequest } from "../interfaces/IFriendRequestModel";

class FriendRequestModel {
    public schema: any;
    public model: any;
    public dbConnectionString: string;

    public constructor(dbConnectionString: string) {
        this.dbConnectionString = dbConnectionString;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema({
            requestID: String,
            sender: { userID: String },
            receiver: { userID: String },
            status: String,
        }, { collection: "friendRequests" });
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IFriendRequest>("FriendRequests", this.schema);
        } catch (e) {
            console.error(e);
        }
    }

    public async retrieveAllFriendRequests(response: any) {
        const query = this.model.find({});
        try {
            const friendRequestsArray = await query.exec();
            response.json(friendRequestsArray);
        } catch (e) {
            console.log(e);
        }
    }

    public async retrieveSpecificFriendRequest(response: any, requestID: string) {
        const query = this.model.findOne({ "requestID": requestID });
        try {
            const friendRequest = await query.exec();
            response.json(friendRequest);
        } catch (e) {
            console.log(e);
        }
    }
}

export { FriendRequestModel };
