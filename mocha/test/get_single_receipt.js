const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const server = 'http://localhost:8080';

describe('Test to get specific receipt for a user', function () {
    var requestResult;
    var response;

    before(function (done) {
        chai.request(server)
            .get('/app/user/100/receipt/1')
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
            'receiptOwnerID',
            'receiptSplitList'

        );
    });

});
