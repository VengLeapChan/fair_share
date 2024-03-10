const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const server = 'https://fair-share.azurewebsites.net/';

describe('Test to post a new receipt', function () {


  var requestResult;
  var response;

  const receiptObj = {
    "receiptName": "Cherry St",
    "receiptTotalAmount": 0,
    "userID": "100"
  };

  var userID = "100";

  before(function (done) {
    chai.request(server)
      .post(`/app/${userID}/receipt`).send(receiptObj)
      .end(function (err, res) {
        requestResult = res.body;
        response = res;
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('The returned object of the created receipt should have the expected properties', function () {
    expect(requestResult).to.have.property('receiptID').that.is.a('string');
    expect(requestResult).to.have.property('receiptName').that.is.a('string');
    expect(requestResult.receiptName).to.equal(receiptObj.receiptName);
    expect(requestResult).to.have.property('receiptTotalAmount').that.is.a('number');
    expect(requestResult.receiptTotalAmount).to.equal(receiptObj.receiptTotalAmount);
    expect(requestResult).to.have.property('date');
    expect(requestResult).to.have.property('receiptUsersList').that.is.an('array');
    expect(requestResult).to.have.property('userID').that.is.a('string');
    expect(requestResult).to.have.property('receiptSplitList').that.is.an('array');
  });
});
