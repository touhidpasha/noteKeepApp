const chai = require('chai');
const chaiHttp = require('chai-http')
require('superagent')
const server = require('../server')
const userInputs = require('./userData.json')

//assertion style is
const should = chai.should();
chai.use(chaiHttp)

/*******************************
 * post
 */
describe("POST user login", () => {

    it('for a existing user after login request it should generate token', (done) => {

        const userData = userInputs.validUserLoginData
        chai.request(server)
            .post('/user/login')
            .send(userData)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object')
                res.body.should.have.property('token')
                if (err)
                    return done(err)
                done();
            })
    })
})

describe("POST user login", () => {

    it('for a existing user after login request it should generate token', (done) => {

        const userData = userInputs.invalidUserLoginData
        chai.request(server)
            .post('/user/login')
            .send(userData)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object')
                res.body.should.have.property('token')
                if (err)
                    return done(err)
                done();
            })
    })
})