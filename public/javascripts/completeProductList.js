function setNumber(number) {

    $('#phone').text(number);
    $('#productList').attr("href", "/showProduct/" + number);
    $('#buyList').attr("href", "/myPurchaseList/" + number);
    $('#completeList').attr("href", "/completeProductList/" + number);

}