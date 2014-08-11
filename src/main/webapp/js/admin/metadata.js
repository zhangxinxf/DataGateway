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
var itemCheck = {
		rules: {
			metadataName: {
				required: true,
				remote:{ // 验证应用名称是否存在
					　　 type:"GET",
					　　 url:rootPath+"/metadata/checkName",
					　　 data:{
					　　		metadataName:function(){return $("#metadataName").val();},
					  		id:function(){return $("#id").val();}
					 	} 
				}
			}
		}
}; 

/**
 * 添加和修改表单提交操作
 */
function saveOrUpdateInfo(){
	var options = {
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
 * 
 * @param actionName
 * @param url
 * @param title
 * @param width
 * @param height
 * @returns
 */
function itemActionConfirm(actionName,url,title,width,height){
	 var checkedCount = 0;
	 var checkedValue = "";
	 var idArray=new Array();
	 var options = {
	                success:itemActionResponse,
	                timeout:3000
	               };
	 $("[name='id']").each(function(){
		 if(this.checked){
			 checkedCount++;
			 checkedValue = this.value;
			 idArray.push( this.value);
		 }
	 });
	 
	 	if(actionName=='all'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue;
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一条数据进行操作!"
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要操作数据  !"
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
				    content:"请您选择要删除的数据!"
				});
			 return;
		 }
		
	 }
	 if(actionName=='read'){
		 if(checkedCount>0){
			$('#deleteForm').attr("action",url);
			$('#deleteForm').ajaxSubmit(options);
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请选择要读取的指标项  !"
				});
			 return;
		 }
	 }
	 if(actionName=='test'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue;
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一条数据进行操作!"
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要操作数据  !"
				});
			 return;
		 }
		 $.ajax({
				type : "POST",
				url : url,
				dataType : "JSON",
				success : function(data) {
					var type="error";
					if (data.success) {
						type="info";
					} 
					$.msgBox({
						title : "消息提示",
						content : data.msg,
						type : type,
						buttons : [ {
							value : "确定"
						} ],
						success : function(result) {
							if (result == "确定") {
								$('#deleteForm').remove();
								 window.location.reload();
							}
						}
					});
				}
			});
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
		        if (result == "确定") {
		        	if(type!="error"){
		        		$(frameElement.api.opener.document.getElementById("deleteForm")).remove();
			        	frameElement.api.opener.location.reload();
		        	}
		        }
		    }
		});
}


/**
 * 修改密码后响应操作
 * 
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
function itemActionResponse(responseText, statusText, xhr, $form)  { 
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
