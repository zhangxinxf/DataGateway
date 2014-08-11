<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
<link rel="stylesheet"
	href="<%=path%>/js/vendor/msgbox/Styles/msgBoxLight.css" />
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
<script src="<%=path%>/js/admin/dbinfo.js"></script>
<script>
	$(function() {
		//加载表单验证规则
		$("#pageForm").validate(dbinfoCheck);
	});
</script>
</head>
<body>
	<div class="p20">
		<form name=pageForm id="pageForm" action="<%=path%>/invoke/add"
			method="post">
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>方法名称：</label>
				<input type="text" name=methodName id="methodName" maxlength="20"/> <input
					type="hidden" id="id" value="0">
			</div>
				<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>所属数据源：</label>
				<select name="dbInfo.id" id="dbId" style="width: 200px">
				<c:forEach var="item" items="${list}">
					<option value="${item.id}">${item.appname}</option>
				</c:forEach>
				</select>
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu">描述：</label>
				<textarea rows="10" cols="10" id="methodDes" name="methodDes"></textarea>
			</div>
		</form>
		<div class="clearfix pop_btn_group_center">
			<a href="javascript:{}" class="blue_btn left"
				onclick="saveOrUpdateInfo();">保存</a> <a href="javascript:{}"
				class="blue_btn left ml20" onclick="closeDialog();">取消</a>
		</div>
	</div>
</body>
</html>