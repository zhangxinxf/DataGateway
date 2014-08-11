<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<%
	String path = request.getContextPath();
	out.println("<script type='text/javascript'>");
	out.println("var rootPath = '" + request.getContextPath() + "';");
	out.println("</script>");
%>
<title>佳华云</title>
<link rel="stylesheet" href="<%=path%>/css/common.css" />
<link rel="stylesheet" href="<%=path%>/css/content.css" />
<link rel="stylesheet" href="<%=path%>/js/vendor/msgbox/Styles/msgBoxLight.css" />
<link rel="stylesheet" href="<%=path%>/js/vendor/zTree/zTreeStyle/zTreeStyle.css"/>	
<link rel="stylesheet" href="<%=path%>/js/vendor/zTree/zTreeStyle/tree.css" /> 
</head>
<body>
	<form name=pageForm id="pageForm" action="<%=path%>/invoke/condition"
			method="post">
			<input type="hidden" value="${config.id}" name="id">
	<div class="p20">
	<c:if test="${fn:length(list) gt 0 }">
		<c:forEach var="data" items="${list}" varStatus="i">
			<div class="clearfix" id="master_${i.index}">
				<label for="input_suzhu">主表信息：</label>
				<input type="hidden" value="${data.id}"  name="tables[${i.index}].id" />
				<select  style="width: 158px" id="itemId_${i.index}" name="tables[${i.index}].item.id" >
				<c:forEach var="entity" items="${item}">
					<option value="${entity.id}" <c:if test="${data.item.id eq entity.id }">selected</c:if>>${entity.itemName}</option>
				</c:forEach>
				</select>
				<label for="input_suzhu">从表信息：</label>
				<select  style="width: 158px" id="toItemId_${i.index}" name="tables[${i.index}].toItem.id" >
					<option value="">---请选择---</option>
				<c:forEach var="entity" items="${item}">
					<option value="${entity.id}" <c:if test="${data.toItem.id eq entity.id }">selected</c:if>>${entity.itemName}</option>
				</c:forEach>
				</select>
				<label for="input_suzhu">关联方式：</label>
				<select  style="width: 158px" id="joinType_${i.index}" name="tables[${i.index}].joinType">
					<option value="">---请选择---</option>
					<option value="INNER" <c:if test="${data.joinType eq 'INNER' }">selected</c:if> >INNER JOIN</option>
					<option value="LEFT"  <c:if test="${data.joinType eq 'LEFT' }">selected</c:if> >LEFT JOIN</option>
					<option value="RIGHT" <c:if test="${data.joinType eq 'RIGHT' }">selected</c:if> >RIGHT JOIN</option>
				</select>
				<br/>
				<label for="input_suzhu">关联字段：</label>
				<input type="text"  id="joinCloumn_${i.index}" value="${data.joinCloumn}" readonly="readonly" name="tables[${i.index}].joinCloumn"  onclick="showMenu('joinCloumn_${i.index}','toItemId_${i.index}');"/>
				<label for="input_suzhu">指向字段：</label>
				<input type="text"  id="refCloumn_${i.index}" value="${data.refCloumn}" readonly="readonly"  name="tables[${i.index}].refCloumn" onclick="showMenu('refCloumn_${i.index}','itemId_${i.index}');"/>
					<label for="input_suzhu">查询字段：</label>
				<input type="text"  id="search_${i.index}" value="${data.searchName}"  readonly="readonly"	name="tables[${i.index}].searchName"   onclick="showMenu('search_${i.index}','itemId_${i.index}','toItemId_${i.index}');"/>
				&nbsp;&nbsp;<a href="javascript:void(0)" onclick="createHtml()">添加</a>	<c:if test="${i.index  gt 0 }">&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' onclick='deleteHtml("${i.index}")'>删除</a></c:if>
			</div>
		</c:forEach>
		</c:if>
		<c:if test="${fn:length(list) eq 0 }">
			<div class="clearfix" id="master_0">
				<label for="input_suzhu">主表信息：</label>
				<select  style="width: 158px" id="itemId_0" name="tables[0].item.id" >
				<c:forEach var="entity" items="${item}" >
					<option value="${entity.id}">${entity.itemName}</option>
				</c:forEach>
				</select>
				<label for="input_suzhu">从表信息：</label>
				<select  style="width: 158px" id="toItemId_0" name="tables[0].toItem.id" >
					<option value="">---请选择---</option>
				<c:forEach var="entity" items="${item}">
					<option value="${entity.id}">${entity.itemName}</option>
				</c:forEach>
				</select>
				<label for="input_suzhu">关联方式：</label>
				<select  style="width: 158px" id="joinType_0" name="tables[0].joinType">
					<option value="">---请选择---</option>
					<option value="INNER">INNER JOIN</option>
					<option value="LEFT">LEFT JOIN</option>
					<option value="RIGHT">RIGHT JOIN</option>
				</select>
				<br/>
				<label for="input_suzhu">关联字段：</label>
				<input type="text"  id="joinCloumn_0" name="tables[0].joinCloumn"  readonly="readonly"  onclick="showMenu('joinCloumn_0','toItemId_0');"/>
				<label for="input_suzhu">指向字段：</label>
				<input type="text"  id="refCloumn_0"  name="tables[0].refCloumn" readonly="readonly" onclick="showMenu('refCloumn_0','itemId_0');"/>
					<label for="input_suzhu">查询字段：</label>
				<input type="text"  id="search_0" 	name="tables[0].searchName"  readonly="readonly"  onclick="showMenu('search_0','itemId_0','toItemId_0');"/>
				&nbsp;&nbsp;<a href="javascript:void(0)" onclick="createHtml()">添加</a>
			</div>
		</c:if>
	</div>
	</form>
		<div class="clearfix pop_btn_group_center">
			<a href="javascript:{}" class="blue_btn left"
				onclick="saveOrUpdateInfo();">保存</a> <a href="javascript:{}"
				class="blue_btn left ml20" onclick="closeDialog();">取消</a>
		</div>
	<div id="menuContent" class="menuContent"
		style="display:none; position: absolute;">
		<ul id="ztree" class="ztree" style="margin-top: 0; width: 160px;"></ul>
	</div>
	<script src="<%=path%>/js/jquery-1.9.1.min.js"></script>
	<script src="<%=path%>/js/vendor/jquery.form/jquery.form.min.js"></script>
	<script src="<%=path%>/js/vendor/msgbox/Scripts/jquery.msgBox.js"></script>
	<script src="<%=path%>/js/vendor/lhgdialog/openDialog.js"></script>
	<!-- validate -->
	<script src="<%=path%>/js/vendor/validate/jquery.metadata.js"></script>
	<script src="<%=path%>/js/vendor/validate/jquery.validate.min.js"></script>
	<script src="<%=path%>/js/vendor/validate/jquery.validate.extend.js"></script>
	<script src="<%=path%>/js/vendor/validate/messages_cn.js"></script>
	<script src="<%=path%>/js/vendor/My97DatePicker/WdatePicker.js"></script>
	<script src="<%=path%>/js/admin/common.js"></script>
	<script type="text/javascript" src="<%=path%>/js/vendor/zTree/jquery.ztree.core-3.5.js"></script>
	<script type="text/javascript" src="<%=path%>/js/vendor/zTree/jquery.ztree.excheck-3.5.js"></script>
	<script>
	var setting = {
		async: {
				enable: true,
				contentType:"application/json",
			  	type: "POST"
		},
		check: {
			enable: true,
			chkStyle: "checkbox"
		},
		view : {
			dblClickExpand : false
		},
		data : {
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "pId",
				rootPId: 0
			}
		},
		callback : {
			onCheck: zTreeOnCheck
		}
	};
	var treeType="";
	function item_change(obj,toitem){
		var ids=new Array();
		var id=$("#"+obj+"  option:selected").val();
		if(!id){
			return;
		}
		ids.push(id);
		if(arguments.length>1){
			var to_id=$("#"+toitem+"  option:selected").val();
			if(to_id&&to_id!=undefined){
				ids.push(to_id);
			}
		}
		var url="<%=path%>/subitem/subItemTree?ids="+ids;
		initTree(url);
	}

	var ztreeData=null;
	function initTree(url){
		setting.async.url=url;
		ztreeData=$.fn.zTree.init($("#ztree"), setting, null);
	}
	function zTreeOnCheck(event, treeId, treeNode) {
		var treeObj = $.fn.zTree.getZTreeObj("ztree");
		var nodes = ztreeData.getCheckedNodes(true);
		var names="";
		var ids="";
		for(var i in nodes){
			var data=nodes[i];
			if(data.pId==0){
				continue;
			}
			if(treeObj.getNodes&&treeObj.getNodes().length>1){
				names+=nodes[i].name+"("+nodes[i].getParentNode().name+"),";
			}else{
				names+=nodes[i].name+",";
			}
			ids+=nodes[i].id+",";
		}
		var serchName = $("#"+treeType);
		serchName.attr("value", names);
	};
	
	function showMenu(obj,itemvar,toItem) {
		var id=$("#"+itemvar+"  option:selected").val();
		if(!id){
			alert("请选择从表信息");
			return;
		}
		if(arguments.length>2){
				item_change(itemvar,toItem);	
			}else{
				item_change(itemvar);
		 }
		treeType=obj;
		var datamenu = $("#"+obj);
		var menuOffset = $("#"+obj).offset();
		$("#menuContent").css({
			left : menuOffset.left + "px",
			top : menuOffset.top + datamenu.outerHeight() + "px"
		}).slideDown("fast");
		$("body").bind("mousedown", onBodyDown);
	}
	function hideMenu() {
		$("#menuContent").fadeOut("fast");
		$("body").unbind("mousedown", onBodyDown);
	}
	function onBodyDown(event) {
		if (!(event.target.id == "menuContent" || $(
				event.target).parents("#menuContent").length > 0)) {
			hideMenu();
		}
	}
	var index=${fn:length(list)};
	function createHtml(){
		if(index==0){
			index=1;	
		}
		var html="<div class='clearfix' id='master_"+index+"'><label for='input_suzhu'>主表信息：</label>	<select  style='width: 158px' id='itemId_"+index+"' name='tables["+index+"].item.id' >";
		html+="<c:forEach var='entity' items='${item}'><option value='${entity.id}'>${entity.itemName}</option></c:forEach></select>";
		html+=" <label for='input_suzhu'>从表信息： </label><select  style='width: 158px' id='toItemId_"+index+"' name='tables["+index+"].toItem.id' ><option value=''>---请选择---</option>";
		html+="<c:forEach var='entity' items='${item}'><option value='${entity.id}'>${entity.itemName}</option>	</c:forEach></select>";
		html+="	<label for='input_suzhu'>关联方式：  </label><select  style='width: 158px' id='joinType_"+index+"' name='tables["+index+"].joinType' >	<option value=''>---请选择---</option><option value='INNER'>INNER JOIN</option><option value='LEFT'>LEFT JOIN</option><option value='RIGHT'>RIGHT JOIN</option></select><br/>";
		html+=" <label for='input_suzhu'>关联字段： </label><input type='text' readonly='readonly'  id='joinCloumn_"+index+"' name='tables["+index+"].joinCloumn'  onclick='showMenu(\"joinCloumn_"+index+"\",\"toItemId_"+index+"\");'/>";
		html+=" <label for='input_suzhu'>指向字段： </label><input type='text' readonly='readonly' id='refCloumn_"+index+"' name='tables["+index+"].refCloumn' onclick='showMenu(\"refCloumn_"+index+"\",\"itemId_"+index+"\");'/>";
		html+=" <label for='input_suzhu'>查询字段： </label><input type='text' readonly='readonly'  id='search_"+index+"' name='tables["+index+"].searchName'   onclick='showMenu(\"search_"+index+"\",\"itemId_"+index+"\",\"toItemId_"+index+"\");' />&nbsp;&nbsp;<a href='javascript:void(0)' onclick='createHtml()'>添加</a>&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' onclick='deleteHtml(\""+index+"\")'>删除</a>	</div>";
		console.log(html);
		$("#master_"+(index-1)).append(html);
		index++;
	}
	
	function deleteHtml(id){
		$('#master_'+id).remove();
		index=index-1;	
	}
	</script>
</body>
</html>