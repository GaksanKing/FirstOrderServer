
$(".userElement").click(function(){
    var getId = $(this).attr('id');
    var form = document.createElement('form');
    form.name = 'userForm';
    form.method = 'post';
    form.action = '/showStudent';
    var input = document.createElement('input');
    input.setAttribute("value", getId);
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "id");
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
});

$("#addUserForm").submit(function (event) {
    event.preventDefault();
    var queryString = $(this).serialize() ;
    $.ajax({
        type : 'post',
        url : '/adduser',
        data : queryString,
        dataType : 'json',
        error: function(xhr, status, error){
            alert(error);
            $("#toast").toast('show');
        },
        success : function(data){
            if(data == true){
                alert("추가 성공");

                window.location.reload();
            }
            else{
                alert("추가 실패");
            }
        },
    });
})
