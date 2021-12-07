const chai = require("chai");
const chaiHttp = require("chai-http");
var server = require("../server");
const labelInput = require("./labelData.json");

const should = chai.should();
chai.use(chaiHttp);

 /**
   * POST request test
   * positive and negative Label creation
   */
  describe("Post Label in /label/", () => {
    it("Given empty label it should not make POST request for labels ", (done) => {
      const userData = labelInput.invalidLable;
      chai
        .request(server)
        .post("/label")
        .send(userData)
        .end((error, res) => {
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql(`"label" is not allowed to be empty`);
          if (error) {
            return done(error);
          }
          done();
        });
    });

    it("Create new Label ", (done) => {
        const userData = labelInput.validLable;
        chai
          .request(server)
          .post("/label")
          .send(userData)
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            if (error) {
              return done(error);
            }
            done();
          });
      });
});

/**
   * GET request test
   * positive and negative label test
   */
  describe("Get labels from /label/", () => {
    it("retrieve all label ", (done) => {
      chai
        .request(server)
        .get("/label")
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("Array").should.have.a("object");
          if (error) {
            return done(error);
          }
          done();
        });
    });

    it("retrieve label based on validId ", (done) => {
      chai
        .request(server)
        .get("/label/" + labelInput.validUserId.userId)
        .end((error, res) => {
        res.should.have.status(200);
          res.body.should.be.a("object");
          if (error) {
            return done(error);
          }
          done();
        });
    });
  });

   /**
 * Put request test
 * positive and negative label Test
 */
  describe("Put label in /label/:labelId", () => {
    const userData = labelInput.validUpdate;
    it("Update label  ", (done) => {
      chai
        .request(server)
        .put("/label/" + labelInput.validUserId.userId)
        .send(userData)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Updated the Label successfully");
          if (error) {
            return done(error);
          }
          done();
        });
    });
});

  /**
   * Delete request test
   * positive and negative label Test
   */

  describe("delete label in /notes/:noteId", () => {
    it("delete note detail using invalid Id", (done) => {
      chai
        .request(server)
        .delete("/label/" + labelInput.validUserId.userId)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Deleted the Label successfully");
          if (error) {
            return done(error);
          }
          done();
        });
    });
});