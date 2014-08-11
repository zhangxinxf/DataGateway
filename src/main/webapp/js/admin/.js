var Table = (function(e) {
    var tableId = '';
    var isCheckAll = false;

    var _bindTr = function(odd, even, hover, click) {
        $('#' + tableId).find('tr').each(function() {
            var jqEle = $(this);
            var color = jqEle.get(0).sectionRowIndex % 2 == 0 ? odd : even;
            jqEle.css('backgroundColor', color);
            jqEle.click(function() {
                var ele = $(this);
                if(ele.attr('sel') != 1) {
                    ele.attr('sel', 1);
                    ele.css('backgroundColor', click);
                    ele.find('input.chk').prop('checked', true);
                } else {
                    ele.attr('sel', 0);
                    ele.css('backgroundColor', color);
                    ele.find('input.chk').prop('checked', false);
                }
            }).mouseover(function() {
                var ele = $(this);
                if(ele.attr('sel') != 1) {
                    ele.css('backgroundColor', hover);
                }
            }).mouseout(function() {
                var ele = $(this);
                if(ele.attr('sel') != 1) {
                    ele.css('backgroundColor', color);
                }
            })
        })
    }
    var init = function(id, odd, even, hover, click) {
        tableId = id;
        var odd = typeof odd === 'undefined' ? '#ecf5fe' : odd;
        var even = typeof even === 'undefined' ? '#ffffff' : even;
        var hover = typeof hover === 'undefined' ? '#c7e5ab' : hover;
        var click = typeof click === 'undefined' ? '#e0e5e9' : click;
        _bindTr(odd, even, hover, click);
    };

    var checkAll = function() {
        isCheckAll = !isCheckAll;
        $('#' + tableId).find('input.chk').prop('checked', isCheckAll);
    };

    var bindDblClick = function(fun) {
        $('#' + tableId).find('tr').dblclick(function() {
            fun.call(e);
        });
    };

    return {
        init: init,
        checkAll: checkAll,
        bindDblClick: bindDblClick
    }
}).call(this);