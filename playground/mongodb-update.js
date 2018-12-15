//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27019/TodoApp',(err,db)=>{
    if(err){
       return console.log(`unable to connect to mongodb server`);
    }
    console.log('Connected to Mongodb server');
    //findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5c14f392aeb55d1f4a01b887')
    // },{
    //     $set:{
    //         completed:true
    //     }
    // },{
    //     returnOriginal:false
    // }).then((doc)=>{
    //     console.log(doc);
    // });

    db.collection('Users').findOneAndUpdate({
        _id:new ObjectID('5c14f7faaeb55d1f4a01b9dd')
    },{
        $set:{
            name : 'Isha'
        },
        $inc:{
            age : 1
        }
    },{
        returnOriginal:false
    }).then((doc)=>{
        console.log(JSON.stringify(doc,undefined,2))
    });
    //db.close();
});