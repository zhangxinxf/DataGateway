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
<script src="<%=path%>/js/admin/userinfo.js"></script>
<script>
	$(function() {
		//加载表单验证规则
		$("#pageForm").validate(userCheck);
	});
</script>
</head>
<body>
	<div class="p20">
		<form name=pageForm id="pageForm" action="<%=path%>/userinfo/add"
			method="post">
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>用户名：</label>
				<input type="text" name="loginName" id="loginName" maxlength="20"/> <input
					type="hidden" id="id" value="0">
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>姓名：</label>
				<input type="text" name="userName" id="userName"  maxlength="10"/>
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>密码：</label>
				<input type="password" name="passWord" id="passWord" size="26" maxlength="20"/>
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>确认：</label>
				<input type="password" name="rePassWord" id="rePassWord" size="26" maxlength="20"/>
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>用户角色：</label>
				<select name="roleInfo" style="width: 200px">
					<option value="1">普通用户</option>
					<option value="0">管理员</option>
				</select>
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>邮箱：</label>
				<input type="text" name="email" id="email" maxlength="50"/>
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>手机号码：</label>
				<input type="text" name="telephone" id="telephone" maxlength="11"/>
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>到期停用：</label>
				<input type="radio" name="isenable" checked="checked" value="1">是
				<input type="radio" name="isenable" value="0">否
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>有效期：</label>
				<input type="text" name="endDate" id="endDate" class="Wdate"
					onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',lang:'zh-cn',minDate:'%y-%M-%d'})" />
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>单位名称：</label>
				<input type="text" name="company" id="company" maxlength="30"/>
			</div>
			<div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>单位地址：</label>
				<input type="text" name="address" id="address" maxlength="30">
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