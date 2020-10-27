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

router.get('/:store', function (req, res, next) {
    var storeNumber = req.params.store;
    db.getProduct2(storeNumber,function (arr) {
        db.getStore(function (arr2) {
            arr3 = []
            now = getTimeStamp();
            for (var i = 0; i < arr.length; i++) {
                if (now<arr[i].EndTime) {
                    arr3.push(arr[i]);
                }
            }
            time = getTime();
            res.render('firstOrder', { storeKey: storeNumber, product: arr3,store:arr2, title: "퍼스트 오더", time:time, now:now });
        });
        
    });
});

router.post('/addImage', function (req, res) {
    console.log("start1");
    var form = new multiparty.Form({
        autoFiles: false, // 요청이 들어오면 파일을 자동으로 저장할 것인가
        uploadDir: 'public/contentsImage', // 파일이 저장되는 경로(프로젝트 내의 temp 폴더에 저장됩니다.)
        maxFilesSize: 1024 * 1024 * 5 // 허용 파일 사이즈 최대치
    });
    console.log("start");
    form.parse(req, function (error, fields, files) {
        console.log(files);
        var path = files.fileInput[0].path;
        res.send(path);
    });
});
router.post('/addProduct', function (req, res) {
    console.log(req.body.name);
    console.log(req.body.count);
    console.log(req.body.image);
    console.log(req.body.storeNumber);
    console.log(req.body.storeName);
    console.log(req.body.cost);
    console.log(req.body.time);    
    db.addProduct(req.body.name, req.body.time, req.body.storeNumber, req.body.storeName, req.body.count, req.body.cost, req.body.image  ,function (arr) {
        res.send(true);    
    });
});


module.exports = router;
