
var imageInfo;
var storeNumber;
var storeName;
var productClickId;

$(document).ready(function () {
    $("#imageAppend").on("change", handleImgFileSelect);

    var my_stock = 0;
    var pre_online = 0;
    $("input[name=input_onlineCount]").focusin(function () {
        var s = parseInt($(this)[0].parentElement.parentElement.children[5].innerText);
        var o = parseInt($(this).val());
        pre_online = o;
        my_stock = s + o;
    });

    $("input[name=input_onlineCount]").focusout(function() {
        var onlineCount = $(this).val();
        var stock = $(this)[0].parentElement.parentElement.children[5].innerText;
        onlineCount = parseInt(onlineCount);
        $(this).val(onlineCount);
        stock = parseInt(stock);

        if (onlineCount > stock + pre_online) {
            alert("재고 수량보다 큰 값을 입력할 수 없습니다.");
            $(this).val(pre_online);
        }
        else {
            $(this)[0].parentElement.parentElement.children[5].innerText = my_stock-onlineCount;
        }
    });
});

function save() {
    var tbody = $("#my_tbody")[0];
    var data = tbody.children;

    var jsonArr = [];
    for (var i = 0; i < data.length; i++) {
        var jsonData = new Object();
        jsonData.key = data[i].children[0].innerText;
        jsonData.stock = data[i].children[5].innerText;
        jsonData.onlineCount = data[i].children[7].children[0].value;
        jsonArr.push(jsonData);
    }
    jsonArr = JSON.stringify(jsonArr);

    $.ajax({
        type: 'POST',
        async: false,
        url: '/product/updateProduct',
        data: {key : jsonArr },
        error: function (xhr, status, error) {
            alert("실패");
        },
        success: function (data) {
            alert("저장 성공");
            location.reload();
        },
    });
}

function handleImgFileSelect(e) {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    console.log(files);
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        $("#productImage").attr("src", event.target.result);
    });
    reader.readAsDataURL(files[0]);
    imageInfo = files[0];
  
}

function clickStore(store, name) {
    console.log(store);
    console.log(name);
    storeNumber = store;
    storeName = name;
    $('#dropdownMenuLink').text('[' + store+'] '+name);
}

function productPop(path,name) {
    $('#productName').text(name);
    $('#productInfo').show();
    $('#appendModal').hide();
    $('#exampleModal').modal('show');
    path = path.split("public/")[1];
    $("#proImage").attr("src", location.host+"/"+path);
}

function setInfo(id, name, store, count, cost, date, path) {
    console.log(store);
    productClickId = id;
    path = path.split("public/")[1];
    var dateControl = document.querySelector('input[type="datetime-local"]');
    //console.log(dateControl.value);
    dateControl.value = date;
    $('#productInfo').hide();
    $('#appendModal').show();
    $('#nameInput').val(name);
    $('#countInput').val(count);
    $('#cost').val(cost);

    $("#productImage").attr("src", "http://"+location.host + "/" + path);
    $('#dropdownMenuLink').text(store);
    imageInfo = null;
    storeNumber = null;
    storeName = null;
}


function popup() {
    var dateControl = document.querySelector('input[type="datetime-local"]');
    //console.log(dateControl.value);
    dateControl.value = "";
    $('#productInfo').hide();
    $('#appendModal').show();
    $('#nameInput').val('');
    $('#countInput').val('');
    $('#cost').val('');
    $("#productImage").attr("src", "http://" + location.host + "/" +"images/camera.png");
    $('#dropdownMenuLink').text('매장선택');
    imageInfo = null;
    storeNumber = null;
    storeName = null;
    productClickId = null;
}
function addProduct() {
 
    if (productClickId != null) {

        var name = $('#nameInput').val();
        var count = $('#countInput').val();
        var cost = $('#cost').val();
        var dateControl = document.querySelector('input[type="datetime-local"]');
        var last = dateControl.value;
        var imagePath = null;
        if (imageInfo != null) {

            var formData = new FormData();
            formData.enctype = 'multipart/form-data';
            formData.append("fileInput", imageInfo, imageInfo.name);

            $.ajax({
                type: 'POST',
                async: false,
                url: '/product/addImage',
                data: formData,
                processData: false,
                contentType: false,
                error: function (xhr, status, error) {
                    alert("실패");
                },
                success: function (data) {
                    imagePath = data;
                },
            });


        }

       
        $.ajax({
            type: 'POST',
            url: '/product/updateProduct2',
            dataType: 'json',
            data: {
                "key": productClickId,
                "name": name,
                "count": count,
                "image": imagePath,
                "cost": cost,
                "time": last,
            },
            success: function (result) {
                console.log("성공 " + result);
                location.reload();
            },
            error: function (xhr, status, error) {
                console.log("실패");
            }
        });
        return;
    }
    if (imageInfo == null || storeNumber == null || storeName == null) {
        return;
    }

    var formData = new FormData();
    formData.enctype = 'multipart/form-data';
    formData.append("fileInput", imageInfo, imageInfo.name);
    var imagePath = null;
    $.ajax({
        type: 'POST',
        async: false,
        url: '/product/addImage',
        data: formData,
        processData: false,
        contentType: false,
        error: function (xhr, status, error) {
            alert("실패");
        },
        success: function (data) {
            imagePath = data;    
        },
    });
    
    if (imagePath == null) {
        return;
    }


    var name = $('#nameInput').val();
    var count = $('#countInput').val();
    var cost = $('#cost').val();
    var dateControl = document.querySelector('input[type="datetime-local"]');
    var last = dateControl.value;
    
    $.ajax({
        type: 'POST',
        url: '/product/addProduct',
        dataType: 'json',
        data: {
            "name": name,
            "count": count,
            "image": imagePath,
            "storeNumber": storeNumber,
            "storeName": storeName,
            "cost": cost,
            "time" : last,
        },
        success: function (result) {
            console.log("성공 " + result);
            location.reload();
        },
        error: function (xhr, status, error) {
            console.log("실패");
        }
    });


}

function imageButton() {
    document.getElementById("imageAppend").click();
    //$("#imageAppend").trigger("click");
}


$(function () {
    $('#changePassModal').on('show.bs.modal', function (event) {
        $('#pass1')[0].value = "";
        $('#pass2')[0].value = "";        
        var t = $('#errMsg')[0];
        t.innerText = "";
    })

   /* $('#closePass').click(function () {
        console.log("sdfsdf");
        $('body')[0].style.padding = "0px";
    });*/
    $('#savePass').click(function () {
        if ($('#pass1')[0].value == "") {
            var t = $('#errMsg')[0];
            t.innerText = "비밀번호를 입력하세요";
        }
        else if ($('#pass1')[0].value != $('#pass2')[0].value) {
            var t = $('#errMsg')[0];
            t.innerText = "두 개의 비밀번호가 다릅니다.";
        }
        else if ($('#pass1')[0].value.length < 4) {
            var t = $('#errMsg')[0];
            t.innerText = "4글자이상 입력하세요.";
        }
        else {

            $('#changePassModal').modal('hide');
            var pass = $('#pass1')[0].value;
            $.ajax({
                type: 'POST',
                url: '/mission/changePass',
                dataType: 'json',
                data: {
                    "key": key,
                    "pass": pass
                },
                success: function (result) {
                    console.log("변경결과 : " + result);
                },
                error: function (xhr, status, error) {
                    console.log("변경실패");
                }
            });

        }

    });

});

