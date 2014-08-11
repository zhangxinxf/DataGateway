<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>佳华云</title>
    <link rel="stylesheet" href="css/common.css" />
    <link rel="stylesheet" href="css/page/login.css" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="<%=path%>/js/jquery-1.9.1.min.js"></script>
	<script src="<%=path%>/js/vendor/lhgdialog/lhgcore.lhgdialog.min.js"></script>
	<script src="<%=path%>/js/vendor/lhgdialog/openDialog.js"></script>
    <script src="../js/frameset.js"></script>
    <script type="text/javascript">
	if(window.top!=window){
     	window.top.location='<%=path%>/index.jsp';
	}
        function check(){
            var re=/^[a-zA-Z_][a-zA-Z0-9_]{3,15}$/;
            var unObj=$("#uname");
            var psObj=$("#pass");
            var tp=$("#tip");
            var uname= $.trim(unObj.val());
            var pass= $.trim(psObj.val());
            if(uname==''){
                unObj.addClass("error");
                tp.find('span').text("请输入用户名/密码");
                tp.show();
                return;
            }
            if(pass==''){
                psObj.addClass("error");
                tp.find('span').text("密码不能为空！");
                tp.show();
                return;
            }
            $("#myform").submit();
            
            return;
        }
     function clearWarn(event,obj){
         if(event.keyCode==13||event.which==13){
             check();
         }else{
             $(obj).removeClass('error');
             $('#tip').find('span').text('').parent().hide();
         }
     }
    </script>
</head>
<body class="login_bg">
    <div class="login_content_bg" >
        <form class="login_form" action="login" id="myform" method="post">
            <div class="login_input_box clearfix">
                <label for="user_name">用户名：</label>
               <input type="text" id="uname" name="loginName" class="required" onkeyup="clearWarn(window.event||event,this)" value="${user.loginName}"/>
            </div>
            <div class="login_input_box clearfix">
                <label for="password">密&#12288;码：</label>
                  <input type="password" id="pass" name="passWord" onkeyup="clearWarn(window.event||event,this)" value="${user.passWord}"/>
            </div>
             <div class="mt5 cloud_arr clearfix ${(empty message)?'none':''}" id="tip">
             	<em class="block left" style="width:70px;">&nbsp;</em>
             	<span class="red fb block left">${message}</span>
             </div>
            <div class="login_input_action clearfix">
                <input type="button"  class="blue_btn left" value="登录"  onclick="check();"/>
                <input type="button"  class="blue_btn left ml5" value="用户注册"  onclick="openDialog('<%=path%>/userinfo/registerView','用户注册',620,380);"/>
            </div>
        </form>
    </div>
</body>
</html>