var express = require('express');
var router = express.Router();
var db = require('../FirstDB');
require('date-utils');


router.get('/', function (req, res, next) {
    db.getUser(function (arr) {

        res.render('member', { member : arr, title: "퍼스트 오더" });
    });
});

router.post('/addUser', function (req, res) {
    console.log(req.body.name);
    console.log(req.body.phone);
    console.log(req.body.type);
    db.addUser(req.body.name, req.body.type, req.body.phone, function (result) {
        res.send(result);
    });

});


router.post('/login', function (req, res) {
    console.log(req.body.id);
    console.log(req.body.pass);

    var id = req.body.id;
    var pass = req.body.pass;
    db.login(id, pass, function (address) {
        if (address == null) {
            console.log("fail");
            res.send({ "address": null });
        }
        else {
            console.log("d : " + address);
            res.send({ "address": address});
        }
    });
    
    //로그인준비하기
});

router.post('/changePass', function (req, res) {
    console.log(req.body.key);
    console.log(req.body.pass);

    var key = parseInt(req.body.key);
    var pass = req.body.pass;
    db.updatePass(key, pass, function (result) {
        res.send(result);      
    });

    //로그인준비하기
});




router.get('/:address', function (req, res, next) {
    console.log("request : " + req.params.address);
    db.chkSession(req.params.address, function (result) {
        console.log("request22 : " + result);
        if (result == null) {
            res.send("세션이 없습니다.");
        } 
        else {
            db.getUser(result, function (userInfo) {
                if (userInfo == null) {
                    res.send("error");
                }
                db.getWorkList(result, function (workList) {
                    if (workList == null) {
                        res.send("error");
                    }
                    console.log(workList);
                    res.render('missionList', { user: userInfo, work: workList, address: req.params.address});
                });
            });
            
        }
    });
});

router.get('/:address/:work', function (req, res, next) {
    console.log("request : " + req.params.address);
    console.log("request : " + req.params.work);
//    res.send("하하하");
   // var d = Date.parse("2020-03-01 20:38:49");

  //  console.log(d);
    var c = new Date(parseInt(req.params.work)*1000);
    var workName = c.toFormat('YYYY-MM-DD HH24:MI:SS');
    //console.log("request : " + req.params.address);
    //console.log("request : " + workName);
    db.chkSession(req.params.address, function (result) {
        //console.log("request22 : " + result);
        if (result == null) {
            res.send("세션이 없습니다.");
        }
        else {
            db.getUser(result, function (userInfo) {
                if (userInfo == null) {
                    res.send("error");
                }
            
                re.chkData(userInfo.key, workName, function (chkResult) {
                    db.getWork(result, workName, function (workList) {
                        console.log(workList.work);
                        res.render('problemList', { user: userInfo, work: JSON.parse(workList.work), address: req.params.address, regTime: workList.regTime });
                    });
                 });

                    
                
            });

        }
    });

   
});



module.exports = router;
