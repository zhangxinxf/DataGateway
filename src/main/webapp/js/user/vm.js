/**
 * 查询提交
 * @param url
 */
function searchFrom(url){
	$("#searchForm").attr("action",url);
    $("#searchForm").submit();
}

//新增镜像信息，表单验证规则
var addImageCheck = {
		rules : {
			'name' : {
				required: true,
				imageNameReg:true,
				maxlength:20
			},
			'osType' : {
				required: true
			},
			'url' : {
				required: true,
				url:true
			},
			'format':{
				required: true
			}
		},
		errorPlacement: function(error, element) {  
		    error.appendTo(element.next());  
		}
}; 

/**
 * 添加和修改表单提交操作
 */
function saveOrUpdateInfo(){
	var options = {
            //   beforeSubmit:showRequest,
                success:showResponse,
                timeout:3000
               };
	var res = $("#pageForm").valid(); //表单验证
	//验证通过，执行提交操作
	if(res){		 
		 $('#pageForm').ajaxSubmit(options);
	}
    return false; 
} 
/**
 * 表单提交之后，需要做的处理
 * @param responseText
 * @param statusText
 * @param xhr
 * @param $form
 */
function showResponse(responseText, statusText, xhr, $form)  { 
	$("#progressbar").progressbar("value", 100);
	$.msgBox({
		    title:"消息提示",
		    content:""+responseText.msg,
		    type:"info",
		    buttons: [{ value: "确定" }],
		    success: function (result) {
		        if (result == "确定") {
		        	frameElement.api.opener.location.reload();
		        }
		    }
		});
}
	

/**
 *修改、删除、查看镜像配置
 * @param actionName
 * @param url
 */
function imageActionConfirm(actionName,url){
	 var checkedCount = 0;
	 var checkedValue = "";
	 var count = 0;
	 var state;
	 var options = {
	                success:imageActionResponse,
	                timeout:3000
	               };
	 $("[name='id']").each(function(){
		 if(this.checked){
			 checkedCount++;
			 checkedValue = this.value;
		 }
	 });
	 
	 if(actionName=='view'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一条数据进行修改!",
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要修改的数据  !",
				});
			 return;
		 }
		 return openDialog(url,'备份策略详情信息',600,300);
	 }
	 
	 if(actionName=='update'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一条数据进行修改!",
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要修改的数据  !",
				});
			 return;
		 }
		 
		 return openDialog(url,'修改备份策略',600,300);
	 }
	 
	 if(actionName=='backup'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一条数据进行修改!",
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要修改的数据  !",
				});
			 return;
		 }
		 
		 return openDialog(url,'查看备份虚拟机',1000,400);
	 }
	 
	 if(actionName=='delete' || actionName=='active' || actionName=='unactive'){
		 if(checkedCount>0){
			$('#deleteForm').attr("action",url);
			$('#deleteForm').ajaxSubmit(options);
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要修改的数据  !",
				});
			 return;
		 }
	 }	 
	 
	 if(actionName=='restore'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue;
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一条数据进行修改!",
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要修改的数据  !",
				});
			 return;
		 }
		 
		 $('#deleteForm').attr("action",url);
		 $('#deleteForm').ajaxSubmit(options);
		 return;
	 }
	 
	 if(actionName=='deleteVM'){
		 options = {
					success:backupActionResponse/*,
					timeout:3000*/
		 };
		 
		 if(checkedCount>0){
			$('#deleteForm').attr("action",url);
			$('#deleteForm').ajaxSubmit(options);
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要修改的数据  !",
				});
			 return;
		 }
	 }	 
	 	 
}

/**
 * 删除数据之后的操作
 * @param responseText
 * @param statusText
 * @param xhr
 * @param $form
 */
function imageActionResponse(responseText, statusText, xhr, $form)  { 
	$.msgBox({
	    title:"消息提示",
	    content:""+responseText.msg,
	    type:"info",
	    buttons: [{ value: "确定" }],
	    success: function (result) {
	        if (result == "确定") {
	        	window.location.reload();
	        }
	    }
	});
}

/**
 * 备份虚拟机操作
 */
function backupOperate(bakId, url) {
	var op = $("#operate_" + bakId).val();
	
	var options = {
			success:backupActionResponse/*,
			timeout:3000*/
	};

	if (op == 1) { // 恢复至该节点
		url += "restore/" + bakId;
	} else if (op == 3) { // 删除
		url += "delete/" + bakId;
		
		$("#tr_" + bakId).remove();
	}
	
	$('#deleteForm').attr("action",url);
	$('#deleteForm').ajaxSubmit(options);	
}

/**
 * 删除数据之后的操作
 * @param responseText
 * @param statusText
 * @param xhr
 * @param $form
 */
function backupActionResponse(responseText, statusText, xhr, $form)  {
	var msg = responseText.msg;
	
	if (responseText.success) {
		content = msg.split(":")[0];
		
		var ids = msg.split(":")[1].split(",");
		for (var i = 0; i < ids.length; i++) {			
			$("#tr_" + ids[i]).remove();			
		}		
	}

	$.msgBox({
	    title:"消息提示",
	    content:content,
	    type:"info",
	    buttons: [{ value: "确定" }],
	    success: function (result) {
	        /*if (result == "确定") {
	        	window.location.reload();
	        }*/
	    }
	});	
}