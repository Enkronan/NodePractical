exports.show = (req, res, next) => {
    if (!req.params.slug) return next(new Error('No Article slug'))
    req.collections.articles.findOne({slug: req.params.slug}, (error, article) => {
        if (error) return next(error)
        if (!article.published) return res.status(401).send()
        res.render('article', article)
    })
}
