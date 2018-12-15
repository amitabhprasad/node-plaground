const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27019/TodoApp');

var Todo = mongoose.model('Todo',{
    text: {
        type: String
    },
    completed:{
        type: Boolean
    },
    completedAt:{
        type: Number
    }
});

var newTodo = new Todo({
    text : 'eat dinner',
    completed: false,
    completedAt : 1234
});

newTodo.save().then((doc)=>{
    console.log('Saved data', doc);
},(err)=>{
    console.log('unable to save',err);
});