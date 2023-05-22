import { ObjectId } from "mongodb";
import { USER } from "../../const";
import DB from "../../DB";
import Utilities from "../../classes/Utilities";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { toIndexField } from "../../classes/server/IndexGenerator";

export default {

    updateRouletteData: async function (data) {
        try {
            // add user restriction here
            const { description, rouletteDataId } = data;
            DB.Store.update({ _id: new ObjectId(rouletteDataId) }, { $set: { rouletteSettings: description } })

            Utilities.showStatus("Roulette data updated successfully");
            return true
        } catch (error) {
            Utilities.showError("Unable to update roulette data.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },

    createSpinData: async function ({ result, reward, storeId }) {
        try {
            const createdAt = moment().valueOf();
            const data = { type: "verifyWinnerSpin", storeId, Qrcode: uuidv4() }
            const encoded = Utilities.encodeBase64(JSON.stringify(data))
            const buffer = Buffer.from(encoded, 'base64');

            if (result === true) {
                const res = await new Promise((resolve, reject) => {
                    DB.Roulette.insert(
                        {
                            spinId: buffer,
                            spinResult: "win",
                            userId: this.userId,
                            createdAt,
                        }
                        , (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                });

                if (res) {
                    DB.Reward.insert({
                        description: reward,
                        spin: {
                            spinId: res._str,
                            qrcode: buffer,
                        },
                        type: "spin",
                        userId: this.userId,
                        validity: moment().add(15, "days").valueOf(),
                        status: "available",
                        image: "images/coupon.png",
                        createdAt,
                        index1: toIndexField([this.userId, "available", moment().valueOf()]),
                        index2: toIndexField([moment().startOf("day").valueOf(), createdAt]),
                    })
                }

            } else {
                DB.Roulette.insert(
                    {
                        spinId: encoded,
                        spinResult: "lose",
                        userId: this.userId,
                        createdAt,
                    })
            }






            // if(result)

            // await DB.Bet.insert(query);

            // DB.Reward.insert({
            //     description: reward.description,
            //     spin: {

            //     },
            //     userId: this.userId,
            //     validity: reward.validity,
            //     status: "available",
            //     image: "images/coupon.png",
            //     createdAt,
            //     index1: toIndexField([this.userId, "available", moment().valueOf()]),
            //     index2: toIndexField([moment().startOf("day").valueOf(), createdAt]),

            // })
            Utilities.showStatus("Roulette data created successfully");
            return true
        } catch (error) {
            Utilities.showError("Unable to create and create reward roulette data.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },

}