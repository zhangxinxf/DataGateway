/**
 * 查询提交
 * 
 * @param url
 */
function searchFrom(url) {
	$("#searchForm").attr("action", url);
	$("#searchForm").submit();
}

var new_status = true;
/**
 * 添加选项卡
 * 
 * @returns
 */
function addTab(obj) {
	if (!new_status) {
		$.msgBox({
			title : "消息提示",
			content : "请保存当前操作！",
			type : "info"
		});
		return;
	}
	var p = $(obj).parent();
	var tab = "<div class='tab tab_sel'> <a class='tab_link' href='javascript:{}'>新建</a><a class='tab_close' href='javascript:{}' onclick='removeTab(this)'></a></div>";
	$(p).prevAll().removeClass("tab_sel");
	$(p).before(tab);
	loadFrame(0);
	new_status = false;
}
/**
 * 删除选项卡
 * 
 * @param obj
 * @param id
 */
function removeTab(obj, delId, useStatus) {
	if (arguments.length > 1) {
		if (!new_status) {
			$.msgBox({
				title : "消息提示",
				content : "请保存当前操作！",
				type : "info"
			});
			return;
		}
		if (useStatus == 1) {
			$.msgBox({
				title : "消息提示",
				content : "当前IP池已被使用,不能删除！",
				type : "error"
			});
			return;
		}
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
					$.ajax({
						type : "GET",
						url : rootPath + "/floatingip/delete",
						data : {
							id : delId
						},
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
											new_status = true;
											// 删除成功后，重新加载
											window.location.reload();
										}
									}
								});
							} else {
								$.msgBox({
									title : "消息提示",
									content : data.msg,
									type : "error",
									buttons : [ {
										value : "确定"
									} ],
									success : function(result) {
										if (result == "确定") {
										}
									}
								});
							}
						}
					});
				}
			}
		});
	} else {
		var p = $(obj).parent();
		$(p).hide();
		$('#mainGroup').children().removeClass("tab_sel");
		$("#mainGroup div:first").addClass("tab_sel");
		new_status = true;
		loadFrame(id);
	}
}
/**
 * 保存数据
 * 
 * @returns {Boolean}
 */
function save() {
	var res = $("#pageForm").valid(); // 表单验证
	// 验证通过，执行提交操作
	if (!res) {
		return;
	}
	var params = $("#pageForm").serialize();
	$
			.ajax({
				type : "POST",
				url : rootPath + "/floatingip/add",
				data : params,
				dataType : "JSON",
				success : function(data) {
					var type = "error";
					if (data.success) {
						type = "info";
					}
					$
							.msgBox({
								title : "消息提示",
								content : data.msg,
								type : type,
								buttons : [ {
									value : "确定"
								} ],
								success : function(result) {
									if (result == "确定") {
										new_status = true;
										window.parent.location.href = window.parent.location.href;
									}
								}
							});
				}
			});
	return false;
}

/**
 * 添加和修改表单提交操作
 */
function update() {
	var res = $("#pageForm").valid(); // 表单验证
	// 验证通过，执行提交操作
	if (!res) {
		return;
	}
	var options = {
		success : showResponse,
		timeout : 3000
	};
	$('#pageForm').ajaxSubmit(options);
	return false;
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
	var type = "info";
	if (!responseText.success) {
		type = "error";
	}

	$.msgBox({
		title : "消息提示",
		content : "" + responseText.msg,
		type : type,
		buttons : [ {
			value : "确定"
		} ],
		success : function(result) {
			if (result == "确定") {
				window.parent.location.href = window.parent.location.href;
			}
		}
	});
}
/**
 * 加载iFrame数据
 * 
 * @param id
 * @returns {Boolean}
 */
function loadFrame(fId, obj) {
	if (!new_status) {
		$.msgBox({
			title : "消息提示",
			content : "请保存当前操作！",
			type : "info"
		});
		return;
	}
	if (arguments.length > 1) {
		$('#mainGroup').children().removeClass("tab_sel");
		var p = $(obj).parent();
		$(p).addClass("tab_sel");
	}
	var randomnumber = Math.floor(Math.random() * 100000);
	$("#mainFrame").attr("src",
			rootPath + "/floatingip/view/" + fId + "?c=" + randomnumber);
	return false;
}
var check = {
	rules : {
		startIp : {
			required : true,
			ipv4 : true
		},
		endIp : {
			required : true,
			ipv4 : true
		},
		subnerMask : {
			required : true,
			ipv4 : true
		},
		name : {
			required : true,
			loginId : true
		}

	}
};

function removeVm(id) {
	$.msgBox({
		title : "消息提示",
		content : "确定要解除绑定吗？",
		type : "confirm",
		buttons : [ {
			value : "是"
		}, {
			value : "否"
		} ],
		success : function(result) {
			if (result == "是") {
				$.ajax({
					type : "POST",
					url : rootPath + "/floatingip/removeVm/" + id,
					dataType : "JSON",
					success : function(data) {
						$.msgBox({
							title : "消息提示",
							content : data.msg,
							type : "info",
							buttons : [ {
								value : "确定"
							} ],
							success : function(result) {
								if (result == "确定") {
									window.location.reload();
								}
							}
						});
					}
				});
			}
		}
	});
}

function saveVm() {
	var floating = $("input[type=radio]:checked");
	if (floating.length < 1) {
		$.msgBox({
			title : "消息提示",
			content : "请选择网络名称"
		});
		return;
	}
	var params = {
		secGroupId : $("#secGroupId").val(),
		floatingId : $(floating).val()
	}
	$.ajax({
		type : "POST",
		url : rootPath + "/floatingip/bindSecGroup",
		data : params,
		dataType : "JSON",
		success : function(data) {
			var type = "info";
			if (!data.success) {
				type = "error";
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