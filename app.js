const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const Store = require('express-mysql-session')
const ejs = require('ejs')
const config = require('./config.json')
const app = express()
const router = express.Router()
const methods = ['get', 'post', 'put', 'delete']
app.use(router)

for (let method of methods) {
  app[method] = function (...data) {
    if (method === 'get' && data.length === 1) return app.set(data[0])

    const params = []
    for (let item of data) {
      if (Object.prototype.toString.call(item) !== '[object AsyncFunction]') {
        params.push(item)
        continue
      }
      const handle = function (...data) {
        const [req, res, next] = data
        item(req, res, next).then(next).catch(next)
      };
      params.push(handle)
    }
    router[method](...params)
  }
}

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin)
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
  res.header("Access-Control-Allow-Methods", "OPTIONS,PUT,POST,GET,DELETE")
  res.header("X-Powered-By", '3.2.1')
  res.setHeader('Access-Control-Allow-Credentials', true);
  next()
})

app.set('views', path.join(__dirname, 'views'))
app.engine('.html', ejs.__express)
app.set('view engine', 'html')
app.use(express.static(path.join(__dirname, 'public')))
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('short'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('expressdemo'))
app.use(session({
  name: 'expressdemo',
  secret: 'expressdemo',
  saveUninitialized: false,
  resave: false,
  store: new Store(config[config.env].sql),
  cookie: {
    maxAge: 1000 * 60 * 60 // 有效期，单位是毫秒
  }
}))

app.use(function (req, res, next) {
  req.session._garbage = new Date()
  req.session.touch()
  next()
});

const controllerArray = ['del'];
controllerArray.map(item => {
  app.use('/' + item, require('./controllers/' + item))
})

app.use(function (err, req, res, next) {
  res.json({ status: false, err: err.message })
})

module.exports = app