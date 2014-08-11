var Host = (function() {
	var dataList, dataLength = 0;
	var curIndex = 0, isDragging = false;
	var checkInterval = null;
	var path = '';

	// 绘制主机列表中的某一项
	var _formatItemHtml = function(itemData) {
		var info = itemData.info;
		var id = itemData.id;
		var name = itemData.name;
		var playCls = 'host_pc_play';
		var stopCls = 'host_pc_stop';
		var pauseCls = 'host_pc_pause';
		var showStatus = '';
		var status = itemData.status;
		var taskStatus = itemData.taskStatus;

		var __addDisabled = function(cls) {
			return cls + ' host_pc_disabled';
		};

		if (taskStatus && taskStatus != '') {
			if (taskStatus == 'starting') {
				showStatus = '开机中';
				playCls = 'host_pc_play_sel';
				playCls = __addDisabled(playCls);
				stopCls = __addDisabled(stopCls);
				pauseCls = __addDisabled(pauseCls);
			} else if (taskStatus == 'stopping') {
				showStatus = '关机中';
				stopCls = 'host_pc_stop_sel';
				playCls = __addDisabled(playCls);
				stopCls = __addDisabled(stopCls);
				pauseCls = __addDisabled(pauseCls);
			}
		} else {
			if (status == 'active') {
				showStatus = '运行';
				playCls = 'host_pc_play_sel';
				playCls = __addDisabled(playCls);
			} else if (status == 'shutoff') {
				showStatus = '停止';
				stopCls = 'host_pc_stop_sel';
				stopCls = __addDisabled(stopCls);
				pauseCls = __addDisabled(pauseCls);
			} else if (status == 'error') {
				showStatus = '失败';
				playCls = __addDisabled(playCls);
				stopCls = __addDisabled(stopCls);
				pauseCls = __addDisabled(pauseCls);
			} else if (status == 'over') {
				showStatus = '过期';
				playCls = __addDisabled(playCls);
				stopCls = __addDisabled(stopCls);
				pauseCls = __addDisabled(pauseCls);
			}
		}
		var itemHtmlAry = [ '<input type="hidden" value="', id,
				'" class="host_pc_id" />', '<div class="clearfix">',
				'<div class="host_pc">', name, '</div>',
				'<div class="host_pc_info">',
				'<div class="host_pc_info_inner">', '<div>IP地址：', info.ip,
				'</div>', '<div>CPU：', info.cpu, '</div>', '<div>内存(MB)：',
				info.ram, '</div>', '<div>磁盘空间(GB)：', info.disk, '</div>',
				'<div class="host_status">状态：', showStatus, '</div>', '</div>',
				'</div>', '</div>', '<div class="host_pc_action clearfix">',
				'<div class="', playCls, '"></div>', '<div class="', stopCls,
				'"></div>', '<div class="', pauseCls, '"></div>', '</div>' ];
		return itemHtmlAry.join('');
	};

	// 绘制主机列表
	var _formHostList = function() {
		var htmlAry = [];
		var listInnerWidth = dataLength * 340;
		for ( var i = 0; i < dataLength; i++) {
			var htmlScript = _formatItemHtml(dataList[i]);
			htmlAry.push('<div class="host_show_item" id="pc_id_'
					+ dataList[i]['id'] + '">' + htmlScript + '</div>');
		}
		$('.host_show_list_inner').html(htmlAry.join('')).css('width',
				listInnerWidth);
	};

	// 响应向右推拽按钮
	var _dragRight = function() {
		if (isDragging || curIndex + 1 == dataLength)
			return;
		isDragging = true;
		curIndex++;
		var marginLeft = parseInt($('.host_show_list_inner').css('marginLeft'));
		$('.host_show_list_inner').animate({
			marginLeft : '-=340'
		}, function() {
			isDragging = false;
		});
	};

	// 响应向左拖拽按钮
	var _dragLeft = function() {
		if (isDragging || curIndex == 0)
			return;
		isDragging = true;
		curIndex--;
		var marginLeft = parseInt($('.host_show_list_inner').css('marginLeft'));
		$('.host_show_list_inner').animate({
			marginLeft : '+=340'
		}, function() {
			isDragging = false;
		});
	};

	// 註冊左右推拽按钮事件
	var _initDrag = function() {
		$('.host_drag_left').unbind('click').click(function() {
			_dragLeft();
		});
		$('.host_drag_right').unbind('click').click(function() {
			_dragRight();
		})
	};

	// 根据某个节点 获取所对应的机器的id值
	var _getHostId = function(e) {
		return $(e).parents('.host_show_item').find('.host_pc_id').first()
				.val();
	};

	// 根据主机的id值 获取主机的基本数据
	var _getHostDataById = function(id) {
		for ( var i = 0, len = dataList.length; i < len; i++) {
			if (dataList[i]['id'] == id) {
				return dataList[i];
			}
		}
		return null;
	};

	// 根据选中的主机 展示该主机的趋势图
	var _formHostItem = function(itemData) {
		if (!itemData)
			return;
		$('#host_name').html(itemData.name);
		HostLine.loadAndShow(itemData.id, 'cpu');
	};

	// 註冊主机点击事件
	var _initHostSel = function() {
		$('.host_pc').unbind('click').click(function() {
			$('.host_pc_sel').removeClass('host_pc_sel').addClass('host_pc');
			$(this).removeClass('host_pc').addClass('host_pc_sel');

			var id = _getHostId(this);
			var hostItemData = _getHostDataById(id);
			_formHostItem(hostItemData);
		})
	};

	// 选中第一台主机
	var _selFirst = function() {
		$('.host_pc_sel').removeClass('host_pc_sel').addClass('host_pc');
		$('.host_pc').first().removeClass('.host_pc').addClass('host_pc_sel');
		var hostItemData = dataList[0];
		_formHostItem(hostItemData);
	};

	var _disableHost = function(hostId, type) {
		var host = $('#pc_id_' + hostId);
		if (type == 'play') {
			host.find('.host_pc_play').first().removeClass('host_pc_play')
					.addClass('host_pc_play_sel');
			host.find('.host_pc_stop_sel').first().removeClass(
					'host_pc_stop_sel').addClass('host_pc_stop');

			host.find('.host_pc_play_sel').first().unbind('click').addClass(
					'host_pc_disabled');
			host.find('.host_pc_stop').first().unbind('click').addClass(
					'host_pc_disabled');
			host.find('.host_pc_pause').first().unbind('click').addClass(
					'host_pc_disabled');
		} else if (type == 'stop') {
			host.find('.host_pc_play_sel').first().removeClass(
					'host_pc_play_sel').addClass('host_pc_play');
			host.find('.host_pc_stop').first().removeClass('host_pc_stop')
					.addClass('host_pc_stop_sel');

			host.find('.host_pc_play').first().unbind('click').addClass(
					'host_pc_disabled');
			host.find('.host_pc_stop_sel').first().unbind('click').addClass(
					'host_pc_disabled');
			host.find('.host_pc_pause').first().unbind('click').addClass(
					'host_pc_disabled');
		}
	};

	var _recheckHostStatus = function(hostId) {
		checkInterval = window.setInterval(function() {
			$
					.ajax({
						url : path + "vm/" + hostId,
						dataType : 'json',
						/*
						 * data: { id: hostId },
						 */
						success : function(result) {
							if (!result.item.taskStatus
									|| result.item.taskStatus == '') {
								window.clearInterval(checkInterval);
							}
							var html = _formatItemHtml(result.item);
							$('#pc_id_' + hostId).html(html);
							_initHostEvent();
						}
					});
		}, 10000);

	};

	// 註冊并响应主机开始事件
	var _initHostPlay = function() {
		$('.host_pc_play').unbind('click').click(function() {
			if ($(this).hasClass('host_pc_disabled'))
				return;
			$(this).parent().parent().find('.host_status').html('状态：开机中');
			var hostId = _getHostId(this);
			_disableHost(hostId, 'play');
			$.ajax({
				url : path + "startVm",
				dataType : 'json',
				data : {
					id : hostId
				},
				success : function(result) {
					_recheckHostStatus(hostId);
				}
			})
		});
	};

	// 註冊并响应主机停止事件
	var _initHostStop = function() {
		$('.host_pc_stop').unbind('click').click(function() {
			if ($(this).hasClass('host_pc_disabled'))
				return;
			$(this).parent().parent().find('.host_status').html('状态：关机中');
			var hostId = _getHostId(this);
			_disableHost(hostId, 'stop');
			$.ajax({
				url : path + 'stopVm',
				dataTYpe : 'json',
				data : {
					id : hostId
				},
				success : function(result) {
					_recheckHostStatus(hostId);
				}
			})
		});
	};

	// 註冊并响应主机登录事件
	var _initHostLogin = function() {
		$('.host_pc_pause').unbind('click').click(function() {
			if ($(this).hasClass('host_pc_disabled'))
				return;
			var hostId = _getHostId(this);
			$.ajax({
				type : "get",
				dataType : "html",
				url : path + "vncLogin/" + hostId,
				success : function(data) {
					if (data == 'error') {
						$.msgBox({
							title : "消息提示",
							content : "远程登录虚拟机失败 !",
						});
					} else {
						window.open(data, "远程登录虚拟机");
					}
				}
			});
		});
	};

	// 註冊主机列表操作
	var _initHostEvent = function() {
		_initDrag();
		_initHostSel();
		_initHostPlay();
		_initHostStop();
		_initHostLogin();
	};

	// 初始化折线图tab
	var _initTab = function() {
		$('.tab_group .tab').each(function() {
			$(this).click(function() {
				$('.tab_group .tab').removeClass('tab_sel');
				$(this).addClass('tab_sel');
				var type = $('.tab_type', this).val();
				HostLine.reload(type);
			})
		});
	};

	// 初始化开始 结束时间
	var _initDate = function() {
		var dataConfig = {
			dateFormat : "yy-mm-dd"
		};
		$('#start_date').datepicker(dataConfig);
		$('#end_date').datepicker(dataConfig);
		$('.date_search_btn').click(function() {
			var startDate = $.trim($('#start_date').val());
			var endDate = $.trim($('#end_date').val());
			if (startDate == '' || endDate == '')
				return;
			HostLine.reloadByDate(startDate, endDate);
		});
	};

	// 页面初始化
	var init = function(datas, url) {
		path = url;
		dataList = datas;
		dataLength = dataList.length;
		_formHostList();
		_initHostEvent();
		_selFirst();
		_initTab();
		_initDate();
	};

	return {
		init : init
	}
}).call(this);