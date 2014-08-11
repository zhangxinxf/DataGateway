<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>佳华云</title>
<%
	out.println("<script type='text/javascript'>");
	out.println("var rootPath = '" + request.getContextPath() + "';");
	out.println("</script>");
	String path = request.getContextPath();
%>
<link rel="stylesheet" href="<%=path%>/css/common.css" />
<link rel="stylesheet" href="<%=path%>/css/content.css" />
<link rel="stylesheet"
	href="<%=path%>/js/vendor/msgbox/Styles/msgBoxLight.css" />
</head>
<body class="content_bg">
	<div class="position">
		<a href="javascript:{}" class="position_start">当前位置：系统首页</a> <a
			href="javascript:{}" class="position_item">系统管理</a> <a
			href="javascript:{}" class="position_item">指标管理</a>
	</div>
	<div class="content_box">
		<form class="content_search clearfix" name=searchForm id="searchForm"
			action="">
			<div class="left ml10">
				<label>指标名称：<input type="text" name="itemName"
					value="${itemName}" onkeyup="onkeyCode(window.event||event)" /></label> <label>所属应用：
					<select name="dbId">
						<option value="">---请选择---</option>
						<c:forEach items="${dbList}" var="db">
							<option value="${db.id}"
								<c:if test="${db.id eq dbId }">selected</c:if>>${db.appname}</option>
						</c:forEach>
				</select>
				</label>
			</div>
			<div class="left ml10">
				<a href="javascript:{}" class="search_icon"
					onclick="searchFrom('${page.pageUrl}');">搜索</a>
			</div>
		</form>
		<div class="content_comm">
			<ul>
				<li><a href="javascript:{}" id="add_xuniji" class="add_icon"
					onclick="openDialog('<%=path%>/item/toAdd','添加指标',520,220);">添加</a></li>
				<li><a href="#" class="ref_icon"
					onclick="return itemActionConfirm('all','<%=path%>/item/update','修改指标',520,220);">修改</a></li>
			</ul>
		</div>
		<div class="content_table">
			<form name=deleteForm id="deleteForm" action="<%=path%>/item/delete"
				method="post">
				<table width="100%" border="0" cellspacing="0" cellpadding="0"
					id="table_one">
					<tr>
						<th width="5%"><input type="checkbox" name="checkbox"
							class="chk" onclick="CheckAll();" /></th>
						<th width="5%">序号</th>
						<th width="20%">指标名称</th>
						<th width="20%">所属应用</th>
						<th width="20%">读取状态</th>
						<th width="20%">描述</th>
						<th width="20%">创建时间</th>
					</tr>
					<c:forEach var="item" items="${list}" varStatus="status">
						<tr>
							<td><label> <input type="checkbox" name="id"
									class="chk" value="${item.id}" status="${item.readStatus}" />
							</label></td>
							<td>${(page.index-1)*page.perPage+status.index+1}</td>
							<td>${item.itemName}&nbsp;</td>
							<td>${item.dbInfo.appname}&nbsp;</td>
							<td><c:choose>
									<c:when test="${ item.readStatus eq 1}">成功</c:when>
									<c:when test="${ item.readStatus eq 2}">失败</c:when>
									<c:otherwise>未读取</c:otherwise>
								</c:choose> &nbsp;</td>
							<td>${item.itemDes}&nbsp;</td>
							<td><fmt:formatDate value="${item.createDate}"
									pattern="yyyy-MM-dd" />&nbsp;</td>
					</c:forEach>
				</table>
			</form>
			<div class="table_bot">
				<div class="table_bot_comm">
					<img src="<%=path%>/img/table/table_butt.gif" width="19"
						height="19" /> <a href="javascript:{}" onclick="CheckAll();">全选</a>&nbsp;&nbsp;&nbsp;&nbsp;
					<a id="delete_id" href="javascript:{}"
						onclick="return itemActionConfirm('delete','<%=path%>/item/delete');">删除</a>
					<a id="delete_id_gray" class="table_delete_gray" href="#">删除</a>
					&nbsp;&nbsp;&nbsp;&nbsp; <a id="read_id" href="javascript:{}"
						onclick="return itemActionConfirm('read','<%=path%>/item/read');">读取指标项</a>
					<a id="read_id_gray" class="table_delete_gray" href="#">读取指标项</a>
				</div>
				<%@ include file="../common/pagingBar.jsp"%>
			</div>
		</div>
	</div>
</body>
<script src="<%=path%>/js/jquery-1.9.1.min.js"></script>
<script src="<%=path%>/js/vendor/jquery.form/jquery.form.min.js"></script>
<script src="<%=path%>/js/vendor/lhgdialog/lhgcore.lhgdialog.min.js"></script>
<script src="<%=path%>/js/vendor/lhgdialog/openDialog.js"></script>
<script src="<%=path%>/js/vendor/msgbox/Scripts/jquery.msgBox.js"></script>
<script src="<%=path%>/js/table.js"></script>
<script src="<%=path%>/js/admin/item.js"></script>
<script type="text/javascript">
	$(function() {
		Table.init("table_one");
		Table.bindChk((function() {
			return (function(obj) {
				$("input[name='id']", obj).each(function() {
					var status = $(this).attr('status');
					if (this.checked) {
						disableOperate(status);
					} else {
						Check.enable("delete_id,read_id");
					}
				});
				tableCheckList();
			});
		}).call(this));
	});
	var disableOperate = function(status) {
		Check.set('delete_id', (status != 1));
		Check.set('read_id', (status == '' || status == 2));
	}
	function tableCheckList() {
		var _status = false;
		$('#table_one').find('input[name="id"]').each(function() {
			var status = $(this).attr('status');
			if (this.checked) {
				if (!_status) {
					disableOperate(status);
					if (status > 0)
						_status = true;
				}
			}
		});
	}
	/*全选操作*/
	function CheckAll() {
		Table.checkAll();
		tableCheckList();
	}

	function onkeyCode(event) {
		if (event.keyCode == 13 || event.which == 13) {
			searchFrom('${page.pageUrl}');
		}
	}
</script>
</html>
