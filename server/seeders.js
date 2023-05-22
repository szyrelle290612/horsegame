import moment from "moment"
import { faker } from "@faker-js/faker";
import DB from "../imports/api/DB";
import Utilities from "../imports/api/classes/Utilities";
import { toIndexField } from "../imports/api/classes/server/IndexGenerator";


const RACE_NUMBER = ["Race01", "Race02", "Race03", "Race04", "Race05", "Race06", "Race07", "Race08", "Race09", "Race010"]
const PRIZES = ["$100", "$200", "$300", "$400", "$500", "$600", "$700", "$800", "$900", "$1,000"]

//notification logs
const DESC = ["You won Lay’s classNameic Potato Chips, 8oz Bag for logging in on our app", "You won $1000 for betting on the winning horse - 04 - Sonic (Ire)", "04- Sonic (Ire) in Rosehill Gardens", "credit is added to your account.", "Claim your daily free credit by scanning the store’s QR now.", "Come back tomorrow to earn a free credit."]
const TITLE = ["Success!", "Congratulations!", "You placed a bet", "You got a free credit!", "Daily free credit available!", "Insufficient Credits"]
const STATUS = ["Success", "Congrats", "placebet", "credit_redeem", "daily_redeem", "no_balance"]

//reward
const STATUS_REWARD = ["used", "available", "expired"]
const description = ["Lay&#x27;s classNameic Potato Chips, 8 oz Bag", "Coca-Cola 20 oz. Bottle", "Mc Burger Solo"]
const IMAGE = ["images/Asset-12a.png", "https://assets.website-files.com/62389345c1b85bf5154d291d/6238b1329d212a236000e7fe_Asset%2013a.png", "https://scontent.fmnl33-3.fna.fbcdn.net/v/t39.30808-6/281920822_5158844430831442_708085832947952579_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9267fe&_nc_eui2=AeEpxhWMcm9lAQpizoa70XzGW2Jh9Ldw641bYmH0t3DrjU-g2xzB_3jYiYUfCelR-ynS6dKp1HrKrNZcILq2HE_Z&_nc_ohc=JQOKhE2OrLEAX8v7uQH&_nc_ht=scontent.fmnl33-3.fna&oh=00_AfCh_6J-XeREnoalkzHrrTL9keJEPofZhtw0hu2mGP-zfg&oe=6445C2A8"]

export const generateHorse = () => {
    return new Promise((resolve, reject) => {
        if (DB.Horse.find().count() === 0) {
            const data = [];
            for (let i = 0; i < 100; i++) {
                const createdAt = moment.utc().add(i, "seconds").valueOf()
                const name = faker.name.firstName()
                const color = faker.color.human()
                data.push({
                    insertOne: {
                        document: {
                            horseName: name + ' ' + color,
                            description: faker.lorem.paragraph(1),
                            trainerName: faker.name.firstName() + ' ' + faker.name.lastName(),
                            win: Math.floor(Math.random() * 10),
                            runs: Math.floor(Math.random() * 10),
                            places: Math.floor(1 + Math.random() * 3),
                            syndicateName: faker.company.name(),
                            manager: faker.name.firstName() + ' ' + faker.name.lastName(),
                            ownership: Math.floor(Math.random() * 50) + '%',
                            createdAt,
                            index1: toIndexField([name + color, createdAt])
                        }
                    }
                })
            }
            while (data.length) {
                const batch = data.splice(0, 50000);
                DB.Horse.rawCollection().bulkWrite(batch);
            }
            if (data.length === 0) {
                resolve(true);
            }
        } else {
            resolve(true);
        }
    });
}


export const generateRace = () => {
    return new Promise((resolve, reject) => {
        if (DB.Races.find().count() === 0) {
            const data = [];

            for (let i = 0; i < 10; i++) {
                const horse = ReaderHorse();
                const createdAt = moment.utc().add(i, "seconds").valueOf()
                const schedule = moment.utc().add(i, "hour").add(1, "days").valueOf()
                data.push({
                    insertOne: {
                        document: {
                            raceRef: Utilities.genRandomString(10),
                            raceLocation: 'Rosehill Gardens',
                            videoLink: '',
                            schedule,
                            horse,
                            isLive: false,
                            isEnd: false,
                            winner: "",
                            raceNo: RACE_NUMBER[i],
                            prize: PRIZES[Math.floor(Math.random() * 9)],
                            createdAt,
                            index1: toIndexField([{ value: JSON.stringify({ isEnd: false }), hash: 1 }, moment.utc(schedule).startOf("days").valueOf(), createdAt])
                        }
                    }
                })
            }

            while (data.length) {
                const batch = data.splice(0, 50000);
                DB.Races.rawCollection().bulkWrite(batch);
            }

            if (data.length === 0) {
                resolve(true);
            }
        } else {
            resolve(true);
        }
    });
}


export const generateNotificationLog = (random, credit, id) => {
    let query = {}
    const createdAt = moment().add(i, "seconds").valueOf()

    query = {
        userId: id,
        status: STATUS[random],
        title: TITLE[random],
        description: DESC[random],
        credit: credit,
        createdAt,
        index1: toIndexField([id, createdAt])
    }


}

export const generateNotifLogs = () => {
    return new Promise((resolve, reject) => {
        if (DB.NotificationLogs.find().count() === 0) {
            const data = [];

            for (let i = 0; i < 100; i++) {
                const createdAt = moment().add(i, "seconds").valueOf()
                const random = Math.floor(Math.random() * 5)
                data.push({
                    insertOne: {
                        document: {
                            userId: "jPD7F9kPxH7DXmkvP",
                            status: STATUS[random],
                            title: TITLE[random],
                            description: DESC[random],
                            credit: random == 3 ? Math.floor(Math.random() * 100) : 0,
                            createdAt,
                            index1: toIndexField(["jPD7F9kPxH7DXmkvP", createdAt])
                        }
                    }
                })
            }
            while (data.length) {
                const batch = data.splice(0, 50000);
                DB.NotificationLogs.rawCollection().bulkWrite(batch);
            }

            if (data.length === 0) {
                resolve(true);
            }
        } else {
            resolve(true);
        }
    });
}


export const generateCouponWin = () => {
    return new Promise((resolve, reject) => {
        if (DB.Reward.find().count() === 0) {
            const data = [];

            for (let i = 0; i < 100; i++) {
                const createdAt = moment.utc().add(i, "seconds").valueOf()
                const random = Math.floor(Math.random() * 3)
                data.push({
                    insertOne: {
                        document: {
                            userId: "jPD7F9kPxH7DXmkvP",
                            description: description[random],
                            barcode: Utilities.genRandomString(20),
                            validity: moment.utc().add(Math.floor(Math.random()) * 10, "days").valueOf(),
                            status: STATUS_REWARD[random],
                            image: IMAGE[random],
                            createdAt,
                            index1: toIndexField(["jPD7F9kPxH7DXmkvP", STATUS_REWARD[random], createdAt])
                        }
                    }
                })
            }
            while (data.length) {
                const batch = data.splice(0, 50000);
                DB.Reward.rawCollection().bulkWrite(batch);
            }

            if (data.length === 0) {
                resolve(true);
            }
        } else {
            resolve(true);
        }
    });
}


export const generateCoupon = () => {
    return new Promise((resolve, reject) => {
        if (DB.Coupon.find().count() === 0) {
            const data = [];

            for (let i = 0; i < 5; i++) {
                const createdAt = moment.utc().add(i, "seconds").valueOf()
                const random = Math.floor(Math.random() * 3)
                data.push({
                    insertOne: {
                        document: {
                            description: description[random],
                            validity: moment.utc().add(Math.floor(Math.random()) * 10, "days").valueOf(),
                            image: IMAGE[random],
                            createdAt,
                        }
                    }
                })
            }
            while (data.length) {
                const batch = data.splice(0, 50000);
                DB.Reward.rawCollection().bulkWrite(batch);
            }

            if (data.length === 0) {
                resolve(true);
            }
        } else {
            resolve(true);
        }
    });
}


export const generateRaceWithWinner = () => {
    return new Promise((resolve, reject) => {
        if (DB.Races.find().count() >= 0) {
            const data = [];

            for (let i = 0; i < 10; i++) {
                const horse = ReaderHorse();
                const createdAt = moment.utc().add(i, "seconds").valueOf()
                const schedule = moment.utc().subtract(6, "day").valueOf()

                data.push({
                    insertOne: {
                        document: {
                            raceRef: Utilities.genRandomString(10),
                            raceLocation: 'Rosehill Gardens',
                            videoLink: '',
                            schedule,
                            horse,
                            isLive: false,
                            isEnd: true,
                            winner: horse[0].horseName,
                            raceNo: RACE_NUMBER[i],
                            prize: PRIZES[Math.floor(Math.random() * 9)],
                            createdAt,
                            index1: toIndexField([{ value: JSON.stringify({ isEnd: true }), hash: 1 }, moment.utc(schedule).startOf("days").valueOf(), createdAt])
                        }
                    }
                })
            }
            while (data.length) {
                const batch = data.splice(0, 50000);
                DB.Races.rawCollection().bulkWrite(batch);
            }
            if (data.length === 0) {
                resolve(true);
            }
        } else {
            resolve(true);
        }
    });
}














export const ReaderHorse = () => {
    data = [];
    const res = DB.Horse.find({}).fetch()
    for (let i = 1; i < 7; i++) {
        const random = Math.floor(Math.random() * 99)
        data.push({
            horseId: res[random]._id._str,
            horseNumber: i,
            horseName: res[random].horseName,
            trainerName: res[random].trainerName,
            ownership: res[random].ownership,
        })
    }
    return data;
}



