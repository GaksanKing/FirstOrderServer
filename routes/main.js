var express = require('express');
var router = express.Router();
var db = require('../FirstDB');
require('date-utils');


router.get('/', function (req, res, next) {

    db.getStore(function (arr2) {
        res.render('main', { store: arr2 , title: "퍼스트 오더" });
    });

});


module.exports = router;
