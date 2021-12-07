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

    it('for a non-existing user after login request it should send status code 401', (done) => {

        const userData = userInputs.invalidUserLoginData
        chai.request(server)
            .post('/user/login')
            .send(userData)
            .end((err, res) => {
                // res.body.should.have.property("status").eql(200);
                res.should.have.status(401);
                // res.should.be.a('object')
                // res.body.should.have.property('token')
                if (err)
                    return done(err)
                done();
            })
    })
})
it("fetching all users in DB", (done) => {
    chai
        .request(server)
        .get("/user/")
        .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("status").eql(200);
            if (error) {
                return done(error);
            }
            done();
        });
});

it("Register User Info +ve", (done) => {
    const userData = userInputs.validInputForUserRegistration
    chai
        .request(server)
        .post("/user")
        .send(userData)
        .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("status").eql(200);
            if (error) {
                return done(error);
            }
            done();
        });
});
it("Register User Info -ve", (done) => {
    const userData = userInputs.invalidInputForUserRegistration
    chai
        .request(server)
        .post("/user")
        .send(userData)
        .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("status").eql(401);
            if (error) {
                return done(error);
            }
            done();
        });
});
it("delete user Info using valid Id", (done) => {
    const userData = userInputs.validId
    chai
        .request(server)
        .delete("/user/")
        .send(userData)
        .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("status").eql(200);
            if (error) {
                return done(error);
            }
            done();
        });
});
it("delete user Info using invalid Id", (done) => {
    const userData = userInputs.invalidId
    chai
        .request(server)
        .delete("/user/")
        .send(userData)
        .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("status").eql(200);
            if (error) {
                return done(error);
            }
            done();
        });
});