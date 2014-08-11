/**
 * 查询提交
 * @param url
 */
function searchFrom(url){
	$("#searchForm").attr("action",url);
    $("#searchForm").submit();
}

//新增存储信息，表单验证规则
var hostCheck = {
		rules : {
			'ip': {
				ipv4: true,
				required: true
			},
			'ipmiIP':{
				ipv4: true,
				required: false
			},
			'ipmiPort':{
				isDigits: true,
				required: false
			},
			'ipmiUser':{
				stringCheck: true,
				required: false
			},
			'ipmiPassWord':{
				stringCheck: false,
				required: false
			}
			,
			'clsId':{
				required: true
			}
		}
}; 

/**
 * 添加和修改表单提交操作
 */
function saveOrUpdateInfo(){
	var options = {
                success:showResponse,
                timeout:30000
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
		        if (result == "确定") {
		        	frameElement.api.opener.location.reload();
		        }
		    }
		});
}
	

/**
 *物理的常规操作
 * @param actionName
 * @param url
 */
function hostActionConfirm(actionName,url){
	 var checkedCount = 0;
	 var checkedValue = "";
	 var count = 0;
	 var state;
	 var options = {
	                success:hostActionResponse,
	                timeout:30000
	               };
	 $("[name='id']").each(function(){
		 if(this.checked){
			 checkedCount++;
			 if (checkedCount == 1) {
				 checkedValue = this.value;	 
			 } else {
				 checkedValue += "," + this.value;
			 }
			 
		 }
	 });
	 //修改
	 if(actionName=='update'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一条数据进行修改!"
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要修改的数据  !"
				});
			 return;
		 }
		 return openDialog(url,'修改物理机的信息',520,460);
	 }
	 if(actionName=='monitor'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一条数据查看!"
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要查看的监控信息 !"
				});
			 return;
		 }
		 return openDialog(url,'查看物理机监控信息',960,430);
	 }
	 
	 //查看
	 if(actionName=='view'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一条数据进行查看!"
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要查看的数据  !"
				});
			 return;
		 }
		 return openDialog(url,'查看物理机的信息',520,460);
	 }
	 
	 //扫描物理机
	 if(actionName=='scanHost'){
		$('#deleteForm').attr("action",url);
		$('#deleteForm').ajaxSubmit(options);
	 }
	 
	 //启用物理机
	 if(actionName=='enableHost'){
		 if(checkedCount>0){
			 url = url + "?id=" + checkedValue
		 }
		 if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要修改的数据  !"
				});
			 return;
		 }
		 return openDialog(url,'启用物理机',520,200);
	 }
	 
	 //禁用物理机
	 if(actionName=='disableHost'){
		 if(checkedCount>0){
			$('#deleteForm').attr("action",url);
			$('#deleteForm').ajaxSubmit(options);
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要禁用的物理机  !"
				});
			 return;
		 }
	 }
	 
	 //启动物理机
	 if(actionName=='startHost'){
		 if(checkedCount>0){
			$('#deleteForm').attr("action",url);
			$('#deleteForm').ajaxSubmit(options);
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要启动的物理机  !"
				});
			 return;
		 }
	 }
	 
	 //关闭物理机
	 if(actionName=='stopHost'){
		 if(checkedCount>0){
			$('#deleteForm').attr("action",url);
			$('#deleteForm').ajaxSubmit(options);
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要关机的物理机  !"
				});
			 return;
		 }
	 }
	 
	 //重启物理机
	 if(actionName=='rebootHost'){
		 if(checkedCount>0){
			$('#deleteForm').attr("action",url);
			$('#deleteForm').ajaxSubmit(options);
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要重启的物理机  !"
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
function hostActionResponse(responseText, statusText, xhr, $form)  { 
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




/**
 * 横向柱状图展示
 */
function animate(){
	var max="barred";
	var middle="baryellow";
	var min="barblue";	
	
	var maxValue=100;
	var minValue=0;
	
	var maxIndex=0;
	var minIndex=0;
	
	$(".charts").each(function(i,item){
		var a=parseInt($(item).attr("w"));
	
		if(i==0){
			minValue=a;
			minIndex=i;
		}
	
		if(a>maxValue){
			maxValue=a;
			maxIndex=i;
		}else if(a<minValue){
			minValue=a;
			minIndex=i;
		}
	
	});
	
	$(".charts").each(function(i,item){
		var addStyle="";
		var value=parseInt($(item).attr("w"));
		if(value>=90){
			addStyle=max;
		}else if(value<=50){
			addStyle=min;
		}else{
			addStyle=middle;
		}
	
		$(item).addClass(addStyle);
		var a=$(item).attr("w");
		$(item).animate({
			width: a+"%"
		},1000);
	});
	
}