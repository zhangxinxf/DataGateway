/**
 * 查询提交
 * 
 * @param url
 */
function searchFrom(url) {
	$("#searchForm").attr("action", url);
	$("#searchForm").submit();
}
/* 弹出框ID */
var CatchDivId = {
		saveOrUpdateId: null	
	};

/**
 * 添加和修改表单提交操作
 */
function saveOrUpdateInfo() {
	var options = {
		success : showResponse,
		timeout : 600000
	};
	var res = $("#pageForm").valid(); // 表单验证
	// 验证通过，执行提交操作
	if (res) {
		$.msgBox({
		    title: "信息提示",
		    content: "请等待,正在执行中........",
		    type: "info",
		    afterShow: function (divId) {
		    		CatchDivId.saveOrUpdateId = divId;
		    		$('#pageForm').ajaxSubmit(options);
		   },
		    showButtons:false
		});
	}
	return false;
}

/**
 * 判断条目框中的数据是否为null或数据是否更新过
 */
function isUpdate(){
	var ch = $("#int_clsId :input");
	var flag=true;
	if(ch.length<=0){
	   return flag;
	}
	var  pmArray=pmIds.split(",");
	if(pmArray.length>0&&pmArray.length-1>ch.length){
			return false;
	}
	for(var i=0;i<ch.length;i++){
			if(!isExists($(ch[i]).val(),pmArray)){
				flag=!flag;
				break;
		}
	}
	return flag;
}

function isExists(pmId,pmArray){
	var flag=false;
	for(var i=0;i<pmArray.length;i++){
		if(pmArray[i]!=''){
			if(pmArray[i]==pmId){
				flag=true;
				break;
			}
		}
	 }
	 return flag;
}

/**
 * 提交数据
 */
function addHostStore() {
	var ch = $("#int_clsId :input");
	var arr = new Array();
	$(ch).each(function(i, obj) {
		arr[i] = $(obj).val();
	});
	/*if(arr.length<=0){
		$.msgBox({
			title : "消息提示",
			content : "至少要选择两台或两台以上的物理机!"
		});
		return;
	}
	*/
	if(arr.length>16){
		$.msgBox({
			title : "消息提示",
			content : "挂载物理机台数超过16台时,会影响存储性能,是否要继续?",
			type : "confirm",
			buttons : [ {
				value : "是"
			}, {
				value : "否"
			} ],
			success : function(result) {
				if (result == "是") {
					addStore(arr);
				}else{
					$("#add_id").show();
					$("#add_gray_id").hide();
				}
			}
		});
	}else{
		addStore(arr);
	}
}
function addStore(arr){
	$.msgBox({
	    title: "信息提示",
	    content: "此操作需等待10分钟,请不要做其它操作,请耐心等候!",
	    type: "error",
	    afterShow: function (divId) {
		   CatchDivId.saveOrUpdateId = divId;
			$.ajax({
				type : "POST",
				url : rootPath + "/shareStore/storePM?ids=" + arr + "&storeId="
						+ $("#storeId").val(),
				dataType : "JSON",
				success : function(data) {
					var type="error";
					if (data.success) {
						type="info";
					} 
					$('#' + CatchDivId.saveOrUpdateId).remove();
					$('#' + CatchDivId.saveOrUpdateId + 'BackGround').remove();
					$.msgBox({
						title : "消息提示",
						content : data.msg,
						type : type,
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
			});
	   },
	    showButtons:false
	});
}

/**
 * 提交数据
 */
function deleteHostStore() {
	var ch = $("#int_clsId :input");
	var arr = new Array();
	$(ch).each(function(i, obj) {
		arr[i] = $(obj).val();
	});
	$.msgBox({
	    title: "信息提示",
	    content: "请等待,正在执行中........",
	    type: "info",
	    afterShow: function (divId) {
		   CatchDivId.saveOrUpdateId = divId;
			$.ajax({
				type : "POST",
				url : rootPath + "/shareStore/detachStorePM?ids=" + arr + "&storeId="
						+ $("#storeId").val(),
				dataType : "JSON",
				success : function(data) {
					var type="error";
					if (data.success) {
						type="info";
					}
						$('#' + CatchDivId.saveOrUpdateId).remove();
						$('#' + CatchDivId.saveOrUpdateId + 'BackGround').remove();
						$.msgBox({
							title : "消息提示",
							content : data.msg,
							type : type,
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
			});
	   },
	    showButtons:false
	});
}

/**
 * 添加物理机
 */
function addHost() {
	$("#out_clsId :input").each(function() {
		var vm_id = this.value;
		if ($(this).prop('checked')) {
			var curLi = $('#li_' + vm_id);
			curLi.remove();
			$('#int_clsId').append(curLi);
		}
	});
	if(!isUpdate()){
		$("#add_id").show();
		$("#add_gray_id").hide();
	}
}

/**
 * 删除物理机
 */
function delHost() {
	$("#int_clsId :input").each(function() {
		var vm_id = this.value;
		if ($(this).prop('checked')) {
			var curLi = $('#li_' + vm_id);
			curLi.remove();
			$('#out_clsId').append(curLi);
		}
	});
	if(arguments.length==0){
		if(!isUpdate()){
			$("#add_id").show();
			$("#add_gray_id").hide();
		}else{
			$("#add_id").hide();
			$("#add_gray_id").show();
		}
	}
}

/**
 * 判断物理机是否在一个FCSAN上面
 */
function iscommonStore(){
	var flag=false;
	var ch = $("#int_clsId :input");
	var arr = new Array();
	$(ch).each(function(i, obj) {
		arr[i] = $(obj).val();
	});
	$.ajax({
		type : "POST",
		url : rootPath + "/shareStore/storePM?ids=" + arr,
		dataType : "JSON",
		success : function(data) {
			if (data.success) {
				flag=true;
			}else{
				flag=false;
			}
		}
	});
	return flag;
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
	if(CatchDivId.saveOrUpdateId!=null){
		$('#' + CatchDivId.saveOrUpdateId).remove();
		$('#' + CatchDivId.saveOrUpdateId + 'BackGround').remove();
	}
	var type="info";
	if(!responseText.success){
		type="error";
	}
	$.msgBox({
		title : "消息提示",
		content : "" + responseText.msg,
		type : type,
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
 * 
 * @param actionName
 * @param url
 * @param title
 * @param width
 * @param height
 * @returns
 */
function actionConfirm(actionName, url, title, width, height) {
	var checkedCount = 0;
	var checkedValue = "";
	var count = 0;
	var state;
	var options = {
		success : actionResponse,
		timeout : 600000
	};
	$("[name='id']").each(function() {
		if (this.checked) {
			checkedCount++;
			checkedValue = this.value;
		}
	});

	if (actionName == 'all') {
		if (checkedCount == 1) {
			url = url + "/" + checkedValue
		}
		if (checkedCount > 1) {
			$.msgBox({
				title : "消息提示",
				content : "您只能选择一条数据进行操作!"
			});
			return;
		} else if (checkedCount == 0) {
			$.msgBox({
				title : "消息提示",
				content : "请您选择要操作数据  !"
			});
			return;
		}
		return openDialog(url, title, width, height);
	}
	if (actionName == 'notall') {
		if (checkedCount > 0) {
			$.msgBox({
				title : "消息提示",
				content : "确定要进行" + title + "操作吗？",
				type : "confirm",
				buttons : [ {
					value : "是"
				}, {
					value : "否"
				} ],
				success : function(result) {
					if (result == "是") {
						$('#deleteForm').attr("action", url);
						$('#deleteForm').ajaxSubmit(options);
					}
				}
			});
		} else if (checkedCount == 0) {
			$.msgBox({
				title : "消息提示",
				content : "请您选择要操作的数据  !"
			});
			return;
		}
	}
}
function detach(url) {
	var checkedCount = 0;
	var checkedValue = "";
	$("[name='id']").each(function() {
		if (this.checked) {
			checkedCount++;
			checkedValue = this.value;
		}
	});
	if (checkedCount == 1) {
		url = url + "/" + checkedValue;
	}
	if (checkedCount > 1) {
		$.msgBox({
			title : "消息提示",
			content : "您只能选择一条数据进行操作!"
		});
		return;
	} else if (checkedCount == 0) {
		$.msgBox({
			title : "消息提示",
			content : "请您选择存储 !"
		});
		return;
	}
	$.msgBox({
		title : "消息提示",
		content : "确定要进行卸载物理机操作吗？",
		type : "confirm",
		buttons : [ {
			value : "是"
		}, {
			value : "否"
		} ],
		success : function(result) {
			if (result == "是") {
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
										window.location.reload();
									}
								}
							});
						}
				});
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
function actionResponse(responseText, statusText, xhr, $form) {
	 var type="error";
	  if(responseText.success){
		  type="info";
	  }
	$.msgBox({
		title : "消息提示",
		content : "" + responseText.msg,
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

// 新增存储信息，表单验证规则
var check = {
	rules : {
		name : {
			required : true,
			loginId:true,
			remote:{ 
				　　 type:"GET",
				　　 url:rootPath+"/shareStore/checkName",
				　　 data:{
				　　		name:function(){return $("#name").val();},
				  		id:function(){return $("#id").val();}
				　　 } 
			}
		},
		iqn : {
			required : true,
			remote:{
				　　 type:"GET",
				　　 url:rootPath+"/shareStore/checkIqn",
				　　 data:{
				　　		name:function(){return $("#iqn").val();},
				  		id:function(){return $("#id").val();}
				　　 } 
			}
		},
		ip : {
			required : true,
			ipv4 : true
		},
		storageType:{
			required : true
		},
		uuid:{
			required : true
		},
		hostId:{
			required : true
		},
		port:{
			required:true,
			digits : true
		},
		diskPath:{
			required:true
		},
		diskSize:{
			isDigits:true,
			required:true
		}
	}
};

/**
 * 
 * @param obj
 */
function  changeStorageType(obj,id,url){
	var  index=$(obj).val();
	if(index==""){
		return;
	}
	setProperty(index);
	if(arguments.length>1){
		if(index==0||index==2){
			url+="?shareType="+index;
			findHostByStoreId(url,id);
		}
	}
}
function  setProperty(value){
	if(value=='0'){
		$("#ip").attr("disabled",false);
		$("#diskPath").attr("disabled",true);
		$("#diskSize").attr("disabled",true);
		$("#port").attr("disabled",false);
		$("#iqn").attr("disabled",false);
		$("#userName").attr("disabled",false);
		$("#passWord").attr("disabled",false);
		$("#uuid").attr("disabled",true);
	}else if(value=='1'){
		$("#ip").attr("disabled",true);
		$("#diskPath").attr("disabled",true);
		$("#diskSize").attr("disabled",true);
		$("#port").attr("disabled",true);
		$("#iqn").attr("disabled",true);
		$("#userName").attr("disabled",true);
		$("#passWord").attr("disabled",true);
		$("#uuid").attr("disabled",false);
	}else if(value=='2'){
		$("#ip").attr("disabled",false);
		$("#diskPath").attr("disabled",false);
		$("#diskSize").attr("disabled",false);
		$("#port").attr("disabled",true);
		$("#iqn").attr("disabled",true);
		$("#userName").attr("disabled",true)
		$("#passWord").attr("disabled",true);
		$("#uuid").attr("disabled",true);
	}
}

/**
 * 查询指定集群下的物理机
 * 
 * @param url
 * @param obj
 */
function findHostByStoreId(url,id,obj){
		if(arguments.length>2){
			var  value=$(obj).val();
			if(value==""){
				return;
			}
			url+="?wwid="+value;
		}
	var host=  document.getElementById('hostId');  
      $.ajax({ 
    	       type:"get",
    	       dataType:"json",
    	       url: url, 
    	       data: {id:id}, 
    	       success: function(data){
    	    	   obj = jQuery.parseJSON(data.msg);
    	    	   host.options.length=1; 
    	    	   for(var i=0;i<obj.length;i++){
    	    		   var opt=new Option(obj[i].machine.name,obj[i].machine.id);
    	    		   if(i==0){
    	    			   opt.selected=true;
    	    		   }
    	    		   host.options.add(opt);
    	    	   }
    	       }
	         });
}