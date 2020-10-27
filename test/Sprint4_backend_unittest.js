var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

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
                .set({'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluVXNlcjEiLCJpYXQiOjE2MDM3NzcxNzUsImV4cCI6MTYwMzg2MzU3NX0.ildcY1ZbFfPcMMDsjexJYMqNhzDbEfBqPPi1aKzQP1E'})
                .send({'instruction':{'_id':'5f96c75ae88a5b10885202c1'
                        ,'title':'This is test'
                        ,'content':'only for testing'
                        ,'type':'T'
                        ,'__v':0}})
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
        it('Test admin verify login wrong',function(done){
            chai.request('http://localhost:3001/admin')
                .get('/verifylogin/:token')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(401);
                        done();
                    }else{
                        done(err);
                    }
                });
        });
        it('Test admin verify login success',function(done){
            chai.request('http://localhost:3001/admin')
                .get('/verifylogin/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluVXNlcjEiLCJpYXQiOjE2MDM3NjAzMjMsImV4cCI6MTYwMzg0NjcyM30.fGIcjMeIenVmTfPb0xEKZrPErp1h5Ey-brfPH29IWd8')
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
                .set({'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluVXNlcjEiLCJpYXQiOjE2MDM3NzcxNzUsImV4cCI6MTYwMzg2MzU3NX0.ildcY1ZbFfPcMMDsjexJYMqNhzDbEfBqPPi1aKzQP1E'})
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
                .set({'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluVXNlcjEiLCJpYXQiOjE2MDM3NzcxNzUsImV4cCI6MTYwMzg2MzU3NX0.ildcY1ZbFfPcMMDsjexJYMqNhzDbEfBqPPi1aKzQP1E'})
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
                .set({'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluVXNlcjEiLCJpYXQiOjE2MDM3NzcxNzUsImV4cCI6MTYwMzg2MzU3NX0.ildcY1ZbFfPcMMDsjexJYMqNhzDbEfBqPPi1aKzQP1E'})
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
                .set({'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluVXNlcjEiLCJpYXQiOjE2MDM3NzcxNzUsImV4cCI6MTYwMzg2MzU3NX0.ildcY1ZbFfPcMMDsjexJYMqNhzDbEfBqPPi1aKzQP1E'})
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
            this.timeout(10000);
            chai.request('http://localhost:3001/clinician')
                .post('/share')
                .set({'authorization':'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNiRnZUazZSRzFIZkJZS3A4MGlzbiJ9.eyJodHRwOi8vcGVkaWF0cmljLXNjYWxlLmNvbS9lbWFpbCI6InVuaXR0ZXN0MkBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWVkYjM5NWM2YjQ2NGMwMDEzOGFlOTEwIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9jbGluaWNpYW4iLCJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjAzNzc0Njk2LCJleHAiOjE2MDM4NjEwOTYsImF6cCI6ImtvNUlJdWdvUlhRZjJ1Q3BxUmNsb2N3YmhyYnFBWXg0Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.T5RbQoqidWDNjKK2JLExpUwfMfk9qHUqtL6XXq63s0Svjh59GMVYTZT31XNsDdaOZJKxEAppDdzU1qk_Suqn6RVeAMoxevftIHGTUDp4sxbUapmBfy_ija3inmzLtfRECcQ3OkGKb-xrl68MNdQ8g9GJQeLy0hIw2TpFyM9CPIroOWUZbfeznnE602W5AQPpUbqrkWcdJwiJ2eqbvMLkrfTJ-mQ7MIX9d_WtFYLikOVmjamzOpZ4Sgrypu9HhqTDIgHOFxHbrl8n1vtRRtMRTIV-WR-279brLyyI_iw0FihIAJTWUBygJ_1IAHSuRqmMGzvvQAt1lGpHZLzITD2Dwg'})
                .send({
                    'clinicianEmail': 'unittest2@gmail.com',
                    'patientEmail': 'jiaojian1996@gmail.com',
                    'questionnaireId': 'f604ab10-1830-11eb-8455-311c8c9ad5e1',
                    'readOnly': false,
                    'message': 'test',
                    'sectionNames': [ 'Section A - Speech',
                        'Section B - Spatial',
                        'Section C - Other Qualities' ],
                    'shareSection': { 'Section A - Speech': true,
                            'Section B - Spatial': true,
                            'Section C - Other Qualities': true },
                    'sortBy':'PERFORMANCE'})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        });

        it('Test clinician complete the questionnaire',function(done){
            this.timeout(10000);
            chai.request('http://localhost:3001/clinician')
                .post('/complete-questionnaire')
                .set({'authorization':'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNiRnZUazZSRzFIZkJZS3A4MGlzbiJ9.eyJodHRwOi8vcGVkaWF0cmljLXNjYWxlLmNvbS9lbWFpbCI6InVuaXR0ZXN0MkBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWVkYjM5NWM2YjQ2NGMwMDEzOGFlOTEwIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9jbGluaWNpYW4iLCJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjAzNzc0Njk2LCJleHAiOjE2MDM4NjEwOTYsImF6cCI6ImtvNUlJdWdvUlhRZjJ1Q3BxUmNsb2N3YmhyYnFBWXg0Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.T5RbQoqidWDNjKK2JLExpUwfMfk9qHUqtL6XXq63s0Svjh59GMVYTZT31XNsDdaOZJKxEAppDdzU1qk_Suqn6RVeAMoxevftIHGTUDp4sxbUapmBfy_ija3inmzLtfRECcQ3OkGKb-xrl68MNdQ8g9GJQeLy0hIw2TpFyM9CPIroOWUZbfeznnE602W5AQPpUbqrkWcdJwiJ2eqbvMLkrfTJ-mQ7MIX9d_WtFYLikOVmjamzOpZ4Sgrypu9HhqTDIgHOFxHbrl8n1vtRRtMRTIV-WR-279brLyyI_iw0FihIAJTWUBygJ_1IAHSuRqmMGzvvQAt1lGpHZLzITD2Dwg'})
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
                        res.should.have.status(200);
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
            this.timeout(10000);
            chai.request('http://localhost:3001/share')
                .get('/testerId')
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(404);
                        done();
                    }else{
                        done(err);
                    }
                });
        }).timeout(5000);

        it('Test the completeShare',function(done){
            chai.request('http://localhost:3001/share')
                .post('/submit/7522ce80-1814-11eb-9f20-8d9d038dc75d')
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
                .set({'authorization':'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNiRnZUazZSRzFIZkJZS3A4MGlzbiJ9.eyJodHRwOi8vcGVkaWF0cmljLXNjYWxlLmNvbS9lbWFpbCI6InVuaXR0ZXN0MkBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWVkYjM5NWM2YjQ2NGMwMDEzOGFlOTEwIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9jbGluaWNpYW4iLCJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjAzNzY1MzkzLCJleHAiOjE2MDM4NTE3OTMsImF6cCI6ImtvNUlJdWdvUlhRZjJ1Q3BxUmNsb2N3YmhyYnFBWXg0Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.LQZZa4prRd1GTU5d7Uf30n6KDEsvKJEtZHzA_VFCzI2N1L7I6Ov92a3T-VqkQvchZGUqps7bm8uoijrkpscOELRUszOUfPX5Id_fwlPU3-iBcL-ja4csucme-FqBHaRIwEgwd9PIdDemQ--AdGpCiEWjtYoQHe7Qg3bX4g3G2Epa7zkmyY4DQlqeSDm0PyMjQBHxOruwsGeT12PhCRaSV939L3xy4p1fcfW9W03WoSsDF8ZRmnYoUMq7dbg9P_XdgcX1dXNUhlO06erfCmZ-zBbI5_pOEhm_b9fH6TkzwkTAa7xYCutFQaRNMynlUsILaZ4F892oHseqcZwFbT28pA'})
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
                .set({'authorization':'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNiRnZUazZSRzFIZkJZS3A4MGlzbiJ9.eyJodHRwOi8vcGVkaWF0cmljLXNjYWxlLmNvbS9lbWFpbCI6InVuaXR0ZXN0MkBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWVkYjM5NWM2YjQ2NGMwMDEzOGFlOTEwIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9jbGluaWNpYW4iLCJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjAzNzY1MzkzLCJleHAiOjE2MDM4NTE3OTMsImF6cCI6ImtvNUlJdWdvUlhRZjJ1Q3BxUmNsb2N3YmhyYnFBWXg0Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.LQZZa4prRd1GTU5d7Uf30n6KDEsvKJEtZHzA_VFCzI2N1L7I6Ov92a3T-VqkQvchZGUqps7bm8uoijrkpscOELRUszOUfPX5Id_fwlPU3-iBcL-ja4csucme-FqBHaRIwEgwd9PIdDemQ--AdGpCiEWjtYoQHe7Qg3bX4g3G2Epa7zkmyY4DQlqeSDm0PyMjQBHxOruwsGeT12PhCRaSV939L3xy4p1fcfW9W03WoSsDF8ZRmnYoUMq7dbg9P_XdgcX1dXNUhlO06erfCmZ-zBbI5_pOEhm_b9fH6TkzwkTAa7xYCutFQaRNMynlUsILaZ4F892oHseqcZwFbT28pA'})
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
                .set({'authorization':'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNiRnZUazZSRzFIZkJZS3A4MGlzbiJ9.eyJodHRwOi8vcGVkaWF0cmljLXNjYWxlLmNvbS9lbWFpbCI6InVuaXR0ZXN0MkBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWVkYjM5NWM2YjQ2NGMwMDEzOGFlOTEwIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9jbGluaWNpYW4iLCJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjAzNzY1MzkzLCJleHAiOjE2MDM4NTE3OTMsImF6cCI6ImtvNUlJdWdvUlhRZjJ1Q3BxUmNsb2N3YmhyYnFBWXg0Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.LQZZa4prRd1GTU5d7Uf30n6KDEsvKJEtZHzA_VFCzI2N1L7I6Ov92a3T-VqkQvchZGUqps7bm8uoijrkpscOELRUszOUfPX5Id_fwlPU3-iBcL-ja4csucme-FqBHaRIwEgwd9PIdDemQ--AdGpCiEWjtYoQHe7Qg3bX4g3G2Epa7zkmyY4DQlqeSDm0PyMjQBHxOruwsGeT12PhCRaSV939L3xy4p1fcfW9W03WoSsDF8ZRmnYoUMq7dbg9P_XdgcX1dXNUhlO06erfCmZ-zBbI5_pOEhm_b9fH6TkzwkTAa7xYCutFQaRNMynlUsILaZ4F892oHseqcZwFbT28pA'})
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

        it('Test add the standard questionnaire',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .post("/addStandard")
                .set({'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluVXNlcjEiLCJpYXQiOjE2MDM3NzcxNzUsImV4cCI6MTYwMzg2MzU3NX0.ildcY1ZbFfPcMMDsjexJYMqNhzDbEfBqPPi1aKzQP1E'})
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
                .set({'authorization':'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNiRnZUazZSRzFIZkJZS3A4MGlzbiJ9.eyJodHRwOi8vcGVkaWF0cmljLXNjYWxlLmNvbS9lbWFpbCI6InVuaXR0ZXN0MkBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWVkYjM5NWM2YjQ2NGMwMDEzOGFlOTEwIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9jbGluaWNpYW4iLCJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjAzNzY1MzkzLCJleHAiOjE2MDM4NTE3OTMsImF6cCI6ImtvNUlJdWdvUlhRZjJ1Q3BxUmNsb2N3YmhyYnFBWXg0Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.LQZZa4prRd1GTU5d7Uf30n6KDEsvKJEtZHzA_VFCzI2N1L7I6Ov92a3T-VqkQvchZGUqps7bm8uoijrkpscOELRUszOUfPX5Id_fwlPU3-iBcL-ja4csucme-FqBHaRIwEgwd9PIdDemQ--AdGpCiEWjtYoQHe7Qg3bX4g3G2Epa7zkmyY4DQlqeSDm0PyMjQBHxOruwsGeT12PhCRaSV939L3xy4p1fcfW9W03WoSsDF8ZRmnYoUMq7dbg9P_XdgcX1dXNUhlO06erfCmZ-zBbI5_pOEhm_b9fH6TkzwkTAa7xYCutFQaRNMynlUsILaZ4F892oHseqcZwFbT28pA'})
                .send({'questionnaire': {'_id': '5f97c32474452d3e79f37677',
                        'questionnaireId': 'a95e4600-1820-11eb-bc18-878edcae65c9',
                        'title': "test for edit",
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

        it('Test edit the standard questionnaire',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .post('/editStandard')
                .set({'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluVXNlcjEiLCJpYXQiOjE2MDM3NzcxNzUsImV4cCI6MTYwMzg2MzU3NX0.ildcY1ZbFfPcMMDsjexJYMqNhzDbEfBqPPi1aKzQP1E'})
                .send({'questionnaire': {'_id': '5f97cab874452d3e79f37694',
                        'questionnaireId': '2df3efb0-1825-11eb-bc18-878edcae65c9',
                        'title': "test for edit standard",
                        'description': "Please click edit to begin with this questionnaire.",
                        'sections': [],
                        'isStandard': true,
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
                .set({'authorization':'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNiRnZUazZSRzFIZkJZS3A4MGlzbiJ9.eyJodHRwOi8vcGVkaWF0cmljLXNjYWxlLmNvbS9lbWFpbCI6InVuaXR0ZXN0MkBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWVkYjM5NWM2YjQ2NGMwMDEzOGFlOTEwIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9jbGluaWNpYW4iLCJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjAzNzY1MzkzLCJleHAiOjE2MDM4NTE3OTMsImF6cCI6ImtvNUlJdWdvUlhRZjJ1Q3BxUmNsb2N3YmhyYnFBWXg0Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.LQZZa4prRd1GTU5d7Uf30n6KDEsvKJEtZHzA_VFCzI2N1L7I6Ov92a3T-VqkQvchZGUqps7bm8uoijrkpscOELRUszOUfPX5Id_fwlPU3-iBcL-ja4csucme-FqBHaRIwEgwd9PIdDemQ--AdGpCiEWjtYoQHe7Qg3bX4g3G2Epa7zkmyY4DQlqeSDm0PyMjQBHxOruwsGeT12PhCRaSV939L3xy4p1fcfW9W03WoSsDF8ZRmnYoUMq7dbg9P_XdgcX1dXNUhlO06erfCmZ-zBbI5_pOEhm_b9fH6TkzwkTAa7xYCutFQaRNMynlUsILaZ4F892oHseqcZwFbT28pA'})
                .send({'CQid':'d97ff080-1821-11eb-bc18-878edcae65c9','clinicianId':'unittest2@gmail.com'})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        });

        it('Test delete the standard questionnaire',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .post('/deleteStandard')
                .set({'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluVXNlcjEiLCJpYXQiOjE2MDM3NzcxNzUsImV4cCI6MTYwMzg2MzU3NX0.ildcY1ZbFfPcMMDsjexJYMqNhzDbEfBqPPi1aKzQP1E'})
                .send({'questionnaireId':'b2a1aee0-1821-11eb-bc18-878edcae65c9'})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        res.text.should.equal('"Successfully deleted questionnaire"');
                        done();
                    }else{
                        done(err);
                    }
                });
        });

        it('Test copy the questionnaire',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .post('/copy')
                .set({'authorization':'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNiRnZUazZSRzFIZkJZS3A4MGlzbiJ9.eyJodHRwOi8vcGVkaWF0cmljLXNjYWxlLmNvbS9lbWFpbCI6InVuaXR0ZXN0MkBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWVkYjM5NWM2YjQ2NGMwMDEzOGFlOTEwIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9jbGluaWNpYW4iLCJodHRwczovL3BlZGlhdHJpYy1zY2FsZS5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjAzNzY1MzkzLCJleHAiOjE2MDM4NTE3OTMsImF6cCI6ImtvNUlJdWdvUlhRZjJ1Q3BxUmNsb2N3YmhyYnFBWXg0Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.LQZZa4prRd1GTU5d7Uf30n6KDEsvKJEtZHzA_VFCzI2N1L7I6Ov92a3T-VqkQvchZGUqps7bm8uoijrkpscOELRUszOUfPX5Id_fwlPU3-iBcL-ja4csucme-FqBHaRIwEgwd9PIdDemQ--AdGpCiEWjtYoQHe7Qg3bX4g3G2Epa7zkmyY4DQlqeSDm0PyMjQBHxOruwsGeT12PhCRaSV939L3xy4p1fcfW9W03WoSsDF8ZRmnYoUMq7dbg9P_XdgcX1dXNUhlO06erfCmZ-zBbI5_pOEhm_b9fH6TkzwkTAa7xYCutFQaRNMynlUsILaZ4F892oHseqcZwFbT28pA'})
                .send({'questionnaireId':'fd4a39b0-082e-11eb-b88c-dd849a33659e','isCopyingToCustomisedQuestionnaire':true,'clinicianId':'unittest2@gmail.com'})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        });

        it('Test copyStandard the questionnaire',function(done){
            chai.request('http://localhost:3001/questionnaire')
                .post('/copyStandard')
                .set({'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluVXNlcjEiLCJpYXQiOjE2MDM3NzcxNzUsImV4cCI6MTYwMzg2MzU3NX0.ildcY1ZbFfPcMMDsjexJYMqNhzDbEfBqPPi1aKzQP1E'})
                .send({'questionnaireId':'fd4a39b0-082e-11eb-b88c-dd849a33659e','isCopyingToCustomisedQuestionnaire':false,'clinicianId':undefined})
                .end(function(err,res){
                    if(!err){
                        res.should.have.status(200);
                        done();
                    }else{
                        done(err);
                    }
                });
        });
    });

});
