  
var expect  = require("chai").expect;
var request = require("request");

describe("Check GET /api/boots", function() {
    var url = "http://localhost:8080/api/boots";
    it("returns status 200 to check if api works", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it("returns statusCode key in body to check if api give right result should be 200", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(200);
            done()
          });
    });
    it("check predictions object exist", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.data[0].preds).to.be.an('object');
            done()
          });
    });
    it("check predictions is top 3 values, indexed", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.data[0].preds).to.include.all.keys('1', '2','3');;
            done()
          });
    });
    it("check predictions includes a label as a string", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.data[0].preds[1].label).to.be.a('string');
            done()
          });
    });
    it("check predictions includes a probability as a float", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.data[0].preds[1].prob).to.be.a('number');
            done()
          });
    });
});