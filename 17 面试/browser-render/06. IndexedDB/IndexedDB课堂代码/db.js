
/**
 * 
 * @param {*} dbName 数据库名称
 * @param {*} version 数据库的版本
 */
function openDB(dbName, version = 1) {
    return new Promise((resolve, reject) => {
        var db; // 存储数据库对象
        // 打开数据库，如果没有就是创建操作
        var request = indexedDB.open(dbName, version);

        // 数据库打开或者创建成功的时候
        request.onsuccess = function (event) {
            db = event.target.result;
            console.log("数据库打开成功");
            resolve(db);
        }

        // 打开失败
        request.onerror = function () {
            console.log("数据库打开失败");
        }

        // 数据库发生更新的时候
        // 1. 版本号更新  2. 添加或者删除了表（对象仓库）的时候
        // 当我们第一次调用 open 方法时，会触发这个事件
        // 我们在这里来初始化我们的表
        request.onupgradeneeded = function (event) {
            console.log("数据库版本更新");
            db = event.target.result;
            // 创建数据仓库（表）
            var objectStore = db.createObjectStore("stu", {
                keyPath: "stuId", // 这是主键
                autoIncrement: true // 实现自增
            });
            // 创建索引，有了索引之后，查询速度大大增快（类比新华字典）
            objectStore.createIndex("stuId", "stuId", { unique: true });
            objectStore.createIndex("stuName", "stuName", { unique: false });
            objectStore.createIndex("stuAge", "stuAge", { unique: false });
        }
    })
}

/**
 * 关闭数据库
 * @param {object} db 数据库实例
 */
function closeDB(db) {
    db.close();
    console.log("数据库已关闭");
}

/**
* 删除数据库
* @param {object} dbName 数据库名称
*/
function deleteDBAll(dbName) {
    console.log(dbName);
    let deleteRequest = window.indexedDB.deleteDatabase(dbName);
    deleteRequest.onerror = function (event) {
        console.log("删除失败");
    };
    deleteRequest.onsuccess = function (event) {
        console.log("删除成功");
    };
}


/**
 * 
 * @param {*} db 数据库实例
 * @param {*} storeName 数据仓库实例（表）
 * @param {*} data 要添加的数据
 */
function addData(db, storeName, data) {
    var request = db.transaction([storeName], "readwrite")
        .objectStore(storeName)
        .add(data);

    request.onsuccess = function () {
        console.log("数据写入成功");
    }

    request.onerror = function () {
        console.log("数据写入失败")
    }
}

/**
 * 通过主键来读取数据
 * @param {*} db 数据库实例对象
 * @param {*} storeName 数据仓库（表）实例对象
 * @param {*} key 主键
 */
function getDataByKey(db, storeName, key) {
    return new Promise((resolve, reject) => {
        var request = db.transaction([storeName])
            .objectStore(storeName)
            .get(key);

        request.onsuccess = function () {
            resolve(request.result)
        }

        request.onerror = function () {
            console.log("数据查询失败");
        }
    })
}

/**
 * 通过主键来读取数据
 * @param {*} db 数据库实例对象
 * @param {*} storeName 数据仓库（表）实例对象
 */
function getAllData(db, storeName) {
    return new Promise((resolve, reject) => {
        var request = db.transaction([storeName])
            .objectStore(storeName)
            .getAll();

        request.onsuccess = function () {
            resolve(request.result)
        }

        request.onerror = function () {
            console.log("数据查询失败");
        }
    })
}

/**
 * 通过游标（指针）来查询所有的数据
 * @param {*} db 
 * @param {*} storeName 
 */
function cursorGetData(db, storeName) {
    return new Promise((resolve, reject) => {
        var list = []; // 用于存放所有的数据
        var request = db.transaction([storeName], "readwrite")
            .objectStore(storeName)
            .openCursor(); // 创建一个指针（游标）

        request.onsuccess = function (event) {
            var cursor = event.target.result;
            // 查看游标（指针）有没有返回一条数据
            if (cursor) {
                list.push(cursor.value);
                cursor.continue(); // 移动到下一条数据
            } else {
                resolve(list)
            }
        }
    })
}

/**
 * 根据索引来查询数据（只会返回一条）
 * @param {*} db 
 * @param {*} storeName 
 * @param {*} indexName 索引名称
 * @param {*} indexValue 索引值
 */
function getDataByIndex(db, storeName, indexName, indexValue) {
    return new Promise((resolve, reject) => {
        var request = db.transaction([storeName], "readwrite")
            .objectStore(storeName)
            .index(indexName)
            .get(indexValue);

        request.onsuccess = function (event) {
            resolve(event.target.result);
        }
    })
}

/**
 * 根据索引和游标来查询数据
 * @param {*} db 
 * @param {*} storeName 
 * @param {*} indexName 索引名称
 * @param {*} indexValue 索引值
 */
function getDataByIndex(db, storeName, indexName, indexValue) {
    return new Promise((resolve, reject) => {
        var list = []; // 存储所有满足条件的数据
        var request = db.transaction([storeName], "readwrite")
            .objectStore(storeName)
            .index(indexName)
            .openCursor(IDBKeyRange.lowerBound(indexValue));

        request.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                list.push(cursor.value);
                cursor.continue();
            } else {
                resolve(list);
            }
        }
    })
}

/**
 * 通过索引和游标分页查询记录
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 * @param {number} page 页码
 * @param {number} pageSize 查询条数
 */
function cursorGetDataByIndexAndPage(
    db,
    storeName,
    indexName,
    indexValue,
    page,
    pageSize
) {
    return new Promise((resolve, reject) => {
        var list = []; // 用于存储当前页的分页数据
        var counter = 0; // 创建一个计数器
        var isPass = true; // 是否要跳过数据
        var request = db.transaction([storeName], "readwrite")
            .objectStore(storeName)
            .openCursor(); // 创建一个指针（游标）对象（目前是指向第一条数据）
        request.onsuccess = function (event) {
            var cursor = event.target.result;
            // 接下来有一个很重要的判断，判断是否要跳过一些数据
            if (page > 1 && isPass) {
                isPass = false;
                cursor.advance((page - 1) * pageSize); // 跳过数据
                return;
            }
            if (cursor) {
                list.push(cursor.value);
                counter++;
                if (counter < pageSize) {
                    cursor.continue();
                } else {
                    cursor = null;
                    resolve(list);
                }
            } else {
                resolve(list)
            }
        }
    })
}

/**
 * 更新数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} data 数据
 */
function updateDB(db, storeName, data) {
    return new Promise((resolve, reject) => {
        var request = db.transaction([storeName], "readwrite")
            .objectStore(storeName)
            .put(data);
        request.onsuccess = function () {
            resolve({
                status: true,
                message: "更新数据成功"
            })
        }
    })
}

/**
* 通过主键删除数据
* @param {object} db 数据库实例
* @param {string} storeName 仓库名称
* @param {object} id 主键值
*/
function deleteDB(db, storeName, id) {
    return new Promise((resolve, reject) => {
        var request = db
            .transaction([storeName], "readwrite")
            .objectStore(storeName)
            .delete(id);

        request.onsuccess = function () {
            resolve({
                status: true,
                message: "删除数据成功"
            })
        };

        request.onerror = function () {
            reject({
                status: true,
                message: "删除数据失败"
            })
        };
    })
}


/**
 * 通过索引和游标删除指定的数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名
 * @param {object} indexValue 索引值
 */
 function cursorDelete(db, storeName, indexName, indexValue) {
     return new Promise((resolve, reject)=>{
        var request = db.transaction([storeName], "readwrite")
                        .objectStore(storeName)
                        .index(indexName)
                        .openCursor(IDBKeyRange.only(indexValue));
        request.onsuccess = function(event){
            var cursor = event.target.result;
            if(cursor){
                var deleteRequest = cursor.delete();
                deleteRequest.onsuccess = function(){
                    resolve({
                        status: true,
                        message: "删除数据成功"
                    })
                }
                cursor.continue();
            }
        }
     })
 }