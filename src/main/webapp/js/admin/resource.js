$(function() {

	$.ajax({
		type : "get",
		dataType : "json",
		url : rootPath + '/limit/hostInfo',
		success : function(data) {
			var obj = data.item.xml;
			var count = data.item.count;
			var typeCount = data.item.typeCount;
			var height = typeCount > 1 ? 150 : 320;
			if (navigator.appName.indexOf("Internet Explorer")!=-1) {
				height = 150;
			}
			var chart = new FusionCharts("../flash/Pie3D.swf", "ChartId",
					"400", height, "0", "0");
			chart.setDataXML(obj);
			chart.setTransparent(true);
			chart.render("pmchar_id");
			if(typeCount <= 1) {
				$('#pmchar_id embed').css('margin-top', -85);
			}
			$('#pmchar_title').html('物理机（' + count + '）');
		}
	});

	$.ajax({
		type : "get",
		dataType : "json",
		url : rootPath + '/limit/vmInfo',
		success : function(data) {
			var obj = data.item.xml;
			var count = data.item.count;
			var typeCount = data.item.typeCount;
			var height = typeCount > 1 ? 150 : 320;
			if (navigator.appName.indexOf("Internet Explorer")!=-1) {
				height = 150;
			}
			var chart = new FusionCharts("../flash/Pie3D.swf", "ChartId",
					"400", height, "0", "0");
			chart.setDataXML(obj);
			chart.setTransparent(true);
			chart.render("vmchar_id");
			if(typeCount <= 1) {
				$('#vmchar_id embed').css('margin-top', -85);
			}
			$('#vmchar_title').html('虚拟机（' + count + '）');
		}
	});

	$.ajax({
		type : "get",
		dataType : "json",
		url : rootPath + '/limit/cpuInfo',
		success : function(data) {
			var obj = data.msg;
			var chart = new FusionCharts("../flash/StackedColumn3D.swf",
					"ChartId", "220", "300", "0", "0");
			chart.setDataXML(obj);
			chart.setTransparent(true);
			chart.render("vcp_id");
		}
	});

	$.ajax({
		type : "get",
		dataType : "json",
		url : rootPath + '/limit/memoryInfo',
		success : function(data) {
			var obj = data.msg;
			var chart = new FusionCharts("../flash/StackedColumn3D.swf",
					"ChartId", "225", "300", "0", "0");
			chart.setDataXML(obj);
			chart.setTransparent(true);
			chart.render("mennum_id");
		}
	});

	$.ajax({
		type : "get",
		dataType : "json",
		url : rootPath + '/limit/disckInfo',
		success : function(data) {
			var obj = data.msg;
			var chart = new FusionCharts("../flash/StackedColumn3D.swf",
					"ChartId", "220", "300", "0", "0");
			chart.setDataXML(obj);
			chart.setTransparent(true);
			chart.render("disck_id");
		}
	});

	$.ajax({
		type : "get",
		dataType : "json",
		url : rootPath + '/limit/alarmInfo',
		success : function(data) {
			var obj = jQuery.parseJSON(data.msg);
			for ( var i in obj) {
				var $str = obj[i];
				for ( var j in $str) {
					var value=$str[j];
					var dom=null;
					if (j == 3) {
						dom=$("#" + i + "_grade_prompt")
						dom.html(value);
					} else if (j == 2) {
						dom=$("#" + i + "_grade_so")
						dom.html(value);
					} else {
						dom=$("#" + i + "_grade_serious")
						dom.html(value);
					}
					if(value>0){
						dom.parent().parent().find('span').addClass("warning_tip_icon");
					}
				}
			}
		}
	});
});