<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<form name="actionForm" action="#">
	<input type="hidden" name="uid"/>
    <input type="hidden" name="actionName"/>
    
	<div class="company_comm" >
	    <ul>
	        <li><div class="res" > <a href="javascript:;"  onclick="showList(1);">刷新</a></div></li>
	        <li><div class="qi" id="qi"><a id="startButton" href="javascript:;" onclick="return instanceBatchActionConfirm('batchStart','userinfo/startVMAction');"> 开机 </a></div></li>
	      	<li><div class="stop" id="stop"><a id="stopButton" href="javascript:;" onclick="return instanceBatchActionConfirm('batchStop','userinfo/stopVMAction');"> 关机</a></div></li>
	      	<li><div class="deng" id="deng"><a id="vncButton" href="javascript:;" onclick="return instanceBatchActionConfirm('getVnc','');">远程登录</a></div></li>
	    </ul>
	    <div class="clear"></div>
	</div>
	<table width="99%" border="0" cellspacing="0" cellpadding="0" id="table_one">
	    <tr>
	        <th width=3%><input type="checkbox" id="ca" onchange="caClicked()"/></th>
	        <th width="3%">序号</th>
	        <th width="4%">虚拟机名称</th>
	        <th width="4%">宿主机</th>
	        <th width="4%">操作系统</th>
	        <th width="5%">VCPU(颗)</th>
	        <th width="8%">内存(MB)</th>
	        <th width="7%">存储(GB)</th>
	        <th width="7%">私网IP地址</th>
	        <th width="9%">公网IP地址</th>
	        <th width="9%">状态</th>
	    </tr>
	    <c:if test="${!empty vmList && fn:length(vmList)>0}">
	        <c:forEach var="item" items="${vmList}" varStatus="status">
			    <tr  id="tr${item.uuId}">
			        <td><input type="checkbox" name="ids"  value="${item.uuId}" onclick="idsClicked()"/></td>
			        <td>${status.index+1}</td>
			        <td>${item.name}</td>
			        <td>${item.phyMachine.name}</td>
			        <td>${item.imagerInfo.osType}</td>
			        <td>${item.templateInfo.vcpu}</td>
			        <td>${item.templateInfo.vmemory}</td>
			        <td>${item.templateInfo.vdisc}</td>
			        <td style="text-align:left">${item.fixedIP}</td>
			        <td>${item.floatingIP}</td>
			        <td  id='state${item.uuId}'>
			        	<c:if test="${item.status=='active' && empty item.taskStatus}">
			        		运行
			        	</c:if>	
			        	<c:if test="${(item.status=='stopped' || item.status=='shutoff') && empty item.taskStatus}">
			        		关机
			        	</c:if>
			        	<c:if test="${(item.status=='paused') && empty item.taskStatus}">
			        		暂停
			        	</c:if>
			        	<c:if test="${(item.status=='error') && empty item.taskStatus}">
			        		错误
			        	</c:if>
			        	<c:if test="${(item.status=='building' && empty item.taskStatus)}">
			        		<img src="img/loading.gif" width="16"  height="16" />
			        		创建中
			        	</c:if>
			        	<c:if test="${(item.status=='resized') && empty item.taskStatus}">
			        		确认修改
			        	</c:if>
			        	<c:if test="${!empty item.taskStatus}">
			         		<c:if test="${item.taskStatus=='scheduling' || item.taskStatus=='spawning' || item.taskStatus=='networking'}">
			         			<img src="img/loading.gif" width="16"  height="16" />
			        			创建中
			        		</c:if>
			         		<c:if test="${item.taskStatus=='starting'}">
			         			<img src="img/loading.gif" width="16"  height="16" />
			        			开机中
			        		</c:if>
			        		<c:if test="${item.taskStatus=='stopping'}">
			        			<img src="img/loading.gif" width="16"  height="16" />
			        			关机中
			        		</c:if>
			        		<c:if test="${item.taskStatus=='pausing'}">
			        			<img src="img/loading.gif" width="16"  height="16" />
			        			暂停中
			        		</c:if>
			        		<c:if test="${item.taskStatus=='unpausing'}">
			        			<img src="img/loading.gif" width="16"  height="16" />
			        			取消暂停中
			        		</c:if>
			        		<c:if test="${item.taskStatus=='deleting'}">
			        			<img src="img/loading.gif" width="16"  height="16" />
			        			删除中
			        		</c:if>
			        		<c:if test="${item.taskStatus=='rebooting_hard'}">
			        			<img src="img/loading.gif" width="16"  height="16" />
			        			重启中
			        		</c:if>
			        		<c:if test="${(item.taskStatus=='migrating')}">
			        			<img src="img/loading.gif" width="16"  height="16" />
			        			迁移中
			        		</c:if>
			        		<c:if test="${(item.taskStatus=='resize_prep' || item.taskStatus=='resize_migrating')}">
			        			<img src="img/loading.gif" width="16"  height="16" />
			        			修改配置中
			        		</c:if>
			        		<c:if test="${item.taskStatus=='image_snapshot'}">
			        			<img src="img/loading.gif" width="16"  height="16" />
			        			克隆镜像中
			        		</c:if>
			        		<c:if test="${item.taskStatus=='resize_reverting'}">
			        			<img src="img/loading.gif" width="16"  height="16" />
			        			回滚修改中
			        		</c:if>
			         	</c:if>
			        </td>
			    </tr>
	        </c:forEach>
	    </c:if>
	</table>
</form>
<script language="javascript"><!--
     //table_one("表格名称","奇数行背景","偶数行背景","鼠标经过背景","点击后背景");
     table_one("table_one","#fff","#f6faff","#e2f2c2","#e0e5e9");
</script>