/**
 * 查询提交
 * @param url
 */
function searchFrom(url){
	$("#searchForm").attr("action",url);
    $("#searchForm").submit();
}

//新增模板信息，表单验证规则
var addTemplateCheck = {
		rules : {
			'name' : {
				required: true,
				instanceNameReg:true,
				maxlength:20
			},
			'vcpu' : {
				required: true,
				digits:true,
				notZeroFirst:true,
				min:1,
				max:64
			},
			'vmemory':{
				required: true,
				digits:true,
				notZeroFirst:true,
				min:128,
				max:65536
			},
			'vdisc':{
				required: true,
				digits:true,
				notZeroFirst:true,
				min:10,
				max:1024
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
	 $.msgBox({
		    title:"消息提示",
		    content:""+responseText.msg,
		    type:"info",
		    buttons: [{ value: "确定" }],
		    success: function (result) {
		        if (responseText.success && result == "确定") {
		        	frameElement.api.opener.location.reload();
		        }
		    }
		});
}
	

/**
 *修改、删除、查看模板配置
 * @param actionName
 * @param url
 */
function templateActionConfirm(actionName,url){
	 var checkedCount = 0;
	 var checkedValue = "";
	 var count = 0;
	 var state;
	 var options = {
	                success:templateActionResponse,
	                timeout:3000
	               };
	 $("[name='id']").each(function(){
		 if(this.checked){
			 checkedCount++;
			 checkedValue = this.value;
		 }
	 });
	 
	 
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
		 return openDialog(url,'修改模板',600,300);;
	 }
	 
	 if(actionName=='delete'){
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
function templateActionResponse(responseText, statusText, xhr, $form)  { 
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
