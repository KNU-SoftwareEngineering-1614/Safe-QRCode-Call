'use strict'
var express = require('express');
var router = express.Router();
var fs_dir = require('fs');
var fs_entry = require('fs');
var fs = require('fs');

var db_config = require('../config.json');
var db_location = db_config['data_folder_location'] + db_config['data_folder_name'];


/* database */

router.get('/',function(req,res){
    res.send("welcome to custom database!");
});


/* get all user information list as JSON file */
router.get('/list', function (req, res) {
    var result = {};

    if(fs.exists(db_location, function(exists){
        if(exists){
            
            /* read all user */
            fs_dir.readdir(db_location, function(err, items){
                result['list'] = {};
                result['list']['users'] = [];
                result['list']['num'] = 0;

                for(var i=0; i<items.length; i++){
                    var data = fs_entry.readFileSync(db_location + '/' + items[i]);
                    result['list']['users'].push(JSON.parse(data));
                    result['list']['num'] += 1;
                }

                result['success'] = 1;
                res.json(result);
            });
        }else{
            result['success'] = 0;
            result['error'] = 'no db directory';
            res.json(result);
            return;
        }
    }));
 });


 /* get user information as JSON file */
 router.get('/getUser/:username', function(req,res){
    var result = {};
    result['success'] = 0;
    result['data'] = {};

    /* check username exist */
    if(!req.params.username){
        result['error'] = "no username parameter";
        res.json(result);
        return;
    }

    /* read file and return result */
    var path = db_location + '/' + req.params.username + '.json';
    if(fs_entry.readFile(path, function(err, data){
        if(err){
            result['error'] = "there are no file"
            res.json(result);
        }else{
            result['success'] = 1;
            result['data'] = JSON.parse(data);
            res.json(result);
        }
    }));

 });

 /* body must json */
 /* add or update user information */
 router.post('/postUser/:username', function(req, res){
     var result = {};

     /* name and password check */
     if(!req.body["password"] || !req.body["username"]){
         result['success'] = 0;
         result['error'] = 'invalid request';
         res.json(result);
         return;
     }

    /* write to file */
     var path = db_location + '/' + req.params.username + '.json';
     fs_entry.writeFile(path, JSON.stringify(req.body, null, '\t'), "utf8", function(err, data){
         if(err){
            result['success'] = 0;
            result['error'] = 'write failed...';
            res.json(result);
         }else{
            result['success'] = 1;
            res.json(result);
         }
     })
 });


 /* delete user information */
 router.delete('/deleteUser/:username', function(req,res){
     var result = { };

     /* check username exists */
     if(!req.params.username){
         result['success'] = 0;
         result['error'] = "no username parameter";
         res.json(result);
         return;
     }

    /* check file exists and delete file */
     var path = db_location + '/' + req.params.username + '.json';
     fs_entry.exists(path, function(exists){
         if(exists){
            fs_entry.unlink(path, function(err){
                if(err){
                    result['success'] = 0;
                    result['error'] = 'cannot delete file';
                    res.json(result);
                }else{
                    result['success'] = 1;
                    res.json(result);
                }
            })
         }else{
            result['success'] = 0;
            result['error'] = 'there are no file';
            res.json(result);
         }
     })
 });


 router.get('/fakeNum/:qrcode', function(req, res){
     var result = {};

     if(!req.params.qrcode){
        result['success'] = 0;
        result['error'] = 'no qrcode parameter';
        res.json(result);
        return;
     }


     if(fs.exists(db_location, function(exists){
        if(exists){
            /* find */
            fs_dir.readdir(db_location, function(err, items){
                for(var i=0; i<items.length; i++){

                    for(var i=0; i<items.length; i++){
                        var data = fs_entry.readFileSync(db_location + '/' + items[i]);
                        
                        var json = JSON.parse(data);
                        if(json['qr_code'] == req.params.qrcode){
                            result['fake_num'] = json['fake_num'];
                            console.log(result);
                            res.json(result);
                            return;
                        }
                    }

                    /* if cannot find file */
                    result['success'] = 0;
                    result['error'] = 'cannot find';
                    res.json(result);
                }
            });
        }else{
            result['success'] = 0;
            result['error'] = 'there are no db directory';
            res.json(result);
            return;
        }
    }));
 });


module.exports = router;