var arrays = new Array("wwan","wifi");
function Show(tagId){
	for(var i = 0; i < arrays.length; i++){
		if(arrays[i] == tagId){
			document.getElementById(arrays[i]).style.display = "block";
		}
		else{
			document.getElementById(arrays[i]).style.display = "none";
		}
	}
}

/*��ҳ����ʱ�����ĺ������ռ�����ҳʱ���������Ӳ˵���*/
function loadFun(){
	alert('ok');
	/*��ȡ<ul></ul>�������ӽڵ�<li>�ڵ�*/
	var array = document.getElementByTagName("ul").item(0).childNodes;
	/*�����ӽڵ�*/
	for(var i = 0; i < array.length; i++){
		/*��ȡ<li></li>��ǩ���ӽڵ�*/
		var childNodes = array[i].childNodes;
		for(var i = 0; i < array.length; j++){
			/*����������˵��е�<ul>��ǩ�����ظ��Ӳ˵��������˵�*/
 			if(childNodes[j].tagName == "UL"){
				childNodes[j].style.display = "none";
			}    
		}
	}
}


