
/**
 * 修改虚拟机状态
 */
//10秒中更新一下
setInterval("updateVmStatus()",10000);
function updateVmStatus(){
 $("input[name='status']").each(function(){
    	var obj = this;
    	var status_id = obj.id+"_task"
    	var ip_id = obj.id+"_ip"
    	var vm_id = obj.id.split("_")[1];
    	var status_checkbox_id = obj.id+"_checkbox";
    	var status_hostname_id = obj.id+"_hostName";
    	var url = rootPath+"/vm/updateVmStatus/"+vm_id;
    	var imgObj = "<img src='"+rootPath+"/img/loading.gif' width='16'  height='16' />";
    	if(obj.value!=""){
    		  $.ajax({ 
       	       type:"get",
       	       dataType:"json",
       	       url: url, 
       	       success: function(data){
       	    	  var obj_msg = jQuery.parseJSON(data.msg);
       	    	 $('#'+status_id).empty();
       	         $('#'+status_hostname_id).empty();
 	    	     $('#'+status_hostname_id).append("&nbsp;"+obj_msg.hostName);
 	    	     if(obj_msg.taskStatus=='createing'||obj_msg.status=='active')
 	    	     {
 	    	    	$('#'+ip_id).empty();
    	 	    	 $('#'+ip_id).append("&nbsp;"+obj_msg.fixedIP);
 	    	     }
       	    	  if(obj_msg.taskStatus!=''){
         	    	  $('#'+status_id).append(imgObj);
         	    	  if(obj_msg.taskStatus=='createing'){
         	    		 $('#'+status_id).append("创建中");
         	    	  }else if(obj_msg.taskStatus=='starting'){
         	    		 $('#'+status_id).append("开机中");
         	    	  }else if(obj_msg.taskStatus=='stopping'){
         	    		 $('#'+status_id).append("关机中");
         	    	  }else if(obj_msg.taskStatus=='pausing'){
         	    		 $('#'+status_id).append("暂停中");
         	    	  }else if(obj_msg.taskStatus=='unpausing'){
         	    		 $('#'+status_id).append("取消暂停中");
         	    	  }else if(obj_msg.taskStatus=='deleting'){
         	    		 $('#'+status_id).append("删除中");
         	    	  }else if(obj_msg.taskStatus=='rebooting_hard'){
         	    		 $('#'+status_id).append("重启中");
         	    	  }else if(obj_msg.taskStatus=='migrating'){
         	    		 $('#'+status_id).append("迁移中");
         	    	  }else if(obj_msg.taskStatus=='resize_prep'){
         	    		 $('#'+status_id).append("修改中");
         	    	  }else if(obj_msg.taskStatus=='image_snapshot'){
         	    		 $('#'+status_id).append("克隆中");
         	    	  }else if(obj_msg.taskStatus=='cloning'){
         	    		 $('#'+status_id).append("备份中");
         	    	  }else if(obj_msg.taskStatus=='recovering'){
         	    		 $('#'+status_id).append("恢复备份中");
         	    	  }else if(obj_msg.taskStatus=='uncloning'){
         	    		 $('#'+status_id).append("删除备份中");
         	    	  }else if(obj_msg.taskStatus=='resize_migrating'){
         	    		 $('#'+status_id).append("冷迁移中");
         	    	  }
       	    	  }else if(obj_msg.status=='active'){
       	    		 $('#'+status_id).append("&nbsp;运行");
       	    		 obj.value = "";
       	    	  }else if(obj_msg.status=='stopped'){
       	    		 $('#'+status_id).append("&nbsp;停止");
       	    		 obj.value = "";
       	    	  }else if(obj_msg.status=='paused'){
       	    		 $('#'+status_id).append("&nbsp;暂停");
       	    		 obj.value = "";
       	    	  }else if(obj_msg.status=='error'){
       	    		 $('#'+status_id).append("&nbsp;失败"); 
       	    		 obj.value = "";
       	    	  }else if(obj_msg.status=='shutoff'){
       	    		 $('#'+status_id).append("&nbsp;关机"); 
           	    	 obj.value = "";
           	      }
       	     	$('#'+status_checkbox_id).attr("taskStatus",obj_msg.taskStatus);
       	    	$('#'+status_checkbox_id).attr("status",obj_msg.status);
       	       }
    		  
   	         });
    	}
    });
}

/**
 * 查询提交
 * @param url
 */
function searchFrom(url){
	$("#searchForm").attr("action",url);
    $("#searchForm").submit();
}

/**
 * 查询指定集群下的物理机
 * @param url
 * @param obj
 */
function findHostCls(url,obj){
      $.ajax({ 
    	       type:"get",
    	       dataType:"json",
    	       url: url, 
    	       data: {id:obj.value}, 
    	       success: function(data){
    	    	   obj = jQuery.parseJSON(data.msg);
    	    	   $("#hostId").empty();
    	    	   $("<option value=''>--请选择物理机--</option>").appendTo("#hostId");//添加下拉框的option
    	    	   for(var i=0;i<obj.length;i++){
    	    		   $("<option value='"+obj[i].id+"'>"+obj[i].name+"</option>").appendTo("#hostId");//添加下拉框的option
    	    	   }
    	       }
	         });
}

/**
 * 查询指定物理机下的内网
 * @param  obj
 */
function findSubnetByHost(url,obj)
{
	if(obj.value!=null&&obj.value!=''&&obj.value!="undefined"){
	  $.ajax({ 
	       type:"get",
	       dataType:"json",
	       url: url, 
	       data: {id:obj.value}, 
	       success: function(data){
	    	   obj = jQuery.parseJSON(data.msg);
	    	   $("#subnetId").empty();
	    	   $("<option value=''>--请选择内网--</option>").appendTo("#subnetId");//添加下拉框的option
	    	   for(var i=0;i<obj.length;i++){
	    		   var  optionTemp ="<option value='"+obj[i].id+"'>"+obj[i].name;
	    		   if(obj[i].startIp!=null&&obj[i].startIp!=""&&obj[i].startIp!="undefined")
	    		   {
	    			   optionTemp+="("+obj[i].startIp+")"
	    		   }
	    		   optionTemp+="</option>"
	    		   $(optionTemp).appendTo("#subnetId");//添加下拉框的option
	    	   }
	       }
        });
	}else
	{
		$("#subnetId").empty();
		$("<option value=''>--请选择内网--</option>").appendTo("#subnetId");//添加下拉框的option
	}
}

/**
 * 是否指定物理机
 * @param obj
 */
function isHostByCls(obj){
	if(obj.value=="false"){
		$("#hostId").attr("disabled",true);
		$("#subnetId").attr("disabled",true);
	}
	if(obj.value=="true"){
		$("#hostId").attr("disabled",false);
		$("#subnetId").attr("disabled",false);
	}
}

//添加
var addVMCheck = {
		rules : {
			'name': {
				maxlength:30,
				required: true,
				loginId:true,
				remote: {
					type:"get",
					url:rootPath+'/vm/addJudgeVmName',
					data:{
						 id:function() {return $("#id").val();},
						 name:function() {return $("#name").val();}
						}
				}
			},
			'templateId':{
				required: true
			},
			'clsId':{
				required: true
			},
			'imageId':{
				required: true
			},
			'secGroupId':{
				required: true
			},
			'hostId':{
				required: true
			},
			'subnetId':{
				required: true
			}
		}
};



// 克隆镜像
var copyVMCheck = {
		rules : {
			'imageName': {
				maxlength:30,
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
	}else{
		 $("#add_id_gray").hide();
		 $("#add_id").show();
	}
    return false; 
} 

//添加
var bindFloatCheck = {
		rules : {
			'fixedIP':{
				required: true
			}
		}
};

/**
 * 绑定浮动IP
 * @returns {Boolean}
 */
function saveBindFloating(){
	var options = {
                success:showResponse,
                timeout:30000
               };
	var res = $("#pageForm").valid(); //表单验证
	if(res){
			$('#pageForm').ajaxSubmit(options);
	 }
    //return false; 
} 

//    迁移 操作
function otherOperate(){
	var options = {
            success:showResponse,
            timeout:3000
           };
		$sel =  $("#hostId option");
		if($sel.length==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"没有可用物理机!",
				    type:"error"
				});
			return;
		}
		 $('#pageForm').ajaxSubmit(options);
}


/**
 * 虚拟机迁移 （热迁移、冷迁移）
 */
function migrateVM(){
	var url ="";
	var content = "";
	$("[name=migrateType]").each(function(){
		if($(this).prop( "checked" ))
		{
			url = $(this).attr("migrateurl");
		}
	});
	var options = {
        success:showResponse,
        url:url,
        async:false,
        timeout:3000
       };
	if(url==""||url=="undefined")
	{
		content ="请选择迁移类型！";
	}
	
	$sel =  $("#hostId option");
	if($sel.length==0)
	{
		content ="没有可用的物理机！";
	}
	if(content!=""){
		 $.msgBox({
			    title:"消息提示",
			    content:content,
			    type:"error"
			});
		return;
	}
	$('#pageForm').ajaxSubmit(options);
}


/**
 * 表单提交之后，需要做的处理
 * @param responseText
 * @param statusText
 * @param xhr
 * @param $form
 */
function showResponse(responseText, statusText, xhr, $form)  { 
	var type = "info";
	if (!responseText.success) {
		type = "error";
	}
	
	 $.msgBox({
		    title:"消息提示",
		    content:""+responseText.msg,
		    type:type,
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
 *Vm的常规操作
 * @param actionName
 * @param url
 */
function vmActionConfirm(actionName,url){
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
	 
	 //vnc
	 if(actionName=='vncLogin'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一台虚拟机进行配置修改!"
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择一台虚拟机进行配置修改 !"
				});
			 return;
		 }    
		 $.ajax({ 
	  	       type:"get",
	  	       dataType:"html",
	  	       url: url, 
	  	       success: function(data){
		  	    	   if(data=='error'){
		  	    		 $.msgBox({
		 				    title:"消息提示",
		 				    content:"远程登录虚拟机失败 !"
		 				});
		  	    	   }else{
		  	    		 open_vnc(data);
		  	    	   }
	  	    	   }
		         });
	 }
	 
	 /**
	  * 打开VNC远程登陆窗口
	  * @param data
	  */
	 function open_vnc(data) {
         var url = data; 
         window.open(url, "远程登录虚拟机");
         //window.showModalDialog(url, "远程登录虚拟机", "dialogWidth:1000px;dialogHeight:768px;center:yes;help:no;scroll:no;status:no;resizable:yes;");
     }
	 
	 //修改配置
	 if(actionName=='showResize'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一台虚拟机进行配置修改!"
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择一台虚拟机进行配置修改 !"
				});
			 return;
		 }
		 return openDialog(url,'配置修改',520,320);
	 }
	 //查看虚拟机监控信息
	 if(actionName=='monitor'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一台虚拟机进行查看!"
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择一台虚拟机进行查看 !"
				});
			 return;
		 }
		 return openDialog(url,'虚拟机监控信息',960,430);
	 }
	 
	//绑定外网IP
	 if(actionName=='viewFloatingIP'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一台虚拟机绑定外网IP!"
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择一台虚拟机绑定外网IP!"
				});
			 return;
		 }
		 return openDialog(url,'绑定外网IP',520,320);
	 }
	 
		//分配内网ip
	 if(actionName=='distributevmnetwork'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一台虚拟机进行内网IP分配!"
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择一台虚拟机进行内网IP分配!"
				});
			 return;
		 }
		 return openDialog(url,'分配内网',720,410);
	 }
	 
	 //虚拟机迁移
	 if(actionName=='migrate'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一台虚拟机进行迁移!"
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择一台虚拟机进行迁移!"
				});
			 return;
		 }
		 
	/*	 var hostbool = $("#migrate_state_"+checkedValue).attr("hostvalue")!="powerOff";
		 var vmbool = $("#migrate_state_"+checkedValue).attr("vmvalue")!="active";
		 if(hostbool!=false&&vmbool!=false)
			 {
				 $.msgBox({
					    title:"迁移条件：",
					    content:"1、HA迁移：物理机为关机状态！" +
					    		"<br/>2、热迁移：虚拟机状态为开机状态！"
					});
				 return;
			 }*/
		 return openDialog(url,'虚拟机迁移',520,320);
	 }
		 
	 //克隆镜像
	 if(actionName=='copy'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一台虚拟机克隆镜像!"
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择一台虚拟机克隆镜像!"
				});
			 return;
		 }
		 return openDialog(url,'虚拟机克隆镜像',520,220);
	 }
	 
	//备份镜像
	 if(actionName=='backup'){
		 if(checkedCount==1){
			 url = url+"/"+checkedValue
		 }
		 if(checkedCount>1){
			 $.msgBox({
				    title:"消息提示",
				    content:"您只能选择一台虚拟机备份!"
				});
			 return;
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择一台虚拟机备份!"
				});
			 return;
		 }
		 return openDialog(url,'虚拟机备份',520,220);
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
		 return openDialog(url,'虚拟机的详细信息',520,420);
	 }
	 
	 //开机
	 if(actionName=='startVm'){
		 if(checkedCount>0){
			$('#deleteForm').attr("action",url);
			$('#deleteForm').ajaxSubmit(options);
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要启动的虚拟机  !"
				});
			 return;
		 }
	 }
	 
	 //关机
	 if(actionName=='stopVm'){
		 if(checkedCount>0){
			$('#deleteForm').attr("action",url);
			$('#deleteForm').ajaxSubmit(options);
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要关机的虚拟机  !"
				});
			 return;
		 }
	 }
	//暂停
	 if(actionName=='pauseVm'){
		 if(checkedCount>0){
			$('#deleteForm').attr("action",url);
			$('#deleteForm').ajaxSubmit(options);
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要暂停的虚拟机  !"
				});
			 return;
		 }
	 }
	 //取消暂停
	 if(actionName=='unpauseVm'){
		 if(checkedCount>0){
			$('#deleteForm').attr("action",url);
			$('#deleteForm').ajaxSubmit(options);
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要取消暂停的虚拟机  !"
				});
			 return;
		 }
	 }
	 
	 //重启
	 if(actionName=='rebootVm'){
		 if(checkedCount>0){
			$('#deleteForm').attr("action",url);
			$('#deleteForm').ajaxSubmit(options);
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要重启的虚拟机  !"
				});
			 return;
		 }
	 }
	 
	 //冷迁移
	 if(actionName=='deadmigrate'){
		 if(checkedCount>0){
			$('#deleteForm').attr("action",url);
			$('#deleteForm').ajaxSubmit(options);
		 }else if(checkedCount==0){
			 $.msgBox({
				    title:"消息提示",
				    content:"请您选择要冷迁移的虚拟机  !"
				});
			 return;
		 }
	 }
	 //删除
	 if(actionName=='delete'||actionName=='resetstate'){
		 var content = "";
		 var content_1 ="";
		 if(actionName=='delete')
		 {
			 content ="确定要进行删除操作吗？"
			 content_1 ="请您选择要删除的虚拟机  !";
		 }else if(actionName=='resetstate')
		 {
			 content ="确定要进行重置状态操作吗？"
			 content_1 ="请您选择要重置状态的虚拟机  !";
		 }
		 if(checkedCount>0){
			 $.msgBox({
					title : "消息提示",
					content : content,
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
				    content:content_1
				});
			 return;
	    }
	 }
	 
	 
}

/**
 * 提交之后的操作
 * @param responseText
 * @param statusText
 * @param xhr
 * @param $form
 */
function vmActionResponse(responseText, statusText, xhr, $form)  { 
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
 * 添加内网
 */
function addSubnet() {
	$("#out_clsId :input").each(function() {
		var vm_id = this.value;
		if ($(this).prop('checked')) {
			var curLi = $('#li_' + vm_id);
			curLi.remove();
			$('#int_clsId').append(curLi);
		}
	});
}

/**
 * 删除内网
 */
function delSubnet() {
	$("#int_clsId :input").each(function() {
		var vm_id = this.value;
		if ($(this).prop('checked')) {
			var curLi = $('#li_' + vm_id);
			curLi.remove();
			$('#out_clsId').append(curLi);
		}
	});
}


/**
 * 提交数据
 */
function distributeSubnet() {
	$("#add_web_html").showLoading();//显示loading
	var ch = $("#int_clsId :input");
	var arr = new Array();
	$(ch).each(function(i, obj) {
		arr[i] = $(obj).val();
	});
	$.ajax({
		type : "POST",
		url : rootPath + "/vm/distributevmnetworkip?subnetid=" + arr + "&vmId="
				+ $("#vmId").val(),
		dataType : "JSON",
		success : function(data) {
			var type = "error";
			if (data.success) {
				type = "info";
			}
			$.msgBox({
				title : "消息提示",
				content : data.msg,
				type : type,
				buttons : [ {
					value : "确定"
				} ],
				success : function(result) {
					 $("#add_web_html").hideLoading();//隐藏loading
					if (result == "确定") {
						frameElement.api.opener.location.reload();
						closeDialog();
					}
				}
			});
		}
	});
}

/**
 * @param id
 * 伸展内网详细信息
 */
function subnetUpOrDown(id)
{
	var status = $('#subnet_'+id).attr('status');
	if(status == 'down'){
	$('#subnet_'+id).css('overflow', 'visible').css('height', 'auto');
	 $('#subnet_'+id).attr('status','up');
	}
	if(status =='up')
	{
		$('#subnet_'+id).css('overflow', 'hidden').css('height', 20);
		 $('#subnet_'+id).attr('status','down');
	}
	$('#subnet_tip_'+id).toggleClass('up-arrow').toggleClass('down-arrow');
}