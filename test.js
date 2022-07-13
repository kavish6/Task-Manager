// const dueDate='2013-03-10T02:00:00Z';
// function mod(dueDate){
// var newdate = dueDate.substring(0,10).split("-").reverse().join("-");
// return newdate;
// }
// console.log(mod(dueDate));
// require('dotenv').config();
// console.log(process.env.MONGODB_CONNECTION_STRING);
function periodValidator(value){
    const months=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
    const words=[];
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
    console.log(words[0]);
    if(months.indexOf(words[0])<=-1)
    return false;
    console.log(words[1])
    if(words[1].length!=4)
    return false;
    return true;
}
console.log(periodValidator('May 20142'));