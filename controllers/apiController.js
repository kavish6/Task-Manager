const Task=require('../models/Task');
const TaskList=require('../models/Tasklist');
//This file has all the functions related to different routes
//Function to createTaskList
exports.createTaskList=(req,res)=>{
    let newTaskList=new TaskList(req.body);
    newTaskList.save((err, taskList) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(201).json(taskList);
      });
}
//Function to createTask
exports.createTask=(req,res)=>{
    var data=req.body;  
    data.dueDate=modifyDate(data.dueDate,10);
    let newTask=new Task({
        taskName:data.taskName,
        description:data.description,
        dueDate:data.dueDate,
        period:data.period,
        periodType:data.periodType,
        taskListName:data.taskListId
    });
    newTask.save((err, task) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(201).json(task);
      });   
}
// change date in dd-mm-yy to yy-mm-dd 
const modifyDate=(dueDate,length)=>{
    var newdate = dueDate.substring(0,length).split("-").reverse().join("-");
    return newdate;
}
// Function to listTask
// We can pass a searchstring as querystring to find tasks related to that string and we can pass page no to use pagination.
exports.listTask=(req,res)=>{
    var searchText=req.query.searchText;
    var page=req.query.page;
    if(!page)
    page=0;
    //Defining page no from 0 and tasks per page to 10
    var perPage = 10
    ,page = Math.max(0, page)
    // If a text is given to search
    if(searchText)
    {
Task.find({
    $or:[{ "taskName": { "$regex": `${searchText}`, "$options": "i" }},{"description":{"$regex":`${searchText}`, "$options": "i" }}]
})
.populate({path:'taskListName',select:'name -_id'})
    .limit(perPage)
    .skip(perPage * page)
    .sort({
        Taskname: 'asc'
    })
    .select('taskName description periodType period dueDate taskListName')
    .exec(function(err, tasks) {
        Task.count().exec(function(err, count) {
            if(err)
            res.status(404).send(err);
            const data=tasks.map((task)=>{
                return{
                taskName:task.taskName,
                description:task.description,
                periodType:task.periodType,
                period:task.period,
                dueDate:formatDate(task.dueDate),
                taskListName:task.taskListName
                };
            })
            res.status(200).send( {
                Tasks:data,
                count:count
            });
        })
    })
    }
    // If a text is not given to search
    else
    {
        Task.find({})
        .populate({path:'taskListName',select:'name -_id'})
            .limit(perPage)
            .skip(perPage * page)
            .sort({
                Taskname: 'asc'
            })
            .select('taskName description periodType period dueDate taskListName')
            .exec(function(err, tasks) {
                Task.count().exec(function(err, count) {
                    if(err)
                    res.status(404).send(err);
                    const data=tasks.map((task)=>{
                        return{
                        taskName:task.taskName,
                        description:task.description,
                        periodType:task.periodType,
                        period:task.period,
                        dueDate:formatDate(task.dueDate),
                        taskListName:task.taskListName
                        };
                    })
                    res.status(200).send( {
                        Tasks:data,
                        count:count
                    })
                })
            })
    }
}
// format date from database in ISO  to Indian format
const formatDate=(date)=>{
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;

  return [day, month, year].join('-');
}