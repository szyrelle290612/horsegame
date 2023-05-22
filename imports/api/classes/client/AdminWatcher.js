import moment from "moment";
import DB from "../../DB";
import { ADMIN, SETTING, STORE } from "../../const";

import Watcher from "../Watcher";
import ClientWatcher from "./ClientWatcher";
import RedisVent from "./RedisVent";
import { Toast } from "../../../ui/components/extra/Toast";

class AdminWatcher extends Watcher {
    #horsesOnRaceList;
    #raceId;
    #config;
    #gameList;
    #listen = null;
    #newhorse;
    #newRace;
    #lastbasis;
    #dbHorse;
    #timer;
    #dbReward;
    #id;
    constructor(parent) {
        super(parent);
        this.#config = {
            minBet: 1,
            date: moment().format("YYYY-MM-DD"),
            isLoading: false,
            selectedWinner: { _id: "", horseName: "" }
        }
        this.#newhorse = {
            horseName: "",
            description: "",
            trainerName: "",
            win: 0,
            runs: 0,
            place: 0,
            syndicateName: "",
            manager: "",
            ownerShip: "",
        }
        this.#newRace = {
            raceLocation: "",
            videoLink: "",
            schedule: "",
            horse: [],
            isLive: false,
            isEnd: false,
            winner: "",
            raceNo: "",
            description: "",
            validity: "",
            image: "images/coupon.png",
            storeId: "",
        }
        this.validation = {
            error: "",
            validate: ""
        }


        RedisVent.Races.prepareCollection("races");
        this.#gameList = RedisVent.Races.getCollection("races");
        RedisVent.Horse.prepareCollection("horse");
        this.#dbHorse = RedisVent.Horse.getCollection("horse");
        RedisVent.AllReward.prepareCollection("allreward");
        this.#dbReward = RedisVent.AllReward.getCollection("allreward");


        this.handleChangeNewHorse = this.handleChangeNewHorse.bind(this);
        this.handleChangeNewRace = this.handleChangeNewRace.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitRace = this.handleSubmitRace.bind(this);
    }

    get RacesData() {
        return this.#gameList.find().fetch();
    }

    get RacesDB() {
        return this.#gameList;
    }

    get HorseData() {
        return this.#dbHorse.find().fetch();
    }

    get HorsesDB() {
        return this.#dbHorse;
    }


    get RewardData() {
        return this.#dbReward.find().fetch();
    }

    get RewardDB() {
        return this.#dbReward;
    }


    //data for new race
    setId(id) {
        this.#id = id;
        this.activateWatcher();
    }

    get ID() {
        return this.#id;
    }




    //data for new race
    setValidation(validation) {
        this.validation = { ...this.validation, ...validation };
        this.activateWatcher();
    }

    get Validation() {
        return this.validation;
    }

    resetValidation({ forceRender = true }) {
        this.validation = {
            error: "",
            validate: ""
        }
        forceRender && this.activateWatcher();
    }


    //data for new race
    setNewRace(newRace) {
        this.#newRace = { ...this.#newRace, ...newRace };
        this.activateWatcher();
    }

    get NewRace() {
        return this.#newRace;
    }

    resetRace({ forceRender = true }) {
        this.#newRace = {
            raceLocation: "",
            videoLink: "",
            schedule: "",
            horse: [],
            isLive: false,
            isEnd: false,
            winner: "",
            raceNo: "",
            description: "",
            validity: "",
            image: "images/coupon.png",
            storeId: "",
        }
        forceRender && this.activateWatcher();
    }




    //data for new horse
    setNewHorse(newhorse) {
        this.#newhorse = { ...this.#newhorse, ...newhorse };
        this.activateWatcher();
    }

    get NewHorse() {
        return this.#newhorse;
    }

    resetHorse({ forceRender = true }) {
        this.#newhorse = {
            horseName: "",
            description: "",
            trainerName: "",
            win: 0,
            runs: 0,
            place: 0,
            syndicateName: "",
            manager: "",
            ownerShip: "",
        }
        forceRender && this.activateWatcher();
    }


    handleChangeNewHorse(event) {
        const target = event.target;
        const value = target.value;
        const name = target.id;
        this.setNewHorse({ [name]: value });
    }

    handleChangeNewRace(event) {
        const target = event.target;
        const value = target.value;
        const name = target.id;
        this.setNewRace({ [name]: value });
    }

    deleteHorse(index) {
        this.#newRace.horse.splice(index, 1);
        this.activateWatcher();
    }

    setConfig(config) {
        this.#config = { ...this.#config, ...config };
        this.activateWatcher();
    }

    get Config() {
        return this.#config;
    }

    reset({ forceRender = true }) {
        this.#config = {
            minBet: 1,
            date: moment().format("YYYY-MM-DD"),
            isLoading: false,
            selectedWinner: { _id: "", horseName: "" }
        };
        forceRender && this.activateWatcher();
    }




    handleSubmit(e) {
        e.preventDefault();
        if (this.NewHorse.horseName.length < 3 ||
            this.NewHorse.trainerName.length < 3 ||
            this.NewHorse.syndicateName.length < 3 ||
            this.NewHorse.manager.length < 3) {
            this.setValidation({ error: "Please fill all fields", validate: "" });
        } else {
            this.#newRace

            this.Parent.callFunc(ADMIN.CreateNewHorse, this.NewHorse).then((data) => {
                if (data) {
                    this.setValidation({ error: "", validate: "Horse Created" });
                    this.resetHorse({ forceRender: true });
                } else {
                    this.setValidation({ error: "Horse already exist", validate: "" });
                }
                this.activateWatcher();
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    handleSubmitRace(e) {
        e.preventDefault();
        const now = moment().valueOf()
        const schedule = moment(this.NewRace.schedule)
        const validateDate = moment.duration(schedule.diff(now)).asMilliseconds() > 0
        if (this.NewRace.raceLocation.length < 3 ||
            this.NewRace.videoLink.length < 3 ||
            validateDate == false ||
            this.NewRace.raceNo.length < 1 ||
            this.NewRace.validity.length < 3 ||
            this.NewRace.storeId < 3 ||
            this.NewRace.horse.length < 3
        ) {
            this.setValidation({ error: "Please fill all fields", validate: "" });
            setTimeout(() => {
                this.resetValidation({ forceRender: true });
            }, 2000)
        } else {
            this.#newRace.schedule = moment(this.#newRace.schedule).valueOf()


            this.#newRace.validity = moment(this.#newRace.validity).valueOf()
            this.setNewRace({ createdAt: moment().valueOf() })
            this.Parent.callFunc(ADMIN.CreateNewRace, this.NewRace).then((data) => {
                if (data) {
                    this.setValidation({ error: "", validate: "Race Created" });
                    setTimeout(() => {
                        this.resetValidation({ forceRender: true });
                    }, 2000)
                    this.resetRace({ forceRender: true });
                } else {
                    this.setValidation({ error: "Race already exist", validate: "" });
                    setTimeout(() => {
                        this.resetValidation({ forceRender: true });
                    }, 2000)
                }
                this.activateWatcher();
            }).catch((err) => {
                console.log(err);
            })
        }
    }











    get SettingDB() {
        return DB.MINI['#store'];
    }


    get SettingDBData() {
        return this.SettingDB.find({}, { fields: { rouletteSettings: 0 } }).fetch();
    }

    get SettingRoulette() {
        return this.SettingDB.find({}, { fields: { rouletteSettings: 1, creditPerSpin: 1 } }).fetch();
    }


    getSubscribeSettings() {
        return this.Parent.subscribe(STORE.SUBSCRIBE_STORE);
    }


    get GameList() {
        return this.#gameList;
    }


    setRaceId(raceId) {
        this.#raceId = raceId;
        this.activateWatcher();
    }


    get RaceId() {
        return this.#raceId;
    }



    get HorseOnRaceList() {
        return this.#horsesOnRaceList;
    }

    setHorseOnRaceList(HorseOnRaceList) {
        this.#horsesOnRaceList = HorseOnRaceList;
        this.activateWatcher();

    }






















    GoLive(id, flag) {
        this.Parent.callFunc(ADMIN.UpdateLive, { id, flag }).then((data) => {
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
        })
    }

    UpdateWinner() {
        this.Parent.callFunc(ADMIN.UpdateWinner, this.#config.selectedWinner).then((data) => {
            if (data) {
                this.sendToAllWinner(this.#config.selectedWinner._id)
            }
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
        })
    }

    getHorseOnRace() {
        this.Parent.callFunc(ADMIN.getHorseOnRace, this.#raceId).then((data) => {
            this.#horsesOnRaceList = data[0];
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
        })
    }

    UpdateBalance(credit, email) {
        if (credit == 0) return;
        this.Parent.callFunc(ADMIN.UpdateBalance, { credit, email }).then((data) => {
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
        })
    }

    saveQrcode(data) {
        this.Parent.callFunc(ADMIN.CreateQrCode, data).then((data) => {
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
        })
    }

    sendToAllWinner(id) {
        this.Parent.callFunc(ADMIN.SendRewardWinner, id).then((data) => {
            if (data) {
                Toast({ text: "Reward Sent", type: "success" })
            }
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
        })
    }

    getGame(loadMore) {
        if (!loadMore) {
            this.#gameList.remove({});
        }
        this.Parent.callFunc(ADMIN.GetGame, this.#config.date).then((data) => {
            if (data && data.data && data.data.length) {
                data.data.forEach(element => {
                    this.#gameList.insert(element);
                });
            }
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
            this.activateWatcher();
        });
    }

    getHorseList(loadMore, name) {
        let searchName = ""
        if (name && name.length > 2) {
            searchName = name
        }
        if (!loadMore || searchName.length > 2) {
            this.#dbHorse.remove({});
            this.#lastbasis = null
        }
        this.Parent.callFunc(ADMIN.GetHorseList, [this.#lastbasis, searchName]).then((data) => {
            if (data && data.data && data.data.length) {
                data.data.forEach(element => {
                    this.#dbHorse.insert(element);
                });
                this.#lastbasis = data.lastbasis;
            }
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
            this.activateWatcher();
        });
    }

    UpdateSetting(data) {
        this.Parent.callFunc(ADMIN.UpdateSetting, data).then((data) => {
            if (data) {
                Toast({ text: "Setting Updated", type: "success" })
            } else {
                Toast({ text: "Setting Not Updated", type: "error" })
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    getAllRewards(loadMore, date) {
        if (!loadMore) {
            this.#dbReward.remove({});
            this.#lastbasis = null
        }
        this.Parent.callFunc(ADMIN.getAllReward, [this.#lastbasis, date]).then((data) => {
            if (data && data.data && data.data.length) {
                data.data.forEach(element => {
                    this.#dbReward.insert(element);
                });
                this.#lastbasis = data.lastbasis;
            }
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
            this.activateWatcher();
        });
    }

    scanResult() {
        return new Promise(function (resolve, reject) {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    resolve(result.text);
                },
                function (error) {
                    reject("Scanning failed: " + error);
                },
                {
                    preferFrontCamera: false, // iOS and Android
                    showFlipCameraButton: false, // iOS and Android
                    showTorchButton: false, // iOS and Android
                    torchOn: false, // Android, launch with the torch switched on (if available)
                    saveHistory: false, // Android, save scan history (default false)
                    prompt: "Place a barcode inside the scan area", // Android
                    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                    formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                    orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                    disableAnimations: true, // iOS
                    disableSuccessBeep: false // iOS and Android
                }
            );
        })
    }





    listen(data) {
        let db = {}
        switch (data) {
            case "races":
                db = { dbName: "Races", nameSpace: "races" };
                break;
            case "horse":
                db = { dbName: "Horse", nameSpace: "horse" };
                break;
        }
        if (!this.#listen) {
            this.#listen = RedisVent[db.dbName].listen([db.nameSpace], ClientWatcher.user() && ClientWatcher.user()._id, ({ event, data }) => {
                let result = data.data;
                switch (event) {
                    case "insert":
                        break;
                    case "remove":
                        break;
                    case "upsert":
                        break;
                    case "update":
                        if (result.update == "winner") {
                            this.RacesDB.update({ _id: result._id }, { $set: { winner: result.horseName } });
                        } else {
                            this.RacesDB.update({ _id: result.id }, { $set: { isLive: result.flag } });
                        }
                        break;
                }

                this.activateWatcher();
            });

        }
    }


}

export default new AdminWatcher(ClientWatcher);
