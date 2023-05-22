import { Meteor } from 'meteor/meteor';
import Server from '../imports/api/classes/server/Server';

// import "../imports/startup/server";
import { generateCouponWin, generateHorse, generateNotifLogs, generateRace, generateRaceWithWinner } from './seeders';

import '../imports/api/server/publication/Gamepub';
import '../imports/api/server/index';

Meteor.startup(() => {

  Server.registerFunctions();
  Server.initServer();
  Server.run();
  if (!Meteor.users.findOne()) {
    Accounts.createUser({
      email: "szyrellegalupo@gmail.com",
      password: "123456",
      profile: {
        name: "szyrelle galupo",
        email: "szyrellegalupo@gmail.com",
        roles: ['user', 'admin']
      }
    }
    )
  }



  generateHorse().then(() => {
    console.log('Horse generating done')
  });

  // generateRace().then(() => {
  //   console.log('Races generating done')
  // });

  // generateNotifLogs().then(() => {
  //   console.log('Notif logs generating done')
  // })

  // generateRaceWithWinner().then(() => {
  //   console.log('generateRaceWithWinner generating done')
  // })

  // generateCouponWin().then(() => {
  //   console.log('generateCouponWin generating done')
  // })








  // Server.addFunction(ADMIN.UpdateLive, function (data) {
  //   console.log(data)
  // })

});
