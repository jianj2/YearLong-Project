var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
const { v1: uuidv1 } = require("uuid");
chai.use(chaiHttp);
let delete_id = uuidv1();
let share_id = uuidv1();

describe('Sprint4 Backend unit-test',function(){


    describe('Test the admin.js router',function(){

        it('Test adminLogin with empty username',function(done){
            chai.request('http://localhost:3001/admin')
                .post('/login')
                .send({'username': '', 'password': 'testPassword'})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(401);
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
                        res.should.have.status(401);
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
                        res.should.have.status(200);
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
                        res.should.have.status(401);
                        done();
                    }else{
                        done(err);
                    }
                });
        });
        it('Test admin update the instruction',function(done){
            chai.request('http://localhost:3001/admin')
                .post('/instruction/T')
                .send({'instruction':{'_id':'5f96c75ae88a5b10885202c1'
                        ,'title':'This is test'
                        ,'content':'only for testing'
                        ,'type':'T'
                        ,'__v':'0'}})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        });
        it('Test admin get the instruction',function(done){
            chai.request('http://localhost:3001/admin')
                .get('/specificInstruction/CC')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        }).timeout(5000);
        it('Test admin verify login',function(done){
            chai.request('http://localhost:3001/admin')
                .get('/verifylogin/:token')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        });
        it('Test admin get all instructions',function(done){
            chai.request('http://localhost:3001/admin')
                .get('/instructionsSummary')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        }).timeout(5000);

        it('Test admin get all country',function(done){
            chai.request('http://localhost:3001/admin')
                .get('/country')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        }).timeout(5000);
        it('Test admin get organisations from a contry',function(done){
            chai.request('http://localhost:3001/admin')
                .get('/country/organisation/australia')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        }).timeout(5000);
        it('Test admin get clinicians in a organisation',function(done){
            chai.request('http://localhost:3001/admin')
                .get('/organisation/clinician/aus')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        }).timeout(5000);
    });


    describe('Test the clinician.js router',function(){
        it('Test clinician shares the questionnaire',function(done){
            chai.request('http://localhost:3001/clinician')
                .post('/share')
                .send({
                    'clinicianEmail': 'jiaojian1996@gmail.com',
                    'patientEmail': 'jiaojian1996@gmail.com',
                    'questionnaireId': '5f3751273f71077d57c2c114',
                    'readOnly': false,
                    'message': 'test',
                    'shareSection':[{'title':'Section 1 - Speech','isVisible':true},{'title':'Section 2 - Spatial','isVisible':true},{'title':'Section 3 - Other Qualities','isVisible':true}],})
                .end(function(err,res){
                    if(!err){
                        done();
                    }else{
                        done(err);
                    }
                }).timeout(5000);
        });
        it('Test clinician complete the questionnaire',function(done){
            chai.request('http://localhost:3001/clinician')
                .post('/complete-questionnaire')
                .send({
                    'clinicianEmail':'unittest2@gmail.com',
                    'questionnaireData':[[[{'value':'1','supplumentaryValue':''}]],[],[]],
                    'personalDetails':{'name':'','date':'', 'rightDeviceType':'','leftDeviceType':'','completedBy':'clinician'},
                    'questionnaireId': '6b2b75d0-e92a-11ea-a345-17af331cb519'
                })
                .end(function(err,res){
                    if(!err){
                        done();
                    }else{
                        done(err);
                    }
                }).timeout(5000);
        });
    });


    describe('Test the index.js router',function(){

        it('Test the index.js',function(done){
            chai.request('http://localhost:3001')
                .get('/')
                .end(function(err,res){
                    if(!err){
                        res.should.have.property('text');
                        res.text.should.equal('Pediatric SSQ Server ');
                        done();
                    }else{
                        done(err);
                    }
                });
        });
    });


    describe('Test the share.js router',function(){

        it('Test the first shareId',function(done){
            chai.request('http://localhost:3001/share')
                .get('/4d1c4ed0-ec49-11ea-9241-875f6222420a')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        }).timeout(5000);

        it('Test the second shareId',function(done){
            chai.request('http://localhost:3001/share')
                .get('/f4e5c690-fda2-11ea-ba45-c5a9ddddb126')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        }).timeout(5000);

        it('Test the shareId does not exist',function(done){
            chai.request('http://localhost:3001/share')
                .get('/testerId')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        }).timeout(5000);

        it('Test the completeShare',function(done){
            chai.request('http://localhost:3001/share')
                .post('/submit/c1fad4b0-1791-11eb-8657-470a08479b0a')
                .send({
                    'clinicianEmail':'unittest2@gmail.com',
                    'questionnaireData':[[[{'value':'','supplementaryValue':'Would not hear it.'},{'supplementaryValue':''}]],[],[]],
                    'personalDetails':{'name':'daniel','date':'19960829', 'rightDeviceType':'None','leftDeviceType':'None','completedBy':'Child','completeByRelationship':'','completeByName':''},
                    'questionnaireId': '7c342880-178e-11eb-9a18-39f607a871cf',
                    'sortBy':'PERFORMANCE',
                    'comments':[[''],[],[]]
                })
                .end(function(err,res){
                    if(!err){
                        done();
                    }else {
                        done(err);
                    }
                });
        }).timeout(20000);
    });

    describe('Test the questionnaire.js router',function(){

        it('Test get first Questionnaire by /:questionnaireId',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .get('/2b79c750-e535-11ea-920a-af9fa6f10364')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        });
        it('Test get invalid Questionnaire by /:questionnaireId',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .get('/testid')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(404);
                        done();
                    }else{
                        done(err);
                    }
                });
        });

        it('Test getClinicianQuestionnaires',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .get('/clinician')
                .query({clinicianId:'unittest2@gmail.com'})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        });

        it('Test getClinicianQuestionnaires 1',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .get('/standardised')
                .query({clinicianId:'unittest2@gmail.com'})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        });

        it('Test add the questionnaire',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .post("/add")
                .send({'isStandard':false,'clinicianId':'unittest2@gmail.com'})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });

        });

        it('Test edit the questionnaire',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .post('/edit')
                .send({'questionnaire': {'_id': '5edb399a7f8f3d102cefb714',
                        'questionnaireId': '28c6fb70-a7c0-11ea-97ef-23fd8b2a64b6',
                        'title': "Unit Test Edit",
                        'description': "Please click edit to begin with this questionnaire.",
                        'sections': [],
                        'isStandard': false,
                        '__v': 0}})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        });

        it('Test delete the questionnaire',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .post('/delete')
                .send({'CQid':delete_id,'clinicianId':'unittest2@gmail.com'})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        res.text.should.equal('successfully delete');
                        done();
                    }else{
                        done(err);
                    }
                });
        });

        it('Test copy the questionnaire',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .post('/copy')
                .send({'CQid':delete_id,'clinicianId':'unittest2@gmail.com'})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        res.text.should.equal('successfully delete');
                        done();
                    }else{
                        done(err);
                    }
                });
        });

        it('Test copyStandard the questionnaire',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .post('/copyStandard')
                .send({'CQid':delete_id,'clinicianId':'unittest2@gmail.com'})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        res.text.should.equal('successfully delete');
                        done();
                    }else{
                        done(err);
                    }
                });
        });
    });

});
