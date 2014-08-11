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
			href="javascript:{}" class="position_item">数据源管理</a>
	</div>
	<div class="content_box">
		<div class="content_comm">
			<ul>
				<li><a href="javascript:{}" id="add_xuniji" class="add_icon"
					onclick="openDialog('<%=path%>/invoke/toAdd','添加方法信息',520,220);">添加</a></li>
				<li><a href="#" class="ref_icon"
					onclick="return dbinfoActionConfirm('all','<%=path%>/invoke/update','修改方法信息',520,220);">修改</a></li>
					<li><a href="#" class="ref_icon" 
					onclick="return dbinfoActionConfirm('all','<%=path%>/invoke/condition','修改方法信息',780,220);">配置查询条件</a></li>
				<li><a href="#" class="ref_icon"
					onclick="return dbinfoActionConfirm('all','<%=path%>/invoke/toAdd','修改方法信息',520,220);">配置结果集</a></li>
			</ul>
		</div>
		<div class="content_table">
			<form name=deleteForm id="deleteForm"
				action="<%=path%>/dbinfo/delete" method="post">
				<table width="100%" border="0" cellspacing="0" cellpadding="0"
					id="table_one">
					<tr>
						<th width="5%"><input type="checkbox" name="checkbox"
							class="chk" onclick="CheckAll();" /></th>
						<th width="5%">序号</th>
						<th width="15%">方法名称</th>
						<th width="15%">所属应用</th>
						<th width="15%">创建时间</th>
						<th width="15%">方法描述</th>
					</tr>
					<c:forEach var="invoke" items="${list}" varStatus="status">
						<tr>
							<td><label> <input type="checkbox" name="id"
									class="chk" value="${invoke.id}" />
							</label></td>
							<td>${(page.index-1)*page.perPage+status.index+1}</td>
							<td>${invoke.methodName}&nbsp;</td>
							<td>${invoke.dbInfo.appname}&nbsp;</td>
							<td><fmt:formatDate value="${invoke.createDate}" pattern="yyyy-MM-dd"/></td>
							<td>${invoke.methodDes}&nbsp;</td>
						</tr>
					</c:forEach>
				</table>
			</form>
			<div class="table_bot">
				<div class="table_bot_comm">
					<img src="<%=path%>/img/table/table_butt.gif" width="19"
						height="19" /> <a href="javascript:{}" onclick="CheckAll();">全选</a>&nbsp;&nbsp;&nbsp;&nbsp;
					<a id="delete_id" href="javascript:{}"
						onclick="return dbinfoActionConfirm('delete','<%=path%>/dbinfo/delete');">删除</a>
					<a id="delete_id_gray" class="table_delete_gray" href="#">删除</a>
					&nbsp;&nbsp;&nbsp;&nbsp; <span class="p05"></span>

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
<script src="<%=path%>/js/admin/dbinfo.js"></script>
<script type="text/javascript">
	$(function() {
		Table.init("table_one");
		Table.bindChk((function() {
			return (function(obj) {
				$("input[name='id']", obj).each(function() {
					var status = $(this).attr('status');
					var isCurr = $(this).attr('isCurr');
					var flag = $(this).attr('flag');
					if (this.checked) {
						//disableOperate(status);
						//disableOperateOn(isCurr, flag);
					} else {
						//Check.enable("delete_id,reset_id,distribute_id");
					}
				});
				//tableCheckList();
			});
		}).call(this));
	});
	var disableOperate = function(status) {
		Check.set('delete_id', (status <= 0));
	}
	var disableOperateOn = function(isCurr, flag) {
		Check.set('updatePass_id', isCurr == 1);
		Check.set('reset_id,distribute_id', (flag != 1));
	}
	function tableCheckList() {
		var _status = false;
		var _flag = false;
		$('#table_one').find('input[name="id"]').each(function() {
			var status = $(this).attr('status');
			var isCurr = $(this).attr('isCurr');
			var flag = $(this).attr('flag');
			if (this.checked) {
				if (!_status) {
					disableOperate(status);
					if (status > 0)
						_status = true;
				}
				if (!_flag) {
					disableOperateOn(isCurr, flag);
					if (flag == 1) {
						_flag = true;
					}
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
