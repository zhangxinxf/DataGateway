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
				imageNameReg:true/*,
				maxlength:20*/
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
                success:showResponse/*,
                timeout:3000*/
               };
	var res = $("#pageForm").valid(); //表单验证
	//验证通过，执行提交操作
	if(res){		 
		 $('#pageForm').ajaxSubmit(options);
		 
		 // 显示上传进度条
		 /*if ($('#source').val() == "upload") {
			 startProgressBar();
		 }*/
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
	
	//$("#progressbar").progressbar("value", 100);
	
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
				    content:"您只能选择一条数据进行详细信息的查看!",
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要查看的数据  !",
				});
			 return;
		 }
		 return openDialog(url,'镜像详情信息',520,300);
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
		 
		 return openDialog(url,'修改镜像',600,300);
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
	 
	 //add by  2013-09-18  install image
	 if(actionName=='installiso'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue+"/iso"
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一个镜像模版进行制作!",
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择需要制作的镜像模版  !",
				});
			 return;
		 }
		 
		 $.ajax({
			 url:"/rkcloud/image/validateInstall/"+checkedValue+"?operVmType=iso",
			 success:function (responseText) {
				 if (responseText.success == false) {
					 $.msgBox({
					    title:"消息提示",
					    content:""+responseText.msg,
					    buttons: [{ value: "确定" }]
					 });
					 return;
				 } else
				 {
					 return openDialogCloseHandle(url,'制作镜像',800,480, closeDialogConfirm);
				 }
			 }
		 }).done();
	 }
	 
	 //add by careerly
	 if(actionName=='installvmdk'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue+"/vmdk"
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一个镜像模版进行v2v制作!",
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择需要制作v2v的镜像模版  !",
				});
			 return;
		 }
		 
		 $.ajax({
			 url:"/rkcloud/image/validateInstall/"+checkedValue+"?operVmType=vmdk",
			 success:function (responseText) {
				 if (responseText.success == false) {
					 $.msgBox({
					    title:"消息提示",
					    content:""+responseText.msg,
					    buttons: [{ value: "确定" }]
					 });
					 return;
				 } else
				 {
					 return openDialogCloseHandle(url,'v2v制作',800,480, closeDialogConfirm);
				 }
			 }
		 }).done();
	 }
	 
	 if(actionName=='download'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一个镜像进行下载!",
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要下载的镜像  !",
				});
			 return;
		 }
		 $.ajax({
			 url:url,
			 success:function (responseText) {
				 if (responseText.msg) {
					 $.msgBox({
					    title:"消息提示",
					    content:""+responseText.msg,
					    type:"info",
					    buttons: [{ value: "确定" }]
					 });
				 } else {
					 window.location = url + "?download=1";
				 }
			 }
		 }).done();
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
	        	$('#deleteForm').remove();
	        	window.location.reload();
	        }
	    }
	});
}

/**
 * 镜像来源选择
 */
function imageSourceChange() {	
	$("#internet").hide();
	$("#rkcloud").hide();
	$("#upload").hide();
	
	if ($("#source").val() == "internet") {
		$("#internet").show();
	} else if ($("#source").val() == "rkcloud") {
	
		$.ajax({
			 async:false,
			 url:"/rkcloud/image/ajax/image/show",
			 success:function (responseText) {
				 var addHtml = "";
				 
				 for (var i in responseText) {
					 addHtml = "<option value=\"" + responseText[i] + "\">" + responseText[i] + "</option>";
					 $("#rkURL").append(addHtml);
				 }				 				 
			 }
		 }).done();
				
		$("#rkcloud").show();
	} else if ($("#source").val() == "upload") {
		$("#upload").show();
	}
}

/**
 * 启动上传镜像文件进度条 
 */
function startProgressBar() {
	$("#progress").show();
	
	// upload image progress
	var progressbar = $( "#progressbar" ), 
		progressLabel = $( ".progress-label" );
	progressbar.progressbar({
	      value: "0",
	      change: function() {
	        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
	      },
	      complete: function() {
	        progressLabel.text( "上传完成!" );
	      }
	 });

	// 定时更新进度条
	setTimeout(updateProgressBar, 5000);
}

/**
 * 更新进度条
 */
function updateProgressBar() {
	$.ajax({
		 url:"/rkcloud/image/progress",
		 timeout: 3000,
		 success:function (responseText) {
			 if (responseText.msg < 100) {
				 $("#progressbar").progressbar("value", responseText.msg * 1);	
				 setTimeout(updateProgressBar, 3000);
			 } else if (responseText.msg == 99) {
				 $("#progressbar").progressbar("value", responseText.msg * 1);
			 } else {
				 setTimeout(updateProgressBar, 5000);
			 }
		 },
		 error: function(responseText) {
			 $.msgBox({
			    title:"消息提示",
			    content:"上传镜像失败，请重试！",
			    type:"info",
			    buttons: [{ value: "确定" }]
			 });
		 }
	 }).done();	
}


function closeDialogConfirm() {
	var vmid = window.document.getElementById("vmtempid").value;
	$.msgBox({
		title : "消息提示",
		content : "您确定要中断操作？",
		type : "confirm",
		buttons : [ {
			value : "是"
		}, {
			value : "否"
		} ],
		success : function(result) {
			if (result == "是" && typeof dg !== 'undefined') {
				 if(vmid!=null&&vmid!=""&&vmid!="undefined")
					{
						/* $.ajax({
							 async:false,
							 url:"/rkcloud/vm/delete?id="+vmid,
							 success:function (responseText) {
							 }
						 }).done();*/
					}
				dg.close();
			}
		}
	});
	return false;
}

