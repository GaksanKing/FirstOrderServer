function addHomework() {
    var select = document.getElementById("homeworkType");
    var value = select.options[document.getElementById("homeworkType").selectedIndex].value;
    //console.log(value);
    var tbody = document.getElementById("my_tbody");
    var row = tbody.insertRow();
    row.setAttribute("class", "my_tr");
    //var data = tbody.rows.length;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "<p>" + value + "</p>";
    cell2.innerHTML = "<input type='text' class='form-control' name='my_contents'>";
    if(value=='A') {
        cell3.innerHTML = "<input type='checkbox' disabled >";
    }
    else {
        cell3.innerHTML = "<input type='checkbox'>";
    }
    cell4.innerHTML = "<button type='button' class='btn btn-danger' onclick='deleteRow(this)'>삭제</button>";

}

function showReport(id, date, index) {
    $("#deleteBtn").show();
    $("#h_date").css('visibility', 'visible');
    $.ajax({
        type : 'post',
        url : 'showStudent/getHomework',
        data : {
            id : id,
            date : date
        },
        dataType : 'json',
        error: function(xhr, status, error){
            alert(error);
        },
        success : function(data){
            //console.log(data[0]);
            index = index+1;
            $("#h_date").text('['+index+'] '+date);
            $("#my_tbody").empty();
            var tbody = document.getElementById("my_tbody");
            for(var i=0; i<data.length; i++) {
                var row = tbody.insertRow();
                row.setAttribute("class", "my_tr");
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var type ;
                if(data[i][0]==0) {
                    type = 'A';
                    if(data[i][2] == true) {
                        cell3.innerHTML = "<input type='checkbox' checked disabled>";
                    }
                    else {
                        cell3.innerHTML = "<input type='checkbox' disabled>";
                    }
                }
                else {
                    type = 'B';
                    if(data[i][2] == true) {
                        cell3.innerHTML = "<input type='checkbox'>";
                    }
                    else {
                        cell3.innerHTML = "<input type='checkbox'>";
                    }
                }
                cell1.innerHTML = "<p>" + type + "</p>";
                cell2.innerHTML = "<input type='text' class='form-control' name='my_contents' value='" + data[i][1] +"'>";
                cell4.innerHTML = "<button type='button' class='btn btn-danger' onclick='deleteRow(this)'>삭제</button>";
            }
        },
    });
}

function deleteRow(btn) {
    var tbody = document.getElementById("my_tbody");
    var row = tbody.rows;
    for(var i=0; i<row.length; i++) {
        if(row[i]==btn.parentElement.parentElement){
            tbody.deleteRow(i);
            break;
        }
        //.getElementsByTagName("td")[0].innerHTML;
        /*if(index == td) {

            break;
        }*/
    }
}

function saveHomework(id) {
    var date =  $("#h_date").text();
    console.log("test : " + " ".charCodeAt(0));
    if (date.charCodeAt(0) == 160) {
        //비었으면 new
        newHomework(id);
    }
    else {
        //update
        var arr = date.split("]");
        date = arr[1].trim();
        updateHomework(id, date);
    }
}

function makeTableData() {
    var data = $(".my_tr");
    var len = data.length;
    var obj = [];
    for(var i =0;i<len;i++){
        //console.log(data[i].children[0].innerText);
        //console.log(data[i].children[1].children[0].value);
        //console.log(data[i].children[2].children[0].checked);
        var type;
        if(data[i].children[0].innerText=="A") {
            type = 0;
        }
        else {
            type = 1;
        }
        var contents = data[i].children[1].children[0].value;
        var check = data[i].children[2].children[0].checked;
        obj.push([type, contents, check]);
    }
    var jsonObj = JSON.stringify(obj);
    console.log(jsonObj);
    return jsonObj;
}

function updateHomework(id, date) {
    var jsonObj = makeTableData();
    console.log("updateeeeeeee" + jsonObj);
    $.ajax({
        type : 'post',
        url : 'showStudent/updateHomework',
        data : {
            id : id,
            date : date,
            jsonObj : jsonObj
        },
        dataType : 'json',
        error: function(xhr, status, error){
            alert(error);
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
}

function newHomework(id) {
    var jsonObj = makeTableData();
    $.ajax({
        type : 'post',
        url : 'showStudent/newHomework',
        data : {
            id : id,
            jsonObj : jsonObj
        },
        dataType : 'json',
        error: function(xhr, status, error){
            alert(error);
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
}

function clickNewBtn() {
    $("#h_date").css('visibility', 'hidden');
    $("#my_tbody").empty();
    $("#deleteBtn").hide();
}

function registerId(key) {
    var id =  $("#studentId").val();
    $.ajax({
        type : 'post',
        url : 'showStudent/register',
        data : {
            key : key,
            id : id
        },
        dataType : 'json',
        error: function(xhr, status, error){
            alert(error);
        },
        success : function(data){
            if(data == true){
                alert("저장 성공");
                window.location.reload();
            }
            else{
                alert("저장 실패");
            }
        },
    });
}

function deleteHomework(id) {
    var date =  $("#h_date").text();
    var arr = date.split("]");
    date = arr[1].trim();
    console.log(date);
}