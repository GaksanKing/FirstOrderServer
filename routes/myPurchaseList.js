var express = require('express');
var router = express.Router();
var db = require('../FirstDB');
var multiparty = require('multiparty');
require('date-utils');



router.get('/:number', function (req, res, next) {
    var phoneNumber = req.params.number;
    db.getBuyProduct(phoneNumber, function (arr) {

        db.getStore(function (arr2) {
            console.log(arr2);
            res.render('myPurchaseList', { product: arr, store: JSON.stringify(arr2), title: "퍼스트 오더" });
        });
    });
});


module.exports = router;
