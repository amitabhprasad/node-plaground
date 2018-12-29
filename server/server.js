var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var upload = require("express-fileupload");
const fileType = require('file-type');

var {mongoose} = require('./db/mongoose')
var {User} = require('./models/user');
var {Todo} = require('./models/todo');
var {Icon} = require('./models/icon');



var app = express();

app.use(bodyParser.json());

app.use(upload({
    limits: { fileSize: 1 * 1024 * 1024 },
}));

app.post('/todos',(req,res)=>{
    console.log('called POST todos ');
    var todo = new Todo({
        text : req.body.text
    });

    todo.save().then((doc)=>{
        res.status(200).send(doc);
    },(err)=>{
        console.log('unable to save',err);
        res.status(400).send(err);
    })
});

app.get('/todos',(req,res)=>{
    Todo.find({}).then((todos)=>{
        res.send({
            todos,
            code: 'test data'
        });
    },(err)=>{
        //fires when promise gets rejected
        console.log('unable to get data ',err);
        res.status(400).send(err);
    });
});
app.post('/api/icons',function(req,res){
    var icon = new Icon();
    //console.log(req.files);
    icon.data = req.files.icon.data;//fs.readFileSync(req.files.icon.path);
    console.log("name "+req.files.icon.name);
    console.log("length "+req.files.icon.length);
    var content = fileType(icon.data);
    icon.name = req.files.icon.name;
    icon.contentType = content.mime
    console.log("size "+icon.data.length);
   
    console.log('mime.Type ',content.mime);
    icon.save().then((doc)=>{
        console.log('saved file successfully ');
        res.status(200).send();
    },(err)=>{
        console.log("inside err condn ",err);
        if(err){
            res.status(400).send(err);
        }
    });
});

app.get('/api/icons/id', function(req, res) {
    console.log('inside REST call');
    var id = '5c153e37b9a05dad110d875b';
    Icon.findById(id).then((doc)=>{
        if(!doc){
            res.status(404).send(`Requested ID ${id} do not exist`);
        }
        //res.setHeader('Content-Disposition', 'attachment; filename=' + doc.name);
        res.setHeader('Content-Transfer-Encoding', 'binary');
        res.setHeader('Content-Type', 'application/octet-stream');
        //res.sendFile(fullFileName)
        //res.send(new Buffer(pdfData, 'binary')), or the res.type() / res.end(pdfData, 'binary')

        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(doc.data, 'binary');
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err);
    });
    
   // res.end(data);
});

app.get('/api/icons', function(req, res) {
    Icon.find({},'name contentType description').then((icons)=>{
        res.send({
            icons
        });
    },(err)=>{
        console.log('unable to get data ',err);
        res.status(400).send(err);
    });
});

app.post('/api/redirect', function(req, res) {
    console.log("---> "+req.body);
    res.writeHead(302, {
        'Location': 'http://localhost:5001/api/icons?param=test123'
        //add other headers here...
      });
      res.end();
});


app.listen(4999,()=>{
    console.log('Server started at port 4999');
});

module.exports = {app};