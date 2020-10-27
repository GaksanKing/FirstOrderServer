var express = require('express');
var router = express.Router();
var db = require('../FirstDB');
var multiparty = require('multiparty');
require('date-utils');



router.post('/buyProduct', function (req, res) {
    console.log(req.body.phone);
    console.log(req.body.product);
    var phone = req.body.phone;
    var productNumber = req.body.product;
    
     db.buyProduct(parseInt(productNumber), phone, function (r) {
         res.send(r);    
    });
});



module.exports = router;
