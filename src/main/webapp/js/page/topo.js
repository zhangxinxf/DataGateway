var Topo = (function() {
    var _hideDivId = '__org_hide_div';
    var _chartData, _showId, _root = '';
    var _isDemo = false, _urlType = 'vm';
    var _intervalStatus = {};
    var _menuData = {
        add: {          //修改组配置
            url: '/group/addHost/',
            isAjax: false,
            title: '向组中添加虚拟机',
            width: 700,
            height: 420
        },
        create: {       //创建虚拟机
            url: '/vm/toaddbycls/',
            isAjax: false,
            title: '',
            width: 500,
            height: 280
        },
        createHost: {   //创建虚拟机
            url: '/vm/toaddbyhost/',
            isAjax: false,
            title: '',
            width: 500,
            height: 280
        },
        startHost: {    //启动物理机
            url: '/host/startHost',
            isAjax: true,
            title: '',
            width: 700,
            height: 420
        },
        stopHost: {     //关闭物理机
            url: '/host/stopHost',
            isAjax: true,
            title: '',
            width: 700,
            height: 420
        },
        resetHost: {    //重启物理机
            url: '/host/rebootHost',
            isAjax: true,
            title: '',
            width: 700,
            height: 420
        } ,

        loginVm: {      //远程登录
            url: '/vm/vncLogin',
            isAjax: true,
            title: '',
            width: 950,
            height: 650,
            toAjaxUrl: true
        } ,
        monitorVm: {    //虚拟机监控
            url: '/vm/monitor/',
            isAjax: false,
            title: '',
            width: 700,
            height: 420
        },
        startVm: {      //启动虚拟机
            url: '/vm/startVm',
            isAjax: true,
            title: '',
            width: 700,
            height: 420
        },
        stopVm: {       //关闭虚拟机
            url: '/vm/stopVm',
            isAjax: true,
            title: '',
            width: 700,
            height: 420
        },
        resetVm: {      //重启虚拟机
            url: '/vm/rebootVm',
            isAjax: true,
            title: '',
            width: 700,
            height: 420
        },
        bindIp: {       //绑定外网IP
            url: '/vm/viewFloatingIP/',
            isAjax: false,
            title: '',
            width: 500,
            height: 220
        },
        unbindIp: {     //解除外网IP
            url: '/vm/unbindIp',
            isAjax: true,
            title: '',
            width: 500,
            height: 220
        },
        hangDisk: {     //挂载磁盘
            url: '',
            isAjax: true
        },
        dumpDisk: {     //卸载磁盘
            url: '',
            isAjax: true,
            title: '',
            width: 700,
            height: 420
        },
        deleteVm: {     //删除虚拟机
            url: '/vm/delete',
            isAjax: true,
            title: '',
            width: 700,
            height: 420
        },
        editConfig: {   //修改配置
            url: '/vm/resizeview/',
            isAjax: false,
            title: '',
            width: 500,
            height: 220
        },
        seeInfo: {      //查询详细信息
            url: '/vm/view/',
            isAjax: false,
            title: '虚拟机的详细信息',
            width: 500,
            height: 420
        },

        dumpDisk: {     //卸载磁盘
            url: '/storageInfo/detach',
            isAjax: true,
            title: '',
            width: 700,
            height: 420
        }
    };

    var _typeData = {
        cluster: 1,
        PM: 2,
        VM: 3,
        disk: 4,
        store: 5,
        group: 6
    };

    var _getLevelCls = function(dataObj, level) {
        var level = level == 0 ? level : _typeData[dataObj['type']];
        var subLevel = '';
        var subLevelObj = {
            powerOn: '1', powerOff: '2', pending: '3', starting: '4', unknown: '5'
        };
        var sub3LevelObj = {
            active: '1', stopped: '2', shutoff: '2', paused: '3', error: '5'    
        };
        if(level == 2 || level == 3) {
            if(typeof dataObj['taskStatus'] != 'undefined' && dataObj['taskStatus'] != '' && dataObj['taskStatus'] != null) {
                subLevel = '-ing';
            } else if(typeof dataObj['status'] !== 'undefined' && dataObj['status'] !== '') {
                subLevel = '-' + (level == 2 ? subLevelObj[dataObj['status']] : sub3LevelObj[dataObj['status']]);
            }
        }
        if(dataObj['type'] == 'PM' && dataObj['mountStatus'] == 0) {
        	level = 2;
        	subLevel = '-' + 5;
        }
        return 'topo-level-' + level + subLevel;
    };

    var _formLi = function(dataObj, level) {
        if(typeof dataObj === 'undefiend') return '';
        var level = level == 0 ? level : _typeData[dataObj['type']];
        var levelCls = _getLevelCls(dataObj, level);
        var fixedIP = '';
        if(typeof dataObj['fixedIP'] != 'undefined' && dataObj['fixedIP']) {
            fixedIP = '<br/>' + dataObj['fixedIP'];
        }
        var floatingIP = '';
        if(typeof dataObj['floatingIP'] != 'undefined' && dataObj['floatingIP']) {
            floatingIP = '<br/>' + dataObj['floatingIP'];
        }
        var li = $('<li />');
        var name = level == 0 ? '' : (dataObj.name + fixedIP + floatingIP);
        var topoId = typeof dataObj['id'] == 'undefined' ? '' : dataObj['id'];
        var arrary_topoLevel = ['<div class="topo-level ', levelCls, '">',
                                '<input type="hidden" class="topoId" value="', topoId, '" />',
                                '<input type="hidden" class="topoType" value="', dataObj['type'], '" />',
                                name,
                            '</div>'];
        top_tip(level,dataObj,arrary_topoLevel);//add tip
        var topoLevel = $(arrary_topoLevel.join(''));
        li.data('level', level).append(topoLevel);
        if(typeof dataObj.childs !== 'undefined' &&
            dataObj.childs.length > 0) {
            var _ul = $('<ul />');
            for(var i = 0, len = dataObj.childs.length; i < len; i++) {
                var _li = _formLi(dataObj.childs[i]);
                _ul.append(_li);
            }
            li.append(_ul);
        };
        return li;
    };

    var _formHideByData = function() {
        if($('#' + _hideDivId).length > 0) {
            $('#' + _hideDivId).remove();
        }
        var ul = $('<ul id="' + _hideDivId + '" />');
        var li = _formLi(_chartData, 0);
        ul.append(li).css('display', 'none');
        $(document.body).append(ul);
    };

    var _initLevelMenu = function(showId, level, level_menu) {
        var nodeCls = '.topo-level-' + level;
        if(level == 2) {
            nodeCls = '.topo-level-2-1,.topo-level-2-2,.topo-level-2-3,.topo-level-2-4,.topo-level-2-5';
        } else if(level == 3) {
            nodeCls = '.topo-level-3-1,.topo-level-3-2,.topo-level-3-3,.topo-level-3-4,.topo-level-3-5';
        }
        $('#' + showId).contextMenu({
            selector: nodeCls,
            callback: function(key, options) {
                var id = $(this).find('.topoId').val();
                var type = $(this).find('.topoType').val();
                var method = key;
                _callback(method, id, type);
            },
            items: level_menu
        })
         $(nodeCls).hover(function () {
        	 $(this).parent().addClass('topo-level-hover');
            }, //mouseenter  
             function () {
              $(this).parent().removeClass('topo-level-hover');
         });//mouseleave  
    };

    //右键操作回调函数
    var _callback = function(method, id, type) {
        var url = _menuData[method]['url'];
        var isAjax = (_menuData[method]['isAjax'] == 'true' ||
            _menuData[method]['isAjax'] == true) && true;
        if(isAjax) {
            if(typeof _menuData[method]['toAjaxUrl'] && _menuData[method]['toAjaxUrl'] == true) {
                $.ajax({
                    url: _root + url + '/' + id,
                    dataType: 'text',
                    success: function(result) {
                        var width = _menuData[method]['width'];
                        var height = _menuData[method]['height'];
                        var title = _menuData[method]['title'];
                        open_vnc(result);
                    }
                })
            } else {
                $.ajax({
                    url: _root + url,
                    dataType: 'json',
                    data: {
                        id: id
                    },
                    success: function(result) {
                        if(result && result.success) {
                             $.msgBox({
                                title: "消息提示",
                                content: result.msg
                            });
                            _loadAndShow();
                        }
                    }
                })
            }
        } else {
            var width = _menuData[method]['width'];
            var height = _menuData[method]['height'];
            var title = _menuData[method]['title'];
            openDialog(_root + url + '/' + id, title, width, height);
        }
    }

    var _initMenu = function() {
        var level_1_menu = {
            add: { name: '修改集群配置', icon: 'add' },
            create: {name: '创建虚拟机', icon: 'add'}
        };
        var level_2_menu = {
            createHost: { name: '创建虚拟机', icon: 'add' }
        };
        var level_3_menu = {
            loginVm: { name: '远程登录', icon: 'edit' },
            monitorVm: {name: '监控', icon: 'edit'},
            startVm: {name: '启动', icon: 'edit'},
            stopVm: {name: '关闭', icon: 'edit'},
            resetVm: {name: '重启', icon: 'edit'},
            bindIp: {name: '绑定外网IP', icon: 'edit'},
            unbindIp: {name: '解除外网IP', icon: 'edit'},
            seeInfo: {name: '详细信息', icon: 'edit'},
            sep1: '---------',
            deleteVm: {name: '删除', icon: 'delete'}
        };
        var level_4_menu = {
            dumpDisk: {name: '卸载磁盘', icon: 'delete'}
        };
        var level_5_menu = { //存储
            save: { name: '', icon: 'edit' }
        };
        var level_6_menu = { //网络
            web: { name: '', icon: 'edit' }
        };
        var levelData = [{
            index: 1, dataSet: level_1_menu
        }, {
            index: 2, dataSet: level_2_menu
        }, {
            index: 3, dataSet: level_3_menu
        }, {
            index: 4, dataSet: level_4_menu
        }, {
            index: 5, dataSet: level_5_menu
        }, {
            index: 6, dataSet: level_6_menu
        }]

        //暂时只为topo中的四类设备添加右键菜单
        for(var i = 0; i < 4; i++) {
            _initLevelMenu(_showId, levelData[i]['index'], levelData[i]['dataSet']);
        }

    };
    
    var _loadUrlObj = {
        'vm': '/group/vmtopo',
        'storage': '/shareStore/storetopo',
        'network': '/secgroup/networktopo'
    };

    var _updateStatus = function(dataObj, e) {
    	dataObj['type'] = 'VM';
        var levelCls = _getLevelCls(dataObj);
        $(e).removeClass();
        $(e).addClass('topo-level');
        $(e).addClass(levelCls);
        
    };

    var _initUpdateStatus = function() {
    	$('#' + _showId + ' .topoType').each(function() {
            if($(this).val() != 'VM') return;
            if(_isDemo) {
                var obj = statusData.msg;
                _updateStatus(obj, $(this).parent());
            } else {
                var vmId = $(this).parent().find('.topoId').val();
                var me = this;
                var _intervalCall = function() {
                	var url = _root + '/vm/updateVmStatus/' + vmId;
                    $.ajax({ 
                        url: url, 
                        type: 'get',
                        dataType: 'json',
                        success: function(data){
                            var obj = jQuery.parseJSON(data.msg);
                            if(obj['taskStatus'] == null || obj['taskStatus'] == '') {
                            	window.clearInterval(Topo.getIntervalStatus()[vmId]);
                            }
                            _updateStatus(obj, $(me).parent());
                        }
                    });
                };
                _intervalStatus[vmId] = window.setInterval(_intervalCall, 10000);
                _intervalCall();
            }
        });
    }

    //初始数据加载并绘制topo图
    var _loadAndShow = function() {
        if(_isDemo) {
            $('#' + _showId).html('');
            Zoom.init();
            _chartData = chartData;
            _formHideByData();
            $("#" + _hideDivId).jOrgChart({
                chartElement : '#' + _showId,
                dragAndDrop  : true,
                hasLevel : true
            });
            _initMenu();
            _initUpdateStatus();
            _initDrag();
            $('#' + _showId).draggable();
        } else {
            $.ajax({
                url: _root + _loadUrlObj[_urlType],
                dataType: 'json',
                success: function(result) {
                    if(result && result.success) {
                        $('#' + _showId).html('');
                        Zoom.init();
                        Zoom.setZoom(6);
                        _chartData = $.parseJSON(result.msg);
                        _formHideByData();
                        $("#" + _hideDivId).jOrgChart({
                            chartElement : '#' + _showId,
                            dragAndDrop  : true,
                            hasLevel : true
                        });
                        _initMenu();
                        _initUpdateStatus();
                        _initDrag();
                        $('#' + _showId).draggable();
                    }
                }
            })
        }
    };

    //调整拖拽后的topo图位置
    var dragMethod = function(top, left) {
        $('#chart').offset(function(n, c) {
            return {
                top: c.top + top,
                left: c.left + left
            };
        });
    };

    //初始化拖拽topo图区域
    var _initDrag = function() {
        $('.drag-top').click(function() {
            dragMethod(-100, 0);
        });
        $('.drag-bottom').click(function() {
            dragMethod(100, 0);
        });
        $('.drag-left').click(function() {
            dragMethod(0, -100);
        });
        $('.drag-right').click(function() {
            dragMethod(0, 100);
        });
    };

    //推拽图标后的响应函数
    var dropCallback = function(source, target) {
        var targetId = $(target).find('.topoId').val();
        var sourceId = $(source).find('.topoId').val();
        var topoType = $(source).find('.topoType').val();
        if(topoType == 'VM') {
            if(_isDemo) {
                alert('drop VM id: ' + topoId + ' success!');
            } else {
                $.ajax({
                    url: _root + '/vm//migratevm',
                    dataType: 'json',
                    data: {
                    	id: sourceId,
                    	hostId: targetId,
                    	isHost: true
                    },
                    success: function(result) {
                    	_initUpdateStatus();
                    }
                })
            }
        }
    };

    //初始化
    var init = function(showId, root, isDemo, urlType) {
        _root = root;
        _showId = showId;
        _urlType = urlType;
        if(typeof isDemo !== 'undefined') {
            _isDemo = isDemo;
        }
        _loadAndShow();
    };

    return {
    	getIntervalStatus: function() {
    		return _intervalStatus;
    	},
        dropCallback: dropCallback,
        init: init
    }
}).call(this);


var Zoom = (function() {
    var _fontSize = 12;
    var _curZoom = 1;

    var _power = function(val, n) {
        var ret = val;
        for(var i = 1; i < n; i++) {
            ret = ret * val;
        }
        return ret;
    };

    var setZoom = function(val) {
        if(val >= 1 && val <= 10) {
            var zoom = val - 4;
            var multiplyLen = zoom - _curZoom;
            _curZoom = zoom;
            var multiply = _power(1.2, Math.abs(multiplyLen));
            if(multiplyLen < 0) {
                multiply = 1 / multiply;
            } else if(multiplyLen == 0) {
                multiply = 1;
            }
            $('.jOrgChart .node').each(function() {
                var elm = $(this);
                var width = parseInt(elm.css('width'), 10);
                //var height = parseInt(elm.css('height'), 10);
                width = width * multiply;
                //height = height * multiply;
                elm.css('width', width);
                //elm.css('height', height);
                elm.css('fontSize', _fontSize);
            });
        }
    };

    var setDefault = function() {
        var newZoom = _curZoom + 4;
        _curZoom = 1;
        Zoom.setZoom(newZoom);
        $('.slider').slider('value', newZoom);
    };

    var init = function() {
        $('.slider').slider({
            range: "max",
            min: 1,
            max: 10,
            value: 5,
            orientation: "vertical",
            slide: function( event, ui ) {
                Zoom.setZoom(ui.value);
            }
        });

        $('.slider_min').unbind('click').click(function() {
            var zoom = _curZoom + 3;
            $('.slider').slider('value', zoom);
            Zoom.setZoom(zoom);
        });
        $('.slider_max').unbind('click').click(function() {
            var zoom = _curZoom + 5;
            $('.slider').slider('value', zoom);
            Zoom.setZoom(zoom);
        })
    };

    return {
        setZoom: setZoom,
        setDefault: setDefault,
        init: init
    }
}).call(this);

var top_tip = function(level,dataObj,arrary_topoLevel)
{
	
	  if(level==2||level==3){
      	var dataTip = "data is null";
      	var data = null;
      	if(dataObj['opTip']==""||"undefined"==dataObj['opTip']||dataObj['opTip']==null)
      	{
      		dataTip = "data is null";
      	}else
      	{
      		data =dataObj['opTip'].split(",");
      		if(data[0]=="PM")
      		{
      			//网络I/O："+data[3]+"<br/>
      			dataTip ="CPU利用率："+data[1]+"%"+"<br/>内存利用率为："+data[2]+"%"+"<br/>磁盘I/O："+data[4];
      		}else//虚拟机
      		{
      			dataTip ="VCPU个数："+data[1]+"<br/>内存大小为："+data[2]+"<br/>网络I/O为："+data[3]+"<br/>磁盘I/O为："+data[4];
      		}
      	}
      	//插入html元素
      	arrary_topoLevel.push("<div class='topo-tip'>"+dataTip+"</div>");
      	//arrary_topoLevel.splice(10, 0,"<div class='topo-tip'>"+dataTip+"</div>");
      }

}

/**
 * 打开VNC远程登陆窗口
 * @param data
 */
function open_vnc(data) {
    var url = data; 
    window.open(url, "远程登录虚拟机");
   // window.showModalDialog(url, "远程登录虚拟机", "dialogWidth:1000px;dialogHeight:768px;Minimize=yes;Maximize=yes;");
}
