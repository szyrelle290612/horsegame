import { Meteor } from 'meteor/meteor';
import DB from '../../DB';
import RedisVent from './RedisVent';
import { toIndexField } from './IndexGenerator';


process.env.MAIL_URL = Meteor.settings.private.email_secret;

Accounts.urls.verifyEmail = function (token) {
    return Meteor.absoluteUrl("email-verification/" + token);
};

Accounts.emailTemplates.resetPassword.subject = () => {
    return "User reset password request";
};

Accounts.emailTemplates.verifyEmail.subject = () => {
    return "User email verification";
};



class Server {
    #settings = null
    constructor(settings) {

        this.functions = {};
        this.#settings = settings
    }

    get Config() {
        return this.#settings
    }

    initServer() {

    }

    registerFunctions() {
        Meteor.methods(this.functions);
    }

    addFunction(name, func) {
        if (typeof func != "function") throw new Error("func not a function");
        if (this.functions[name]) throw new Error(`function "${name}" is already registered`);
        this.functions[name] = func;
    }

    addPub(name, func) {
        if (typeof func != "function") throw new Error("Invalid publication!");
        Meteor.publish(name, func);
    }

    async initDB() {
        if (DB.Store.find().count() === 0) {
            DB.Store.insert({
                _id: new Mongo.ObjectID("644f15e7320b40e5e235875c"),
                dailyReward: 1,
                creditPerBet: 1,
                creditPerSpin: 1,
                betTimer: 30,
                rouletteSettings: [
                    {
                        status: true,
                        text: "coupon"
                    },
                    {
                        status: true,
                        text: "coupon"
                    }
                ]
            });
        }
    }

    startRedis() {
        return new Promise((resolve) => {
            const red = RedisVent.publish();
            console.log("Redis ready!", red)
            resolve()
        });
    }
    async run() {
        return Promise.all([this.initDB(), this.startRedis()]).then(() => {
            console.log("Server is ready")
        })
    }


}

export default new Server(Meteor.settings)