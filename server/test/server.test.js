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
  it('SHould return all the Documents in DB',(done) => {
    supertest(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.length).toBe(14);
        })
        .end((err, res) => {
          if(err){
            return done(err);
          }
          done();
        });
  });
});
