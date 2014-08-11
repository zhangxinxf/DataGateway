var setting = {
	check: {
		enable: true,
		chkDisabledInherit: true
	},
	data: {
		key: {
			title: "title"
		},
		simpleData: {
			enable: true
		}
	},
	callback: {
		onClick: nodeOnClick
	},
	view: {
		fontCss: getFontCss
	}
};

var lastValue = "", nodeList = [], fontCss = {};

function searchNode(e) {
	var zTree = $.fn.zTree.getZTreeObj("tree");
	var value = $.trim($("#key").val());
	var keyType = "name";
	
	if (lastValue === value){
		return;
	}
	lastValue = value;
	if (value === "") {
		return;
	}
	updateNodes(false);
	nodeList = zTree.getNodesByParamFuzzy(keyType, value);
	updateNodes(true);
}
function updateNodes(highlight) {
	var zTree = $.fn.zTree.getZTreeObj("tree");
	for( var i=0, l=nodeList.length; i<l; i++) {
		nodeList[i].highlight = highlight;
		zTree.updateNode(nodeList[i]);
	}
}
function nodeOnClick(event, treeId, treeNode, clickFlag){
	var zTree = $.fn.zTree.getZTreeObj("tree");
	if(treeNode.checked){
		zTree.checkNode(treeNode,false,true);
	}else{
		zTree.checkNode(treeNode,true,true);
	}
}
function getFontCss(treeId, treeNode) {
	return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
}
function filter(node) {
	return !node.isParent && node.isFirstNode;
}


/**
 * 修改页面，数据回显
 */
var  global_flag=false;
function initData(optType){
	if(optType=="update"){
		global_flag=true;
		addVM();
	}
	var zTree = $.fn.zTree.getZTreeObj("tree");
	var nodes =zTree.getCheckedNodes(true);
	for (var i=0, l=nodes.length; i<l; i++) {
		if(nodes[i].isParent==true){
			zTree.checkNode(nodes[i],false,false);
			zTree.setChkDisabled(nodes[i], true, false, true);
		}
	}
}
var vmIds=new Array();
/**
 * 添加虚拟机
 */

function addVM(){
	var zTree = $.fn.zTree.getZTreeObj("tree");
	var nodes = zTree.getCheckedNodes(true);
	if (nodes.length == 0) {
		 $.msgBox({
			    title:"消息提示",
			    content:"请先选择一个虚拟机节点"
			});
	}
	for (var i=0, l=nodes.length; i<l; i++) {
		if(nodes[i].isParent==false){
			if(global_flag){
				vmIds.push(nodes[i].id);
			}
			$("<option value='"+nodes[i].id+"' tid='"+nodes[i].tId+"' title='"+nodes[i].title+"'>"+nodes[i].name+"</option>").appendTo($("#vms"));
			zTree.setChkDisabled(nodes[i], true, false, true);
		}
	}
	global_flag=false;
	if(!isUpdate()){
		$("#add_id").show();
		$("#add_gray_id").hide();
	}
}
/**
 * 删除虚拟机
 */
function delVM(){
	 $sel =  $("#vms option:selected");
	 if($sel.length==0){
		 $.msgBox({
			    title:"消息提示",
			    content:"请先选择要删除的虚拟机"
			});
	 }else{
		 var zTree = $.fn.zTree.getZTreeObj("tree");
		 $sel.each(function(){
			 var tid = $(this).attr("tid");
			 var node =  zTree.getNodeByTId(tid);
			 zTree.setChkDisabled(node, false, false, true);
			 zTree.checkNode(node,false,true);
			 $sel.remove();
		 });
	 }
	 if(!isUpdate()){
			$("#add_id").show();
			$("#add_gray_id").hide();
		}else{
			$("#add_id").hide();
			$("#add_gray_id").show();
		}
}

/**
 * 判断条目框中的数据是否为null或数据是否更新过
 */
function isUpdate(){
	var ch = $("#vms option");
	var flag=true;
	if(vmIds.length>0&&ch.length==0){
		return false;
	}
	if(vmIds.length>0&&vmIds.length>ch.length){
		return false;
	}
	for(var i=0;i<ch.length;i++){
			if(!isExists($(ch[i]).val(),vmIds)){
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
