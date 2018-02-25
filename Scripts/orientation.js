/*global $, jQuery*/
/*jslint browser: true*/
(function ($) {
    'use strict';

    function distMetric(x, y, x2, y2) {
        var xDiff = x - x2;
        var yDiff = y - y2;
        return (xDiff * xDiff) + (yDiff * yDiff);
    }

    function direction(x, y, w, h, ot, ol) {
        var topEdgeDist = distMetric(x, y, w / 2 + ol, ot);
        var bottomEdgeDist = distMetric(x, y, w / 2 + ol, h + ot);
        var leftEdgeDist = distMetric(x, y, ol, h / 2 + ot);
        var rightEdgeDist = distMetric(x, y, w + ol, h / 2 + ot);
        var min = Math.min(topEdgeDist, bottomEdgeDist, leftEdgeDist, rightEdgeDist);
        switch (min) {
        case leftEdgeDist:
            return "left";
        case rightEdgeDist:
            return "right";
        case topEdgeDist:
            return "top";
        case bottomEdgeDist:
            return "bottom";
        }
    }

    $("body").on("mouseenter", ".hoverFrame", function (e) {
        var edge = direction(e.pageX, e.pageY, $(this).width(), $(this).height(), $(this).offset().top, $(this).offset().left);
        switch (edge) {
        case 'left':
            $(this).find(".btnHover").css({left: '-100%', top: 0});
            $(this).find(".btn").velocity("finish").velocity({left: '100%'}, {delay: 300});
            break;
        case 'right':
            $(this).find(".btnHover").css({left: '100%', top: 0});
            $(this).find(".btn").velocity("finish").velocity({left: '-100%'}, {delay: 300});
            break;
        case 'top':
            $(this).find(".btnHover").css({left: 0, top: '-100%'});
            $(this).find(".btn").velocity("finish").velocity({top: '100%'}, {delay: 300});
            break;
        case 'bottom':
            $(this).find(".btnHover").css({left: 0, top: '100%'});
            $(this).find(".btn").velocity("finish").velocity({top: '-100%'}, {delay: 300});
            break;
        }
    });
    $("body").on("mouseleave", ".hoverFrame", function () {
        $(this).find(".btn").velocity("finish").velocity({left: 0, top: 0});
    });


    $("body").on("mouseenter", ".qhoverFrame", function (e) {
        var edge = direction(e.pageX, e.pageY, $(this).width(), $(this).height(), $(this).offset().top, $(this).offset().left);
        switch (edge) {
        case 'left':
            $(this).find(".ans").css({left: '-100%', top: 0});
            $(this).find(".move").velocity("finish").velocity({left: '100%'}, {delay: 300});
            break;
        case 'right':
            $(this).find(".ans").css({left: '100%', top: 0});
            $(this).find(".move").velocity("finish").velocity({left: '-100%'}, {delay: 300});
            break;
        case 'top':
            $(this).find(".ans").css({left: 0, top: '-100%'});
            $(this).find(".move").velocity("finish").velocity({top: '100%'}, {delay: 300});
            break;
        case 'bottom':
            $(this).find(".ans").css({left: 0, top: '100%'});
            $(this).find(".move").velocity("finish").velocity({top: '-100%'}, {delay: 300});
            break;
        }
    });
    $("body").on("mouseleave", ".qhoverFrame", function () {
        $(this).find(".move").velocity("finish").velocity({left: 0, top: 0});
    });
}(jQuery));