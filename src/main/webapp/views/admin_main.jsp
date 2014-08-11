<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%
	String path = request.getContextPath() + "/views";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>RKCloud佳华云</title>
<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/frameset.js"></script>
</head>
<frameset rows="101, *, 33" frameborder="no" border="0" framespacing="0">
	<frame id="frame_header" src="<%=path%>/header.jsp" scrolling="No"
		noresize="noresize">
	<frameset id="frame_sub_box" cols="192, 6, *" frameborder="no"
		border="0" framespacing="0">
		<frame id="frame_left" src="<%=path%>/nav.jsp" noresize="noresize">
		<frame id="frame_trigger" src="<%=path%>/nav_toggle.jsp"
			scrolling="No" noresize="noresize">
		<frame id="frame_content" src="<%=path%>/resource.jsp"
			noresize="noresize">
	</frameset>
	<frame id="frame_footer" src="<%=path%>/footer.jsp" scrolling="No"
		noresize="noresize">
</frameset>
</html>
