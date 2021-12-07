const chai = require('chai');
const chaiHttp = require('chai-http')
require('superagent')
const server = require('../server')
const noteInputs = require('./noteData.json')

//assertion style is
const should = chai.should();
chai.use(chaiHttp)

/*******************************
 * post
 */
describe("POST user login", () => {

    it('after passing token it should send user data with status code', (done) => {

        const noteData = noteInputs.validData
        chai.request(server)
            .post('/note/getNotes')
            .send(noteData)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object')
                // res.body.should.have.property('token')
                if (err)
                    return done(err)
                done();
            })
    })
})

describe("POST user login", () => {

    it('after passing invalid token it should send  status code 401', (done) => {

        const noteData = noteInputs.invalidData
        chai.request(server)
            .post('/note/getNotes')
            .send(noteData)
            .end((err, res) => {
                res.should.have.status(401);
                // res.should.be.a('object')
                // res.body.should.have.property('token')
                if (err)
                    return done(err)
                done();
            })
    })
})