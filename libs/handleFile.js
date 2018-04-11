const fs = require('fs')

module.exports = {
    delFile(file) {
        // 获取文件夹
        var files = fs.readdirSync(file)
        if (files.length > 0) {
            // 遍历所有文件
            files.map(item => {
                // 判断当前文件是否存在（使用递归删除所有子文件夹下的文件）
                if (fs.statSync(file + '/' + item).isDirectory()) {
                    this.delFile(file + '/' + item)
                } else {
                    fs.unlinkSync(file + '/' + item)
                    console.log("删除文件" + file + '/' + item + "成功")
                }
            })
            fs.rmdirSync(file)
            console.log("删除文件夹" + file + "成功1")
        } else {
            fs.rmdirSync(file)
            console.log("删除文件夹" + file + "成功2")
        }
    }
}