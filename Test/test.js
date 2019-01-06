const request = require('supertest');
const app = require('../app');
var chai= require('chai');


describe('a suite of tests', function() {
    this.timeout(3000);

    it('should take less than 500ms', function(done){
        setTimeout(done, 300);
    });
});


describe('GET /users', function(done) {

    it('respond with json containing a list of all users', function () {
        request(app)
            .get('/users')
            .set('accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /calendars', function(done) {

    it('respond with json containing a list of all calendars', function () {
        request(app)
            .get('/calendars')
            .set('accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /bookings', function(done) {

    it('respond with json containing a list of all bookings', function () {
        request(app)
            .get('/bookings')
            .set('accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /api/users/logout', function(done) {

    it('respond with json for users logout', function () {
        request(app)
            .get('/api/users/logout')
            .set('accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /api/users/register', function() {
    this.timeout(3000);
    it('responds with json for registering user', function(done) {
        request(app)
            .post('/api/users/register')
            .send({ lastName: 'hadjadj',
                firstName: 'farid',
                email: 'farid@yahoo.fr',
                password: 'password1',
                birthday:  '02/22/1993'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err)=> {
                if (err) return done(err);
                done();
            });
    });
});

describe('GET /api/calendars/:_id', function(done) {

    it('respond with json for finding one of calendars', function () {
        request(app)
            .get('/api/calendars/:_id')
            .set('accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /api/calendars/add', function() {
    this.timeout(3000);
    it('responds with json for adding calendar', function(done) {
        request(app)
            .post('/api/calendars/add')
            .send({
                id: '1',
                userId: '12',
                description: 'reunion',
                dateCreation: '01/08/2019',
                startDate: '01/23/2019',
                endDate: '01/23/2019',
                address: 'Paris 12 university'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err)=> {
                if (err) return done(err);
                done();
            });
    });
});

describe('POST /api/calendars/delete', function() {
    this.timeout(3000);
    it('responds with json for deleting calendar', function(done) {
        request(app)
            .post('/api/calendars/delete')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err)=> {
                if (err) return done(err);
                done();
            });
    });
});

describe('POST /api/bookings/add', function() {
    this.timeout(3000);
    it('responds with json for adding Booking', function(done) {
        request(app)
            .post('/api/bookings/add')
            .send({
                id: '22',
                calendarId: '01',
                userId: '13',
                reservedDate: '02/19/2019',
                creationDate: '03/15/2019'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err)=> {
                if (err) return done(err);
                done();
            });
    });
});

describe('POST /api/Bookings/delete', function() {
    this.timeout(3000);
    it('responds with json for deleting Booking', function(done) {
        request(app)
            .post('/api/Bookings/delete')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err)=> {
                if (err) return done(err);
                done();
            });
    });
});