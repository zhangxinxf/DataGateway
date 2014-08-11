<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix='fmt' uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri="http://java.sun.com/jsp/jstl/core"%>
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
<script src="<%=path%>/js/admin/userinfo.js"></script>
<script>
	$(function() {
		$("#pageForm").validate(userCheck);
	});
</script>
</head>
<body>
	<div class="p20">
		<form name=pageForm id="pageForm"
			action="<%=path%>/userinfo/updatePass" method="post">
			<input name="id" type="hidden" value="${userinfo.id}">
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>当前密码：</label>
				<input type="password" name="opassWord" id="opassWord" size="26"
					maxlength="20" />
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>新密码：</label>
				<input type="password" name="passWord" id="passWord" size="26"
					maxlength="20" />
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>重新输入新密码：</label>
				<input type="password"  id="rePassWord" name="rePassWord" size="26"
					maxlength="20" />
			</div>
		</form>
		<div class="clearfix pop_btn_group_center">
			<a href="javascript:{}" class="blue_btn left"
				onclick="updatePassWord();">保存</a> <a href="javascript:{}"
				class="blue_btn left ml20" onclick="closeDialog();">取消</a>
		</div>
	</div>
</body>
</html>