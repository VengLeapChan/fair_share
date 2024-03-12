const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const server = 'https://fair-share.azurewebsites.net/';

describe('Test to get specific receipt for a user', function () {
    var requestResult;
    var response;
    const userID = "100";
    const receiptID = "1";
    const expectedObject = {
        _id: '65e96e5e244ab50dc100def1',
        receiptID: '1',
        receiptName: 'Grocery Store',
        receiptTotalAmount: 12,
        date: '2024-03-07T07:35:58.989Z',
        userID: '100',
      };

    before(function (done) {
        chai.request(server)
            .get(`app/userID/${userID}/receipt/${receiptID}`)
            .end(function (err, res) {
                requestResult = res.body;
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should return a specific receipt item for the user', function () {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.include.keys(
            '_id',
            'receiptID',
            'receiptName',
            'receiptTotalAmount',
            'date',
            'receiptUsersList',
            'userID',
            'receiptSplitList'

        );
    });

    it('Should return a specific receipt item with specific values', function () {
        expect(response.body.receiptID).to.equal(expectedObject.receiptID);
        expect(response.body.receiptName).to.equal(expectedObject.receiptName);
        expect(response.body.receiptTotalAmount).to.equal(expectedObject.receiptTotalAmount);
        expect(response.body.userID).to.equal(expectedObject.userID);
        expect(response.body.date).to.equal(expectedObject.date);
    });



});
