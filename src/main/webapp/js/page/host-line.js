var HostLine = (function() {

    var seriesOptions = [];
    var curType = 'cpu', curId, path = '';
    var curStartDate = '', curEndDate = '';
    var _showNavigator = true;

    Highcharts.setOptions({
    	global: {
    		useUTC: false
    	}
    });
    var _showChart = function() {
    	var title = "CPU趋势图";
    	if (curType == "cpu") {
    		title = "CPU趋势图(%)";
    	} else if (curType == "ram") {
    		title = "内存趋势图(M)";
		} else if (curType == "disk") {
			title = "磁盘趋势图(G)";
		} else if (curType == "iops") {
			title = "磁盘流量趋势图";
		} else if (curType == "net_iops") {
			title = "网络流量趋势图";
		}
    	
        $('#container').highcharts('StockChart', {
            chart: {
                animation: Highcharts.svg, // don't animate in old IE
                backgroundColor: '#ecf7f9',
                events: {
                    load: function() {
                        // set up the updating of the chart each second
                        /*var series = this.series[0];
                         setInterval(function() {
                         var date = new Date();
                         var x = date.getTime(), // current time
                         y = Math.random() * 1000;
                         series.addPoint([x, y], true, true);
                         }, 1000);*/
                    }
                }
            },
            navigator: {
                enabled: _showNavigator
            },
            rangeSelector : {
                enabled: false
            },
            title: {
                text: title //curType + '趋势图'
            },
            credits: { enabled: false },
            legend: { enabled: false },
            series: seriesOptions
        });
    };

    var _formDataAndShow = function(lineData) {
        seriesOptions = [];
        for(var i = 0; i < lineData.nameList.length; i++) {
            var series = {
                name: lineData.nameList[i]
            };
            var data = [];
            for(var j = 0, len = lineData.dataList.length; j < len; j++) {
                data.push({
                    x: lineData.dataList[j]['createDate'],
                    y: (typeof lineData.dataList[j]['data'][i] !== 'undefined' ? parseFloat(lineData.dataList[j]['data'][i]) : 0)
                })
            }
            series.data = data;
            seriesOptions.push(series);
        }

        _showChart();
    };

    var reload = function(type) {
        curType = type;
        $.ajax({
            url: path,
            dataType: 'json',
            data: {
                id: curId, type: curType, startDate: curStartDate, endDate: curEndDate
            },
            success: function(result) {
                _formDataAndShow(result.item);
            }
        }); //线上版本请使用该段代码
        //_formDataAndShow(lineData);
    };

    var reloadByDate = function(startDate, endDate) {
        curStartDate = startDate;
        curEndDate = endDate;
        reload(curType);
    };

    var loadAndShow = function(id, type, showNavigator) {
        if(typeof showNavigator !== 'undefined') {
            _showNavigator = showNavigator;
        }
        curId = id;
        reload(type);
    };

    var init = function(rootPath) {
        path = rootPath;
    };

    return {
        init: init,
        loadAndShow: loadAndShow,
        reload: reload,
        reloadByDate: reloadByDate
    }
}).call(this);
