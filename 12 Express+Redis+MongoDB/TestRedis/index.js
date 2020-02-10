var redis = require("redis");

var port = 6379;
var host = "127.0.0.1";
var password = "123456";

var client = redis.createClient(port, host);

client.auth(password, function () {
    console.log("OK");
});

function setKey(key, value, callback) {
    client.on("connect", function () {
        client.set(key, value, callback);
    });
}

function getKey(key, callback) {
    client.on("connect", function () {
        client.get(key, callback);
    });
}

function hset(hash, key , value, callback) {
    client.on("connect", function () {
        client.hset(hash, key, value, callback);
    });
}

function hget(hash, key, callback) {
    client.on("connect", function () {
        client.hget(hash, key, callback);
    });
}

function hgetall(hash, callback) {
    client.on("connect", function () {
        client.hgetall(hash, callback);
    });
}

function hmset(hash, paramArr, callback) {
    client.on("connect", function () {
        client.hmset(hash, ...paramArr,callback);
    });
}

module.exports.setKey = setKey;
module.exports.getKey = getKey;
module.exports.hset = hset;
module.exports.hget = hget;
module.exports.hgetall = hgetall;
module.exports.hmset = hmset;


