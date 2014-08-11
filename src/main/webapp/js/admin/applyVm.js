/**
 * 查询提交
 * 
 * @param url
 */
function searchFrom(url) {
	$("#searchForm").attr("action", url);
	$("#searchForm").submit();
}

// 添加
var applyVMCheck = {
	rules : {
		'vmName' : {
			maxlength : 30,
			required : true,
			remote : {
				type : "get",
				url : rootPath + '/userApplyVM/addJudgeVmName',
				data : {
					id : function() {
						return $("#id").val();
					},
					name : function() {
						return $("#vmName").val();
					}
				}
			}
		},
		'templateId' : {
			required : true
		},
		'imageId' : {
			required : true
		}
	}
};

/**
 * 添加和修改表单提交操作
 */
var CatchDivId = {
	saveOrUpdateId : null
};
function saveOrUpdateInfo(isValidator) {
	var options = {
		success : showResponse,
		timeout : 10000
	};
	var res = true;
	if (arguments.length == 0) {
		res = $("#pageForm").valid(); // 表单验证
	}
	// 验证通过，执行提交操作
	if (res) {
		$.msgBox({
			title : "信息提示",
			content : "请等待,正在执行中........",
			type : "info",
			afterShow : function(divId) {
				CatchDivId.saveOrUpdateId = divId;
				$('#pageForm').ajaxSubmit(options);
			},
			showButtons : false
		});
	}
	return false;
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
	var idArray = new Array();
	var state;
	var options = {
		success : actionResponse,
		timeout : 10000
	};
	$("[name='id']").each(function() {
		if (this.checked) {
			checkedCount++;
			checkedValue = this.value;
			idArray.push(this.value);
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
	if (actionName == 'reject') {
		if (checkedCount > 0) {
			url = url + "?ids=" + idArray;
		} else if (checkedCount == 0) {
			$.msgBox({
				title : "消息提示",
				content : "请您选择要操作数据  !"
			});
			return;
		}
		return openDialog(url, title, width, height);
	}
	if (actionName == 'cancle') {
		if (checkedCount > 0) {
			$.msgBox({
				title : "消息提示",
				content : "确定取消申请吗？",
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
				content : "请您选择要取消申请的数据  !"
			});
			return;
		}
	}
	if (actionName == 'delete') {
		if (checkedCount > 0) {
			$.msgBox({
				title : "消息提示",
				content : "确定删除选中的数据吗？",
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
				content : "请您选择要删除的数据  !"
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
	// $('#' + CatchDivId.saveOrUpdateId).remove();
	// $('#' + CatchDivId.saveOrUpdateId + 'BackGround').remove();
	$
			.msgBox({
				title : "消息提示",
				content : "" + responseText.msg,
				type : "info",
				buttons : [ {
					value : "确定"
				} ],
				success : function(result) {
					if (result == "确定") {
						$(
								frameElement.api.opener.document
										.getElementById("deleteForm")).remove();
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
				$("#deleteForm").remove();
				window.location.reload();
			}
		}
	});
}
