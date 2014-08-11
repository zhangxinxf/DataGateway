<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix='fmt' uri="http://java.sun.com/jsp/jstl/fmt" %> 
<%@ taglib prefix='c' uri="http://java.sun.com/jsp/jstl/core" %> 
<!DOCTYPE>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<%
   	String path = request.getContextPath();
%>
    <title>佳华云</title>
    <link rel="stylesheet" href="<%=path%>/css/common.css"/>
    <link rel="stylesheet" href="<%=path%>/css/content.css"/>
    <script src="<%=path%>/js/vendor/lhgdialog/openDialog.js"></script>
</head> 
<body> 
<div class="p20">
    <div class="clearfix pop_input">
       <label for="input_suzhu">用户名：</label>
       		<input type="text"   value="${userinfo.loginName}" disabled="disabled"/>
    </div>
    <div class="clearfix pop_input">
         <label for="input_suzhu">姓名：</label>
         	<input type="text"  value="${userinfo.userName }" disabled="disabled"/>
    </div>
    <div class="clearfix pop_input">
       <label for="input_suzhu">用户角色：</label>
          <select   style="width:200px" disabled="disabled">
                     <option value="1" <c:if test='${userinfo.roleInfo eq "1"}'>selected</c:if>>普通用户</option>
                     <option value="0" <c:if test='${userinfo.roleInfo eq "0"}'>selected</c:if>>管理员</option>
          </select>
    </div>
    <div class="clearfix pop_input">
       <label for="input_suzhu">邮箱：</label>
           <input type="text" value="${userinfo.email}" disabled="disabled"/>
    </div>
    <div class="clearfix pop_input">
       <label for="input_suzhu">手机号码：</label>
             <input type="text"  value="${userinfo.telephone}" disabled="disabled"/>
    </div>
    <div class="clearfix pop_input">
				<label for="input_suzhu">到期停用：</label>
				<input type="radio" name="isenable" <c:if test='${userinfo.isenable eq 1}'>checked</c:if> value="1" disabled="disabled">是
				<input type="radio" name="isenable" <c:if test='${userinfo.isenable eq 0}'>checked</c:if> value="0" disabled="disabled">否
	</div>
			
    <div class="clearfix pop_input">
       <label for="input_suzhu">有效期：</label>
            <input type="text"   class="Wdate" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',lang:'zh-cn',minDate:'%y-%M-%d'})" value="<fmt:formatDate  value='${userinfo.endDate}' type='date' pattern='yyyy-MM-dd' />" disabled="disabled" />
     </div>
     <div class="clearfix pop_input">
       <label for="input_suzhu">单位名称：</label>
    	   <input type="text"  value="${userinfo.company}" disabled="disabled"/>
     </div>
    <div class="clearfix pop_input">
       <label for="input_suzhu">单位地址：</label>
       <input type="text"  value="${userinfo.address}" disabled="disabled">
    </div>
    <div class="clearfix pop_btn_group_center">
       <a href="javascript:{}" class="blue_btn left ml20" onclick="closeDialog();">返回</a>
    </div>
</div>
</body>
</html>