process.env.NODE_ENV = 'test';

chai = require('chai'),
chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
chai.config.includeStack = true;

var should = chai.should(),
    assert = chai.assert,
    expect = chai.expect;

var server = require('../src/server')

describe('Metrics', function () {
 let metric = 'visit'
    it('should add an analytic log for a metric on POST', function (done) {
        chai.request(server)
            .post('/'+ metric)
            .send({ 'value': 2 })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should return median of metric on GET', function (done) {
        chai.request(server)
            .get('/'+metric+'/median')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('median');
                assert.typeOf(res.body.median, 'integer', 'median is number');
                expect(res.body.median).to.equal(2);
                done();
            })
    });

    it('should delete all the logs of the metric DELETE', function (done) {
        chai.request(server)
            .delete('/' + metric)
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

})