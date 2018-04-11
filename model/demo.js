'use strict'
const mysql = require('../sql')
const edit = require('../libs/edit')

class QuerySql {
    // 添加单条纪录
    static async add(sqlName, param) {
        return await mysql.sql('INSERT INTO `' + this.sqlName + '` SET ?', this.param, 'insert')
    }
    // 添加多条纪录
    static async adds(sqlName, param) {
        return await mysql.sql('INSERT INTO `' + this.sqlName + '` VALUES ?', [this.param], "insert")
    }
    // 修改
    static async edit(sqlName, param) {
        edit(this.param)
        let sql = 'UPDATE `' + this.sqlName + '` SET ? WHERE ?'
        return await mysql.sql(sql, [this.param.setObj, this.param.whereObj], 'update')
    }
    // 删除
    static async del(sqlName, param) {
        return await mysql.sql('DELETE FROM `' + this.sqlName + '` WHERE ?', this.param, "delete")
    }
}
module.exports = QuerySql