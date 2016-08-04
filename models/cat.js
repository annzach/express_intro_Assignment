const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const dataFilePath= path.join(__dirname,'../data/cats.json');


                      exports.getAll =function (cb){

                      //1.read the json file , to gget the data
                      //2. parse the data to get the array
                      //3. calll back with the array
                      //if(err, callback with error )

                      fs.readFile(dataFilePath ,(err,buffer) => {
                              if(err) return cb(err);
                               let cats;
                              try {
                               cats = JSON.parse(buffer);
                               }
                               catch(err){
                                cb(err);
                                return;
                                  //cats=[];
                                  //return cb(err);
                               }
                      // we have cats now
                         cb(null,cats);
                      });
                      }

              exports.create =function(catObj,cb){
                    exports.getAll(function(err,cats){
                        if(err) return cb(err);
                        catObj.id= uuid.v4();
                        cats.push(catObj);
                        fs.writeFile(dataFilePath,JSON.stringify(cats),function(err){
                          cb(err);

                      });
                    });
                  }
  
            exports.readOne =function(id,cb)
          {

                      exports.getAll(function(err,cats){
                        if(err) return cb(err);
                        cats.map(value => {
                          if(id === value.id)
                          return  cb(err,value);
                        })
                          return cb(err)

                      });
                    };


            exports.deleteOne =function(id,cb){

              exports.getAll(function(err,cats){
                        if(err) return cb(err);
                        cats.map((value,index) => {
                          if(id === value.id)
                            {
                              console.log(index,value);
                              cats.splice(index,1);
                              fs.writeFile(dataFilePath,JSON.stringify(cats),function(err){
                              cb(err);

                               });
                            }

                          })

                              return cb(err);

                         
                  });
                };   


          exports.editOne = function(id,catBody,cb) {
           
           exports.getAll(function(err,cats){
                        if(err) return cb(err);
                        cats.map((value,index) => {
                          if(id === value.id)
                            {
                              console.log(catBody);
                              console.log(index,value);
                              cats.splice(index,1);
                              catBody.id=value.id;
                              cats.push(catBody);
                              fs.writeFile(dataFilePath,JSON.stringify(cats),function(err){
                              cb(err);
                              });                       
                          }
        });
                       return cb(err);
      
       });
    };