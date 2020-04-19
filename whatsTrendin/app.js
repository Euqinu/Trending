const express= require('express');
const bodyParser=require('body-parser');
const route=require('./routes/routes');


const app=express();

app.set('view engine','ejs');
app.use(express.static('public'));

app.use('/',route);

app.listen(3000,(req,res)=>{
    console.log("server is runnin on port 3000");
});