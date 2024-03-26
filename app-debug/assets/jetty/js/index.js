$(function(){
//	_loadCss("./css/layer.css");
	init();
});

function init(){
	if(getCookie("language") == null)
	{
	//	setCookie("language","English");  //default is English
	//	window.location = 'index.html';
	}
	var qqq = getCookie("language");
	if(getCookie("language") == "Chinese")
	{
		$("#zh").html("简体中文");
		$("#en").html("英文");
		$("#zh").attr("selected","selected");
		$("#en").removeAttr("selected");
	}
}

$("#select").bind('change', function (e) {
	if($("#en").attr("selected") == "selected"){
		$("#en").attr("selected","selected");
		$("#zh").removeAttr("selected");
		setCookie("language","English");
		window.location = 'index.html';
	}else{
		$("#zh").attr("selected","selected");
		$("#en").removeAttr("selected");
		setCookie("language","Chinese");
		window.location = 'index.html';
	}
});

$("#frm").bind('keypress', function (e) {
	if (e.keyCode == 13){ 
		if(verify()){
			login();
		}
	}            
});

$("#login").bind('click', function (e) {
	if(verify()){
		login();
	}       
});

function verify(){
	
	var username = $("#username").val();
	var password = $("#password").val();
	
	if(username == ""){
		Alert("Please input username");
		return false;
	}
	if(password == ""){
		Alert("Please input password");
		return false;
	}
	return true;
}

function login(){

	var user = $("#username").val();
	var pwd = $("#password").val();
	var param = {funcNo:1000,username:user,password:pwd};
	request(param,function(data){
		var flag = data.flag;
		var error_info = data.error_info;
		
		if(flag == "1"){//正确
			var result = data.results[0];
			//保存需要的数据
			$.session.set("conn_mode", result.conn_mode);//自动连接or手动连接
			$.session.set("net_mode", result.net_mode);//0:Auto,1:3G Only,2:4G Only
			$.session.set("imei", result.imei);//IMEI
			$.session.set("fwversion", result.fwversion);//sw
			
			window.location = "main.html";//跳转到主页面
		}else{//错误
			Alert(error_info);
		}
	});
	
}
