var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/panda';
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    var dbase = db.db("panda");
    dbase.createCollection('site', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        db.close();
    });
});