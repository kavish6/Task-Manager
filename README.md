# Task-Manager
Task manager API using mongoose,express,node and mongodb Atlas.
## My Work:
- I have used mongodb atlas and added the mongdb connection url in the environment variable.
- Created Two models : One for TaskList and another one for tasks.
- Referenced TaskList in tasks using TaskList ObjectId.
- Created Validation functions to validate period and dueDate according to period and periodType.
- Made a apiController file in controller folder to handle all the database associate functions.
- Used the functions from apiController to facilitate functionality of different api routes.
- The createTaskList function accepts requests on the route('api/createtasklist') in the form of:
```
name:String,
description:String,
active:Boolean
```
- The createTask function accepts requests on the route('api/createtask') in the form of:

```
taskName:String,
description:String,
dueDate:String(Date in the form dd-mm-yy it stores it in ISO format in the database),
period:String(only in the form of 'Month Year',
periodType:String(only : ['yearly','quarterly,'monthly']),
taskListId:String,
```
- The listTask function accepts requests on the route('api/tasklist') in the form of :
```
QueryParameters: Both not compulsary 
searchString:String,
page:Number(to get page no),
```
- The above function outputs  accodingly to the queyparameters and the no of documents for a single page is set as 10,It also outputs count of tasks.
- populated the TaskList name while getting the tasklist in the listTask function for the route of 'api/listTask'.
- Tested all queries and routes using Postman also checked for data validation.

