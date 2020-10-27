var MongoClient = require('mongodb').MongoClient;
require('date-utils');
var url = "mongodb://localhost:27017/";
const crypto = require('crypto');
var orderDB;
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    orderDB = db.db("FirstOrder");
});


//이름, 저소득유무, 
exports.addUser = function (name, type, phoneNumber, callback) {
    var myobj = { Name: name, Type: type, Phone: phoneNumber };
    orderDB.collection("User").insertOne(myobj, function (err, res) {
        callback(true);
    });
}

exports.getUser = function (callback) {
    // var number = result.count;
    //var myobj = { Name: name, EndTime: endTime, Store: storeNumber, ProductNumber: number, Buy: -1 };
    orderDB.collection("User").find({}).toArray(function (err, result) {
        if (err) throw err;
        callback(result);
    });
}


exports.addProduct = function (name, endTime, storeNumber, storeName, count, cost, image , callback) {

    orderDB.collection("Product").findOne({ key: "id" }, function (err, result) {
        var number = result.count;
        orderDB.collection("Product").updateOne({ key: "id" }, { $set: { count: number + 1 } }, function (err, result) { });
        var myobj = { Name: name, EndTime: endTime, Store: storeNumber, ProductNumber: number, StoreName: storeName, OfflineCount: count, OfflineSell: 0, OnlineCount: 0, OnlineSell: 0, Cost:cost, Image: image };
        orderDB.collection("Product").insertOne(myobj, function (err, res) {
            callback(true);
        });
    });
}

exports.addStore = function (name, gps, callback) {

    orderDB.collection("Store").findOne({ key: "id" }, function (err, result) {
        var number = result.count;
        orderDB.collection("Store").updateOne({ key: "id" }, { $set: { count: number + 1 } }, function (err, result) { });
        var myobj = { Name: name, GPS: gps, Store: number };
        orderDB.collection("Store").insertOne(myobj, function (err, res) {
            callback(true);
        });
    });
}


exports.updateStore = function (store, name, gps, callback) {
    store = parseInt(store)
    orderDB.collection("Store").updateOne({ Store: store }, { $set: { Name: name, GPS:gps } }, function (err, result2) {
        callback(true);
    });
}



exports.buyProduct = function (productNumber, phoneNumber, callback) {
    // var number = result.count;
    //var myobj = { Name: name, EndTime: endTime, Store: storeNumber, ProductNumber: number, Buy: -1 };
    orderDB.collection("Product").findOne({ ProductNumber: productNumber }, function (err, result) {
        if (result.OnlineCount > 0) {
            result.OnlineCount--;
            result.OnlineSell++;
            orderDB.collection("Product").updateOne({ ProductNumber: productNumber }, { $set: { OnlineCount: result.OnlineCount, OnlineSell: result.OnlineSell } }, function (err, result2) {
                var key = Date.now() + "";
                key = key + productNumber;
                var myobj = { User: phoneNumber, ProductInfo: result, Get: 0, code: key};
                orderDB.collection("BuyProduct").insertOne(myobj, function (err, res) { });
                callback(true);
            });
        }
        else {
            callback(false);
        }
    });
}


exports.getBuyProduct = function (phoneNumber, callback) {
    orderDB.collection("BuyProduct").find({ "User": phoneNumber, Get:0 }).toArray(function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

exports.completeProduct = function (barcodeNumber, callback) {
    orderDB.collection("BuyProduct").updateOne({ "code": barcodeNumber }, { $set: { Get:1} }, function (err, result2) {        
        callback(true);
    });
}



exports.getCompleteProduct = function (phoneNumber, callback) {
    orderDB.collection("BuyProduct").find({ "User": phoneNumber, Get: 1 }).toArray(function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

exports.getProductByBarcode = function (barcodeNumber, callback) {
    orderDB.collection("BuyProduct").findOne({ "code": barcodeNumber } , function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

exports.updateProduct = function (productNumber, stock, onlineCount, callback) {
    orderDB.collection("Product").updateOne({ ProductNumber: productNumber }, { $set: { OfflineCount:stock, OnlineCount:onlineCount} }, function (err, result) { });
    callback(true); 
}

//   var myobj = { Name: name, EndTime: endTime, Store: storeNumber, ProductNumber: number, StoreName: storeName, OfflineCount: count, OfflineSell: 0, OnlineCount: 0, OnlineSell: 0, Cost:cost, Image: image };
exports.updateProduct2 = function (productNumber, name, count, time, cost, image, callback) {
    orderDB.collection("Product").findOne({ ProductNumber: productNumber }, function (err, result) {
        var offCount = count - result.OnlineCount
        if (image != "") {
            orderDB.collection("Product").updateOne({ ProductNumber: productNumber }, { $set: { Name: name, EndTime: time, Cost: cost, OfflineCount: offCount, Image: image } }, function (err, result) { });
        }
        else {
            orderDB.collection("Product").updateOne({ ProductNumber: productNumber }, { $set: { Name: name, EndTime: time, OfflineCount: offCount, Cost: cost } }, function (err, result) { });
        }
        callback(true);
    });   
    
}



exports.getProduct2 = function (storeNumber, callback) {
    // var number = result.count;
    //var myobj = { Name: name, EndTime: endTime, Store: storeNumber, ProductNumber: number, Buy: -1 };
    orderDB.collection("Product").find({
        "Name": { $exists: true },"Store" : storeNumber}).sort({"EndTime":1}).toArray(function (err, result) {
        if (err) throw err;
        callback(result);
    });
}
exports.getProduct = function (callback) {
    // var number = result.count;
    //var myobj = { Name: name, EndTime: endTime, Store: storeNumber, ProductNumber: number, Buy: -1 };
    orderDB.collection("Product").find({
        "Name": { $exists: true } }).sort({ "EndTime": 1 }).toArray(function (err, result) {
        if (err) throw err;
        callback(result);
    });
}


exports.getProductOne = function (number, callback) {
    // var number = result.count;
    //var myobj = { Name: name, EndTime: endTime, Store: storeNumber, ProductNumber: number, Buy: -1 };
    orderDB.collection("Product").find({ "ProductNumber": parseInt(number) }).toArray(function (err, result) {
        if (err) throw err;
        callback(result);
    });
}


exports.getStore = function (callback) {
    // var number = result.count;
    //var myobj = { Name: name, EndTime: endTime, Store: storeNumber, ProductNumber: number, Buy: -1 };
    orderDB.collection("Store").find({}).toArray(function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

