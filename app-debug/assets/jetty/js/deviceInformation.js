$(function(){
	init();
});

function init() {

    var param = { funcNo: 1029 };
    request(param, function(data) {
        var flag = data.flag;
        var error_info = data.error_info;

        if (flag == "1") {//正确
            var result = data.results[0];
            //保存需要的数据
            $("#imei").html(result.imei);
            $("#FWversion").html(result.fwversion);
            $("#manufacturer").html(result.manufacture);
                 
        } else {//错误
            Alert(error_info);
        }
    });
    
	//$("#imei").html($.session.get("imei"));
	//$("#FWversion").html($.session.get("fwversion"));
}
