var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
const { v1: uuidv1 } = require("uuid");
chai.use(chaiHttp);


describe('Sprint1 Backend unit-test',function(){


    describe('Test the admin.js router',function(){

        it('Test adminLogin with empty username',function(done){
            chai.request('http://localhost:3001/admin')
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

        it('Test adminLogin with empty password',function(done){
            chai.request('http://localhost:3001/admin')
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

        it('Test adminLogin with correct information',function(done){
            chai.request('http://localhost:3001/admin')
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

        it('Test adminLogin with wrong information',function(done){
            chai.request('http://localhost:3001/admin')
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


    describe('Test the clinician.js router',function(){

        it('Test getAllClinician',function(done){
            chai.request('http://localhost:3001/clinician')
                .get('/')
                .end(function(err,res){
                    if(!err){
                        res.should.have.property('body');
                        res.body.should.have.lengthOf(5);
                        done();
                    }else{
                        done(err);
                    }
                });
        });

        it('Test clinician shares the questionnaire',function(done){
            const uuid = uuidv1();
            chai.request('http://localhost:3001/clinician')
                .post('/share')
                .send({
                    'shareId': uuid,
                    'clinicianEmail': 'donuvin@gmail.com',
                    'patientEmail': 'jiaojian1996@gmail.com',
                    'questionnaireId': 'c93d2b90-a682-11ea-963d-d72d9d1c93cb',
                    'readOnly': true,
                    'message': 'test',})
                .end(function(err,res){
                   if(!err){
                       res.body.should.have.property('shareId');
                       res.body.should.have.property('clinicianEmail');
                       res.body.should.have.property('patientEmail');
                       res.body.should.have.property('questionnaireId');
                       res.body.should.have.property('readOnly');
                       res.body.should.have.property('message');
                       res.body.clinicianEmail.should.equal('donuvin@gmail.com');
                       res.body.patientEmail.should.equal('jiaojian1996@gmail.com');
                       res.body.questionnaireId.should.equal('c93d2b90-a682-11ea-963d-d72d9d1c93cb');
                       res.body.readOnly.should.equal(true);
                       res.body.message.should.equal('test');
                       done();
                   }else{
                       done(err);
                   }
                });
        });
    });


    describe('Test the index.js router',function(){

        it('Test the index.js',function(done){
            chai.request('http://localhost:3001')
                .get('/')
                .end(function(err,res){
                    if(!err){
                        res.should.have.property('text');
                        res.text.should.equal('Pediatric SSQ Server');
                        done();
                    }else{
                        done(err);
                    }
                });
        });
    });


});