import moment from "moment";
import DB from "../../DB"
import { toIndexField } from "../../classes/server/IndexGenerator";
import { ObjectId } from "mongodb";
import Utilities from "../../classes/Utilities";
import { check } from 'meteor/check';

export default {

    getDailyReward: async function (code) {
        try {
            //destructure code
            const { storeId, Qrcode } = code;

            //check if store is exist
            const store = await DB.Store.rawCollection().findOne({ _id: new ObjectId(storeId) }).then((res) => {
                return res;
            });

            const qrcode = await DB.Qrcode.rawCollection().findOne({ qrCode: Qrcode }).then((res) => {
                return res;
            });

            if (qrcode || !store) {
                return false;
            }

            DB.Qrcode.insert({
                userId: this.userId,
                storeId: storeId,
                qrCode: Qrcode,
                creditClaimed: store.dailyReward,
                createdAt: moment().valueOf(),
            })

            Meteor.users.update({ _id: this.userId }, { $inc: { "profile.credit": store.dailyReward } })

            DB.NotificationLogs.insert({
                userId: this.userId,
                status: "credit_redeem",
                title: `You got a free credit!`,
                description: `${store.dailyReward} credit is added to your account.`,
                seen: false,
                createdAt: moment().valueOf(),
                index1: toIndexField([this.userId, moment().valueOf()]),
            })

            Utilities.showStatus("get Daily Reward successfully");
            return { status: true, credit: store.dailyReward };

        } catch (error) {
            Utilities.showError("Unable Daily Reward data.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },


    getReward: async function ([status, lastbasis]) {
        try {
            let indexBasis = "index1";
            let orderBasis = "$lt";
            let regexValue = "";

            if (status === "all") {
                regexValue = toIndexField([this.userId])
            } else {
                regexValue = toIndexField([this.userId, status])
            }

            const pipeline = [];
            const match = { [indexBasis]: { $regex: regexValue } };
            const project = { status: 1, image: 1, index1: 1, validity: 1, description: 1, type: 1 };

            if (lastbasis) {
                match[indexBasis][orderBasis] = lastbasis;
            }

            pipeline.push({ $match: match });
            pipeline.push({ $project: project });
            pipeline.push({ $limit: 10 });


            return DB.Reward.rawCollection().aggregate(pipeline, { allowDiskUse: true }).toArray().then((res) => {
                const returnData = {};
                if (res && res.length) {
                    returnData.data = res.map((item) => ({ ...item, _id: item._id.toString() }));
                    returnData.lastbasis = res[res.length - 1][indexBasis];
                }
                Utilities.showStatus("get Reward successfully");
                return returnData;
            });
        } catch (error) {
            Utilities.showError("Unable get Reward data.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },



    getRewardDetail: async function (id) {
        try {
            check(id, String)
            return await DB.Reward.rawCollection().findOne({ _id: new ObjectId(id) }).then((res) => {
                if (res.type == "bet") {
                    const binData = res.bet.qrcode;
                    const binaryData = binData.buffer;
                    const base64String = Buffer.from(binaryData).toString('base64');

                    Utilities.showStatus("get Reward Bet Detail successfully");
                    return { ...res, _id: res._id.toString(), bet: { ...res.bet, qrcode: base64String } };
                }

                if (res.type == "spin") {
                    const binData = res.spin.qrcode;
                    const binaryData = binData.buffer;
                    const base64String = Buffer.from(binaryData).toString('base64');

                    Utilities.showStatus("get Reward Spin Detail successfully");
                    return { ...res, _id: res._id.toString(), spin: { ...res.spin, qrcode: base64String } };
                }


            })
        } catch (error) {
            Utilities.showError("Unable get Reward Detail data.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },

    updateRewardUser: function ({ id, qr }) {
        try {
            DB.Reward.update({ _id: id }, { $set: { qrReward: qr } })
            Utilities.showStatus("Update Reward User successfully");
            return true
        } catch (error) {
            Utilities.showError("Unable Update Reward User data.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    }
    ,

    UpdateClaimReward: function (data) {
        try {
            const { rewardId } = data
            let index1 = toIndexField([this.userId, "used", moment().valueOf()])
            const res = DB.Reward.update({ _id: new ObjectId(rewardId) }, { $set: { status: "used", index1, } })
            if (!res) {
                return false
            }
            Utilities.showStatus("Update Claim Reward User to Used successfully");
            return true
        } catch (error) {
            Utilities.showError("Unable Claim Reward User to Used.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },

    validateRewardWinner: function (data) {
        try {
            const binaryData = new Uint8Array(Buffer.from(data, 'base64'));

            const res = DB.Reward.findOne({
                "bet.qrcode": binaryData
            })
            if (!res) {
                return { status: false }
            }
            Utilities.showStatus("Validation Reward Winner successfully");
            return { status: true, id: res.bet.betId, rewardId: res._id }
        } catch (error) {
            Utilities.showError("Unable Validation Reward Winner.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },

    validateRewardWinnerSpin: async function (data) {
        try {
            const binaryData = new Uint8Array(Buffer.from(data, 'base64'));

            const res = DB.Reward.findOne({ "spin.qrcode": binaryData })

            if (!res) {
                return { status: false }
            }
            Utilities.showStatus("Validation Reward on Spin Wheel Winner successfully");
            return { status: true, id: res.spin.spinId, rewardId: res._id }
        } catch (error) {
            Utilities.showError("Unable Validation Reward on Spin Wheel Winner.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },


    getBetDetails: async function (id) {
        try {
            return DB.Bet.rawCollection().findOne({ _id: new ObjectId(id) }).then((res) => {
                if (res) {
                    const user = Meteor.users.findOne({ _id: res.userId }, { fields: { profile: 1 } })

                    Utilities.showStatus("get Bet Details successfully");

                    return { status: true, data: { name: user.profile.name, win: res.win } }
                }
                return { status: false }
            });

        } catch (error) {
            Utilities.showError("Unable get Bet Details.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },

    getSpinDetails: async function (id) {
        try {
            return DB.Roulette.rawCollection().findOne({ _id: new ObjectId(id) }).then((res) => {
                if (res) {

                    const user = Meteor.users.findOne({ _id: res.userId }, { fields: { profile: 1 } })

                    Utilities.showStatus("get Bet Details successfully");

                    return { status: true, data: { name: user.profile.name, win: res.spinResult == "win" ? true : false } }
                }
                return { status: false }
            });

        } catch (error) {
            Utilities.showError("Unable get Bet Details.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },
}