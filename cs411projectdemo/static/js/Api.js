// import HttpPromiseAdapter from './HttpPromiseAdapter'
//

var Snoopy = {};
Snoopy.Api = {};

Snoopy.Api.ListUser = function() {
    var opt = {
        method: "POST",
        url: "/GetUsers/"
    };
    return HttpPromiseAdapter(opt, function(data) {
        return data;
    });
}

Snoopy.Api.AddUser = function() {

}
