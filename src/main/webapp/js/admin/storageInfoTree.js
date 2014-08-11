/*弹出框ID*/
var CatchTreeDivId = {
	saveOrUpdateId : null
};
var setting = {
	check : {
		enable : false,
		chkStyle : "radio",
		radioType : "level"
	},
	expandSpeed : "slow",
	data : {
		simpleData : {
			enable : true,
			idKey : "id",
			pIdkey : "pId",
			rootPid : "0"
		}
	},
	view : {
		dblClickExpand : true
	},
	callback : {
		beforeClick : beforeClick,// (点击之前)用于捕获 勾选 或
		// 取消勾选
		// 之前的事件回调函数，并且根据返回值确定是否允许
		// 勾选 或 取消勾选
		onClick : onClick
	}
};

function beforeClick(treeId, treeNode) {
	var check = (treeNode && !treeNode.isParent);// 是节点，并且不是父级
	if (!check) {
		$.msgBox({
			title : "消息提示",
			content : "请您选择要操作数据  !",
		});
	}
	;
	return check;
}

function onClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("vmTree"), nodes = zTree
			.getSelectedNodes(), // 获取 zTree
	// 当前被选中的节点数据集合（按Ctrl多选择）
			v = "",
			id = "";
	nodes.sort(function compare(a, b) {
		return a.id - b.id;
	});// 按照id从小到大进行排序
	for ( var i = 0, l = nodes.length; i < l; i++) {
		v += nodes[i].name + ",";
		id += nodes[i].id + ",";
	}
	if (v.length > 0)
		v = v.substring(0, v.length - 1);
	if (id.length > 0)
		id = id.substring(0, id.length - 1);
	var name = $("#vm");
	name.attr("value", v);// 设置文本框的值
	var fid = $("#vmId");
	fid.attr("value", id);
	hideMenu();
}

function showMenu() {
	var cityObj = $("#vm");// 输入框
	var cityOffset = $("#vm").offset();// 获取匹配元素在当前视口的相对偏移
	// cityOffset.left 元素在当前视口的相对偏移
	// slideDown 通过高度变化（向下增大）来动态地显示所有匹配的元素，在显示完成后可选地触发一个回调函数。
	$("#menuContent").css({
		left : cityOffset.left + "px",
		width : cityObj.outerWidth() + "px",
		top : cityOffset.top + cityObj.outerHeight() + "px"
	}).slideDown("fast");

	$("body").bind("mousedown", onBodyDown);// 给body绑定鼠标按下事件
}
function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}
// event 代表事件的状态，比如事件在其中发生的元素、键盘按键的状态、鼠标的位置、鼠标按钮的状态。
// event.target 直接接受事件的目标DOM元素
function onBodyDown(event) {
	// 如果接受事件的目标DOM元素的id 不是menuBtn（选择） 或 不是menuContent（菜单内容） 或
	// menuContent对象中元素的个数不大于0
	// 点击不是选择按钮，不是菜单内容的时候就隐藏下拉目录
	if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(
			event.target).parents("#menuContent").length > 0)) {
		hideMenu();
	}
}

function save(url) {
	var vm = $("#vm").val();
	if (vm != null && vm.trim().length == 0) {
		$.msgBox({
			title : "消息提示",
			content : "请选择虚拟机！",
		});
		return;
	}
	var params = {
		id : $("#id").val(),
		vmId : $("#vmId").val()
	};

	$.msgBox({
		title : "信息提示",
		content : "请等待,正在执行中........",
		type : "info",
		afterShow : function(divId) {
			CatchTreeDivId.saveOrUpdateId = divId;
			$.ajax({
				type : "POST",
				url : url,
				data : params,
				success : function(data) {
					var type = "error";
					if (data.success) {
						type = "info";
					}
					$('#' + CatchTreeDivId.saveOrUpdateId).remove();
					$('#' + CatchTreeDivId.saveOrUpdateId + 'BackGround')
							.remove();
					$.msgBox({
						title : "消息提示",
						content : data.msg,
						type : type,
						buttons : [ {
							value : "确定"
						} ],
						success : function(result) {
							if (result == "确定") {
								$(
										frameElement.api.opener.document
												.getElementById("deleteForm"))
										.remove();
								frameElement.api.opener.location.reload();
							}
						}
					});
				}
			});
		},
		showButtons : false
	});
}