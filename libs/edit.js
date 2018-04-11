module.exports = function (req) {
    req.setObj = {};
    req.whereObj = {};
    for (let i in req.body) {
        if (!req.body.hasOwnProperty(i)) continue;
        if (i === 'id') {
            req.whereObj[i] = req.body[i];
        } else {
            req.setObj[i] = req.body[i];
        }
    }
}