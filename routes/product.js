var express = require('express');
var router = express.Router();
var db = require('../FirstDB');
var multiparty = require('multiparty');
require('date-utils');






router.get('/:store', function (req, res, next) {
    var storeNumber = req.params.store;
    db.getProduct2(storeNumber, function (arr) {
        db.getStore(function (arr2) {
            res.render('product', { storeKey : storeNumber, product: arr,store:arr2, title: "퍼스트 오더" });
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




router.post('/updateProduct', function (req, res) {
    var data = req.body.key;
    data = JSON.parse(data);
    data.forEach((item) => {
        var key = item.key;
        var stock = item.stock;
        var olineCount = item.onlineCount;
        db.updateProduct(parseInt(key), parseInt(stock), parseInt(olineCount), function (arr) {
            
        });
    })
    res.send(true);
});



router.post('/updateProduct2', function (req, res) {
    var key = req.body.key;
    var name = req.body.name;
    var count = req.body.count;
    var time = req.body.time;
    var cost = req.body.cost;
    var image = req.body.image;
    console.log(key);
    console.log(name);
    console.log(count);
    console.log(time);
    console.log(cost);
    console.log(image);
    db.updateProduct2(parseInt(key), name, parseInt(count), time, cost, image, function (arr) {

    });

    res.send(true);
});



module.exports = router;
