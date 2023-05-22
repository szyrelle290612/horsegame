import { Meteor } from 'meteor/meteor'
import { ADMIN, CLIENT, USER } from '../const';
import AdminService from './service/AdminService';
import Server from '../classes/server/Server';
import UserService from './service/UserService';
import NotificationService from './service/NotificationService';
import RecordService from './service/RecordService';
import RewardService from './service/RewardService';
import RouletteService from './service/RouletteService';
import ClientService from './service/ClientService';




if (Meteor.isServer) {
    //admin Service
    Server.addFunction(ADMIN.GetGame, AdminService.getGame);
    Server.addFunction(ADMIN.UpdateLive, AdminService.UpdateLive);
    Server.addFunction(ADMIN.getHorseOnRace, AdminService.gethorseOnRace);
    Server.addFunction(ADMIN.UpdateWinner, AdminService.updateWinner);
    Server.addFunction(ADMIN.UpdateBalance, AdminService.updateBalance);
    Server.addFunction(ADMIN.CreateNewHorse, AdminService.createNewHorse);
    Server.addFunction(ADMIN.CreateNewRace, AdminService.createNewRace);
    Server.addFunction(ADMIN.SendRewardWinner, AdminService.sendRewardtoWinner);
    Server.addFunction(ADMIN.GetHorseList, AdminService.getHorseList);
    Server.addFunction(ADMIN.getAllReward, AdminService.getAllReward);

    Server.addFunction(ADMIN.UpdateSetting, AdminService.UpdateSetting);

    // user Service
    Server.addFunction(USER.GetHorseDetails, UserService.GetHorseDetails);
    Server.addFunction(USER.PlaceBet, UserService.PlaceBet);
    Server.addFunction(USER.DeductCredit, UserService.deductCredit);
    Server.addFunction(USER.CheckBetAlreadyExist, UserService.CheckBetAlreadyExist);


    //Notification Service
    Server.addFunction(USER.GetBetLogs, NotificationService.getBetlogs);
    Server.addFunction(USER.GetLogs, NotificationService.getLogs);
    Server.addFunction(USER.SeenLogs, NotificationService.seenLogs);


    //Match History Service
    Server.addFunction(USER.GetMatchHistory, RecordService.getMatchHistory);
    Server.addFunction(USER.getUpcomingMatch, RecordService.getUpcomingMatch);


    //Reward Service
    Server.addFunction(USER.GetDailyCredit, RewardService.getDailyReward);
    Server.addFunction(USER.GetReward, RewardService.getReward);
    Server.addFunction(USER.GetRewardDetails, RewardService.getRewardDetail);
    Server.addFunction(USER.UpdateReward, RewardService.updateRewardUser);
    Server.addFunction(USER.UpdateClaimReward, RewardService.UpdateClaimReward);
    Server.addFunction(USER.ValidateWinner, RewardService.validateRewardWinner);
    Server.addFunction(USER.ValidateWinnerSpin, RewardService.validateRewardWinnerSpin);
    Server.addFunction(ADMIN.GetBetDetails, RewardService.getBetDetails);
    Server.addFunction(ADMIN.GetSpinDetails, RewardService.getSpinDetails);



    //Roulette Service
    Server.addFunction(USER.UpdateRouletteData, RouletteService.updateRouletteData);
    Server.addFunction(USER.CreateSpin, RouletteService.createSpinData);

    //Client
    Server.addFunction(CLIENT.CreateAccount, ClientService.createUser);
    Server.addFunction(CLIENT.ForgotPassword, ClientService.resetPassword);



}