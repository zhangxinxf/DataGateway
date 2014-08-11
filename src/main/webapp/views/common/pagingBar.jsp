<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="table_bot_page">
    <c:if test="${page.index>1}">
        <a href="javascript:{}" onclick="gotoPage(1,'${page.pageUrl}');">首页</a>&nbsp;&nbsp;
        <a href="javascript:{}" onclick="gotoPage(${page.upNo},'${page.pageUrl}');">上一页</a>&nbsp;&nbsp;
    </c:if>
    当前第${page.index}页/共${page.pageCount}页 共有 ${page.total} 条记录 &nbsp;&nbsp;
    <c:if test="${page.index<page.pageCount}">
        <a href="javascript:{}" onclick="gotoPage(${page.nextNo},'${page.pageUrl}');">下一页</a>&nbsp;&nbsp;
        <a href="javascript:{}" onclick="gotoPage(${page.pageCount},'${page.pageUrl}');">尾页</a>&nbsp;&nbsp;
    </c:if>
    <form id ="listForm" name="listForm" action="#" method="post">
        <input type="hidden" id="index_id" name="index" value="${page.index}"/>
    </form>
</div>
<script language="javascript">
    function gotoPage(pageNo,url){
    	$("#index_id").attr("value",pageNo);
    	url = url+"?"+$("#searchForm").serialize();
    	$("#listForm").attr("action",url);
	    $("#listForm").submit();
   }
</script>
