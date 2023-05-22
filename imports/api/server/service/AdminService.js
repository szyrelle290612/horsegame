import moment from "moment";
import DB from "../../DB";
import RedisVent from "../../classes/server/RedisVent";
import Utilities from "../../classes/Utilities";
import { toIndexField } from "../../classes/server/IndexGenerator";
import { ObjectId } from "mongodb";


export default {
    getGame: async function (date) {
        try {
            let current = moment().startOf("days").valueOf();
            let tomorrow = moment().endOf("days").valueOf();
            if (date) {
                current = moment(date).startOf("days").valueOf();
                tomorrow = moment(date).endOf("days").valueOf();
            }
            return DB.Races.rawCollection().find({ schedule: { $gte: current, $lte: tomorrow } }, { fields: { raceLocation: 1, raceNo: 1, prize: 1, schedule: 1, isLive: 1, winner: 1, videoLink: 1 } }).toArray().then((res) => {
                returnData = {}
                if (res && res.length) {
                    returnData.data = res.map((item) => ({ ...item, _id: item._id.toString() }));
                }
                Utilities.showStatus("Get GameList Today Data successfully");
                return returnData;
            });
        } catch (error) {
            Utilities.showError("Unable to get GameList data.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },

    UpdateLive: function ({ id, flag }) {
        try {
            RedisVent.Races.triggerUpdate("races", this.userId, { id, flag });
            DB.Races.update({ _id: new Mongo.ObjectID(id) }, { $set: { update: "live", isLive: flag } });
            Utilities.showStatus("Update Live Data successfully");
        } catch (error) {
            Utilities.showError("Unable to Update Live.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },

    gethorseOnRace: function (id) {
        try {
            let newid = ""
            if (typeof id === "string") {
                newid = new ObjectId(id);
            } else {
                newid = id
            }
            Utilities.showStatus("get Horse on Race Data successfully");
            return DB.Races.find({ _id: newid }, { fields: { horse: { horseId: 1, horseName: 1, horseNumber: 1, trainerName: 1 } } }).fetch();
        } catch (error) {
            Utilities.showError("Unable to get  Horse on Race.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },

    updateWinner: async function (data) {
        try {
            let newid = ""
            const { _id, horseName } = data;
            let scheduleEnd = toIndexField([{ value: JSON.stringify({ isEnd: true }), hash: 1 }, moment().startOf("days").valueOf(), moment().valueOf()])
            //activate resdis to admin
            RedisVent.Races.triggerUpdate("races", this.userId, { update: "winner", _id, horseName });

            if (typeof _id === "string") {
                newid = new ObjectId(_id);
            } else {
                newid = _id
            }

            //set winner to race db
            await DB.Races.update({ _id: newid }, { $set: { winner: horseName, index1: scheduleEnd, isLive: false, } });
            //set win to bet db
            await DB.Bet.update({ "race.raceId": newid, "horse.horseName": horseName }, { $set: { win: true } }, { multi: true })

            Utilities.showStatus("Update Winner successfully");
            return true
        } catch (error) {
            Utilities.showError("Unable to get  Horse on Race.: ", Utilities.errorMsg(error));
            return false
        }
    },

    sendRewardtoWinner: async function (id) {
        let newId = ""
        if (typeof id === "string") {
            newId = new ObjectId(id);
        }
        try {

            //declare looser
            DB.Bet.update({ "race.raceId": newId, win: "no_assign" }, { $set: { win: false } }, { multi: true });

            //get winner
            const result = DB.Races.findOne({ _id: newId })
            if (result) {
                const { description, validity, image, winner } = result;
                const res = DB.Bet.find({ "race.raceId": newId, win: true }, { fields: { userId: 1, horse: 1, race: 1, qrRef: 1 } }).fetch();
                if (res) {
                    const reward = new Promise((resolve, reject) => {
                        const data = [];
                        for (const i in res) {
                            const createdAt = moment().add(i, "ms").valueOf()
                            data.push({
                                insertOne: {
                                    document: {
                                        userId: res[i].userId,
                                        bet: {
                                            betId: res[i]._id._str,
                                            qrcode: res[i].qrRef,
                                        },
                                        type: "bet",
                                        description,
                                        validity,
                                        status: "available",
                                        image: image,
                                        createdAt,
                                        index1: toIndexField([res[i].userId, "available", createdAt]),
                                        index2: toIndexField([moment(res[i].race.schedule).startOf("days").valueOf(), createdAt])
                                    }
                                }
                            })
                            DB.NotificationLogs.insert({
                                userId: res[i].userId,
                                status: "Congrats",
                                title: `Congratulations!`,
                                description: `You won for betting on the winning horse - ${winner})`,
                                seen: false,
                                createdAt,
                                index1: toIndexField([res[i].userId, createdAt]),
                            })
                        }
                        while (data.length) {
                            const batch = data.splice(0, 50000);
                            DB.Reward.rawCollection().bulkWrite(batch);
                        }
                        if (data.length === 0) {
                            resolve(true);
                        }
                    });
                    return reward;
                }
            }
            Utilities.showStatus("Send Reward to Winner successfully");
        } catch (error) {
            Utilities.showError("Unable to Send Reward to Winner", Utilities.errorMsg(error));
            return false
        }


    },

    updateBalance: function ({ credit, email }) {
        let creditparse = parseInt(credit);
        try {
            Meteor.users.update({ 'emails.address': email }, { $set: { "profile.credit": creditparse } });
            Utilities.showStatus("Update Balance User successfully");
        } catch (error) {
            Utilities.showError("Unable to Update Balance User", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },

    createNewHorse: function (data) {
        try {
            const createdAt = moment().valueOf()
            const index1 = toIndexField([data.horseName + createdAt])
            const newdata = { ...data, createdAt, index1 }
            const res = DB.Horse.insert(newdata);
            if (res) {
                Utilities.showStatus("Create New Horse successfully");
                return true
            } else {
                return false
            }

        } catch (error) {
            Utilities.showError("Unable Create New Horse", Utilities.errorMsg(error));
            throw new Meteor.Error(error);

        }
    },

    createNewRace: async function (data) {
        try {
            const createdAt = moment().valueOf()
            const objectId = new Mongo.ObjectID();

            index1 = toIndexField([{ value: JSON.stringify({ isEnd: false }), hash: 1 }, moment(data.schedule).startOf("days").valueOf(), createdAt])
            const newData = { ...data, _id: objectId, index1, createdAt }

            RedisVent.Races.triggerInsert("races", this.userId, { ...data, _id: objectId._str, index1, createdAt });
            const res = await DB.Races.insert(newData);
            if (res) {
                Utilities.showStatus("Create New Race successfully");
                return true
            } else {
                return false
            }
        } catch (error) {
            Utilities.showError("Unable Create New Race", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },


    getHorseList: async function ([lastbasis, name]) {
        try {
            let indexBasis = "index1";
            let orderBasis = "$gt";
            let regexValue = "";
            if (name) {
                regexValue = name
            }
            const pipeline = [];
            const match = { [indexBasis]: { $regex: new RegExp("^" + regexValue.toLowerCase(), "i") } };
            const project = { _id: 1, horseName: 1, trainerName: 1, ownership: 1, index1: 1 }

            if (lastbasis) {
                match[indexBasis][orderBasis] = lastbasis;
            }
            pipeline.push({ $match: match });
            pipeline.push({ $project: project });
            pipeline.push({ $limit: 10 });

            return DB.Horse.rawCollection().aggregate(pipeline, { allowDiskUse: true }).toArray().then((res) => {

                const returnData = {};
                if (res && res.length) {
                    returnData.data = res.map((item) => ({ ...item, _id: item._id.toString() }));
                    returnData.lastbasis = res[res.length - 1][indexBasis];
                }
                Utilities.showStatus("Get HorseList Data successfully");
                return returnData;
            });
        } catch (error) {
            Utilities.showError("Unable to Get HorseList Data.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },



    UpdateSetting: function (data) {
        try {
            const res = DB.Store.update({ _id: new Mongo.ObjectID("644f15e7320b40e5e235875c") }, { $set: data });
            if (res) {
                Utilities.showStatus("Update Setting successfully");
                return true
            } else {
                return false
            }
        } catch (error) {
            Utilities.showError("Unable to Update Setting.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },


    getAllReward: async function ([lastbasis, date]) {
        try {
            let indexBasis = "index2";
            let orderBasis = "$lt";
            let regexValue = moment().startOf("days").valueOf().toString();
            if (date) {
                regexValue = toIndexField([moment(date).startOf("days").valueOf().toString()])
            }
            const pipeline = [];
            const match = { [indexBasis]: { $regex: regexValue } };
            // const project = { _id: 1, horseName: 1, trainerName: 1, ownership: 1, index1: 1 }

            if (lastbasis) {
                match[indexBasis][orderBasis] = lastbasis;
            }
            pipeline.push({ $match: match });
            // pipeline.push({ $project: project });
            pipeline.push({ $limit: 10 });

            return DB.Reward.rawCollection().aggregate(pipeline, { allowDiskUse: true }).toArray().then((res) => {
                const returnData = {};
                if (res && res.length) {
                    returnData.data = res.map((item) => ({ ...item, _id: item._id.toString() }));
                    returnData.lastbasis = res[res.length - 1][indexBasis];
                }
                Utilities.showStatus("get All Reward Successfully");
                return returnData;
            });
        } catch (error) {
            Utilities.showError("Unable get All Reward.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }

    }
}