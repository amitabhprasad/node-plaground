//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID,Binary} = require('mongodb');
const fs = require('fs');
var obj = new ObjectID();
console.log(obj.getTimestamp());

MongoClient.connect('mongodb://localhost:27019/TodoApp',(err,db)=>{
    if(err){
       return console.log(`unable to connect to mongodb server`);
    }
    console.log('Connected to Mongodb server');

    //db.collection('Todos').find({completed:false}).toArray().then((docs)=>{
    // db.collection('Todos').find({
    //     _id:new ObjectID('5c138d8c950476667253d4f9')
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err)=>{
    //     console.log('Something went wrong unable to fetch ',err);
    // });

    // db.collection('Todos').find().count().then((count)=>{
    //     console.log(`Todos count: ${count}`);
    // }, (err)=>{
    //     console.log('Something went wrong unable to fetch ',err);
    // });
    
    // db.collection('Icons').findOne({
    //     _id:new ObjectID('5c14b0cec49faf72d0929576')
    // },(err,doc)=>{
    //     if(err){
    //         return console.log('unable to reterieve icons');
    //     }
    //     fs.writeFile('test-124.png', doc.obj.buffer, function(err){
    //         if (err) throw err;
    //         console.log('Sucessfully reterieved!');
    //     })
    // });

    db.collection('Users').find({name:'Isha'}).count().then((count)=>{
        console.log(`Users count: ${count}`);
    }, (err)=>{
        console.log('Something went wrong unable to fetch ',err);
    });
    db.collection('Users').find({name:'Akshat'}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    });
    //db.close();
});