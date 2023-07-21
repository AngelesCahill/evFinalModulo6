const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../index");
chai.use(chaiHttp);

describe("Probando API REST con Mocha - Chai", function () {
  it("Test para poder probar la respuesta del servidor que fue creado", function (done) {
    chai
      .request(app)
      .get("/")
      .end(function (err, res) {
        let data = JSON.parse(res.text);
        chai.expect(data).to.be.an("object");
        chai.expect(Object.keys(data)).to.be.an("array");
        done();
      });
  });
});
