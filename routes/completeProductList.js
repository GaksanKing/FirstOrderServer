var express = require('express');
var router = express.Router();
var db = require('../FirstDB');
var multiparty = require('multiparty');
require('date-utils');



router.get('/:number', function (req, res, next) {
    var phone = req.params.number;
    db.getCompleteProduct(phone, function (arr) {
        
            res.render('completeProductList', { product: arr, title: "퍼스트 오더"});

    });
});



module.exports = router;
