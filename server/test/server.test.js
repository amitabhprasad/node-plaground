const expect = require('expect');
const request = require('supertest');
const fs = require('fs');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {Icon} = require('./../models/icon');

const todos = [{
    text:'First test Todo'
},{
    text:'Second test Todo' 
}];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>{
        done();
    });
})

describe('POST /todos', ()=>{
    it('should create a new todo', (done)=>{
        var text = 'Test todo text';
        request(app)
         .post('/todos')
         .send({text:text})
         .expect(200)
         .expect((res)=>{
            expect(res.body.text).toBe(text);
         })
         .end((err,res)=>{
             if(err){
                return done(err);
             }

             Todo.find({text:text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
             }).catch((err)=>{
                 done(err);
             })
         })
    });

    it('should not create Todo with invalid data',(done)=>{
        request(app).post('/todos')
                    .send({})
                    .expect(400)
                    .end((err,res)=>{
                        if(err){
                            return done(err);
                        }

                        Todo.find().then((todos)=>{
                            expect(todos.length).toBe(2);
                            done();
                        }).catch((err) =>{
                            done(err);
                        })
                    })
    });
});
describe('GET /todos', ()=>{

    it('should get all todos',(done)=>{
        request(app).get('/todos')
                    .expect(200)
                    .expect((res)=>{
                        expect(res.body.todos.length).toBe(2)
                    })
                    .end(done);
    })
});
describe('POST /api/icons', ()=>{
    //req.files.icon.data
    it('should add icon into db', (done)=>{
        Icon.remove({name:'test-101.png'},()=>{
            request(app).post('/api/icons')
                        .field({'name': 'icon'})
                        .attach("icon",'server/test/test-101.png')
                        .expect(200)
                        .end((err,res)=>{
                            if(err){
                                return done(err);
                            }
                            done();
                        })
        });
    });

    it('should not create icon with duplicate name',(done)=>{
        request(app).post('/api/icons')
                        .field({'name': 'icon'})
                        .attach("icon",'server/test/test-101.png')
                        .expect(400)
                        .end((err,res)=>{
                            if(err){
                                return done(err);
                            }
                            done();
                        })
    });
});

describe('GET /icons', ()=>{
    it('should get icon from backend',(done)=>{
        request(app).get('/api/icons')
                   .expect(200)
                   .expect((res)=>{
                        expect(res.body.icons.length).toBeGreaterThan(0)
                   })
                   .end(done);
    })
});