/**
 * 加载iFrame数据
 * 
 * @param id
 * @returns {Boolean}
 */
function loadFrame(url, obj) {
	if (arguments.length > 1) {
		$('#mainGroup').children().removeClass("tab_sel");
		var p = $(obj).parent();
		$(p).addClass("tab_sel");
	}
	var randomnumber = Math.floor(Math.random() * 100000)
	$("#mainFrame").attr("src", url + "?randomnumber=" + randomnumber);
	return false;
}

var check = {
	rules : {
		"sysParamsInfos[0].paramValue" : {
			required : true,
			digits : true
		},
		"sysParamsInfos[1].paramValue" : {
			required : true,
			rateFormate : true
		},
		"sysParamsInfos[2].paramValue" : {
			required : true,
			digits : true,
			max : 100,
			min : 1
		},
		"sysParamsInfos[3].paramValue" : {
			required : true,
			digits : true
		},
		"sysParamsInfos[4].paramValue" : {
			required : true,
			digits : true
		},
		"sysParamsInfos[5].paramValue" : {
			required : true,
			digits : true
		},
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
		gatewayIp : {
			required : true,
			ipv4 : true
		},
		host : {
			required : true,
			ipv4 : true
		},
		fromPerson:{
			required:true
		},
		userName:{
			required:true
		},
		passWord:{
			required:true
		},
		license:{
			required:true
		}
	}
};

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
				window.location.reload();
			}
		}
	});
}

/**
 * 导出机器码
 * @param url
 */
function exportMachineCode(url) {
	window.location.href = url;
}