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
	if (res) {
		$('#pageForm').ajaxSubmit(options);
	}
	return false;
}

/**
 * 保存操作
 */
function save() {
	var options = {
		success : showResponse,
		timeout : 3000
	};
	$('#pageForm').ajaxSubmit(options);
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
function userinfoActionConfirm(actionName, url, title, width, height) {
	var checkedCount = 0;
	var checkedValue = "";
	var count = 0;
	var state;
	var options = {
		success : userinfoActionResponse,
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
				content : "您只能选择一条数据进行操作!",
			});
			return;
		} else if (checkedCount == 0) {
			$.msgBox({
				title : "消息提示",
				content : "请您选择要操作数据  !",
			});
			return;
		}
		return openDialog(url, title, width, height);
	}
	 if(actionName=='delete'){
		 if(checkedCount>0){
			 $.msgBox({
					title : "消息提示",
					content : "确定要进行删除操作吗？",
					type : "confirm",
					buttons : [ {
						value : "是"
					}, {
						value : "否"
					} ],
					success : function(result) {
						if (result == "是") {
							$('#deleteForm').attr("action",url);
							$('#deleteForm').ajaxSubmit(options);
						}
					}
				});
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要删除的数据  !",
				});
			 return;
		 }
		
	 }
	if (actionName == 'processed') {		
		if (checkedCount > 0) {
			$('#deleteForm').attr("action", url);
			$('#deleteForm').ajaxSubmit(options);
		} else if (checkedCount == 0) {
			$.msgBox({
				title : "消息提示",
				content : "请您选择要处理的数据  !",
			});
			return;
		}
	}
	if (actionName == 'ignore') {		
		if (checkedCount > 0) {
			$('#deleteForm').attr("action", url);
			$('#deleteForm').ajaxSubmit(options);
		} else if (checkedCount == 0) {
			$.msgBox({
				title : "消息提示",
				content : "请您选择要处理的数据  !",
			});
			return;
		}
	}
	if (actionName == 'notip') {		
		if (checkedCount > 0) {
			$('#deleteForm').attr("action", url);
			$('#deleteForm').ajaxSubmit(options);
		} else if (checkedCount == 0) {
			$.msgBox({
				title : "消息提示",
				content : "请您选择要处理的数据  !",
			});
			return;
		}
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
 * 删除数据之后的操作
 * 
 * @param responseText
 * @param statusText
 * @param xhr
 * @param $form
 */
function userinfoActionResponse(responseText, statusText, xhr, $form) {
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
var check = {
	rules : {
		media : {
			required : true
		},
		maxRate : {
			required : true,
			range:[1, 100]
		},
		duration : {
			required : true,
			digits : true,
			range: [1, 60]
		},
		grade : {
			required : true
		},
		type : {
			required : true
		}
	}
};


function exportAlarmExcel(url)
{
	 $.msgBox({
		    title:"导出excel",
		    content:"请选择excel的导出方式",
		    type:"confirm",
		    height:200,
		    width:300,
		    buttons: [
		              { value: "导出本页" },
		              { value: "导出全部" },
		              { value: "取消" }
		              ],
		    success: function (result) {
		    	if(result == "导出全部") {
		    		$("#exportType").attr("value","all");
		    	}else if(result == "导出本页") {
		    		$("#exportType").attr("value","one");
		        } else {
		        	return;
		        }
		    	
		    	$("#exportAlarmForm").attr("action",url);
		        $("#exportAlarmForm").submit();
			}
		 });
}
