// ��data������top���Խ�ʡ��Դ
var data = (window.self == window.top ? {} : (typeof window.top.data == 'object') ? window.top.data : (window.top.data = {}));

var domain = '',
	  suffix = '.json';


function mifi_test(){
	alert("window.top.data="+window.top.data+";"+"window.self="+window.self+";"+"data="+data);
}


// ��ʼ������
function mifi_get_text(){
	// langֵΪ�������ڵ��򣬲��ṩ�����ܻ�ȡ
	$('[lang]').each(function(){
		var content = mifi_translate($(this).attr('lang'));
		switch(this.tagName.toLowerCase()){
			case 'input':
				$(this).val(content);
				break;
			case 'option':
				$(this).text(content);
				break;
			case 'title':
				document.title = content;
				break;
			default:
				// ֧����Ҫ�����KEY����HTML��ǩ,trim()����ȥ���ַ������˵Ŀհ��ַ�
				var html = $.trim($(this).html());
				//alert(html);
				//alert("html:"+html+","+$(this).attr('lang'));
				$(this).html(content);
		}
	});
}

function mifi_show_text(){
	$("body").show();
}

function getCurFileName(){
	// ��ȡ��ǰ�ļ���
	return location.pathname.substring(1).replace(/\.\w+$/g, '');
}

function ownProp(o, prop) {

  //if ('hasOwnProperty' in o) {
  //  return o.hasOwnProperty(prop);
  //} else {
    return Object.prototype.hasOwnProperty.call(o, prop);
  //}
}

/**
 * ��ȡ����
 * @param   string	k	��Ҫ��ȡ����ļ�ֵ
 * @param   string	d	��ֵ���ڵ���
 * @return  string
 */
// mifi_translate($(this).val(), $(this).attr('lang'))
function mifi_translate(k){
	if(!k)
		return '';
	var current_file_name = getCurFileName();
	if(current_file_name == ""){
		current_file_name = "index";
	}
	//alert("k="+k+","+"d="+d);
	// �������δ���棬��ȥ����˻�ȡ����
	if( getCookie("language") == "Chinese"){
		//alert(typeof data[current_file_name]);
		//only once request
		if(typeof data[current_file_name] != 'object'){
			$.ajax({
				url: '/json/' + current_file_name + suffix,
				// ͬ��
				async: false,
				// ��������
				cache: true,
				dataType: 'json',
				success: function(json){
					//alert("json="+json);
					data[current_file_name] = json;
					//alert("data[current_file_name][k]="+data[current_file_name][k]);
				},
				error: function(){
					data[current_file_name] = {};
				}
			});
		}
	}else
	{
		data[current_file_name] = {};
	}
	//key-->"k",value-->"data[current_file_name][k]"
	//return (data[current_file_name].hasOwnProperty(k)) ? data[current_file_name][k] : k;
	return ownProp(data[current_file_name],k) ? data[current_file_name][k] : k;
}

$(function(){
	//mifi_test();
	// �Զ������LANG���Եı�ǩ
	mifi_get_text();
	// ��ʼ����ɣ���ʾҳ�棨��ҪbodyԤ��CSS VISIBILITY HIDDEN��
	mifi_show_text();
});
