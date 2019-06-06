require('./models/db');

const listroute=require('./router_folder/listRouter');
const bodyparser=require('body-parser');

const express=require('express');

const exphbs=require('express-handlebars');

const path=require('path');
var app=express();

app.set('views',path.join(__dirname,'/views/'));

app.engine('hbs',exphbs({ extname:'hbs', defaultLayout:'mainLayout',layoutsDir:__dirname +'/views/layouts/'}));
app.set('view engine','hbs');


app.use(bodyparser.urlencoded({
  extended:true
}));

app.use(bodyparser.json());
app.listen(3000,()=>{
  console.log('Express server started at port : 3000');
});

app.use('/contactlist',listroute);
