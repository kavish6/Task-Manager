const mongoose = require("mongoose");
//Schema for tasklist
const TaskListSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    active:{
        type:Boolean,
        required:true,
    }
});
const TaskList=mongoose.model('TaskList',TaskListSchema);
module.exports=TaskList;