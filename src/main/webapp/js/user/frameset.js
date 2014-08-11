var Frameset = (function() {
    var isLeftOpen = true;

    var to = function(url) {
        console.log($('#frame_content').get(0).src);
        $('#frame_content').attr('src', url);
    }

    var subTo = function(url) {
        parent.Frameset.to(url);
    };

    var init = function() {
    	$('.header_user_tab a').click(function() {
            $('.header_user_tab a').each(function() {
                $(this).removeClass('user_tab_sel');
            });
            $(this).addClass('user_tab_sel');
        });
    };

    var triggerLeft = function(show) {
        var frameEle = document.getElementById('frame_sub_box');
        if(!show) {
            frameEle.cols = '0, 6, *';
        } else {
            frameEle.cols = '192, 6, *';
        }
    };

    var initTrigger = function() {
        $('.nav_trigger').click(function() {
            isLeftOpen = !isLeftOpen;
            if(isLeftOpen) {
                $('.nav_trigger').find('.trigger')
                    .addClass('nav_close').removeClass('nav_open');
            } else {
                $('.nav_trigger').find('.trigger')
                    .addClass('nav_open').removeClass('nav_close');
            }
            parent.Frameset.triggerLeft(isLeftOpen);
        })
    };

    return {
        subTo: subTo,
        to: to,
        triggerLeft: triggerLeft,
        init: init,
        initTrigger: initTrigger
    }
}).call(this);