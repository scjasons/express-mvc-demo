const express = require('express')
const router = express.Router()
const path = require('path')

const handleFile = require('../libs/handleFile')
const demo = require('../model/demo')

// 删除数据库数据和本地文件夹/文件
router.post('/delDir', async function (req, res) {
    let data = await demo.del('表名', req.body)
    if (!data.status) {
        res.json({ status: data.status, message: "删除失败", sqlError: data.sqlMessage })
        return
    }
    let filePath = path.join(__dirname, 'test')
    handleFile.delFile(filePath)
    res.json(data)
})

module.exports = router