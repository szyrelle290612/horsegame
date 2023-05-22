import moment from "moment";
import DB from "../../DB";
import { NOTIFY, USER } from "../../const";
import Watcher from "../Watcher";
import ClientWatcher from "./ClientWatcher";
import AdminWatcher from "./AdminWatcher";
import RedisVent from "./RedisVent";

class NotificationWatcher extends Watcher {
    #dbBetLogs;
    #logs
    #betloglastbasis;
    #loglastbasis;

    constructor(parent) {
        super(parent);
        RedisVent.Betlogs.prepareCollection("betlogs");
        this.#dbBetLogs = RedisVent.Betlogs.getCollection("betlogs");
        RedisVent.Logs.prepareCollection("logs");
        this.#logs = RedisVent.Logs.getCollection("logs");
    }



    get NotifyDB() {
        return DB.MINI['#notify'];
    }


    get NotifyDBData() {
        return this.NotifyDB.find().count();
    }

    getSubscribeNotify() {
        return this.Parent.subscribe(NOTIFY.SUBSCRIBE_NOTIFY);
    }

    get BetData() {
        return this.#dbBetLogs.find().fetch();
    }

    get betDB() {
        return this.#dbBetLogs;
    }


    get LogData() {
        return this.#logs.find().fetch();
    }

    get logDB() {
        return this.#logs;
    }

    clearDB(db) {
        switch (db) {
            case 'betlogs':
                this.#dbBetLogs.remove({});
                break;
            case 'logs':
                this.#logs.remove({});
        }

    }



    getBetLogs(loadMore) {
        if (!loadMore) {
            this.#dbBetLogs.remove({});
            this.#betloglastbasis = null;
        }
        this.Parent.callFunc(USER.GetBetLogs, this.#betloglastbasis).then((data) => {
            if (data && data.data && data.data.length) {
                data.data.forEach(element => {
                    this.#dbBetLogs.insert(element);
                });
                this.#betloglastbasis = data.lastbasis;
            }
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
            this.activateWatcher();
        });
    }

    getLogs(loadMore) {
        if (!loadMore) {
            this.#logs.remove({});
            this.#loglastbasis = null;
        }
        this.Parent.callFunc(USER.GetLogs, this.#loglastbasis).then((data) => {
            if (data && data.data && data.data.length) {
                data.data.forEach(element => {
                    this.#logs.insert(element);
                });
                this.#loglastbasis = data.lastbasis;
            }
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
            this.activateWatcher();
        });
    }


    AlreadySeen() {
        this.Parent.callFunc(USER.SeenLogs).then((data) => {
        }).catch((err) => {
            console.log(err);

        });
    }
}

export default new NotificationWatcher(ClientWatcher);
