var mysql = require('mysql');
var config = require('./config.json');
var pool = mysql.createPool(config[config.env].sql)
var db = {}
// 封装sql查询
db.sql = function (sql, obj, flag) {
    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                err.status = false;
                console.log("数据库链接异常: " + err)
                reject(err);
            } else {
                connection.query(sql, obj, function (qerr, results, fields) {
                    if (qerr) {
                        qerr.status = false;
                        connection.release();
                        reject(qerr);
                    } else {
                        connection.release();
                        var data = {};
                        data.status = true;
                        switch (flag) {
                            case "select":
                                data.data = results;
                                break;
                            case "update":
                                data.message = "修改成功!";
                                break;
                            case "insert":
                                data.insertId = results.insertId;
                                data.message = "新增成功!";
                                break;
                            default:
                                data.message = "删除成功!";
                                break;
                        }
                        resolve(data);
                    }
                })
            }
        })
    })
    return promise;
}
module.exports = db;