import DB from "../../DB";
import Utilities from "../../classes/Utilities";
import { toIndexField } from "../../classes/server/IndexGenerator";

export default {
    getBetlogs: async function (lastbasis) {
        try {
            let indexBasis = "index1";
            let orderBasis = "$lt";
            let regexValue = "";

            const pipeline = [];
            const match = { [indexBasis]: { $regex: regexValue } };

            if (lastbasis) {
                match[indexBasis][orderBasis] = lastbasis;
            }

            pipeline.push({ $match: match });
            pipeline.push({ $limit: 10 });

            return DB.Bet.rawCollection().aggregate(pipeline, { allowDiskUse: true }).toArray().then((res) => {
                const returnData = {};
                if (res && res.length) {
                    returnData.data = res.map((item) => ({ ...item, _id: item._id.toString() }));
                    returnData.lastbasis = res[res.length - 1][indexBasis];
                }
                Utilities.showStatus("get Bet logs successfully");
                return returnData;
            });
        } catch (error) {
            Utilities.showError("Unable get Bet logs data.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },


    getLogs: async function (lastbasis) {
        try {
            let indexBasis = "index1";
            let orderBasis = "$lt";
            let regexValue = "";

            regexValue = this.userId

            const pipeline = [];
            const match = { [indexBasis]: { $regex: regexValue } };

            if (lastbasis) {
                match[indexBasis][orderBasis] = lastbasis;
            }

            pipeline.push({ $match: match });
            pipeline.push({ $limit: 10 });

            return DB.NotificationLogs.rawCollection().aggregate(pipeline, { allowDiskUse: true }).toArray().then((res) => {
                const returnData = {};
                if (res && res.length) {
                    returnData.data = res.map((item) => ({ ...item, _id: item._id.toString() }));
                    returnData.lastbasis = res[res.length - 1][indexBasis];
                }
                Utilities.showStatus("get logs Notification successfully");
                return returnData;
            });
        } catch (error) {
            Utilities.showError("Unable get logs Notification data.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },

    seenLogs: function () {
        try {
            DB.NotificationLogs.update({ userId: this.userId }, { $set: { seen: true } }, { multi: true });
            Utilities.showStatus("Seen Update to true Successfully");
            return true;
        } catch (error) {
            Utilities.showError("Unable Update into Seen true: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    }
}