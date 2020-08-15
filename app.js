const express = require('express')
const routes = require('./routes')
const http = require('http')
const path = require('path')
const mongoskin = require('mongoskin')
const session = require('express-session')
const dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog'

const db = mongoskin.db(dbUrl)
const collections = {
    articles: db.collection('articles'),
    users: db.collection('users')
}

const logger = require('morgan')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
app.locals.appTitle = 'blog-express'

app.use((req, res, next) => {
    if (!collections.articles || !collections.users) {
        return next (new Error('No collections.'))
    }
    req.collections = collections
    return next()
})

// Config
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride())
app.use(require('stylus').middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({secret: "0b8550b438679920aee2e0ea5fcc8e41"}))
//authentication for templates
app.use(function(req,res,next) {
    if (req.session && req.session.admin) {
        res.locals.admin = true
    }
    next()
})
//authorization
const authorize = (req,res,next) => {
    if (req.session && req.session.admin){
        return next()
    }
    else {
        return res.status(401).send()
    }
}

//Dev mode
if (app.get('env') === 'development') {
    app.use(errorHandler('dev'))
}

//Routes
app.get('/', routes.index)
app.get('/login', routes.user.login)
app.post('/login', routes.user.authenticate)
app.get('/logout', routes.user.logout)
app.get('/admin', routes.article.admin)
app.get('/post', routes.article.post)
app.post('/post', routes.article.postArticle)
app.get('/articles/:slug', routes.article.show)

//REST API routes
app.get('/api/articles', routes.article.list)
app.post('/api/articles', routes.article.add)
app.put('/api/articles/:id', routes.article.edit)
app.delete('/api/articles/:id', routes.article.del)

//Catch all 404 route
app.all('*', (req, res) => {
    res.status(404).send()
})

//start server
const server = http.createServer(app)
const boot = () => {
    server.listen(app.get('port'), () => {
        console.info(`Express server listening on port:${app.get('port')}`)
    })
}

const shutdown = () => {
    server.close(process.exit)
}

if (require.main === module ){
    boot()
} else {
    console.info('Running as a module')
    exports.boot = boot
    exports.shutdown = shutdown
    exports.port = app.get('port')
}