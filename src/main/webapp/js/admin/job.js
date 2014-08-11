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
var jobCheck = {
		rules: {
			jobName: {
				required: true,
				loginId:true
				
			},
			haName: {
				required: true,
				loginId:true
				
				
			},
			"task.id":"required",
			period: {
				required: true,
				digits:true,
				ptInteger:true,
				range:[1,60]
			},
			taskId: {
				required: true
			},
			startTime: {
				required:true,
				
			},
			endTime:{
				timeCompare:"#startTime",
				required:true
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
 * 保存集群配置
 */
function save(){
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
function jobinfoActionConfirm(actionName,url,title,width,height){
	 var checkedCount = 0;
	 var checkedValue = "";
	 var count = 0;
	 var state;
	 var options = {
	                success:infoActionResponse,
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
			 url = url+"/"+checkedValue
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
	 if(actionName=='notall'){
		 if(checkedCount>0){
			 $.msgBox({
				    title: "消息提示",
				    content: "确定要进行"+title+"操作吗？",
				    type: "confirm",
				    buttons: [{ value: "是" }, { value: "否" }],
				    success: function (result) {
				        if (result == "是") {
				        	$('#deleteForm').attr("action",url);
							$('#deleteForm').ajaxSubmit(options);
				        }
				    }
				});
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要操作的数据  !",
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
	 $.msgBox({
		    title:"消息提示",
		    content:""+responseText.msg,
		    type:"info",
		    buttons: [{ value: "确定" }],
		    success: function (result) {
		        if (result == "确定") {
		        	$(frameElement.api.opener.document.getElementById("deleteForm")).remove();
		        	frameElement.api.opener.location.reload();
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
function infoActionResponse(responseText, statusText, xhr, $form)  { 
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
