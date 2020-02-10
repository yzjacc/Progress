var mongo = require("mongodb").MongoClient;

var url = "mongodb://127.0.0.1:27017/test3";

function insert(collection, obj, callback){
    mongo.connect(url, function (error, db) {
        if (error == null) {
            var database = db.db("test3");
            database.collection(collection).insertOne(obj, callback);
            db.close();
        } else {
            console.log(error);
        }
    });
}

function insertMany(collection, objs, callback) {
    mongo.connect(url, function (error, db) {
        if (error == null) {
            var database = db.db("test3");
            database.collection(collection).insertMany(objs, callback);
            db.close();
        } else {
            console.log(error);
        }
    });
}

function find(collection, where, callback) {
    mongo.connect(url, function (error, db) {
        if (error == null) {
            var database = db.db("test3");
            database.collection(collection).find(where).toArray(callback);
            db.close();
        } else {
            console.log(error);
        }
    });
}

function update(collection, where, update, callback) {
    mongo.connect(url, function (error, db) {
        if (error == null) {
            var database = db.db("test3");
            database.collection(collection).updateOne(where, update, callback);
            db.close();
        } else {
            console.log(error);
        }
    });
}

function deleteData(collection, where, callback) {
    mongo.connect(url, function (error, db) {
        if (error == null) {
            var database = db.db("test3");
            database.collection(collection).deleteOne(where, callback);
            db.close();
        } else {
            console.log(error);
        }
    });
}

module.exports.insert = insert;
module.exports.update = update;
module.exports.find = find;
module.exports.deleteData = deleteData;