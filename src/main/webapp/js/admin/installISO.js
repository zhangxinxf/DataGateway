/**
 * 安装iso
 */
function installISO(url,step,ostype){
		var res = $("#pageForm").valid();  //表单验证
		if(res){
			$(".create_wrap").showLoading();//显示loading
			 $('#pageForm').ajaxSubmit({
                 type: 'post',  
                 url: url ,  
                 success: function(responseText){
                	 $(".create_wrap").hideLoading();//显示loading
                	 if(responseText.bakId!=null&&responseText.bakId!=""&&responseText.bakId!="undefined"){
                		 		$('#imageBakId').val(responseText.bakId);//镜像备份id
                	 }
                	 if(responseText.flag == true)//执行成功
                	 {
                		 if(responseText.vmid!=null&&responseText.vmid!=""&&responseText.vmid!="undefined"){
                		 parent.document.getElementById('vmtempid').value = responseText.vmid;//父窗口的虚拟机编号
                		$('#vmid').val(responseText.vmid);//虚拟机编号
                		 }
                		 if(step ==1){
                		 window.open(responseText.vncUrl);
                		 installConfirm("安装提示", "是否完成系统安装？",responseText,step,ostype);
                	 	}else if (step == 2)
                	 	{
            	 		window.open(responseText.vncUrl);
                		installConfirm("安装提示", "是否完成驱动安装？",responseText,step,ostype);
                	 	}else if(step == 3)
                	 	{
                	 		$('#image_format').html(responseText.image_format);//镜像格式
                	 		$('#os_type').html(responseText.os_type);//操作系统类型
                	 		$('#image_name').html(responseText.image_name);//镜像名称
                	 		CreateHost.showStep4('');
                	 	}
                	 }else
                	 {
                		 msgDialog(responseText);
                	 }
                 },  
                 error: function(XmlHttpRequest, textStatus, errorThrown){
                	 $(".create_wrap").hideLoading();//隐藏loading
                	 $.msgBox({
             		    title:"消息提示",
             		    content:""+responseText.msg,
             		    type:"info",
             		    buttons: [{ value: "确定" }],
             		    success: function (result) {
             		        if (result == "确定") {
             		        	 closeDialog();
             		        }
             		    }
             		 });
                  }  
              });  
	}
	
    return false; 
} 

/**
 * 安装VMDK
 */
function installVMDK(url,step,ostype){
		var res = $("#pageForm").valid();  //表单验证
		if(res){
			$(".create_wrap").showLoading();//显示loading
			 $('#pageForm').ajaxSubmit({
                 type: 'post',  
                 url: url ,  
                 success: function(responseText){
                	 $(".create_wrap").hideLoading();//显示loading
                	 if(responseText.bakId!=null&&responseText.bakId!=""&&responseText.bakId!="undefined"){
         		 		$('#imageBakId').val(responseText.bakId);//镜像备份id
                	 	}
                	 if(responseText.flag == true)//执行成功
                	 {
                		 if(responseText.vmid!=null&&responseText.vmid!=""&&responseText.vmid!="undefined"){
                		 parent.document.getElementById('vmtempid').value = responseText.vmid;//父窗口的虚拟机编号
                		$('#vmid').val(responseText.vmid);//虚拟机编号
                		 }
                		 if(step ==1){
	                			 if (ostype == "Windows") {
	          						CreateHost.showStep2('安装完成，点击下一步安装驱动');
	                			 }else
	          					{
	          						CreateHost.showStep3('安装完成，点击下一步上传镜像');
	          					}
                	 	}else if (step == 2)
                	 	{
            	 		window.open(responseText.vncUrl);
                		installConfirm("安装提示", "是否完成驱动安装？",responseText,step,ostype);
                	 	}else if(step == 3)
                	 	{
                	 		$('#image_format').html(responseText.image_format);//镜像格式
                	 		$('#os_type').html(responseText.os_type);//操作系统类型
                	 		$('#image_name').html(responseText.image_name);//镜像名称
                	 		CreateHost.showStep4('');
                	 	}
                	 }else
                	 {
                		 msgDialog(responseText);
                	 }
                 },  
                 error: function(XmlHttpRequest, textStatus, errorThrown){
                	 $(".create_wrap").hideLoading();//隐藏loading
                	 $.msgBox({
             		    title:"消息提示",
             		    content:""+responseText.msg,
             		    type:"info",
             		    buttons: [{ value: "确定" }],
             		    success: function (result) {
             		        if (result == "确定") {
             		        	 closeDialog();
             		        }
             		    }
             		 });
                  }  
              });  
	}
	
    return false; 
} 

function installConfirm(title,content,responseMsg,step,ostype) {
	$.msgBox({
		title : title,
		content : content,
		type : "confirm",
		buttons : [ {
			value : "完成"
		}, {
			value : "终止"
		} ],
		success : function(result) {
			if(result == "终止")
			{
			   //closeDialog();
			}else
 			{
				var stepTemp = 1;
				switch (step) {
				case 1:
					if (ostype == "Windows") {
						stepTemp = 2;
						CreateHost.showStep2('安装完成，点击下一步安装驱动');
					}else
					{
						stepTemp = 3;
						CreateHost.showStep3('安装完成，点击下一步上传镜像');
					}
					break;
				case 2:
					stepTemp = 3;
					CreateHost.showStep3('安装完成，点击下一步上传镜像');
					break;
				}
				 $.ajax({
					 async:false,
					 url:"/rkcloud/vm/updatevmbak?id="+$("#imageBakId").val()+"&type=update&step="+stepTemp,
					 success:function (responseText) {
					 }
				 }).done();
			}
		}
		});
	}
	
function msgDialog(responseText)
{
	 $.msgBox({
		    title:"消息提示",
		    content:""+responseText.msg,
		    type:"error",
		    buttons: [{ value: "确定" }],
		    success: function (result) {
		        if (result == "确定") {
		        	 //closeDialog();
		        }
		    }
		 });
}

function finishInstallISO()
{
	$.ajax({
		 async:false,
		 url:"/rkcloud/vm/updatevmbak?id="+$("#imageBakId").val()+"&type=delete",
		 success:function (responseText) {
		 }
	 }).done();
	frameElement.api.opener.location.reload();
	closeDialog();
}

function closeInstallWindow()
{
	var vmid = $('#vmid').val();
	$.msgBox({
		title : "消息提示",
		content :"确定要取消镜像制作！",
		type : "confirm",
		buttons : [ {
			value : "是"
		}, {
			value : "否"
		} ],
		success : function(result) {
		 if(result == "是")
		 {
				 closeDialog();
		 }
		}
		});
}


/**断点继续制作*/
function continueInstall(url)
{
	 var checkedCount = 0;
	 var checkedValue = "";
	 var imageId = "";
	 var operVmType ="";
	 var options = {
	                success:imageActionResponse,
	                timeout:3000
	               };
	 $("[name='id']").each(function(){
		 if(this.checked){
			 checkedCount++;
			 checkedValue = this.value;
			 operVmType =$(this).attr('oper_vm_type');
			 imageId =$(this).attr('image_id');
		 }
	 });
	 
	 if(checkedCount==1){
		 url = url+"/"+imageId+"/"+operVmType+"?bkid="+checkedValue;
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
			    content:"请您选择要操作的数据  !"
			});
		 return;
	 }
	 var title ="制作镜像";
	 if(operVmType == "vmdk")
	 {
		 title = "v2v制作";
	 }
	 if(operVmType == "iso")
	 {
		 title = "制作镜像";
	 }
	 return openDialogCloseHandle(url,title,800,480, closeDialogConfirm);
}


function installActionConfirm(actionName,url){
	 var checkedCount = 0;
	 var checkedValue = "";
	 var count = 0;
	 var state;
	 var options = {
	                success:vmActionResponse,
	                timeout:30000
	               };
	 $("[name='id']").each(function(){
		 if(this.checked){
			 checkedCount++;
			 checkedValue = this.value;
		 }
	 });
	 //删除
	 if(actionName=='delete'){
		 url= url +"?type=delete";
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
				    content:"请您选择要删除的记录 !"
				});
			 return;
	    }
	 }
	 
	 
}
