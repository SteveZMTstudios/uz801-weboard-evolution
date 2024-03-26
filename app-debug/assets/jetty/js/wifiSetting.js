$(function(){
//	_loadCss("./css/layer.css");
	init();
});
var cn = {
            "fail" : "失败",
            "pass" : "成功",
            "invalidSSID":"SSID长度范围是4~32."
           
        };

var en = {
            "fail": "Fail",
             "pass": "Success",
             "invalidSSID":  "The range of SSID is 4~32."
           
        };
function get_lan_wifiset(m) {
    //获取文字
    var lan = getCookie('language');     //语言版本
    //选取语言文字
    switch (lan) {
        case 'Chinese':
            var t = cn[m];
            break;
        default:
            var t = en[m];
    }

    //如果所选语言的json中没有此内容就选取其他语言显示
    if (t == undefined) t = cn[m];
    if (t == undefined) t = en[m];
  

    if (t == undefined) t = m; //如果还是没有就返回他的标识

    return t;
}
function init(){

    document.getElementById("content2").style.display = "none";
	var wifi_status,ssid_flag,mode;
	var param = {funcNo:1006};
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;
		
		if(flag == "1"){//正确
			var result = data.results[0];
			wifi_status = result.wifi_status;
			ssid_flag = result.ssid_flag;
			mode = result.mode;
			maxSta = result.maxSta;
			initPage(wifi_status,ssid_flag,mode,maxSta);
			if(result.ip){
				$("#ip").html(result.ip);
			}
			if(result.mac){
				$("#mac").html(result.mac);
			}
			if(result.ssid){
				$("#ssid").val(result.ssid);
			}
			if(result.client_num){
				$("#client_num").html(result.client_num   + " /  " + result.maxSta);
			}	
			
		}else{//错误
		    Alert(get_lan_wifiset('fail'));
			Alert(error_info);
		}
	});
}

function initPage(wifi_status,ssid_flag,mode,maxSta){
	if(wifi_status == "0"){//OFF
		$("#status").html("OFF");
	}
//	if(ssid_flag == "0"){//hide
//		$("#ssid_nothidden").removeAttr("checked");
//		$("#ssid_hidden").attr("checked","checked");
//	}
	
}

//$("#select").bind('change', function (e) {
//	if($("#select option:eq(0)").attr("selected") == "selected"){
//		$("#select option").removeAttr("selected");
//		$("#select option:eq(0)").attr("selected","selected");
//	}else if($("#select option:eq(1)").attr("selected") == "selected"){
//		$("#select option").removeAttr("selected");
//		$("#select option:eq(1)").attr("selected","selected");
//	}else if($("#select option:eq(2)").attr("selected") == "selected"){
//		$("#select option").removeAttr("selected");
//		$("#select option:eq(2)").attr("selected","selected");
//	}else if($("#select option:eq(3)").attr("selected") == "selected"){
//		$("#select option").removeAttr("selected");
//		$("#select option:eq(3)").attr("selected","selected");
//	}else if($("#select option:eq(4)").attr("selected") == "selected"){
//		$("#select option").removeAttr("selected");
//		$("#select option:eq(4)").attr("selected","selected");
//	}
//});


//$("#select2").bind('change', function (e) {
//	if($("#select2 option:eq(0)").attr("selected") == "selected"){
//		$("#select2 option").removeAttr("selected");
//		$("#select2 option:eq(0)").attr("selected","selected");
//	}else if($("#select2 option:eq(1)").attr("selected") == "selected"){
//		$("#select2 option").removeAttr("selected");
//		$("#select2 option:eq(1)").attr("selected","selected");
//	}else if($("#select2 option:eq(2)").attr("selected") == "selected"){
//		$("#select2 option").removeAttr("selected");
//		$("#select2 option:eq(2)").attr("selected","selected");
//	}else if($("#select2 option:eq(3)").attr("selected") == "selected"){
//		$("#select2 option").removeAttr("selected");
//		$("#select2 option:eq(3)").attr("selected","selected");
//	}else if($("#select2 option:eq(4)").attr("selected") == "selected"){
//		$("#select2 option").removeAttr("selected");
//		$("#select2 option:eq(4)").attr("selected","selected");
//	}else if($("#select2 option:eq(5)").attr("selected") == "selected"){
//		$("#select2 option").removeAttr("selected");
//		$("#select2 option:eq(5)").attr("selected","selected");
//	}else if($("#select2 option:eq(6)").attr("selected") == "selected"){
//		$("#select2 option").removeAttr("selected");
//		$("#select2 option:eq(6)").attr("selected","selected");
//	}else if($("#select2 option:eq(7)").attr("selected") == "selected"){
//		$("#select2 option").removeAttr("selected");
//		$("#select2 option:eq(7)").attr("selected","selected");
//	}else if($("#select2 option:eq(8)").attr("selected") == "selected"){
//		$("#select2 option").removeAttr("selected");
//		$("#select2 option:eq(8)").attr("selected","selected");
//	}else if($("#select2 option:eq(9)").attr("selected") == "selected"){
//		$("#select2 option").removeAttr("selected");
//		$("#select2 option:eq(9)").attr("selected","selected");
//	}
//});



//$("#ssid_hidden").bind('click', function (e) {
//	$("#ssid_nothidden").removeAttr("selected");
//	$(this).attr("selected","selected");
//});

//$("#ssid_nothidden").bind('click', function (e) {
//	$("#ssid_hidden").removeAttr("selected");
//	$(this).attr("selected","selected");
//});

$("#apply").bind('click', function(e) {
    document.getElementById("content2").style.display = "inline";
    var mod, ssidhidden, maxSta;
    
    //	if($("#select option:eq(0)").attr("selected") == "selected"){
    //		mod = $("#select option:eq(0)").val();
    //	}else if($("#select option:eq(1)").attr("selected") == "selected"){
    //		mod = $("#select option:eq(1)").val();
    //	}else if($("#select option:eq(2)").attr("selected") == "selected"){
    //		mod = $("#select option:eq(2)").val();
    //	}else if($("#select option:eq(3)").attr("selected") == "selected"){
    //		mod = $("#select option:eq(3)").val();
    //	}else if($("#select option:eq(4)").attr("selected") == "selected"){
    //		mod = $("#select option:eq(4)").val();
    //	}

    //	if($("#select2 option:eq(0)").attr("selected") == "selected"){
    //		maxSta = $("#select2 option:eq(0)").val();
    //	}else if($("#select2 option:eq(1)").attr("selected") == "selected"){
    //		maxSta = $("option:eq(1)").val();
    //	}else if($("#select2 option:eq(2)").attr("selected") == "selected"){
    //		maxSta = $("#select2 option:eq(2)").val();
    //	}else if($("#select2 option:eq(3)").attr("selected") == "selected"){
    //		maxSta = $("#select2 option:eq(3)").val();
    //	}else if($("#select2 option:eq(4)").attr("selected") == "selected"){
    //		maxSta = $("#select2 option:eq(4)").val();
    //	}else if($("#select2 option:eq(5)").attr("selected") == "selected"){
    //        maxSta = $("#select2 option:eq(5)").val();
    //    }else if($("#select2 option:eq(6)").attr("selected") == "selected"){
    //        maxSta = $("#select2 option:eq(6)").val();
    //    }else if($("#select2 option:eq(7)").attr("selected") == "selected"){
    //        maxSta = $("#select2 option:eq(7)").val();
    //    }else if($("#select2 option:eq(8)").attr("selected") == "selected"){
    //        maxSta = $("#select2 option:eq(8)").val();
    //    }else if($("#select2 option:eq(9)").attr("selected") == "selected"){
    //        maxSta = $("#select2 option:eq(9)").val();
    //    }

    //	if($("#ssid_hidden").attr("selected") == "selected"){
    //		ssidhidden = "0";
    //	}else{
    //		ssidhidden = "1";
    //	}
    var ssidVal = document.getElementById('ssid').value;
    if (ssidVal.length < 4 || ssidVal.length > 32) {

        Alert(get_lan_wifiset('invalidSSID'));
    }

    var param = { funcNo: 1007,

        ssid: $("#ssid").val()
    };
    request(param, function(data) {
        var flag = data.flag;
        var error_info = data.error_info;

        if (flag == "1") {//正确
            Alert(get_lan_wifiset('pass'));
            document.getElementById("content2").style.display = "none";
            return;
        } else {//错误
            Alert(get_lan_wifiset('fail'));
            Alert(error_info);
            document.getElementById("content2").style.display = "none";
        }
    });

});

//$("#restart").bind('click', function (e) {
//	var param = {funcNo:1008};
//	request(param,function(data){
//		var flag = data.flag;
//		var error_info = data.error_info;
//		
//		if(flag == "1"){//正确
//			return;
//		}else{//错误
//			Alert(error_info);
//		}
//	});
//});
