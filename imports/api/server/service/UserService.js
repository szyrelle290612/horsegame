import moment from "moment";
import DB from "../../DB";
import { toIndexField } from "../../classes/server/IndexGenerator";
import { ObjectId } from "mongodb";
import Utilities from "../../classes/Utilities";
import { v4 as uuidv4 } from 'uuid';



export default {
    GetHorseDetails: function (id) {
        try {
            const query = { _id: MongoInternals.NpmModules.mongodb.module.ObjectID(id) };
            let cursor
            cursor = DB.Horse.findOne(query)
            Utilities.showStatus("get horse Details successfully");
            return cursor;
        } catch (error) {
            Utilities.showError("Unable get horse Details data.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error)
        }
    },


    PlaceBet: async function ({ race, horse }) {
        try {

            let createdAt = moment().valueOf()
            let horseid = horse.horseId
            let race_id = race.raceId._str
            let storeId = race.storeId
            const data = { type: "verifyWinner", storeId, Qrcode: uuidv4() }
            const encoded = Utilities.encodeBase64(JSON.stringify(data))
            const buffer = Buffer.from(encoded, 'base64');

            const pipeline = [];
            const match1 = {
                $and: [{ "race.raceId": new ObjectId(race_id) }, { "horse.horseId": horseid },],
            }

            pipeline.push({ $match: match1 });

            const res = await DB.Bet.rawCollection().aggregate(pipeline, { allowDiskUse: true }).toArray()

            if (res.length > 0) {
                return { success: false, message: "You already bet on this horse" }
            } else {
                let query = {}
                query = {
                    userId: this.userId,
                    race,
                    horse,
                    win: "no_assign",
                    qrRef: buffer,
                    createdAt,
                    index1: toIndexField([this.userId, createdAt])
                }
                DB.Bet.insert(query);

                DB.NotificationLogs.insert({
                    userId: this.userId,
                    status: "placebet",
                    title: `You placed a bet`,
                    description: `${horse.horseName} in ${race.raceLocation}`,
                    seen: false,
                    createdAt: moment().valueOf(),
                    index1: toIndexField([this.userId, moment().valueOf()]),
                })

                Utilities.showStatus("Place bet successfully");
                return { success: true, message: "Your bet is success" }
            }
        } catch (error) {
            Utilities.showError("Unable Place bet.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error)
        }
    },

    deductCredit: function (credit) {
        try {

            Meteor.users.update({ _id: this.userId }, { $inc: { "profile.credit": credit } });

            Utilities.showStatus("Deduct credit successfully");
            return { message: "successfully added bet" }
        } catch (error) {
            Utilities.showError("Deduct credit.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error)
        }
    },

    CheckBetAlreadyExist: function (id) {
        try {
            let horseid = id._str
            const pipeline = [];
            const match1 = {
                userId: this.userId,
            }
            const match2 = {
                "horse.horseId": horseid
            }
            pipeline.push({ $match: match1 });
            pipeline.push({ $match: match2 });
            return DB.Bet.rawCollection().aggregate(pipeline, { allowDiskUse: true }).toArray().then((res) => {
                if (res.length > 0) {
                    Utilities.showStatus("Checking bet already exist successfully");
                    return { success: true }
                } else {
                    return { success: false }
                }
            });
        } catch (error) {
            Utilities.showError("Unable Checking bet.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error)
        }
    }

}