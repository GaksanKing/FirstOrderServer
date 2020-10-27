
var selectCode;

$(document).ready(function () {
    selectCode = null;
    $("#barcodeInput").keypress(function (e) {
        if (e.which == 13) {
            requestProduct(); 
        }
    });
    $("#barcodeInput").focus();
});

function complete() {
    if (selectCode != null) {    

        $.ajax({
            type: 'POST',
            async: false,
            url: '/getProduct/completeProduct',
            data: {
                code: selectCode
            },
            error: function (xhr, status, error) {
                alert("실패");
            },
            success: function (data) {
                if (data == true) {
                    alert("수령 성공!")
                }
                else {
                    alert("수령 실패!")
                }
            },
        });


        location.reload();
    }

}



function requestProduct() {
    var code = $("#barcodeInput").val();
    $("#barcodeInput").val("");
    $("#barcodeInput").focus();

    $.ajax({
        type: 'GET',
        url: '/getProduct/barcode/'+code,
        dataType: 'json',        
        success: function (result) {
            
            console.log("변경결과 : " + JSON.stringify(result));
            var name = result.ProductInfo.Name;
            var path = result.ProductInfo.Image;
            var cost = result.ProductInfo.Cost;
            var store = result.ProductInfo.StoreName;
            var endTime = result.ProductInfo.EndTime;
            var code = result.code;
            selectCode = code;
            var g = result.Get;
            if (g == 1) {
                $("#okbtn").css("display", "none");
                $("#noneProduct_div").css("display", "block");
            }
            else {
                $("#noneProduct_div").css("display", "none");
                $("#okbtn").css("display", "block");
            }
            console.log(endTime);
            path = path.split('public')[1];
            $("#productImg").attr("src", path);
            $("#store").val(store);
            $("#productName").val(name);
            $("#productCost").val(cost);
            $("#endTime").val(endTime);
            $("#bcTarget").barcode(code, "code128", { barHeight: 50, fontSize: 15 });
            $("#productInfo_div").css("display", "block");
        },
        error: function (xhr, status, error) {
            console.log("변경실패");
        }
    });



}