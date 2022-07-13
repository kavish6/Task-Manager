const express= require('express');
const bodyParser=require('body-parser');
const app =express();
const mongoose= require('mongoose');
const apiController= require('./controllers/apiController');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port=5000;
const uri=`${process.env.MONGODB_CONNECTION_STRING}`;

mongoose.connect(uri,{useUnifiedTopology:true,useNewUrlParser: true,});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB database connection established successfully')
})
app.route('/api/createtasklist')
    .post(apiController.createTaskList);
app.route('/api/createtask')
    .post(apiController.createTask);
app.route('/api/tasklist')
    .get(apiController.listTask);

app.listen(port,()=>{
    console.log(`server listening on port: ${port}`);
})
