/**
 * 查询提交
 * @param url
 */
function searchFrom(url){
	$("#searchForm").attr("action",url);
    $("#searchForm").submit();
}


//添加
if(typeof rootPath == 'undefined') rootPath = '';
var clusterCheck = {
		rules : {
			'name': {
				maxlength:30,
				required: true,
				loginId:true,
				remote: {
					type:"get",
					url:rootPath+'/cluster/addJudgeClusterName',
					data:{
						 id:function() {return $("#id").val();},
						 name:function() {return $("#name").val();}
						}
				}
			},
			'isHA':{
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
 *向集群中添加物理机
 */
function addHostByCls(){
	var options = {
                success:showResponse,
                timeout:3000
               };
	$("#int_clsId :input").each(function(){
		this.checked = true;
	});
	$("#out_clsId :input").each(function(){
		this.checked = false;
	});
    $('#pageForm').ajaxSubmit(options);
   return false; 
}

/**
 *添加物理机
 */
function addHost(){
	$("#out_clsId :input").each(function(){
		var vm_id = this.value;
		if($(this).prop('checked')) {
			var curLi = $('#li_' + vm_id);
			curLi.remove();
			$('#int_clsId').append(curLi);
		}
	});
}

/**
 *删除物理机
 */
function delHost(){
	$("#int_clsId :input").each(function(){
		var vm_id = this.value;
		if($(this).prop('checked')) {
			var curLi = $('#li_' + vm_id);
			curLi.remove();
			$('#out_clsId').append(curLi);
		}
	});
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
 *修改、删除、集群配置
 * @param actionName
 * @param url
 */
function clusterActionConfirm(actionName,url){
	 var checkedCount = 0;
	 var checkedValue = "";
	 var count = 0;
	 var state;
	 var options = {
	                success:clusterActionResponse,
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
		 return openDialog(url,'修改集群信息',520,200);;
	 }
	 
	 if(actionName=='addhost'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一个集群添加物理机!"
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择一个集群添加物理机  !"
				});
			 return;
		 }
		 return openDialog(url,'向集群中添加物理机',700,420);;
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
				    content:"请您选择要删除的数据  !"
				});
			 return;
		 }
	 }
	 
	// 扫描物理机
	if(actionName=='setCurrentCluster'){
		$('#deleteForm').attr("action",url);
		$('#deleteForm').ajaxSubmit(options);
	}
	 
	// 查看集群分组
	if(actionName=='showGroup'){
		if(checkedCount==1){
			url = url+"/"+checkedValue
		}
		
		$('#deleteForm').attr("action",url);
		$('#deleteForm').submit();
	}
}

/**
 * 删除数据之后的操作
 * @param responseText
 * @param statusText
 * @param xhr
 * @param $form
 */
function clusterActionResponse(responseText, statusText, xhr, $form)  { 
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


$("input[name='id']").filter(':checked').each(function(){
	alert('dd');
});

