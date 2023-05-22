import Watcher from "../Watcher";
import ClientWatcher from "./ClientWatcher";
import { USER } from "../../const";
import DB from "../../DB";
import { Toast } from "../../../ui/components/extra/Toast";

class RouletteWatcher extends Watcher {
    // define private propertiesParentUpdate
    #config;

    constructor(parent) {
        super(parent);

        // initialize properties
        this.#config = {
            isLoading: false,
        };
    }

    setConfig(config) {
        this.#config = { ...this.#config, ...config };
        this.activateWatcher();
    }

    get RouletteData() {
        return DB.Roulette.find({}).fetch();
    }

    addRouletteData(description) {
        return this.Parent.callFunc(USER.AddRouletteData, description);
    }

    deleteRouletteData(rouletteDataId) {
        return this.Parent.callFunc(USER.DeleteRouletteData, rouletteDataId);
    }

    updateRouletteData(rouletteDataId, description) {
        this.Parent.callFunc(USER.UpdateRouletteData, { rouletteDataId, description }).then((data) => {
            if (data) {
                Toast({ text: "Roulette Data Updated Successfully", type: "success" });
            }
        });
    }

    DeductCreditPerSpin(credit) {
        this.#config.isLoading = true;
        this.activateWatcher();
        this.Parent.callFunc(USER.DeductCredit, credit).then((data) => {
            this.#config.isLoading = false;
            this.activateWatcher();
            return true
        }).catch((err) => {
            console.log(err);
        })
    }


    async CreateSpin(result, reward, storeId) {
        this.#config.isLoading = true;
        this.activateWatcher();
        return this.Parent.callFunc(USER.CreateSpin, { result, reward, storeId }).then((data) => {
            this.#config.isLoading = false;
            this.activateWatcher();
            return true
        }).catch((err) => {
            console.log(err);
        })
    }



    subscribeRoulette = () => {
        return this.Parent.subscribe(USER.GetRouletteData);
    };

    reset({ forceRender = true }) {
        this.#config = {};
        forceRender && this.activateWatcher();
    }
}
export default new RouletteWatcher(ClientWatcher);
