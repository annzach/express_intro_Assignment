const express = require('express');
const app = express();
const PORT = 8080;





app.get('/cats', (req, res,next) => {
  req.flavor ="blueberry";
  next();
},(req,res,next) =>{
  console.log('req.flavor',req.flavor);
  res.send();
});


app.use('/',function (req,res,next) => {
 console.log("Req url:",req.originalUrl);
  
});

app.get('/timestamp',(req,res) => {
  //res.send('helloworld');
  res.send({timestamp:Date.now() });

});

