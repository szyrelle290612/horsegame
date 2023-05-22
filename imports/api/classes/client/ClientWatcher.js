import { Toast } from "../../../ui/components/extra/Toast";
import { CLIENT } from "../../const";
import Watcher from "../Watcher";

class ClientWatcher extends Watcher {
    #users;
    constructor(parent) {
        super(parent);
        this.secureTransaction();
        this.#users = {
            email: "",
            password: "",
            password2: "",
            firstName: "",
            lastName: "",
            isLoading: false,
        };
    }


    init() {
        return this.users.find().fetch();
    }

    setUsers(users) {
        this.#users = { ...this.#users, ...users };
        this.activateWatcher();
    }


    get UserNameAccount() {
        return this.#users;
    }

    reset({ forceRender = true }) {
        this.#users = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password2: "",
            isLoading: false,
        };
        forceRender && this.activateWatcher();
    }

    setLoading(isLoading) {
        this.#users.isLoading = isLoading;
        this.activateWatcher();
    }


    get Balance() {
        return this.users.find({}, { fields: { profile: 1 } }).fetch();
    }

    loginWithPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            this.login(email, password, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    logoutUser = () => {
        return new Promise((resolve, reject) => {
            this.logout(function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }


    createUserAccount = () => {
        this.#users.isLoading = true;
        this.activateWatcher();
        this.callFunc(CLIENT.CreateAccount, this.#users).then((data) => {
            if (data) {
                Toast({ text: "Account created successfully! Please check your email for verification link.", type: "success" });
                this.reset({ forceRender: true })
            } else {
                Toast({ text: "Account already exists!", type: "error" });
            }
            this.#users.isLoading = false;
            this.activateWatcher();
        }).catch((err) => {
            this.#users.isLoading = false;
            this.activateWatcher();
            Toast({ text: err.error.reason, type: "error" });
        });
    }


    verifyEmail(token) {
        return new Promise((resolve, reject) => {
            Accounts.verifyEmail(token, function (err) {
                if (err) reject(err);
                resolve("Email successfully verified!");
            });
        });
    }

    forgotPassword(email) {
        this.callFunc(CLIENT.ForgotPassword, email).then((data) => {
            console.log(data)
            if (data) {
                Toast({ text: "Please check your email for reset link.", type: "success" });
            } else {
                Toast({ text: "Email not found!", type: "error" });
            }
        }).catch((err) => {
            return Toast({ text: err.error.error, type: "error" });
        }
        );

    }

    resetPassword(token, password) {
        return new Promise((resolve, reject) => {
            Accounts.resetPassword(token, password, function (err) {
                if (err) reject(err);
                resolve("Password successfully updated!");
            });
        });
    }

    getSubscribeUser() {
        return this.subscribe("user");
    }
}
export default new ClientWatcher();
