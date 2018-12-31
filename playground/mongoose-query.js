const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5c27689bb39b5185540e98b8';

var validUserId = '5c150b9eb819bc0005701a14';
var nonExistentUserId = '6c150b9eb819bc0005701a14';
var invalidUserId = '5c150b9eb819bc0005701a14-001'
// if(!ObjectID.isValid(id)){
//     console.log(`id ${id} not valid`);
// }
// Todo.find({
//     _id: id
// }).then((todos)=>{
//     if(!todos || todos.length==0){
//         return console.log(`ids ${id} not found`);
//     }
//     console.log('Todos', todos)
// }).catch((err)=>{
//     console.log("Err ",err)
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     if(!todo){
//         return console.log(`id ${id} not found`);
//     }
//     console.log('Todo', todo)
// }).catch((err)=>{
//     console.log("Err ",err)
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log(`id ${id} not found`);
//     }
//     console.log('Todo by id', todo)
// }).catch((err)=>{
//     console.log("Err ",err)
// })

User.findById(invalidUserId).then((user)=>{
    if(!user){
        return console.log(`User with id ${id} not found`);
    }
    console.log('User by id',user);
}).catch((err)=>{
    console.log(err);
});