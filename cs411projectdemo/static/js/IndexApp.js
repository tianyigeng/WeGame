
$(function() {
    console.log(Snoopy.Api);
    Snoopy.Api.ListUser().then(function(data) {
        console.log(data);
        var trs = data.map(function(item) {
            var tr = $('<tr></tr>');
            tr.append($('<td></td>').text(item.uid));
            tr.append($('<td></td>').text(item.name));
            var action = $('<a class="btn btn-danger">Delete</a>').attr('href', '/deleteuser/' + item.uid)
            tr.append($('<td></td>').append(action));
            return tr;
        });
        $("#tbody").append(trs);
    });
});
