/**
 * 查询提交
 * 
 * @param url
 */
function searchFrom(url) {
	$("#searchForm").attr("action", url);
	$("#searchForm").submit();
}

/**
 * 添加和修改表单提交操作
 */
function saveOrUpdateInfo() {
	var options = {
		success : showResponse,
		timeout : 3000
	};
	var res = $("#pageForm").valid(); // 表单验证
	// 验证通过，执行提交操作
	if (res) {
		$('#pageForm').ajaxSubmit(options);
	}
	return false;
}

/**
 * 
 * @param len
 * @param type
 */
function addHostHa() {
	var ch = $("#int_clsId :input");
	var arr = new Array();
	$(ch).each(function(i, obj) {
		arr[i] = $(obj).val();
	});
	$.ajax({
		type : "POST",
		url : rootPath + "/serverHACustom/addHost?ids=" + arr + "&haId="
				+ $("#haId").val(),
		dataType : "JSON",
		success : function(data) {
			var type="error";
			if (data.success) {
				type="info";
			}
			$.msgBox({
				title : "消息提示",
				content : data.msg,
				type : type,
				buttons : [ {
					value : "确定"
				} ],
				success : function(result) {
					if (result == "确定") {
						frameElement.api.opener.location.reload();
					}
				}
			});
		}
	});
}

/**
 * 添加物理机
 */
function addHost() {
	$("#out_clsId :input").each(function() {
		var vm_id = this.value;
		if ($(this).prop('checked')) {
			var curLi = $('#li_' + vm_id);
			curLi.remove();
			$('#int_clsId').append(curLi);
		}
	});
	if(!isUpdate()){
		$("#add_id").show();
		$("#add_gray_id").hide();
	}else{
			$("#add_id").hide();
			$("#add_gray_id").show();
	}
}

/**
 * 删除物理机
 */
function delHost() {
	$("#int_clsId :input").each(function() {
		var vm_id = this.value;
		if ($(this).prop('checked')) {
			var curLi = $('#li_' + vm_id);
			curLi.remove();
			$('#out_clsId').append(curLi);
		}
	});
	if(!isUpdate()){
		$("#add_id").show();
		$("#add_gray_id").hide();
	}else{
		$("#add_id").hide();
		$("#add_gray_id").show();
	}
}

/**
 * 表单提交之后，需要做的处理
 * 
 * @param responseText
 * @param statusText
 * @param xhr
 * @param $form
 */
function showResponse(responseText, statusText, xhr, $form) {
	$.msgBox({
		title : "消息提示",
		content : "" + responseText.msg,
		type : "info",
		buttons : [ {
			value : "确定"
		} ],
		success : function(result) {
			if (result == "确定") {
				$(frameElement.api.opener.document.getElementById("deleteForm")).remove();
				frameElement.api.opener.location.reload();
			}
		}
	});
}

/**
 * 
 * @param actionName
 * @param url
 * @param title
 * @param width
 * @param height
 * @returns
 */
function actionConfirm(actionName, url, title, width, height) {
	var checkedCount = 0;
	var checkedValue = "";
	var count = 0;
	var state;
	var options = {
		success : actionResponse,
		timeout : 3000
	};
	$("[name='id']").each(function() {
		if (this.checked) {
			checkedCount++;
			checkedValue = this.value;
		}
	});

	if (actionName == 'all') {
		if (checkedCount == 1) {
			url = url + "/" + checkedValue
		}
		if (checkedCount > 1) {
			$.msgBox({
				title : "消息提示",
				content : "您只能选择一条数据进行操作!"
			});
			return;
		} else if (checkedCount == 0) {
			$.msgBox({
				title : "消息提示",
				content : "请您选择要操作数据  !"
			});
			return;
		}
		return openDialog(url, title, width, height);
	}
	if (actionName == 'notall') {
		if (checkedCount > 0) {
			$.msgBox({
				title : "消息提示",
				content : "确定要进行" + title + "操作吗？",
				type : "confirm",
				buttons : [ {
					value : "是"
				}, {
					value : "否"
				} ],
				success : function(result) {
					if (result == "是") {
						$('#deleteForm').attr("action", url);
						$('#deleteForm').ajaxSubmit(options);
					}
				}
			});
		} else if (checkedCount == 0) {
			$.msgBox({
				title : "消息提示",
				content : "请您选择要操作的数据  !"
			});
			return;
		}
	}
}

/**
 * 删除数据之后的操作
 * 
 * @param responseText
 * @param statusText
 * @param xhr
 * @param $form
 */
function actionResponse(responseText, statusText, xhr, $form) {
	$.msgBox({
		title : "消息提示",
		content : "" + responseText.msg,
		type : "info",
		buttons : [ {
			value : "确定"
		} ],
		success : function(result) {
			if (result == "确定") {
				$('#deleteForm').remove();
				window.location.reload();
			}
		}
	});
}

// 新增存储信息，表单验证规则
var check = {
	rules : {
		haName : {
			required : true,
			loginId:true,
			remote:{
				　　 type:"GET",
				　　 url:rootPath+"/serverHACustom/checkName",
				　　 data:{
				　　		name:function(){return $("#haName").val();},
				  		type:function(){return $("#type").val();},
				  		id:function(){return $("#id").val();}
				　　 } 
			}
		}
	}
};
/**
 * 判断条目框中的数据是否为null或数据是否更新过
 */
function isUpdate(){
	var ch = $("#int_clsId :input");
	var flag=true;
	if(ch.length<0){
	   return flag;
	}
	var  pmArray=pmIds.split(",");
		if(pmArray.length>0&&pmArray.length-1>ch.length){
				return false;
		}
	for(var i=0;i<ch.length;i++){
			if(!isExists($(ch[i]).val(),pmArray)){
				flag=!flag;
				break;
		}
	}
	return flag;
}

function isExists(pmId,pmArray){
	var flag=false;
	for(var i=0;i<pmArray.length;i++){
		if(pmArray[i]!=''){
			if(pmArray[i]==pmId){
				flag=true;
				break;
			}
		}
	 }
	 return flag;
}