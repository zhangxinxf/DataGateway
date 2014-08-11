<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix='fmt' uri="http://java.sun.com/jsp/jstl/fmt" %> 
<%@ taglib prefix='c' uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> 
<%
   	String path = request.getContextPath();
	out.println("<script type='text/javascript'>");
    out.println("var rootPath = '" + request.getContextPath() + "';");
    out.println("</script>");
%>
    <title>佳华云</title>
    <link rel="stylesheet" href="<%=path%>/css/common.css"/>
    <link rel="stylesheet" href="<%=path%>/css/content.css"/>
    <link rel="stylesheet" href="<%=path%>/js/vendor/msgbox/Styles/msgBoxLight.css"/>
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
	    $(function(){
	    	$("#pageForm").validate(userCheck);
	    });
	</script>
</head> 
<body> 
<div class="p20">
   <form name=pageForm id="pageForm" action="<%=path%>/userinfo/update" method="post">
    <div class="clearfix pop_input">
       <label for="input_suzhu"><span class="red mr10">*</span>用户名：</label>
       		<input type="text" name="loginName" id="loginName"  value="${userinfo.loginName}" readonly maxlength="20"/>
	        <input type="hidden" name="id" id="id" value="${userinfo.id}"/>
    </div>
    <div class="clearfix pop_input">
         <label for="input_suzhu"><span class="red mr10">*</span>姓名：</label>
         	<input type="text" name="userName" id="userName" value="${userinfo.userName }" maxlength="10"  <c:if test="${userinfo.loginName=='admin' }">readonly</c:if>/>
    </div>
    <div class="clearfix pop_input">
       <label for="input_suzhu"><span class="red mr10">*</span>用户角色：</label>
          <select  name="roleInfo"<c:if test="${userinfo.loginName=='admin' }"> onfocus="this.defaultIndex=this.selectedIndex;"  onchange="this.selectedIndex=this.defaultIndex;"</c:if> style="width:200px" >
                     <option value="1" <c:if test='${userinfo.roleInfo eq "1"}'>selected</c:if>>普通用户</option>
                     <option value="0" <c:if test='${userinfo.roleInfo eq "0"}'>selected</c:if>>管理员</option>
          </select>
    </div>
    <div class="clearfix pop_input">
       <label for="input_suzhu"><span class="red mr10">*</span>邮箱：</label>
           <input type="text" name="email" id="email" value="${userinfo.email}" maxlength="50"/>
    </div>
    <div class="clearfix pop_input">
       <label for="input_suzhu"><span class="red mr10">*</span>手机号码：</label>
             <input type="text" name="telephone" id="telephone"  value="${userinfo.telephone}" maxlength="11"/>
    </div>
    <div class="clearfix pop_input">
				<label for="input_suzhu"><span class="red mr10">*</span>到期停用：</label>
				<c:if test="${userinfo.loginName=='admin' }">
					<input type="radio" name="isenable" value="1" onclick="javaScrirpt:return false;">是
					<input type="radio" name="isenable"  checked="checked" value="0" onclick="javaScrirpt:return false;">否
				</c:if>
				<c:if test="${userinfo.loginName!='admin' }">
					<input type="radio" name="isenable" <c:if test='${userinfo.isenable eq 1}'>checked</c:if> value="1">是
					<input type="radio" name="isenable" <c:if test='${userinfo.isenable eq 0}'>checked</c:if> value="0">否
				</c:if>
			</div>
    <div class="clearfix pop_input">
       <label for="input_suzhu"><span class="red mr10">*</span>有效期：</label>
            <input type="text" name="endDate" id="endDate"  class="Wdate" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',lang:'zh-cn',minDate:'%y-%M-%d'})" value="<fmt:formatDate  value='${userinfo.endDate}' type='date' pattern='yyyy-MM-dd' />" />
     </div>
     <div class="clearfix pop_input">
       <label for="input_suzhu"><span class="red mr10">*</span>单位名称：</label>
    	   <input type="text" name="company" id="company" value="${userinfo.company}" maxlength="30"/>
     </div>
    <div class="clearfix pop_input">
       <label for="input_suzhu"><span class="red mr10">*</span>单位地址：</label>
       <input type="text" name="address" id="address" value="${userinfo.address}" maxlength="30">
    </div>
   </form>
    <div class="clearfix pop_btn_group_center">
       <a href="javascript:{}" class="blue_btn left" onclick="saveOrUpdateInfo();">保存</a>
       <a href="javascript:{}" class="blue_btn left ml20" onclick="closeDialog();">取消</a>
    </div>
</div>
</body>
</html>