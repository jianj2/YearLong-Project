var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

describe('Sprint1 Backend unit-test',function(){
    describe('Test the admin.js router',function(){
        it('Test adminLogin with empty username)',function(done){
            chai.request('http://localhost:3001/admin/')
                .post('/login')
                .send({'username': '', 'password': 'testPassword'})
                .end(function(err,res){
                    if(!err){
                        res.body.should.have.property('code');
                        res.body.should.have.property('message');
                        res.body.code.should.equal(1);
                        res.body.message.should.equal('Username can not be empty!');
                        done();
                    }else{
                        done(err);
                    }
                });
        });
        it('Test adminLogin with empty password)',function(done){
            chai.request('http://localhost:3001/admin/')
                .post('/login')
                .send({'username': 'tester', 'password': ''})
                .end(function(err,res){
                    if(!err){
                        res.body.should.have.property('code');
                        res.body.should.have.property('message');
                        res.body.code.should.equal(2);
                        res.body.message.should.equal('Password can not be empty!');
                        done();
                    }else{
                        done(err);
                    }
                });
        });
        it('Test adminLogin with correct information)',function(done){
            chai.request('http://localhost:3001/admin/')
                .post('/login')
                .send({'username': 'AdminUser1', 'password': 'pw1234'})
                .end(function(err,res){
                    if(!err){
                        res.body.should.have.property('code');
                        res.body.should.have.property('message');
                        res.body.code.should.equal(3);
                        res.body.message.should.have.property('auth');
                        res.body.message.should.have.property('token');
                        res.body.message.auth.should.equal(true);
                        done();
                    }else{
                        done(err);
                    }
                });
        });
        it('Test adminLogin with wrong information)',function(done){
            chai.request('http://localhost:3001/admin/')
                .post('/login')
                .send({'username': 'tester', 'password': 'testPassword'})
                .end(function(err,res){
                    if(!err){
                        res.body.should.have.property('code');
                        res.body.should.have.property('message');
                        res.body.code.should.equal(4);
                        res.body.message.should.equal('Incorrect details!');
                        done();
                    }else{
                        done(err);
                    }
                });
        });
    });
});