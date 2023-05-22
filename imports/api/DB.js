import { Mongo } from 'meteor/mongo';
import { GAME, MYBET, NOTIFY, ROULETTE, STORE } from './const';


export default {
    Bet: new Mongo.Collection('bet', { idGeneration: 'MONGO' }),
    Horse: new Mongo.Collection('horse', { idGeneration: 'MONGO' }),
    Races: new Mongo.Collection('races', { idGeneration: 'MONGO' }),
    NotificationLogs: new Mongo.Collection('notification_logs', { idGeneration: 'MONGO' }),
    Store: new Mongo.Collection('store', { idGeneration: 'MONGO' }),
    Qrcode: new Mongo.Collection('qrcode', { idGeneration: 'MONGO' }),
    Reward: new Mongo.Collection('reward', { idGeneration: 'MONGO' }),
    Coupon: new Mongo.Collection('coupon', { idGeneration: 'MONGO' }),
    Roulette: new Mongo.Collection("roulette", { idGeneration: "MONGO" }),
    MINI: {
        [MYBET.MINI_MYBET]: new Mongo.Collection(MYBET.MINI_MYBET, { idGeneration: 'MONGO' }),
        [GAME.MINI_GAME]: new Mongo.Collection(GAME.MINI_GAME, { idGeneration: 'MONGO' }),
        [STORE.MINI_STORE]: new Mongo.Collection(STORE.MINI_STORE, { idGeneration: 'MONGO' }),
        [NOTIFY.MINI_NOTIFY]: new Mongo.Collection(NOTIFY.MINI_NOTIFY, { idGeneration: 'MONGO' }),
        [ROULETTE.MINI_ROULETTE]: new Mongo.Collection(ROULETTE.MINI_ROULETTE, { idGeneration: 'MONGO' }),
    }
};