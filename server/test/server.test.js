const expect = require('expect');
const supertest = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

describe('POST /todos',() => {
  it('Should save and return the provided value', (done) => {

    var title = "This is a test";

    supertest(app)
        .post('/todos')
        .send({title})
        .expect(200)
        .expect((res) => {
          expect(res.body.note).toBe(title);
        })
        .end((err, res) => {
          if(err){
            return done(err);
          }
          done();
        });
  });

  it('Should not create todo with bad data', (done) => {
    supertest(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
          if(err){
            return done(err);
          }
          done();
        });
  });
});

describe('/GET Should return DB values', () => {
  it('Should return all the Documents in DB',(done) => {
    supertest(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.length).toBe(18);
        })
        .end((err, res) => {
          if(err){
            return done(err);
          }
          done();
        });
  });
});

describe('GET /User by ID',() => {
  it('Should return Error message on passing wrong ID',(done) => {
    supertest(app)
        .get('/todos/:id')
        .expect(404)
        .end((err, res) => {
          if(err){
            return done(err);
          }
          done();
        });
  });
  it('Should return a valid Todo',(done) => {
    supertest(app)
        .get('/todos/:id')
        .expect(200)
        .end((err, res) => {
          if(err){
            return done(err);
          }
          done();
        });
  });
});

describe('DELETE /User by ID',() => {
  it('Should return Error message on passing wrong ID',(done) => {
    supertest(app)
        .delete('/todos/:id')
        .expect(404)
        .end((err, res) => {
          if(err){
            return done(err);
          }
          done();
        });
  });
  it('Should delete a valid Todo',(done) => {
    supertest(app)
        .delete(`/todos/${'5a26e645bca94933844d1210'}`)
        .expect(200)
        .end((err, res) => {
          if(err){
            return done(err);
          }
          done();
        });
  });
});
