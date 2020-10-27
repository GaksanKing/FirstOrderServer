
var selectStore = null;
function popup() {
    selectStore = null;
    $('#storeTitle').html("지점 추가");
    $('#nameInput').val('');
    $('#gpsInput').val('');
}
function updateStore(store, name, gps) {
    $('#storeTitle').html("지점 수정");
    console.log(store);
    selectStore = store;
    $('#nameInput').val(name);
    $('#gpsInput').val(gps);

}
function addStore() {

    var name = $('#nameInput').val();
    var gps = $('#gpsInput').val();
    console.log(name);
    if (selectStore != null) {
        $.ajax({
            type: 'POST',
            url: '/store/setStore',
            dataType: 'json',
            data: {
                "store": selectStore,
                "name": name,
                "pos": gps
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
    else {
        $.ajax({
            type: 'POST',
            url: '/store/addStore',
            dataType: 'json',
            data: {
                "name": name,
                "pos": gps
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

}


