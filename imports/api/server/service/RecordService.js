import moment from "moment";
import DB from "../../DB";
import { toIndexField } from "../../classes/server/IndexGenerator";
import Utilities from "../../classes/Utilities";

export default {
    getMatchHistory: async function ([lastbasis, date]) {
        try {
            let newdata = "";
            let indexBasis = "index1";
            let orderBasis = "$gt";
            let regexValue = "";

            if (date !== null) {
                newdata = moment(date).startOf("days").valueOf();
                regexValue = toIndexField([{ value: JSON.stringify({ isEnd: true }), hash: 1 }, newdata]);
            } else {
                regexValue = toIndexField([{ value: JSON.stringify({ isEnd: true }), hash: 1 }]);
            }

            const pipeline = [];
            const match = { [indexBasis]: { $regex: regexValue } };
            if (lastbasis) {
                match[indexBasis][orderBasis] = lastbasis;
            }

            pipeline.push({ $match: match });
            pipeline.push({ $limit: 10 });

            return DB.Races.rawCollection().aggregate(pipeline, { allowDiskUse: true }).toArray().then((res) => {
                const returnData = {};
                if (res && res.length) {
                    returnData.data = res.map((item) => ({ ...item, _id: item._id.toString() }));
                    returnData.lastbasis = res[res.length - 1][indexBasis];
                }
                Utilities.showStatus("get Match History successfully");
                return returnData;
            });
        } catch (error) {
            Utilities.showError("Unable get Match History data.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },

    getUpcomingMatch: function ([lastbasis, date]) {
        try {
            let newdata = "";
            let indexBasis = "index1";
            let orderBasis = "$gt";
            let regexValue = "";

            if (date !== null) {
                newdata = moment(date).startOf("days").valueOf();
                regexValue = toIndexField([{ value: JSON.stringify({ isEnd: false }), hash: 1 }, newdata]);
            } else {
                regexValue = toIndexField([{ value: JSON.stringify({ isEnd: false }), hash: 1 }]);
            }

            const pipeline = [];
            const match = { [indexBasis]: { $regex: regexValue } };
            if (lastbasis) {
                match[indexBasis][orderBasis] = lastbasis;
            }

            pipeline.push({ $match: match });
            pipeline.push({ $limit: 10 });

            return DB.Races.rawCollection().aggregate(pipeline, { allowDiskUse: true }).toArray().then((res) => {
                const returnData = {};
                if (res && res.length) {
                    returnData.data = res.map((item) => ({ ...item, _id: item._id.toString() }));
                    returnData.lastbasis = res[res.length - 1][indexBasis];
                }
                Utilities.showStatus("get Upcoming Match successfully");
                return returnData;
            });
        } catch (error) {
            Utilities.showError("Unable Upcoming Match data.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    }
}