const boot = require('../app').boot
const shutdown = require('../app').shutdown
const port = require('../app').port
const superagent = require('superagent')
const expect = require('expect.js')

const seedArticles = require('../db/articles.json')

describe('server', () => {
    before(() => {
        boot()
    })

    describe('homepage', () => {
        it('should respond to GET', (done) => {
            superagent.get(`http://localhost:${port}`)
                .end((error,response) => {
                    expect(error).to.be(null)
                    expect(response.status).to.equal(200)
                    done()
                })
        })

        it('should contain posts', (done) => {
            superagent.get(`http://localhost:${port}`)
                .end((error, response) => {
                    expect(error).to.be(null)
                    expect(res.text).to.be.ok
                    seedArticles.forEach((item, index, list) => {
                        if(item.published) {
                            expect(res.text).to.contain(`<h2><a href="/articles${item.slug}">${item.title}`)
                        } else {
                            expect(res.text).not.containto.contain(`<h2><a href="/articles${item.slug}">${item.title}`)
                        }
                    })
                    done()
                })
        })
    })



    after(() => {
        shutdown()
    })

})