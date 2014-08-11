<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%
   	String path = request.getContextPath();
	out.println("<script type='text/javascript'>");
	out.println("var rootPath = '" + request.getContextPath() + "';");
	out.println("</script>");
%>
<!DOCTYPE>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>佳华云</title>
    <link rel="stylesheet" href="<%=path%>/css/common.css" />
    <link rel="stylesheet" href="<%=path%>/css/content.css" />
    <link rel="stylesheet" href="<%=path%>/css/page/topo.css" />
    <link rel="stylesheet" href="<%=path%>/js/vendor/msgbox/Styles/msgBoxLight.css"/>
    <script src="<%=path%>/js/jquery-1.9.1.min.js"></script>
    <link rel="stylesheet" href="<%=path%>/js/vendor/jOrgChart/css/jquery.jOrgChart.css"/>
    <link rel="stylesheet" href="<%=path%>/js/vendor/jquery.contextMenu/jquery.contextMenu.css"/>
    <link rel="stylesheet" href="<%=path%>/js/vendor/jqueryui/jquery-ui-1.10.2.custom.min.css"/>
    <script src="<%=path%>/js/vendor/jqueryui/jquery-ui-1.10.2.custom.min.js"></script>
    <script src="<%=path%>/js/vendor/jOrgChart/jquery.jOrgChart.js"></script>
    <script src="<%=path%>/js/vendor/jquery.contextMenu/jquery.contextMenu.js"></script>
    <script src="<%=path%>/js/vendor/lhgdialog/lhgcore.lhgdialog.min.js"></script>
    <script src="<%=path%>/js/vendor/lhgdialog/openDialog.js"></script>
    <script src="<%=path%>/js/vendor/msgbox/Scripts/jquery.msgBox.js"></script>
</head>
<body class="content_bg">
<div class="p10">
    <div class="tab_wrap topo-bg">
       <%@ include file="top_common.jsp"%>
        <div class="clearfix">
            <div class="clearfix left w10 relative">
                <div class="topo-drag-box">
                    <div class="drag-top"></div>
                    <div class="drag-right"></div>
                    <div class="drag-bottom"></div>
                    <div class="drag-left"></div>
                </div>
                <div class="mt10 topo-slider-box">
                    <div class="slider_max"></div>
                    <div class="slider"></div>
                    <div class="slider_min"></div>
                </div>
            </div>

            <div class="topo-chart-box left w85">
                <div id="chart" class="orgChart"></div>
            </div>
        </div>
    </div>
</div>

<script src="<%=path%>/js/page/topo.js"></script>
<script>
var chartData = {
    name: '',
    childs: [{
        name: '集群A',
        childs: [{
            name: '物理机',
            type: 'play',
            childs: [{
                name: '虚拟机',
                childs: [{
                    name: '磁盘'
                }]
            }]
        }, {
            name: '物理机',
            type: 'stop',
            childs: [{
                name: '虚拟机',
                childs: [{
                    name: '磁盘'
                }]
            }]
        }]
    }, {
        name: '集群B',
        childs: [{
            name: '物理机',
            type: 'pause'
        }, {
            name: '物理机',
            type: 'connect'
        }, {
            name: '物理机',
            type: 'disconnect'
        }]
    }]
};



$(function() {
    Topo.init('chart', '<%=path%>', false, 'vm');
})
</script>
</body>
</html>
