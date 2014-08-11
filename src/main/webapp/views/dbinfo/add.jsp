<%@ page contentType="text/html;charset=UTF-8" language="java"%>
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
		<form name=pageForm id="pageForm" action="<%=path%>/dbinfo/add"
			method="post">
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>用户名：</label>
				<input type="text" name=username id="username" maxlength="20"/> <input
					type="hidden" id="id" value="0">
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>密码：</label>
				<input type="password" name="password" id="password" size="26" maxlength="20"/>
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>IP地址：</label>
				<input type="text" name="ip" id="ip" maxlength="20"/>
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>实例名称：</label>
				<input type="text" name="dbname" id="dbname" maxlength="11"/>
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>数据库类型：</label>
				<select name="dbtype" style="width: 200px">
					<option value="MYSQL">MYSQL</option>
					<option value="SQLSERVER">SQLSERVER</option>
					<option value="ORACLE">ORACLE</option>
				</select>
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>应用名称：</label>
				<input type="text" name="appname" id="appname" maxlength="11"/>
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