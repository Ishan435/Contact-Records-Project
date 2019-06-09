const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/List_db1',{useNewUrlParser: true},(err)=>{
if(!err){console.log('Mongodb connection succeeded.');}
else{console.log('Error in connecting to mongodb:' +err);}});


require('./list.model');
