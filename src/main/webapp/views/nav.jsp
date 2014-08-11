<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% String path = request.getContextPath(); %>
<!DOCTYPE>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>佳华云</title>
    <link rel="stylesheet" href="../css/common.css" />
    <link rel="stylesheet" href="../css/nav.css" />
    <script src="<%=path%>/js/jquery-1.9.1.min.js"></script>
    <script src="<%=path%>/js/frameset.js"></script>
</head>
<body class="nav">
    <div class="nav_group">
        <div class="nav_box">
        	 <a href="#" class="nav_one"  onclick="Frameset.subTo('<%=path%>/views/resource.jsp');">
              <div class="nav_one_icon work_icon">我的工作台</div>
            </a>
        </div>
        <div class="nav_box">
            <a href="#" class="nav_one">
                <div class="nav_one_icon ziyuan_icon">资源管理</div>
            </a>
            <div class="nav_two_box sel">
                <a href="#" onclick="Frameset.subTo('<%=path%>/dbinfo/list');"><div class="nav_arrow">数据源管理</div></a>
                <a href="#" onclick="Frameset.subTo('<%=path%>/metadata/list');"><div class="nav_arrow">元数据管理</div> </a>
                <a href="#" onclick="Frameset.subTo('<%=path%>/dataitem/list');"><div class="nav_arrow">元数据项管理</div></a>
                <a href="#" onclick="Frameset.subTo('<%=path%>/item/list');"><div class="nav_arrow"> 指标管理</div></a>
                <a href="#" onclick="Frameset.subTo('<%=path %>/subitem/list')"><div class="nav_arrow">指标项管理</div></a>
                <a href="#" onclick="Frameset.subTo('<%=path %>/invoke/list')"><div class="nav_arrow">接口方法配置</div></a>
            </div>
        </div>
    </div>
    <script>
        $(function() {
            Frameset.init();
        })
    </script>
</body>
</html>