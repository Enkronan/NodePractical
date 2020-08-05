const express = require('express')

const http = require('http')
const path = require('path')

const app = express()

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static('public'))

app.all('/', (req,res) => {
    res.render('index', {msg: "welcome to Robins node app", articles: []})
})

app.get('/test', (req,res) => {
    res.render('dataexample', 
    {msg: "welcome to Robins node app",
    title: "Test",
    body: "Body test"})
})

app.get('/article', (req,res) => {
    res.render('article', 
    {title: "welcome to Robins node app",
    text: "Test"})
})

const server = http.createServer(app)
const boot = () => {
    server.listen(app.get('port'), () => {
        console.info(`Express server listening on port:${app.get('port')}`)
    })
}

const shutdown = () => {
    server.close()
}

if (require.main === module ){
    boot()
} else {
    console.info('Running as a module')
    exports.boot = boot
    exports.shutdown = shutdown
    exports.port = app.get('port')
}