
import { Meteor } from "meteor/meteor";
import Server from "../../classes/server/Server";
import { GAME, MYBET, NOTIFY, ROULETTE, STORE, USER } from "../../const";
import DB from "../../DB";
import Utilities from "../../classes/Utilities";
import moment from "moment";

if (Meteor.isServer) {

    Server.addPub("user", function () {
        try {
            if (this.userId) {
                return Meteor.users.find({ _id: this.userId }, { fields: { emails: 1, profile: 1 } });
            }
        } catch (error) {
            console.log(error);
        }
        this.ready();
    });


    Server.addPub(MYBET.SUBSCRIBE_MYBET, function () {
        const cursor = DB.Bet.find({ win: "no_assign", userId: this.userId });
        Utilities.setupHandler(this, MYBET.MINI_MYBET, cursor, (doc) => {
            return doc;
        })
        this.ready();
    })

    Server.addPub(GAME.SUBSCRIBE_GAME, function () {
        let current = moment().startOf("days").valueOf();
        let tomorrow = moment().endOf("days").valueOf();
        const cursor = DB.Races.find({ schedule: { $gte: current, $lte: tomorrow } }, { fields: { raceLocation: 1, raceNo: 1, description: 1, schedule: 1, isLive: 1, winner: 1, videoLink: 1, storeId: 1 } });
        Utilities.setupHandler(this, GAME.MINI_GAME, cursor, (doc) => {
            return doc;
        })
        this.ready();
    })

    Server.addPub(STORE.SUBSCRIBE_STORE, function () {
        const cursor = DB.Store.find({});
        Utilities.setupHandler(this, STORE.MINI_STORE, cursor, (doc) => {
            return doc;
        })
        this.ready();
    })


    Server.addPub(NOTIFY.SUBSCRIBE_NOTIFY, function () {
        const cursor = DB.NotificationLogs.find({ userId: this.userId, seen: false }, { fields: { seen: 1 } });
        Utilities.setupHandler(this, NOTIFY.MINI_NOTIFY, cursor, (doc) => {
            return doc;
        })
        this.ready();
    })


    Server.addPub(ROULETTE.SUBSCRIBE_ROULETTE, function () {
        const cursor = DB.Roulette.find({});
        Utilities.setupHandler(this, ROULETTE.MINI_ROULETTE, cursor, (doc) => {
            return doc;
        })
        this.ready();
    })

}