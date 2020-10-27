
function popup() {
    $('#nameInput').val('');
    $('#phoneNumber').val('');
}
function addUser() {

    var name = $('#nameInput').val();
    var phone = $('#phoneNumber').val();
    var type =  $(":input:radio[name=typeTrue]:checked").val();

    console.log(name);
    console.log(phone);
    console.log(type);
    $.ajax({
        type: 'POST',
        url: '/member/addUser',
        dataType: 'json',
        data: {
            "name": name,
            "phone": phone,
            "type":type
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

