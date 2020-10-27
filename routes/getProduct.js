var express = require('express');
var router = express.Router();
var db = require('../FirstDB');
var multiparty = require('multiparty');
require('date-utils');


router.get('/:key', function (req, res, next) {
    var storeNumber = req.params.key;
    res.render('getProduct', { storeKey : storeNumber, title: "퍼스트 오더" });
});


router.get('/barcode/:code', function (req, res, next) {
  
    db.getProductByBarcode(req.params.code, function (d) {
        console.log("request : " + d);
        res.send(d);
    });
    
});

router.post('/completeProduct', function (req, res) {
    console.log(req.body.code);
    db.completeProduct(req.body.code, function (d) {
        res.send(true);
    });
    
});






module.exports = router;
