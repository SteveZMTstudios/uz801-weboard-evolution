$(function() {
    //	_loadCss("./css/layer.css");
    setInterval(update, 20000);
    update();
    getsim();
   
});
var cn = {
    "Ready": "就绪",
     "Absent" : "无SIM卡",
     "Pin Required" : "Pin锁",
     "PUK Required" : "PUK锁",
      "Network Locked" : "网络锁",
       "fail" : "失败",
      "pass" : "成功",
      "password error!":"密码错误"
   
};

var en = {
    "Ready": "Ready",
    "Absent": "Absent",
    "Pin Required": "Pin Required",
    "PUK Required": "PUK Required",
    "Network Locked": "Network Locked",
    "fail": "Fail",
    "pass": "Success",
    "password error!": "password error!"
    
};
function get_SIM(m) {
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
function update(){
	var param = {funcNo:1015};
	request(param, function(data) {
	    var flag = data.flag;
	    var error_info = data.error_info;
	    var b = "ready";
	    var d = "Absent";
        var e = "Pin Required";
        var f = "PUK Required";
        var g = "Network Locked";

	    if (flag == "1") {//正确
	        var result = data.results[0];
	        if (result.sim_status) {
	            if (result.sim_status.toLowerCase() == b)
	                $("#simsta").html(get_SIM('Ready'));
	            else if (result.sim_status.toLowerCase() == d.toLowerCase())
			        $("#simsta").html(get_SIM('Absent'));
			    else if (result.sim_status.toLowerCase() == e.toLowerCase())
			        $("#simsta").html(get_SIM('Pin Required'));
			    else if (result.sim_status.toLowerCase() == f.toLowerCase())
			        $("#simsta").html(get_SIM('PUK Required'));
			    else if (result.sim_status.toLowerCase() == g.toLowerCase())
			        $("#simsta").html(get_SIM('Network Locked'));
	            else
	                $("#simsta").html(result.sim_status);
	        }
	        if (result.imsi) {
	            $("#sim_imsi").html(result.imsi);
	        }
	        if (result.iccid) {
	            $("#sim_iccid").html(result.iccid);
	        }
	    } else {//错误
	        Alert(error_info);
	    }
	});
}
function getsim() {
    var param = { funcNo: 2002 };
    request(param, function(data) {
        var flag = data.flag;
        var error_info = data.error_info;

        if (flag == "1") {//正确
            var result = data.results[0];
            if (result.simslot) {
                //$("#sim_imsi").html(result.simslot);
                if (result.simslot == 1) {
                    $("option").removeAttr("selected");
                    $("option:eq(0)").attr("selected", "selected");
                }
                else {
                    $("option").removeAttr("selected");
                    $("option:eq(1)").attr("selected", "selected");
                }
                
            }

        } else {//错误
            Alert(error_info);
        }
    });
}

$("#simSelection").bind('change', function(e) {
    if ($("option:eq(0)").attr("selected") == "selected") {
        $("option").removeAttr("selected");
        $("option:eq(0)").attr("selected", "selected");
    } else if ($("option:eq(1)").attr("selected") == "selected") {
        $("option").removeAttr("selected");
        $("option:eq(1)").attr("selected", "selected");
    } else if ($("option:eq(2)").attr("selected") == "selected") {
        $("option").removeAttr("selected");
        $("option:eq(2)").attr("selected", "selected");
    }
});

$("#apply").bind('click', function(e) {
    var stat;
    var sim_pwd = $("#sim_pwd").val();

    if ($("option:eq(0)").attr("selected") == "selected") {
        stat = $("option:eq(0)").val();
    } else if ($("option:eq(1)").attr("selected") == "selected") {
        stat = $("option:eq(1)").val();
    } else if ($("option:eq(2)").attr("selected") == "selected") {
        stat = $("option:eq(2)").val();
    }
    var param = { funcNo: 2003, simslot: stat, password: sim_pwd };
    request(param, function(data) {
        var flag = data.flag;
        var error_info = data.error_info;

        if (flag == "1") {//正确

            Alert(get_SIM('pass'));
            return;
        } else {//错误
            Alert(get_SIM('fail'));
            //Alert(error_info);
            if (error_info == "password error!") {
                Alert(get_SIM('password error!'));
                return;
            }
           

        }
    });
});
