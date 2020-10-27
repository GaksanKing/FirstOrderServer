
var phoneNumber;
function setNumber(number) {

    $('#phone').text(number);
    phoneNumber = number;
}


function buyProduct(productNumber) {
    
     $.ajax({
        type: 'POST',
        async: false,
        url: '/productone/buyProduct',
        data: {
            phone : phoneNumber,
            product : productNumber
        },
        error: function (xhr, status, error) {
            alert("실패");
        },
        success: function (data) {
            if (data == true) {
              //  alert("구매 성공!")
                window.location.href = "/showProduct/" + phoneNumber;
            }
            else {
             //   alert("구매 실패!")
                window.location.href = "/showProduct/" + phoneNumber;
            }
        },
    });
}