var Frameset = (function() {
    var isLeftOpen = true;

    var to = function(url) {
        $('#frame_content').attr('src', url);
    }

    var subTo = function(url) {
        parent.Frameset.to(url);
    };

    var init = function() {
        $('.nav_one').click(function() {
            $('.nav_one').each(function() {
                $(this).parent().find('.nav_two_box').removeClass('sel');
            });
            $(this).parent().find('.nav_two_box').addClass('sel');
        });
        $('.nav_two_box a').click(function() {
            $('.nav_two_box a').each(function() {
                $(this).removeClass('sel');
            });
            $(this).addClass('sel');
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