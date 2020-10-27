function productImage(id, path, name) {
    $('#productName').text(name);
    $('#productInfo').show();
    $('#appendModal').hide();
    $('#exampleModal').modal('show');
    if (window.location.href.includes('myPurchaseList')) {
        path = window.location.href.split("myPurchaseList")[0] + path.split("public/")[1];
    }
    else {
        path = window.location.href.split("completeProductList")[0] + path.split("public/")[1];
    }

    $("#" + id).attr("src", path);

}

function createBarcode(code, idx) {
    $("#bcTarget" + idx).barcode(code, "code128",{barWidth:1,barHeight:30,fontSize:10});
    

}

function clickStore(name ) {
    for (var i = 0; i < store.length; i++) {
        if (store[i].Name == name) {
            console.log(store[i].GPS);
            window.android.gps(store[i].GPS);
            break;
        }
    }
}

function openModal(d, code) {
    var node = d.cloneNode(true);
    var b = node.getElementsByClassName("barcode")[0];    
    
    //
    b.style.display = "block";
    while (b.childNodes[1].firstChild) {
        b.childNodes[1].removeChild(b.childNodes[1].lastChild);
    }
    $(b).barcode(code+"", "code128", { barWidth: 2, barHeight: 50, fontSize: 15 });
    $('#exampleModalCenter').modal("show");
    $("#mbody").html(node);

}

function setNumber(number) {

    $('#phone').text(number);
    $('#productList').attr("href", "/showProduct/" + number);
    $('#buyList').attr("href", "/myPurchaseList/" + number);
    $('#completeList').attr("href", "/completeProductList/" + number);

}
