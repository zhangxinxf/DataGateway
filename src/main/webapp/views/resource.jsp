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
<link rel="stylesheet" href="<%=path%>/css/page/resource.css" />
<script src="<%=path%>/js/jquery-1.9.1.min.js"></script>
<script src="<%=path%>/js/vendor/fusionchar/FusionCharts.js"></script>
<script src="<%=path%>/js/admin/resource.js"></script>
<script src="<%=path%>/js/vendor/lhgdialog/lhgcore.lhgdialog.min.js"></script>
<script src="<%=path%>/js/vendor/lhgdialog/openDialog.js"></script>
<script src="<%=path%>/js/vendor/msgbox/Scripts/jquery.msgBox.js"></script>
<script src="<%=path%>/js/frameset.js"></script>
</head>
<body class="content_bg">
	<div class="p10">
		<div class="tab_wrap">
			<%@ include file="top_common.jsp"%>
			<div class="res_warning_box">
				<div class="res_warning_content">
					<div class="res_warning_content_wrap">
						<div class="clearfix pt10">
							<div class="res_warning_item res_item_tab">
								<span>物理机：</span> 
							</div>
							<div class="res_warning_item">
								<a href="javascript:{Frameset.subTo('<%=path %>/alarm/alarmRunList')}">提示告警(<em id="pm_grade_prompt">0</em>条)</a> 
								 <span class="help_tip_icon"></span>
							</div>
							<div class="res_warning_item">
								 <a href="javascript:{Frameset.subTo('<%=path %>/alarm/alarmRunList')}">一般告警(<em id="pm_grade_so">0</em>条)</a> 
								 <span class="help_tip_icon"></span>
								
							</div>
							<div class="res_warning_item">
								 <a href="javascript:{Frameset.subTo('<%=path %>/alarm/alarmRunList')}">严重告警(<em id="pm_grade_serious">0</em>条)</a> 
								 <span class="help_tip_icon"></span>
							</div>
						</div>
						<div class="clearfix pt10">
							<div class="res_warning_item res_item_tab">
								<span>虚拟机：</span> 
							</div>
							<div class="res_warning_item">
								<a href="javascript:{Frameset.subTo('<%=path %>/alarm/alarmRunList')}">提示告警(<em id="vm_grade_prompt">0</em>条)</a> 
								 <span class="help_tip_icon"></span>
							</div>
							<div class="res_warning_item">
								 <a href="javascript:{Frameset.subTo('<%=path %>/alarm/alarmRunList')}">一般告警(<em id="vm_grade_so">0</em>条)</a> 
								 <span class="help_tip_icon"></span>
								
							</div>
							<div class="res_warning_item">
								 <a href="javascript:{Frameset.subTo('<%=path %>/alarm/alarmRunList')}">严重告警(<em id="vm_grade_serious">0</em>条)</a> 
								 <span class="help_tip_icon"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="res_warning_tab">
					<div class="warning_msg_icon mt20">告警信息</div>
				</div>
			</div>

			<div class="res_img_box mt20 clearfix">
				<div class="left" style="width: 50%;">
					<div id="pmchar_title" class="fb tc"></div>
					<div class="mt5" id="pmchar_id" align="center" style="height:180px;overflow-y:hidden;">
						
					</div>
				</div>
				<div class="left" style="width: 50%;">
					<div id="vmchar_title" class="fb tc"></div>
					<div class="mt5" id="vmchar_id" align="center" style="height:180px;overflow-y:hidden;">
					
					</div>
				</div>
			</div>

			<div class="res_img_box mt20 clearfix">
				<div class="left" style="width: 33%" id="vcp_id"></div>
				<div class="left" style="width: 33%" id="mennum_id"></div>
				<div class="left" style="width: 33%" id="disck_id"></div>
			</div>

		</div>
	</div>
<div class="sys_tip" style="display: none">
    <div class="sys_tip_title">
     			   提示信息
        <div class="sys_tip_close"></div>
    </div>
    <div class="sys_tip_box">
        <table class="sys_tip_table">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>用户</th>
                    <th>有效期</th>
                    <th>操作</th>
                </tr>       
            </thead>
            <tbody id="ts">
            </tbody>
        </table>
    </div>
</div>
</body>
<script type="text/javascript">
					$(document).ready(function() {
								$.ajax({
									type:"POST",
									url:"<%=path%>/passUser",
									dataType : "JSON",
									success : function(data) {
									    if(data.length>0){
												$(data).each(
														function(i, entity) {
															url="<%=path%>/userinfo/updatePast/"+entity[0];
															var html = "<tr><td>"
																	+ (i
																	+1) 
																	+ "</td><td>"
																	+ entity[1]
																	+ "</td><td>"
																	+ entity[2]
																	+ "(天)</td><td><a href='javascript:void(0)' class='sys_tip_btn' onclick=\"openDialog('"+url+"','该用户的有效期即将到期，到期后，改用后将不能登录虚拟机',550,150);\">更改</a></td><tr>";
																	$("#ts").append(
																	html);
														});
												$(".sys_tip").slideDown();
												$(".sys_tip_close").click(function() {
													$(".sys_tip").slideUp();
												});
											}
										}
								});
					});
</script>
</html>
