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
<link rel="stylesheet"
	href="<%=path%>/js/vendor/zTree/zTreeStyle/zTreeStyle.css">
<script src="<%=path%>/js/jquery-1.9.1.min.js"></script>
<script src="<%=path%>/js/vendor/jquery.form/jquery.form.min.js"></script>
<script src="<%=path%>/js/vendor/msgbox/Scripts/jquery.msgBox.js"></script>
<script src="<%=path%>/js/vendor/lhgdialog/openDialog.js"></script>
<script src="<%=path%>/js/admin/userinfo.js"></script>
<script src="<%=path%>/js/admin/zTreeVM.js"></script>
</head>
<body>
	<div id="add_web_html" class="p20">
		<div class="pop_win_box">
			<div class="pop_win_content">
				<div class="clearfix">
					<div class="left w40">
						<div class="mt10 clearfix">
							<label class="w30 tr left lh22">虚拟机名称：</label> <input name="key"
								type="text" id="key" size="34" class="input_default w70 left" />
						</div>
						<div class="mt10 border_gray p10 white_bg"
							style="min-height: 260px;">
							<ul id="tree" class="ztree" style="height: 255px; width: 230px; border: none; overflow-y: auto;"></ul>
						</div>
					</div>
					<div class="left w20">
						<div style="margin-top: 150px;">
							<a href="javascript:{}" onclick="return addVM();"
								class="to_right_btn mauto">添加</a>
						</div>
						<div class="mt20">
							<a href="javascript:{}" onclick="return delVM();"
								class="to_left_btn mauto">删除</a>
						</div>
					</div>
					<div class="left w40">
						<div class="fb mt10" style="line-height:26px;">已分配的虚拟机：</div>
						<div class="border_gray mt10 p10 white_bg" style="min-height: 260px;">
							<form id="pageForm" name="pageForm"
								action="<%=path%>/userinfo/distributeVM" method="post">
								<input type="hidden" name="userId" value="${userId}" /> <select
									name="virtualMachineIds" id="vms" multiple="multiple"
									style="height: 250px; width: 250px; border: none; overflow-y: auto;">
								</select>
							</form>
						</div>
					</div>
				</div>
				<div class="btn_group_auto mt20 clearfix">
						<a href="javascript:{}" class="blue_btn left" id="add_id" style="display: none;"
							onclick="return save();">保存</a>
							<a href="javascript:{}" class="gray_btn left" id="add_gray_id">保存</a> 
						 <a href="javascript:{}"
						class="blue_btn left ml20" onclick="closeDialog();">取消</a>
				</div>
			</div>
		</div>
	</div>
</body>
<script src="<%=path%>/js/vendor/zTree/jquery.ztree.core-3.5.js"></script>
<script src="<%=path%>/js/vendor/zTree/jquery.ztree.excheck-3.5.js"></script>
<script type="text/javascript">
			$.fn.zTree.init($("#tree"), setting, ${vmTree});
			$("#key").bind("propertychange", searchNode).bind("input", searchNode);
			initData("${opt_type}");
	</script>
</html>