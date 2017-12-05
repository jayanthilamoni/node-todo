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
        .get(`/todos/${'5a1d194c801d7b197cc95c94'}`)
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
        .delete(`/todos/${'5a1d1734c0d1642e74df4cc7'}`)
        .expect(200)
        .end((err, res) => {
          if(err){
            return done(err);
          }
          done();
        });
  });
});

describe('PATCH /User by ID',() => {
  it('Should return Error message on passing wrong ID',(done) => {
    supertest(app)
        .patch('/todos/:id')
        .expect(404)
        .end((err, res) => {
          if(err){
            return done(err);
          }
          done();
        });
  });
  it('Should Update a valid Todo',(done) => {
    supertest(app)
        .patch(`/todos/${'5a1d18211d08262cd8a78cd8'}`)
        .send({"note":"Hello",completed:true})
        .expect(200)
        .expect((req, res) => {
          expect(req.body.note).toBe("Hello");
          Todo.findByIdAndUpdate({"_id":"5a1d18211d08262cd8a78cd8"},{
            $set:{
              "note":req.body.note,
              "completed":req.body.completed
            }
          },{
            returnOriginal:false
          }).then((result) => {
            expect(result.note).toBe("Hello");
          });
        })
        .end((err, res) => {
          if(err){
            return done(err);
          }
          done();
        });
  });
});
