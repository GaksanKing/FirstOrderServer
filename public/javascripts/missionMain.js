
function login() {
    var name = $('#inputName');
    var pass = $('#inputPass');
    if (name[0].value == "" || pass[0].value == "") {
        alert("이름과 비밀번호를 입력하세요");
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/mission/login',
        dataType: 'json',
        data: {
            "id": name[0].value,
            "pass": pass[0].value
        },
        success: function (result) {
            if (result.address == null) {
                alert("로그인 실패");
                return;
            }
            console.log(result.address);
            location.href = "/mission/"+result.address;

        },
        error: function (xhr, status, error) {
            console.log("로그인실패");
        }

    });

}

$(function () {
    $('#login').click(login);
});