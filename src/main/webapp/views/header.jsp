<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%
   String path = request.getContextPath();
%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>佳华云</title>
<link rel="stylesheet" href="<%=path%>/css/common.css" />
<link rel="stylesheet" href="<%=path%>/css/header.css" />
<link rel="stylesheet"
	href="<%=path%>/js/vendor/msgbox/Styles/msgBoxLight.css" />
<script src="<%=path%>/js/jquery-1.9.1.min.js"></script>
<script src="<%=path%>/js/vendor/msgbox/Scripts/jquery.msgBox.js"></script>
<script type="text/javascript">
	//登出操作
	function logout() {
			if(confirm('确定要退出系统吗?')){
			 if(window.top!=null){
				window.top.location ="<%=path%>/logout";
			}
		}
	}
	/*获取客户端当前时间  */
	function CurentTime()
    { 
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var clock = year + "年"+month+ "月"+day + "日"
        return (clock); 
    } 
	$(function(){
		$("#nowDate").html(CurentTime());
	});
</script>
</head>
<body>
	<div class="header_bg clearfix">
		<div class="header_logo"></div>
		<div class="header_action_box clearfix">
			<div class="header_action_item">
				<a href="javascript:{logout()}" class="header_logout" >退出</a>
			</div>
		</div>
	</div>
	<div class="header_info">
		<a href="javascript:{}"><span id="nowDate"></span>，尊敬的${userinfo.userName}，欢迎您来到佳华云平台${version}版！</a>
	</div>
</body>
</html>