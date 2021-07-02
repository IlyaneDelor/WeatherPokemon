var mocha = require('mocha');
var chai = require('chai');
var http = require('http');
var axios = require('axios');
var api = require('../index.js');

describe('Cat Api', function () {
    it('get("/") should be return {url : String}', function (done) {
        var server = http.createServer(api()).listen(9999);
        axios.get('http://localhost:9999/').then(
            function(res) {
                chai.assert('url' in res.data);
                chai.assert(typeof res.data.url == 'string');
                server.close();
                done();
            }
        ).catch(
            function (err) {
                server.close();
                done(err);
            }
        )
    });

    it('get("/images/370.jpg") should be return 370.jpg', function (done) {
        var server = http.createServer(api()).listen(9999);
        axios.get('http://localhost:9999/images/370.jpg').then(
            function(res) {
                chai.assert(res.data.length > 10000);
                server.close();
                done();
            }
        ).catch(
            function (err) {
                server.close();
                done(err);
            }
        )
    });
});