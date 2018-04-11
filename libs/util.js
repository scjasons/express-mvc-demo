'use strict'
const crypto = require('crypto')
class Util {
    constructor() { }
    /**
     * 遍历生成树数据
     * @param {[object]} data 数据对象 
     * @return {[object]} 返回树结构对象
     */
    static toTree(data) {
        data.map(item => {
            delete item.children
        })
        var tree = {}
        data.map(item => {
            tree[item.id] = item
        })
        var val = []
        data.map(item => {
            var parent = tree[item.pid]
            if (parent) {
                (parent.children || (parent.children = [])).push(item)
            } else {
                val.push(item)
            }
        })
        return val
    }
    /**
     * MD5加密
     * @param {[string]} password 密码 
     * @param {[string]} salt 盐
     * @return {[string]} 返回MD5
     */
    static cryptPwd(password, salt) {
        var saltPassword = password + ':' + salt;
        // 加盐密码的md5值
        var md5 = crypto.createHash('md5');
        var result = md5.update(saltPassword).digest('hex');
        return result;
    }
    /**
     * 获取当前时间
     * @return {[string]} 返回时间 yyyy-MM-dd hh:mm:ss
     */
    static getNow() {
        let date = new Date();
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds()
        month = month > 9 ? month : '0' + month
        day = day > 9 ? day : '0' + day
        h = h > 9 ? h : '0' + h
        m = m > 9 ? m : '0' + m
        s = s > 9 ? s : '0' + s
        return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
    }
    // 获取随机数
    static getRandom(min, max) {
        var r = Math.random() * (max - min);
        var re = Math.round(r + min);
        re = Math.max(Math.min(re, max), min)

        return re;
    }
    /**
     * 格式化时间
     * @param {[date]} date 时间对象
     * @return {[string]} 返回yyyy-MM-dd hh:mm:ss格式
     */
    static coverDate(date) {
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds()
        month = month > 9 ? month : '0' + month
        day = day > 9 ? day : '0' + day
        h = h > 9 ? h : '0' + h
        m = m > 9 ? m : '0' + m
        s = s > 9 ? s : '0' + s
        return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
    }
    /**
     * 获取两个时间之间的日期列表
     * @param {date} start 
     * @param {date} end 
     */
    static betweenDay(start, end) {
        if(start === end){
            return [start]
        }
        var result = []
        var beginDay = start.split("-")
        var endDay = end.split("-")
        var diffDay = new Date()
        var dateList = new Array()
        var i = 0
        diffDay.setDate(beginDay[2])
        diffDay.setMonth(beginDay[1] - 1)
        diffDay.setFullYear(beginDay[0])
        result.push(start)
        while (i == 0) {
            var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000
            diffDay.setTime(countDay)
            dateList[2] = diffDay.getDate()
            dateList[1] = diffDay.getMonth() + 1
            dateList[0] = diffDay.getFullYear()
            if (String(dateList[1]).length == 1) {
                dateList[1] = "0" + dateList[1]
            }
            if (String(dateList[2]).length == 1) {
                dateList[2] = "0" + dateList[2]
            }
            result.push(dateList[0] + "-" + dateList[1] + "-" + dateList[2])
            if (
                dateList[0] == endDay[0] &&
                dateList[1] == endDay[1] &&
                dateList[2] == endDay[2]
            ) {
                i = 1
            }
        }
        return result
    }
}

module.exports = Util