import { machineIdSync } from "node-machine-id";
import { Mongo, MongoInternals } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import crc32 from "crc32";

import moment from "moment";

export let rawMongoID;

if (Meteor.isServer) {
    rawMongoID = MongoInternals.NpmModule.ObjectID;

}

const getObjectID = () => {
    let id = null;

    if (Meteor.isServer) {
        const machineID = machineIdSync();
        if (machineID) id = parseInt(machineID.slice(0, 6), 16);
    }

    return new MongoId(id).getObjectID();
};

const createCollection = (name, option = {}) => {
    const col = new Mongo.Collection(name, option);
    col._makeNewID = getObjectID;
    return col;
};

export const INDEXES = {
    // Data: [
    //     { key: { createdAt: -1 } },
    // ],

};

export default {
    Data: createCollection("datas"),
};


export const toIndexField = (arr) => {
    return arr
        .map((item) => {
            if (item != null) {
                if (item.hash)
                    if (item.value instanceof Mongo.ObjectID) return crc32(item.value._str);
                    else if (Meteor.isServer && item.value instanceof MongoInternals.NpmModule.ObjectID) return crc32(item.value.toString());
                    else if (typeof item.value == "string") return crc32(item.value);
                    else throw new Error("Invalid to index field value=" + item.value);
                if (typeof item == "boolean") return item ? 1 : 0;
            }
            return item;
        })
        .filter((i) => i != null)
        .join("");
}
// const name = "kurt doe anthon doe"
// const businessId = "p1e9ose0s3"
// const createdAt = moment().valueOf()
// const index1 = toIndexField([{ value: name, hash: true }, { value: businessId, hash: true }, createdAt])