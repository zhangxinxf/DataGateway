/**
 * 查询提交
 * 
 * @param url
 */
function searchFrom(url) {
	$("#searchForm").attr("action", url);
	$("#searchForm").submit();
}

/**
 * 保存操作
 */
function save() {
	var options = {
		success : showResponse,
		timeout : 3000
	};
	$('#pageForm').ajaxSubmit(options);
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
function subnetActionConfirm(actionName, url) {
	var checkedCount = 0;
	var checkedValue = "";
	var options = {
		success : ActionResponse,
		timeout : 3000
	};
	$("[name='id']").each(function() {
		if (this.checked) {
			checkedCount++;
			checkedValue = this.value;
		}
	});
	 //添加内网信息
	 if(actionName=='add'){
		 var flag = true;
		 $.ajax({
			 async:false,
			 url:"/rkcloud/subnetinfo/isadd",
			 success:function (responseText) {
				 flag  = responseText.success;
				 if(responseText.success == false)
				 {
					 $.msgBox({
							title : "消息提示",
							content :"网卡已经被全部被使用，无法完成添加！"
							});
					 return ;
				 }
			 }
		 }).done();
		 if(flag){
		 return openDialog(url,'添加内网',520,340);
		 }
	 }
	 
	 //添加内网信息
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
				    content:"请您选择一条数据进行修改 !"
				});
			 return;
		 }    
		 return openDialog(url,'修改内网',520,340);
	 }
	 
	 if(actionName =="delete")
	 {
		 if(checkedCount>0){
			 $.msgBox({
					title : "消息提示",
					content : "确定要删除？",
					type : "confirm",
					buttons : [ {
						value : "是"
					}, {
						value : "否"
					} ],
					success : function(result) {
						if (result == "是") {
							$('#pageForm').attr("action",url);
							$('#pageForm').ajaxSubmit(options);
						}
					}
				});
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请选择要删除的记录"
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
function showResponse(responseText, statusText, xhr, $form) {
	$.msgBox({
		title : "消息提示",
		content : "" + responseText.msg,
		type : "info",
		buttons : [ {
			value : "确定"
		} ],
		success : function(result) {
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
function ActionResponse(responseText, statusText, xhr, $form) {
	$.msgBox({
		title : "消息提示",
		content : "" + responseText.msg,
		type : "info",
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


function saveOrUpdateInfo() {
	var options = {
		success : showResponse,
		 async:false,
		timeout : 3000
	};
	var res = $("#pageForm").valid(); // 表单验证
	// 验证通过，执行提交操作
	if (res) {
		$('#pageForm').ajaxSubmit(options);
	}else
	{
		 $("#add_id_gray").hide();
		 $("#add_id").show();
	}
	return false;
}


//添加
var addSubnetCheck = {
		rules : {
			'name': {
				maxlength:30,
				required: true,
				loginId:true,
				pmnic:true,
				remote: {
					type:"get",
					url:rootPath+'/subnetinfo/addJudgeName',
					data:{
						 name:function() {return $("#name").val();}
						}
				}
			},
			'netWorkType':{
				required: true
			},
			'startIp':{
				required: true,
				ipv4:true
			},
			'subnerMask':{
				required: true,
				netmask:true
			},
			'gatewayIp':{
				required: true,
				ipv4:true
			},
			'vlanId':{
				required: true,
				range:[100,4096]
			}
		}
};


//修改
var updateSubnetCheck = {
		rules : {
			'netWorkType':{
				required: true
			},
			'startIp':{
				required: true,
				ipv4:true
			},
			'subnerMask':{
				required: true,
				netmask:true
			},
			'gatewayIp':{
				required: true,
				ipv4:true
			},
			'vlanId':{
				required: true,
				range:[100,4096]
			}
		}
};