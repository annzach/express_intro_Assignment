const port =8080;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
let cat = require('./models/cat');
const path = require('path');
const app =express();


//method:GET
//url:/
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
  

app.route('/cats')
  .get((req,res)=> {
  /*  let filepath = path.join(__dirname,'./index.html');
    res.sendFile(filepath);*/
  

  cat.getAll(function(err,cats){
    if(err){
      res.status(400).send(err);
    }
    else{
      res.send(cats);
    }
    
  });
})

  .post((req,res) => {
    //post cats creates new cats
    //res.send('cat created');
    cat.create(req.body, function(err) {
          if(err){
            res.status(400).send(err);

          }
          else{
            res.send();
          }

          });

  });
  app.route('/cats/:id')
      .get((req,res) =>{
        //gets just one cat
          cat.readOne(req.params.id,function(err,data){
          if(err){
            res.status(400).send(err);
          }
          else{
            res.send(data);
          }
          
        });

        //res.send(`here is cat #${req.params.id}`);
      })

      .put((req,res) =>{
        //edits just one cat
          cat.editOne(req.params.id,req.body,function(err,data){
          if(err){
            res.status(400).send(err);
          }
          else{
            res.send(data);
          }
        //res.send(`deleting cat #${req.params.id}`);
      });
        //res.send(`editing cat #${req.params.id}`);
      })


      .delete((req,res) =>{
        //delete just one cat
          cat.deleteOne(req.params.id,function(err,data){
          if(err){
            res.status(400).send(err);
          }
          else{
            res.send(data);
          }
        //res.send(`deleting cat #${req.params.id}`);
      });
      });

 


app.listen(port,err => {
  console.log(err || `server listening to port ${port}`);
});

