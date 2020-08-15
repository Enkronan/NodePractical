exports.list = (req, res, next) => {
    res.send('respond with a resource')
}

exports.login = (req, res, next) => {
    res.render('login')
}

exports.logout = (req, res, next) => {
    req.session.destroy()
    res.redirect('/')
}

exports.authenticate = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.render('login', {error: "Please provide email and password"})
    }
    req.collections.users.findOne({
        email: req.body.email,
        password: req.body.password
    }, (error, user) => {
        if (error) return next(error)
        if (!user) return res.render('login', {error: "Incorrect email and password combination"})
        //successfull sign-in
        req.session.user = user
        req.session.admin = user.admin
        res.redirect('/admin')
    })
}