var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
const { v1: uuidv1 } = require("uuid");
chai.use(chaiHttp);
let delete_id = uuidv1();
let share_id = uuidv1();

describe('Sprint2 Backend unit-test',function(){


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
        it('Test admin update the instruction',function(done){
            chai.request('http://localhost:3001/admin')
                .post('/instruction')
                .send({'title':'Sample instruction','content':'This is the sample instruction'})
                .end(function(err,res){
                    if(!err){
                        done();
                    }else{
                        done(err);
                    }
                });
        });
        it('Test admin get the instruction',function(done){
            chai.request('http://localhost:3001/admin')
                .get('/instruction')
                .end(function(err,res){
                    if(!err){
                        done();
                    }else{
                        done(err);
                    }
                });
        });
        it('Test admin get the questionnaire',function(done){
            chai.request('http://localhost:3001/admin')
                .get('/getStandardisedQuestionnaire')
                .end(function(err,res){
                    if(!err){
                        done();
                    }else{
                        done(err);
                    }
                });
        });
        it('Test admin verify login',function(done){
            chai.request('http://localhost:3001/admin')
                .get('/verifylogin/:token')
                .end(function(err,res){
                    if(!err){
                        done();
                    }else{
                        done(err);
                    }
                });
        });
    });


    // describe('Test the clinician.js router',function(){
    //
    //     it('Test getAllClinician',function(done){
    //         chai.request('http://localhost:3001/clinician')
    //             .get('/')
    //             .end(function(err,res){
    //                 if(!err){
    //                     res.should.have.property('body');
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             }).timeout(5000);
    //     });
    //
    //     it('Test clinician shares the questionnaire',function(done){
    //         chai.request('http://localhost:3001/clinician')
    //             .post('/share')
    //             .send({
    //                 'clinicianEmail': 'jiaojian1996@gmail.com',
    //                 'patientEmail': 'jiaojian1996@gmail.com',
    //                 'questionnaireId': '0d59c9d0-e6c7-11ea-a7af-355badb8db84',
    //                 'readOnly': false,
    //                 'message': 'test',
    //                 'shareSection':[{'title':'Section 1 - Speech','isVisible':true},{'title':'Section 2 - Spatial','isVisible':true},{'title':'Section 3 - Quality','isVisible':true}],})
    //             .end(function(err,res){
    //                 if(!err){
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             }).timeout(5000);
    //     });
    //     it('Test clinician complete the questionnaire',function(done){
    //         chai.request('http://localhost:3001/clinician')
    //             .post('/complete-questionnaire')
    //             .send({
    //                 'clinicianEmail':'unittest2@gmail.com',
    //                 'questionnaireData':[[[{'value':'1','supplumentaryValue':''}]],[],[]],
    //                 'personalDetails':{'name':'','date':'', 'rightDeviceType':'','leftDeviceType':'','completedBy':'clinician'},
    //                 'questionnaireId': '6b2b75d0-e92a-11ea-a345-17af331cb519'
    //             })
    //             .end(function(err,res){
    //                 if(!err){
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             }).timeout(5000);
    //     });
    // });
    //
    //
    // describe('Test the index.js router',function(){
    //
    //     it('Test the index.js',function(done){
    //         chai.request('http://localhost:3001')
    //             .get('/')
    //             .end(function(err,res){
    //                 if(!err){
    //                     res.should.have.property('text');
    //                     res.text.should.equal('Pediatric SSQ Server');
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             });
    //     });
    // });
    //
    //
    // describe('Test the share.js router',function(){
    //
    //     it('Test the first shareId',function(done){
    //         chai.request('http://localhost:3001/share')
    //             .get('/7c2f0710-e507-11ea-920a-af9fa6f10364')
    //             .end(function(err,res){
    //                 if(!err){
    //                     res.body.statusCode.should.equal(200);
    //                     res.body.message.should.equal("Valid ShareId");
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             });
    //     }).timeout(5000);
    //
    //     it('Test the second shareId',function(done){
    //         chai.request('http://localhost:3001/share')
    //             .get('/6a45e2b0-e928-11ea-aab1-bbbcd6ea9818')
    //             .end(function(err,res){
    //                 if(!err){
    //                     res.body.statusCode.should.equal(200);
    //                     res.body.message.should.equal("Valid ShareId");
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             });
    //     }).timeout(5000);
    //
    //     it('Test the shareId does not exist',function(done){
    //         chai.request('http://localhost:3001/share')
    //             .get('/testerId')
    //             .end(function(err,res){
    //                 if(!err){
    //                     res.body.statusCode.should.equal(400);
    //                     res.body.message.should.equal("Invalid ShareId");
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             });
    //     }).timeout(5000);
    //
    //     it('Test the completeShare',function(done){
    //         chai.request('http://localhost:3001/share')
    //             .post('/submit/6a45e2b0-e928-11ea-aab1-bbbcd6ea9818')
    //             .send({
    //                 'clinicianEmail':'unittest2@gmail.com',
    //                 'questionnaireData':[[[{'value':'1','supplumentaryValue':''}]],[],[]],
    //                 'personalDetails':{'name':'','date':'', 'rightDeviceType':'','leftDeviceType':'','completedBy':'clinician'},
    //                 'questionnaireId': '6b2b75d0-e92a-11ea-a345-17af331cb519'
    //             })
    //             .end(function(err,res){
    //                 if(!err){
    //                     done();
    //                 }else {
    //                     done(err);
    //                 }
    //             });
    //     }).timeout(5000);
    // });
    //
    // describe('Test the questionnaire.js router',function(){
    //
    //     it('Test getAllQuestionnaire',function(done){
    //         chai.request('http://localhost:3001/questionnaire')
    //             .get('/')
    //             .end(function(err,res){
    //                 if(!err){
    //                     res.should.have.status(200);
    //                     res.body.should.have.lengthOf(36);
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             });
    //     });
    //
    //     it('Test get first Questionnaire by /:questionnaireId',function(done){
    //         chai.request('http://localhost:3001/questionnaire')
    //             .get('/2b79c750-e535-11ea-920a-af9fa6f10364')
    //             .end(function(err,res){
    //                 if(!err){
    //                     res.body.statusCode.should.equal(200);
    //                     res.body.message.should.equal('Valid');
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             });
    //     });
    //     it('Test get invalid Questionnaire by /:questionnaireId',function(done){
    //         chai.request('http://localhost:3001/questionnaire')
    //             .get('/testid')
    //             .end(function(err,res){
    //                 if(!err){
    //                     res.body.statusCode.should.equal(400);
    //                     res.body.message.should.equal('Invalid');
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             });
    //     });
    //
    //     it('Test get first Questionnaire by /getQuestionnaire/:questionnaireId',function(done){
    //         chai.request('http://localhost:3001/questionnaire/getQuestionnaire')
    //             .get('/2b79c750-e535-11ea-920a-af9fa6f10364')
    //             .send({'params':{'questionnaireId':'2b79c750-e535-11ea-920a-af9fa6f10364'}})
    //             .end(function(err,res){
    //                 if(!err){
    //                     res.should.have.status(200);
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             });
    //     });
    //
    //     it('Test getClinicianQuestionnaires',function(done){
    //         chai.request('http://localhost:3001/questionnaire')
    //             .get('/clinician')
    //             .query({clinicianId:'unittest2@gmail.com'})
    //             .end(function(err,res){
    //                 if(!err){
    //                     res.body.should.have.lengthOf(2);
    //                     res.body[0].should.have.property('questionnaireId');
    //                     res.body[0].should.have.property('title');
    //                     res.body[0].should.have.property('description');
    //                     res.body[0].should.have.property('sections');
    //                     res.body[0].should.have.property('isStandard');
    //                     res.body[0].questionnaireId.should.equal('6b2b75d0-e92a-11ea-a345-17af331cb519');
    //                     res.body[0].title.should.equal('T1');
    //                     res.body[0].description.should.equal('test');
    //                     res.body[0].isStandard.should.equal(false);
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             });
    //     });
    //
    //     it('Test getClinicianQuestionnaires',function(done){
    //         chai.request('http://localhost:3001/questionnaire')
    //             .get('/standardised')
    //             .query({clinicianId:'unittest2@gmail.com'})
    //             .end(function(err,res){
    //                 if(!err){
    //                     res.body.statusCode.should.equal(200);
    //                     res.body.message.should.equal('Valid');
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             });
    //     });
    //
    //     it('Test add the questionnaire',function(done){
    //         chai.request('http://localhost:3001/questionnaire')
    //             .post("/add")
    //             .send({'isStandard':false,'clinicianId':'unittest2@gmail.com'})
    //             .end(function(err,res){
    //                 if(!err){
    //                     res.should.have.status(200);
    //                     res.body.should.have.property('code');
    //                     res.body.should.have.property('message');
    //                     res.body.should.have.property('uuid');
    //                     delete_id = res.body.uuid;
    //                     res.body.code.should.equal(200);
    //                     res.body.message.should.equal('successfully add new questionnaire!');
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             });
    //
    //     });
    //
    //     it('Test edit the questionnaire',function(done){
    //         chai.request('http://localhost:3001/questionnaire')
    //             .post('/edit')
    //             .send({'questionnaire': {'_id': '5edb399a7f8f3d102cefb714',
    //                     'questionnaireId': '28c6fb70-a7c0-11ea-97ef-23fd8b2a64b6',
    //                     'title': "Unit Test Edit",
    //                     'description': "Please click edit to begin with this questionnaire.",
    //                     'sections': [],
    //                     'isStandard': false,
    //                     '__v': 0}})
    //             .end(function(err,res){
    //                 if(!err){
    //                     res.should.have.status(200);
    //                     res.should.have.property('text');
    //                     res.text.should.equal('successfully edit');
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             });
    //     });
    //
    //     it('Test delete the questionnaire',function(done){
    //         chai.request('http://localhost:3001/questionnaire')
    //             .post('/delete')
    //             .send({'CQid':delete_id,'clinicianId':'unittest2@gmail.com'})
    //             .end(function(err,res){
    //                 if(!err){
    //                     res.should.have.status(200);
    //                     res.text.should.equal('successfully delete');
    //                     done();
    //                 }else{
    //                     done(err);
    //                 }
    //             });
    //     });
    // });

});
