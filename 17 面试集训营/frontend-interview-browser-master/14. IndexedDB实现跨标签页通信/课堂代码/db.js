/**
 * 打开数据库
 * @param {object} dbName 数据库的名字
 * @param {string} storeName 仓库名称
 * @param {string} version 数据库的版本
 * @return {object} 该函数会返回一个数据库实例
 */
function openDB(dbName, version = 1) {
    return new Promise((resolve, reject) => {
        var db; // 存储创建的数据库
        // 打开数据库，若没有则会创建
        const request = indexedDB.open(dbName, version);

        // 数据库打开成功回调
        request.onsuccess = function (event) {
            db = event.target.result; // 存储数据库对象
            console.log("数据库打开成功");
            resolve(db);
        };

        // 数据库打开失败的回调
        request.onerror = function (event) {
            console.log("数据库打开报错");
        };

        // 数据库有更新时候的回调
        request.onupgradeneeded = function (event) {
            // 数据库创建或升级的时候会触发
            console.log("onupgradeneeded");
            db = event.target.result; // 存储数据库对象
            var objectStore;
            // 创建存储库
            objectStore = db.createObjectStore("stu", {
                keyPath: "stuId", // 这是主键
                autoIncrement: true // 实现自增
            });
            // 创建索引，在后面查询数据的时候可以根据索引查
            objectStore.createIndex("stuId", "stuId", { unique: true });
            objectStore.createIndex("stuName", "stuName", { unique: false });
            objectStore.createIndex("stuAge", "stuAge", { unique: false });
        };
    });
}

/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 */
function addData(db, storeName, data) {
    var request = db
        .transaction([storeName], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
        .objectStore(storeName) // 仓库对象
        .add(data);

    request.onsuccess = function (event) {
        console.log("数据写入成功");
    };

    request.onerror = function (event) {
        console.log("数据写入失败");
    };
}

/**
 * 通过主键读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} key 主键值
 */
function getDataByKey(db, storeName, key) {
    return new Promise((resolve, reject) => {
        var transaction = db.transaction([storeName]); // 事务
        var objectStore = transaction.objectStore(storeName); // 仓库对象
        var request = objectStore.getAll(); // 通过主键获取数据

        request.onerror = function (event) {
            console.log("事务失败");
        };

        request.onsuccess = function (event) {
            // console.log("主键查询结果: ", request.result);
            resolve(request.result);
        };
    });
}