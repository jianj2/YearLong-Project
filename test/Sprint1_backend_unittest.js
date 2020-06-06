var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
const { v1: uuidv1 } = require("uuid");
chai.use(chaiHttp);
let delete_id = uuidv1();

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
                        res.body.should.have.lengthOf(7);
                        done();
                    }else{
                        done(err);
                    }
                });
        });
    
        it('Test clinician shares the questionnaire',function(done){
            chai.request('http://localhost:3001/clinician')
                .post('/share')
                .send({
                    'clinicianEmail': 'jiaojian1996@gmail.com',
                    'patientEmail': 'jiaojian1996@gmail.com',
                    'questionnaireId': 'c93d2b90-a682-11ea-963d-d72d9d1c93cb',
                    'readOnly': false,
                    'message': 'test',})
                .end(function(err,res){
                   if(!err){
                       res.body.should.have.property('shareId');
                       res.body.should.have.property('clinicianEmail');
                       res.body.should.have.property('patientEmail');
                       res.body.should.have.property('questionnaireId');
                       res.body.should.have.property('readOnly');
                       res.body.should.have.property('message');
                       res.body.clinicianEmail.should.equal('jiaojian1996@gmail.com');
                       res.body.patientEmail.should.equal('jiaojian1996@gmail.com');
                       res.body.questionnaireId.should.equal('c93d2b90-a682-11ea-963d-d72d9d1c93cb');
                       res.body.readOnly.should.equal(false);
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


    describe('Test the share.js router',function(){

       it('Test the first shareId',function(done){
           chai.request('http://localhost:3001/share')
               .get('/4f3bf7a0-a686-11ea-963d-d72d9d1c93cb')
               .end(function(err,res){
                   if(!err){
                       res.body.shareId.should.equal('4f3bf7a0-a686-11ea-963d-d72d9d1c93cb');
                       res.body.clinicianEmail.should.equal('donuvin@gmail.com');
                       res.body.patientEmail.should.equal('wrehmani@student.unimelb.edu.au');
                       res.body.questionnaireId.should.equal('c93d2b80-a682-11ea-963d-d72d9d1c93cb');
                       res.body.readOnly.should.equal(false);
                       done();
                   }else{
                       done(err);
                   }
               });
       });
       
        it('Test the second shareId',function(done){
            chai.request('http://localhost:3001/share')
                .get('/64a9d1d0-a68a-11ea-9b09-53ae67cb454d')
                .end(function(err,res){
                    if(!err){
                        res.body.shareId.should.equal('64a9d1d0-a68a-11ea-9b09-53ae67cb454d');
                        res.body.clinicianEmail.should.equal('wrehmani@student.unimelb.edu.au');
                        res.body.patientEmail.should.equal('donuvin@gmail.com');
                        res.body.questionnaireId.should.equal('5c757050-a67b-11ea-a416-756fbdf3f4a8');
                        res.body.readOnly.should.equal(true);
                        done();
                    }else{
                        done(err);
                    }
                });
        });
       
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
        });

        it('Test the completeShare',function(done){
            chai.request('http://localhost:3001/share')
                .post('/submit/44658470-a7be-11ea-97ef-23fd8b2a64b6')
                .send({'questionnaireData':'',
                    'clinicianEmail':'jiaojian1996@gmail.com',
                    'personalDetails':{'name': 'Daniel', 'date': '2020-06-02', 'completedBy': 'parent',
                        'rightDeviceType': 'deviceA', 'leftDeviceType': 'deviceA'}})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        res.body.should.equal(true);
                        res.text.should.equal('true');
                        done();
                    }else {
                        done(err);
                    }
                });
        }).timeout(5000);

        it('Test the completeShare with a expire shareId',function(done){
            chai.request('http://localhost:3001/share')
                .post('/submit/44658470-a7be-11ea-97ef-23fd8b2a64b6')
                .send({'questionnaireData':'',
                    'clinicianEmail':'jiaojian1996@gmail.com',
                    'personalDetails':{'name': 'Daniel', 'date': '2020-06-02', 'completedBy': 'parent',
                        'rightDeviceType': 'deviceA', 'leftDeviceType': 'deviceA'}})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(500);
                        done();
                    }else {
                        done(err);
                    }
                });
        }).timeout(5000);
    });

    describe('Test the questionnaire.js router',function(){

        it('Test getAllQuestionnaire',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .get('/')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        res.body.should.have.lengthOf(9);
                        done();
                    }else{
                        done(err);
                    }
                });
        });

        it('Test get first Questionnaire by /getQuestionnaire/:questionnaireId',function(done){
            chai.request('http://localhost:3001/questionnaire/getQuestionnaire')
                .get('/5c757050-a67b-11ea-a416-756fbdf3f4a8')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        res.body.should.have.property('questionnaireId');
                        res.body.should.have.property('title');
                        res.body.should.have.property('description');
                        res.body.should.have.property('sections');
                        res.body.should.have.property('isStandard');
                        res.body.questionnaireId.should.equal('5c757050-a67b-11ea-a416-756fbdf3f4a8');
                        res.body.title.should.equal('My First Questionnaire');
                        res.body.description.should.equal('This is a questionnaire taken from the sample.');
                        res.body.isStandard.should.equal(false);
                        res.body.sections.should.have.lengthOf(3);
                        done();
                    }else{
                        done(err);
                    }
                });
        });

        it('Test get first Questionnaire by /:questionnaireId',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .get('/5c757050-a67b-11ea-a416-756fbdf3f4a8')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        res.body.should.have.property('questionnaireId');
                        res.body.should.have.property('title');
                        res.body.should.have.property('description');
                        res.body.should.have.property('sections');
                        res.body.should.have.property('isStandard');
                        res.body.questionnaireId.should.equal('5c757050-a67b-11ea-a416-756fbdf3f4a8');
                        res.body.title.should.equal('My First Questionnaire');
                        res.body.description.should.equal('This is a questionnaire taken from the sample.');
                        res.body.isStandard.should.equal(false);
                        res.body.sections.should.have.lengthOf(3);
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
                        res.body.should.have.lengthOf(1);
                        res.body[0].should.have.property('questionnaireId');
                        res.body[0].should.have.property('title');
                        res.body[0].should.have.property('description');
                        res.body[0].should.have.property('sections');
                        res.body[0].should.have.property('isStandard');
                        res.body[0].questionnaireId.should.equal('28c6fb70-a7c0-11ea-97ef-23fd8b2a64b6');
                        res.body[0].title.should.equal('Unit Test Edit');
                        res.body[0].description.should.equal('Please click edit to begin with this questionnaire.');
                        res.body[0].isStandard.should.equal(false);
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
                        res.body.should.have.property('code');
                        res.body.should.have.property('message');
                        res.body.should.have.property('uuid');
                        delete_id = res.body.uuid;
                        res.body.code.should.equal(200);
                        res.body.message.should.equal('successfully add new questionnaire!');
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
                        res.should.have.property('text');
                        res.text.should.equal('successfully edit');
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
   });
    
});