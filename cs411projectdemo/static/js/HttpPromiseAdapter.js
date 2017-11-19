
// import $ from 'jquery'

function HttpPromiseAdapter(opt, postProcess){
    postProcess = postProcess? postProcess: default_post_process;
    return new Promise(function(resolve, reject){
        reject = reject ? reject : default_reject;
        $.ajax(opt).done(function(data) {
            if(data.ErrorMessage){
                console.log(data);
                reject(data);
                return;
            }
            if (data.Result) {
                resolve(postProcess(data.Result));
            } else {
                resolve(postProcess(data));
            }
        }).fail(function(error){
            if (error.responseText) {
                window.alert(error.responseText);
            }
            console.log(error);
        }).fail(reject);
        //
        function default_reject(error) {
            return;
        }
    });
    function default_post_process(data) {
        return data;
    }
}
