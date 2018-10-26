'use strict';

const express = require('express');
const router = express.Router();

const Helper = require('../models/helper.js');
const Victim = require('../models/victim.js');

let https = require ('https');

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the accessKey string value with your valid access key.
let accessKey = '840cc8c3afcc4edb9e6910b408eff236';

// Replace or verify the region.

// You must use the same region in your REST API call as you used to obtain your access keys.
// For example, if you obtained your access keys from the westus region, replace
// "westcentralus" in the URI below with "westus".

// NOTE: Free trial access keys are generated in the westcentralus region, so if you are using
// a free trial access key, you should not need to change this region.

var emotin = "";
var flg=true;
let uri = 'eastus.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/sentiment';
let response_handler =  function (response) {
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
        let body_ = JSON.parse (body);
        //var body__ = JSON.stringify (body_, null, '  ');
        console.log(body_.documents[0].score);
        emotin=body_.documents[0].score;
        flg=false;
        //console.log(emotin);
    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

let get_sentiments =  function (documents) {
    let body = JSON.stringify (documents);

    let request_params = {
        method : 'POST',
        hostname : uri,
        path : path,
        headers : {
            'Ocp-Apim-Subscription-Key' : accessKey,
        }
    };
    let req = https.request (request_params, response_handler);
    req.write (body);
    req.end ();
}



router.get('/getHelp',function(req,res,next){
    //console.log("gettttt");
    Victim.find({}).then(function(details){
        res.send(details);
    });
});

router.get('/getVerifiedHelp',function(req,res,next){
    Victim.find({status:true}).then(function(details){
        res.send(details);
    });
});

router.get('/getNotVerifiedHelp',function(req,res,next){
    Victim.find({status:false}).then(function(details){
        res.send(details);
    });
});

router.get('/getHelpByMobile/:id',function(req,res,next){
    Victim.find({contact:req.params.id}).then(function(details){
        res.send(details);
    });
});


router.get('/deleteById/:id',function(req,res,next){
    Victim.findByIdAndDelete({_id:req.params.id}).then(function(details){
        res.send(details);
    }).catch(next);
});

router.post('/addHelper',function(req,res,next){
    Helper.create(req.body).then(function(details){
        res.send(details);
    }).catch(next);
});

router.post('/addHelp',async function(req,res,next){
	let documents = { 'documents': [
		{'id': '1', 'language': 'en', 'text': req.body.probDesc}
	]}
	
    await get_sentiments(documents);
    setTimeout(function(){ 
        Victim.create({
            probTitle:req.body.probTitle,
            probType:req.body.probType,
            probDesc:req.body.probDesc,
            emotion:emotin,
            status:req.body.status,
            victimName:req.body.victimName,
            location:req.body.location,
            contact:req.body.contact,
            email:req.body.email
            }).then(function(details){
                res.send(details);
            }).catch(next);
     }, 8000);  
});

module.exports = router;

