$(function(){
	init();
});

function init() {

    var param = { funcNo: 2001 };
    request(param, function(data) {
        var flag = data.flag;
        var error_info = data.error_info;

        if (flag == "1") {//��ȷ
            var result = data.results[0];
        } else {//����
            Alert(error_info);
        }
    });
}
