
import moment from "moment";
import DB from "../../DB";
import { USER } from "../../const";
import Watcher from "../Watcher";
import ClientWatcher from "./ClientWatcher";
import RedisVent from "./RedisVent";


class RecordWatcher extends Watcher {
    #dbMatchHistory;
    #lastbasisHistory;
    constructor(parent) {
        super(parent);
        RedisVent.MatchHistory.prepareCollection("matchhistory");
        this.#dbMatchHistory = RedisVent.MatchHistory.getCollection("matchhistory")
    }

    get MatchData() {
        return this.#dbMatchHistory.find().fetch();
    }

    get MatchDB() {
        return this.#dbMatchHistory;
    }


    setclearDB() {
        this.#dbMatchHistory.remove({});
    }


    getMatchHistory(loadMore, date) {
        if (!loadMore) {
            this.#dbMatchHistory.remove({});
            this.#lastbasisHistory = null;
        }
        this.Parent.callFunc(USER.GetMatchHistory, [this.#lastbasisHistory, date]).then((data) => {
            if (data && data.data && data.data.length) {
                data.data.forEach(element => {
                    this.#dbMatchHistory.insert(element);
                });
                this.#lastbasisHistory = data.lastbasis;
            }
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
            this.activateWatcher();
        });
    }

    getUpcomingMatch(loadMore, date) {
        if (!loadMore) {
            this.#dbMatchHistory.remove({});
            this.#lastbasisHistory = null;
        }
        this.Parent.callFunc(USER.getUpcomingMatch, [this.#lastbasisHistory, date]).then((data) => {
            if (data && data.data && data.data.length) {
                data.data.forEach(element => {
                    this.#dbMatchHistory.insert(element);
                });
                this.#lastbasisHistory = data.lastbasis;
            }
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
            this.activateWatcher();
        });
    }


}

export default new RecordWatcher(ClientWatcher);
