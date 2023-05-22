

import { Toast } from "../../../ui/components/extra/Toast";
import { ADMIN, USER } from "../../const";
import Utilities from "../Utilities";
import Watcher from "../Watcher";
import ClientWatcher from "./ClientWatcher";
import RedisVent from "./RedisVent";


class RecordWatcher extends Watcher {
    #config
    #db
    #lastbasis;
    #couponDetails = "";
    #id
    #betDetails;
    constructor(parent) {
        super(parent);
        this.#config = {
            isLoading: false,
            creditReceived: "",
            error: "",
            coupon: "",
            qrcode: "",
            reward: "",
        }
        this.#id = {
            betId: "",
            rewardId: ""
        }

        RedisVent.Reward.prepareCollection("reward");
        this.#db = RedisVent.Reward.getCollection("reward");

    }

    get ID() {
        return this.#id;
    }

    setID(id) {
        this.#id = { ...this.#id, ...id };
        this.activateWatcher();
    }

    resetId({ forceRender = true }) {
        this.#id = {
            betId: "",
            rewardId: ""
        };
        forceRender && this.activateWatcher();
    }



    setConfig(config) {
        this.#config = { ...this.#config, ...config };
        this.activateWatcher();
    }

    get BetDetails() {
        return this.#betDetails;
    }

    get Config() {
        return this.#config;
    }

    reset({ forceRender = true }) {
        this.#config = {};
        forceRender && this.activateWatcher();
    }

    get CouponDetails() {
        return this.#couponDetails;
    }

    resetCouponDetails({ forceRender = true }) {
        this.#couponDetails = "";
        forceRender && this.activateWatcher();
    }



    getDailyCredit(data) {
        this.#config.isLoading = true;
        this.activateWatcher();
        this.Parent.callFunc(USER.GetDailyCredit, data).then((data) => {
            if (data && data.status) {
                this.#config.creditReceived = data.credit
            } else {
                this.#config.error = "QR code is invalid or has been used"
            }
            this.#config.isLoading = false;
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
            this.#config.isLoading = false;
            this.activateWatcher();
        })
    }



    get RewardData() {
        return this.#db.find().fetch();
    }

    get rewardDB() {
        return this.#db;
    }


    getReward(loadMore, status) {
        if (!loadMore) {
            this.#db.remove({});
            this.#lastbasis = null;
        }
        this.Parent.callFunc(USER.GetReward, [status, this.#lastbasis]).then((data) => {
            if (data && data.data && data.data.length) {
                data.data.forEach(element => {
                    this.#db.insert(element);
                });
                this.#lastbasis = data.lastbasis;
            }
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
            this.activateWatcher();
        });
    }

    getRewardDetails(id) {
        this.#config.isLoading = true;
        this.activateWatcher();
        this.Parent.callFunc(USER.GetRewardDetails, id).then((data) => {
            if (data) {
                this.#couponDetails = data;
            }
            this.#config.isLoading = false;
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
            this.#config.isLoading = false;
            this.activateWatcher();
        })
    }


    updateReward(id, qr) {
        this.#config.isLoading = true;
        this.activateWatcher();
        this.Parent.callFunc(USER.UpdateReward, { id, qr }).then((data) => {
            if (data) {
                Toast({ text: "Generating succefully", type: "success" });
            }
            this.#config.isLoading = false;
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
            this.#config.isLoading = false;
            this.activateWatcher();
        })
    }

    UpdateClaimReward(data) {
        this.#config.isLoading = true;
        this.activateWatcher();
        this.Parent.callFunc(USER.UpdateClaimReward, data).then((data) => {
            if (data) {
                Toast({ text: "Reward claimed successfully", type: "success" });
            }
            this.#config.isLoading = false;
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
            this.#config.isLoading = false;
            this.activateWatcher();
        })
    }


    async ValidateWinner(data) {
        this.#config.isLoading = true;
        this.activateWatcher();
        return this.Parent.callFunc(USER.ValidateWinner, data).then((data) => {
            if (data && data.status) {
                this.#config.isLoading = false;
                this.activateWatcher();
                return data
            } else {
                this.#config.isLoading = false;
                this.activateWatcher();
                return false
            }
        }).catch((err) => {
            console.log(err);
            this.#config.isLoading = false;
            this.activateWatcher();
        })
    }

    async ValidateWinnerSpin(data) {
        this.#config.isLoading = true;
        this.activateWatcher();
        return this.Parent.callFunc(USER.ValidateWinnerSpin, data).then((data) => {
            if (data && data.status) {
                this.#config.isLoading = false;
                this.activateWatcher();
                return data
            } else {
                this.#config.isLoading = false;
                this.activateWatcher();
                return false
            }
        }).catch((err) => {
            console.log(err);
            this.#config.isLoading = false;
            this.activateWatcher();
        })
    }


    getBetDetails(id) {
        this.#config.isLoading = true;
        this.activateWatcher();
        this.Parent.callFunc(ADMIN.GetBetDetails, id).then((data) => {
            if (data.status) {
                this.#betDetails = data.data;
            }
            this.#config.isLoading = false;
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
            this.#config.isLoading = false;
            this.activateWatcher();
        })
    }


    getSpinDetails(id) {
        this.#config.isLoading = true;
        this.activateWatcher();
        this.Parent.callFunc(ADMIN.GetSpinDetails, id).then((data) => {
            if (data.status) {
                this.#betDetails = data.data;
            }
            this.#config.isLoading = false;
            this.activateWatcher();
        }).catch((err) => {
            console.log(err);
            this.#config.isLoading = false;
            this.activateWatcher();
        })
    }

}

export default new RecordWatcher(ClientWatcher);
