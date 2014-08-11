var setting = {
	check : {
		enable : true,
		chkDisabledInherit : true,
		chkStyle : "radio",
		radioType : "level"
	},
	data : {
		key : {
			title : "title"
		},
		simpleData : {
			enable : true
		}
	},
	callback : {
		beforeCheck : zTreeBeforeCheck
	}
};

function zTreeBeforeCheck(treeId, treeNode) {
	if (treeNode.isParent) {
		$.msgBox({
			title : "消息提示",
			content : "请选择具体的虚拟机！"
		});
		return false;
	}
	return true;
};
/**
 * 给虚拟机绑定IP
 */
function saveVm() {
	var treeObj = $.fn.zTree.getZTreeObj("tree");
	var nodes = treeObj.getCheckedNodes(true);
	if (nodes.length <= 0) {
		$.msgBox({
			title : "消息提示",
			content : "请选择的虚拟机！"
		});
		return;
	}

	var vmId = nodes[0].id
	var params = {
		ipId : $("#ipId").val(),
		vmId : vmId
	}
	$.ajax({
		type : "POST",
		url : rootPath + "/floatingip/bingVM",
		data : params,
		dataType : "JSON",
		success : function(data) {
			if (data.success) {
				$.msgBox({
					title : "消息提示",
					content : data.msg,
					type : "info",
					buttons : [ {
						value : "确定"
					} ],
					success : function(result) {
						if (result == "确定") {
							frameElement.api.opener.location.reload();
						}
					}
				});
			} else {
				$.msgBox({
					title : "消息提示",
					content : data.msg,
					type : "info",
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
		}
	});
}