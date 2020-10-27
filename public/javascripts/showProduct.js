
$(document).ready(function () {
    var div = $('div[name=stockDiv]');
    var data = p;
    console.log(data);
});

function productImage(id, path, name) {
    $('#productName').text(name);
    $('#productInfo').show();
    $('#appendModal').hide();
    $('#exampleModal').modal('show');
    path = window.location.href.split("showProduct")[0]  +  path.split("public/")[1];
    $("#" + id).attr("src", path);
   
}

function setNumber(number) {

    $('#phone').text(number);
    $('#productList').attr("href","/showProduct/"+number);
    $('#buyList').attr("href", "/myPurchaseList/" + number);
    $('#completeList').attr("href", "/completeProductList/" + number);

}