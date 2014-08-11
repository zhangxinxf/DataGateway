/**
 * 查询提交
 * 
 * @param url
 */
function searchFrom(url){
	$("#searchForm").attr("action",url);
    $("#searchForm").submit();
}

// 新增存储信息，表单验证规则
var userCheck = {
		rules: {
			loginName: {
				loginId:true,
				required: true,
				remote:{ // 验证用户名是否存在
					　　 type:"GET",
					　　 url:rootPath+"/userinfo/checkLoginName",
					　　 data:{
					　　		loginName:function(){return $("#loginName").val();},
					  		id:function(){return $("#id").val();}
					　　 } 
				}
			},
			userName: {
				required: true,
				minlength:2
			},
			opassWord: {
				required: true,
				passwdformat:true,
				minlength: 6
			},
			passWord: {
				required: true,
				passwdformat:true,
				minlength: 6
			},
			rePassWord: {
				required: true,
				minlength: 6,
				equalTo: "#passWord"
			},
			email: {
				required: true,
				email: true
			},
			telephone: {
				required:true,
				isMobile:true
			},
			endDate:true,
			address:"required",
			explainText:"required",
			company:"required"
		}
}; 

function updatePassWord(){
	var options = {
            // beforeSubmit:showRequest,
                success:response,
                timeout:3000
               };
	var res = $("#pageForm").valid(); // 表单验证
	// 验证通过，执行提交操作
	if(res){
		 $('#pageForm').ajaxSubmit(options);
	}
}

/**
 * 添加和修改表单提交操作
 */
function saveOrUpdateInfo(){
	var options = {
            // beforeSubmit:showRequest,
                success:showResponse,
                timeout:3000
               };
	var res = $("#pageForm").valid(); // 表单验证
	// 验证通过，执行提交操作
	if(res){
		 $('#pageForm').ajaxSubmit(options);
	}
    return false; 
} 
/**
 * 保存集群配置
 */
function save(){
	var obj=$("#vms option");
	$.each(obj,function(index,o){
		$(o).attr("selected",true);
	});
	var options = {
                success:showResponse,
                timeout:3000
               };
	$('#pageForm').ajaxSubmit(options);
    return false; 
} 


/**
 * 
 * @param actionName
 * @param url
 * @param title
 * @param width
 * @param height
 * @returns
 */
function userinfoActionConfirm(actionName,url,title,width,height){
	 var checkedCount = 0;
	 var checkedValue = "";
	 var count = 0;
	 var state;
	 var options = {
	                success:userinfoActionResponse,
	                timeout:3000
	               };
	 $("[name='id']").each(function(){
		 if(this.checked){
			 checkedCount++;
			 checkedValue = this.value;
		 }
	 });
	 
	 	if(actionName=='all'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue;
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一条数据进行操作!",
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要操作数据  !",
				});
			 return;
		 }
		 return openDialog(url,title,width,height);
	 	}
	 if(actionName=='delete'){
		 if(checkedCount>0){
			 $.msgBox({
					title : "消息提示",
					content : "确定要进行删除操作吗？",
					type : "confirm",
					buttons : [ {
						value : "是"
					}, {
						value : "否"
					} ],
					success : function(result) {
						if (result == "是") {
							$('#deleteForm').attr("action",url);
							$('#deleteForm').ajaxSubmit(options);
						}
					}
				});
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要删除的数据  !",
				});
			 return;
		 }
		
	 }
	 if(actionName=='reset'){
		 if(checkedCount>0){
			 $.msgBox({
					title : "消息提示",
					content : "确定要进行重置操作吗？",
					type : "confirm",
					buttons : [ {
						value : "是"
					}, {
						value : "否"
					} ],
					success : function(result) {
						if (result == "是") {
							$('#deleteForm').attr("action",url);
							$('#deleteForm').ajaxSubmit(options);
						}
					}
				});
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要重置的数据  !",
				});
			 return;
		 }
	 }
}

/**
 * 表单提交之后，需要做的处理
 * 
 * @param responseText
 * @param statusText
 * @param xhr
 * @param $form
 */
function showResponse(responseText, statusText, xhr, $form)  { 
	 var type="info";
	 if(!responseText.success){
		 type="error";
	 }
	 $.msgBox({
		    title:"消息提示",
		    content:""+responseText.msg,
		    type:type,
		    buttons: [{ value: "确定"}],
		    success: function (result) {
		        //if (result == "确定") {
		        	//frameElement.api.opener.location.reload();
		        	/*
		        	if(type!="error"){		        		
		        		window.top.location =rootPath+"/logout";
		        	} else {
		        		frameElement.api.opener.location.reload();
		        	}*/
		        //}
		    }
		});
}


/**
 * 修改密码后响应操作
 * @param responseText
 * @param statusText
 * @param xhr
 * @param $form
 */
function response(responseText, statusText, xhr, $form)  { 
	 var type="info";
	 var msg="密码修改成功,请重新登录!";
	 if(!responseText.success){
		 type="error";
		 msg=responseText.msg;
	 }
	 $.msgBox({
		    title:"消息提示",
		    content:msg,
		    type:type,
		    buttons: [{ value: "确定"}],
		    success: function (result) {
		        if (result == "确定") {
		        	if(type!="error"){
		        		if(window.top!=null){
		    				window.top.location =rootPath+"/logout";
		    			}
		        	}
		        }
		    }
		});
}


/**
 * 删除数据之后的操作
 * 
 * @param responseText
 * @param statusText
 * @param xhr
 * @param $form
 */
function userinfoActionResponse(responseText, statusText, xhr, $form)  { 
	 $.msgBox({
		    title:"消息提示",
		    content:""+responseText.msg,
		    type:"info",
		    buttons: [{ value: "确定" }],
		    success: function (result) {
		        if (result == "确定") {
		        	$('#deleteForm').remove();
		        	window.location.reload();
		        }
		    }
		});
}

function msgDialog(msg,type){
	$.msgBox({
	    title:"消息提示",
	    content:msg,
	    type:type,
	    buttons: [{ value: "确定" }],
	    success: function (result) {
	        if (result == "确定") {
	        	$('#deleteForm').remove();
	        	window.location.reload();
	        }
	    }
	});
}
