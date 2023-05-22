

//-----------------PUBSUB-----------------//

export const MYBET = {
    SUBSCRIBE_MYBET: "mybet.subscribe",
    MINI_MYBET: "#mybet",
}


export const GAME = {
    SUBSCRIBE_GAME: "game.subscribe",
    MINI_GAME: "#game",
}


export const STORE = {
    SUBSCRIBE_STORE: "setting.subscribe",
    MINI_STORE: "#store",
}

export const NOTIFY = {
    SUBSCRIBE_NOTIFY: "notify.subscribe",
    MINI_NOTIFY: "#notify",
}

export const ROULETTE = {
    SUBSCRIBE_ROULETTE: "roulette.subscribe",
    MINI_ROULETTE: "#roulette",
}







//-----------------SERVICE-----------------//


//admin Service

export const ADMIN = {
    UpdateLive: "admin.updateLive",
    UpdateWinner: "admin.updateWinner",
    getHorseOnRace: "admin.getHorseOnRace",
    UpdateBalance: "admin.updateBalance",
    CreateQrCode: "admin.createQrCode",
    GetGame: "admin.getGame",
    CreateNewHorse: "admin.createNewHorse",
    CreateNewRace: "admin.createNewRace",
    SendRewardWinner: "admin.sendRewardtoWinner",
    GetHorseList: "admin.getHorseList",
    UpdateSetting: "admin.updateSetting",
    getAllReward: "admin.getAllReward",
    GetBetDetails: "get.bet.details",
    GetSpinDetails: "get.spin.details",
}



// user Service

export const USER = {
    GetHorseDetails: "user.getHorseDetails",
    PlaceBet: "user.placeBet",
    DeductCredit: "user.deductCredit",
    CheckBetAlreadyExist: "user.checkBetAlreadyExist",
    GetBetLogs: "user.getBetLogs",
    GetLogs: "user.getLogs",
    GetMatchHistory: "user.getMatchHistory",
    SearchMatchHistory: "user.searchMatchHistory",
    getUpcomingMatch: "user.getUpcomingMatch",
    GetDailyCredit: "user.getDailyCredit",
    GetReward: "user.getReward",
    SeenLogs: "user.seenLogs",
    GetRewardDetails: "user.getRewardDetails",
    UpdateReward: "user.updateReward",
    UpdateClaimReward: "user.updateClaimReward",
    GetRouletteData: "get.roulette.data",
    AddRouletteData: "add.roulette.data",
    DeleteRouletteData: "delete.roulette.data",
    UpdateRouletteData: "update.roulette.data",
    ValidateWinner: "validate.winner",
    ValidateWinnerSpin: "validate.winner.spin",
    CreateSpin: "create.spin",
}


export const CLIENT = {
    ForgotPassword: "client.forgotPassword",
    CreateAccount: "client.createAccount",
}
