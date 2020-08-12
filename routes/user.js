exports.list = (req, res, next) => {
    res.send('respond with a resource')
}

exports.login = (req, res, next) => {
    res.render('login')
}

exports.logout = (req, res, next) => {
    res.redirect('/')
}

exports.authenticate = (req, res, next) => {
    res.redirect('/admin')
}