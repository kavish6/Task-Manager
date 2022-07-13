const mongoose=require('mongoose');
// Schema and validation for tasks
const months=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
const TaskSchema= new mongoose.Schema({
    taskName:{
        type:String,
        required:true,
        index:true,
    },
    description:{
        type:String,
        required:true,
    },
    dueDate:{
        type:Date,
        required:true,
        validate:[dueDateValidator,'Due Date should be after end of period']
    },
    period:{
        type:String,
        required:true,
        validate:[periodValidator,'period should be accordingly adjusted with respect to period Type']
    },
    periodType:{
        type:String,
        enum:['yearly','quarterly','monthly'],
    },
    taskListName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TaskList',
        required:true,
    }
});
//validating if the dueDate is appropriately entered with respect to period and period type
function dueDateValidator(value){
    console.log(value);
    value=new Date(value);
    const m=value.getMonth()+1;
    const y=value.getFullYear();
    var periodType=this.periodType;
    var temp=this.period;
    var words=[];
    var word='';
    for(var i=0;i<temp.length;i++)
    {
        if(temp[i]===' ')
        {
        words.push(word);
        word='';
        }
        else
        word=word+temp[i];
    }
    words.push(word);
    var month=(months.indexOf(words[0])+1);
    var year=parseInt(words[1]);
    console.log(month+'-'+year);
    if(periodType==='monthly')
    {
    if((y-year)*12+(m-month)<1)
    return false;
    }
    else if(periodType==='quarterly')
    {
        if((y-year)*12+(m-month)<4)
        return false;
    }
    else
    {
        if((y-year)*12+(m-month)<12)
        return false;
    }
    return true;
}
// validating if the format of period is of Type: 'monthName year'
function periodValidator(value){
   
    var words=[];
    var word='';
    for(var i=0;i<value.length;i++)
    {
        if(value[i]===' ')
        {
        words.push(word);
        word='';
        }
        else
        word=word+value[i];
    }
    words.push(word);
    if(words.length>2)
    return false;
    // console.log(words[0]);
    if(months.indexOf(words[0])<=-1)
    return false;
    // console.log(words[1])
    if(words[1].length!=4)
    return false;
    return true;
}
const Task=mongoose.model('Task',TaskSchema);
module.exports=Task;