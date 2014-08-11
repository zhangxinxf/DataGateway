<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib prefix='fmt' uri="http://java.sun.com/jsp/jstl/fmt" %> 
<script type="text/javascript">
    TogglePass.init();
    formValidate("updateUserForm",updateUserCheck);
</script>
<style>
.error{
    color:red;
    line-height: 15px;
}
</style>
<form  id="updateUserForm" name="updateUserForm" action="#">
	<div class="user_info_wrap">
		<input type="hidden" name="id" value="${userinfo.id}"/>
		<input type="hidden" name="userName" value="${userinfo.userName}" />
		<input type="hidden" name="roleInfo" value="${userinfo.roleInfo}"/>
		<input type="hidden" name="explainText" value="${userinfo.explainText}"/>
	    
	    <div class="clearfix user_info_item">
	        <div class="user_info_tab">用户名：</div>
	        <div class="user_info_input">
	            <input type="text" name="loginName" id="loginName" value="${userinfo.loginName}" readonly/>
	              &nbsp;&nbsp;<span></span>
	        </div>
	        <a href="javascript:;" id="toggle_pass" class="user_info_edit">修改密码</a>
	    </div>
	    <div class="clearfix user_info_item user_info_pass">
	        <div class="user_info_tab">原密码：</div>
	        <div class="user_info_input">
	            <input type="password" name="reOldPwd" id="reOldPwd"/>
	            &nbsp;&nbsp;<span></span>
	        </div>
	    </div>
	    <div class="clearfix user_info_item user_info_pass">
	        <div class="user_info_tab">新密码：</div>
	        <div class="user_info_input">
	             <input type="password" name="passWord" id="passWord" value=""/>
	              &nbsp;&nbsp;<span></span>
	        </div>
	    </div>
	    <div class="clearfix user_info_item user_info_pass">
	        <div class="user_info_tab">再次输入：</div>
	        <div class="user_info_input">
	             <input type="password" name="reNewPassWord" id="reNewPassWord" value="" />
	              &nbsp;&nbsp;<span></span>
	        </div>
	    </div>
	    <div class="clearfix user_info_item">
	        <div class="user_info_tab">邮箱地址：</div>
	        <div class="user_info_input">
	             <input type="text" name="email" id="email" value="${userinfo.email}" />
	            &nbsp;&nbsp;<span></span>     
	        </div>
	    </div>
	    <div class="clearfix user_info_item">
	        <div class="user_info_tab">手机号码：</div>
	        <div class="user_info_input">
	            <input type="text" name="telephone" id="telephone" value="${userinfo.telephone}"  />
	            &nbsp;&nbsp;<span></span>
	        </div>
	    </div>
	    <div class="clearfix user_info_item">
	        <div class="user_info_tab">公司名称：</div>
	        <div class="user_info_input">
	            <input type="text" name="company" id="company" value="${userinfo.company}" />
	            &nbsp;&nbsp;<span></span>
	        </div>
	    </div>
	    <div class="clearfix user_info_item">
	        <div class="user_info_tab">公司地址：</div>
	        <div class="user_info_input">
	            <input type="text" name="address" id="address" value="${userinfo.address}" />
	             &nbsp;&nbsp;<span></span>
	        </div>
	    </div>
	    <div class="clearfix user_info_item">
	        <div class="user_info_tab">合同有效期至：</div>
	        <div class="user_info_input">
	            <input type="text" name="endDate" id="endDate" class="Wdate"  onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',lang:'zh-cn'})" value="<fmt:formatDate  value="${userinfo.endDate}" type="date" pattern="yyyy-MM-dd" />" />
	             &nbsp;&nbsp;<span></span>
	        </div>
	        <a href="javascript:;" class="user_info_edit">申请延长</a>
	    </div>
	    <div class="clearfix user_info_item">
	        <a href="javascript:;" onclick="return updateUser('userinfo/updateUser');" class="user_info_btn"></a>
	    </div>
	</div>
</form>
