var express = require('express');
var router = express.Router();
var db = require('../FirstDB');
var multiparty = require('multiparty');
require('date-utils');


function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}


function getTimeStamp() {
    var d = new Date();

    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2) + 'T' +

        leadingZeros(d.getHours(), 2) + ':' +
        leadingZeros(d.getMinutes(), 2);

    return s;
}


function getTime() {
    var d = new Date();
    d.setHours(d.getHours() + 3);
    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2) + 'T' +

        leadingZeros(d.getHours(), 2) + ':' +
        leadingZeros(d.getMinutes(), 2);


    return s;

}


router.get('/:number', function (req, res, next) {
    db.getProduct(function (arr) {
        db.getStore(function (arr2) {
            arr3 = []
            now = getTimeStamp();
            for (var i = 0; i < arr.length; i++) {
                if (now < arr[i].EndTime) {
                    arr3.push(arr[i]);
                }
            }
            time = getTime();

            res.render('showProduct', { product: arr3, store: arr2, title: "퍼스트 오더", time:time });
        });
    });
});


router.get('/product/:number', function (req, res, next) {
    var number = req.params.number;
    db.getProductOne(number, function (r) {
        res.render('productone', { product: r, title: "퍼스트 오더" });
    });
    
});

router.post('/requestProduct', function (req, res) {
    db.getProduct(function (arr) {
        arr3 = []
        now = getTimeStamp();
        for (var i = 0; i < arr.length; i++) {
            if (now < arr[i].EndTime) {
                arr3.push(arr[i]);
            }
        }
        res.send(arr3);
    })
    
});

module.exports = router;
