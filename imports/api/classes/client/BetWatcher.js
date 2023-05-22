import moment from "moment";
import DB from "../../DB";
import { ADMIN, GAME, MYBET, USER } from "../../const";
import Watcher from "../Watcher";
import ClientWatcher from "./ClientWatcher";
import AdminWatcher from "./AdminWatcher";
import { Toast } from "../../../ui/components/extra/Toast";

class BetWatcher extends Watcher {
    #horsesOnRaceList;
    #config;
    #horseDetails;
    #racedata;
    #timer;
    constructor(parent) {
        super(parent);
        this.#config = {
            race: {
                storeId: "",
                raceId: "",
                raceLocation: "",
                schedule: "",
                raceNo: "",
            },
            horse: {
                horseId: "",
                horseName: "",
                horseNumber: "",
            },
            isLoading: false,
            isAlreadyBet: false,
        };
        this.#racedata = {
            isLive: "",
            videoLink: "",
            raceLocation: "",
            raceNo: "",
            description: "",
            isLive: false,
            winner: "",
        };
    }



    //data for new race
    setTime(timer) {
        this.#timer = { ...this.#timer, ...timer };
        this.activateWatcher();
    }

    get Time() {
        return this.#timer;
    }


    setConfig(config) {
        this.#config = { ...this.#config, ...config };
        this.activateWatcher();
    }

    get Config() {
        return this.#config;
    }

    reset({ forceRender = true }) {
        this.#config = {};
        forceRender && this.activateWatcher();
    }



    setVideoSelected(racedata) {
        this.#racedata = { ...this.#racedata, ...racedata };
        this.activateWatcher();
    }

    get VideoSelect() {
        return this.#racedata;
    }

    //get horse list
    get HorseList() {
        return this.#horsesOnRaceList;
    }

    setClear() {
        this.#horsesOnRaceList = [];
        this.activateWatcher();

    }

    //get horse details
    get HorseDetails() {
        return this.#horseDetails;
    }


    get MyBetDB() {
        return DB.MINI['#mybet'];
    }

    get GameDB() {
        return DB.MINI['#game'];
    }


    get MyBetDBData() {
        return this.MyBetDB.find().fetch();
    }

    get GameDBData() {
        return this.GameDB.find().fetch();
    }


    getSubscribeMyBet() {
        return this.Parent.subscribe(MYBET.SUBSCRIBE_MYBET);
    }


    getSubscribeGame() {
        return this.Parent.subscribe(GAME.SUBSCRIBE_GAME);
    }


    getHorseOnRace() {
        this.#config.isLoading = true;
        this.activateWatcher();
        this.Parent.callFunc(ADMIN.getHorseOnRace, this.#config.race.raceId).then((data) => {
            this.#horsesOnRaceList = data[0];
            this.#config.isLoading = false;
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
        })
    }

    getHorseDetails() {
        this.Parent.callFunc(USER.GetHorseDetails, this.#config.horse.horseId).then((data) => {
            this.#horseDetails = data;
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
        })
    }


    placeBet(credit) {
        const { race, horse } = this.#config
        this.#config.isLoading = true;
        this.activateWatcher();
        this.Parent.callFunc(USER.PlaceBet, { race, horse }).then((data) => {
            if (!data.success) {
                Toast({ text: data.message, type: "error" });
            } else {
                this.DeductCredit(-credit);
            }
            this.#config.isLoading = false;
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
        })
    }

    // Deduct credit when user place bet
    DeductCredit(credit) {
        this.#config.isLoading = true;
        this.activateWatcher();
        this.Parent.callFunc(USER.DeductCredit, credit).then((data) => {
            Toast({ text: data.message, type: "success" });
            this.#config.isLoading = false;
            this.activateWatcher();
            return true
        }).catch((err) => {
            console.log(err);
        })
    }


    // getMyBet(){
    //     this.Parent.callFunc("GetMyBet", id).then((data) => {

    //         this.activateWatcher();
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }  
}

export default new BetWatcher(ClientWatcher);
