/*global $, jQuery, window*/
(function ($) {
    'use strict';

    //判斷IE版本
    function ieVersion() {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') !== -1)
            ? parseInt(myNav.split('msie')[1], 10)
            : false;
    }
    //小動畫
    var animation = {
        a_1_1: function () {
            $(".type_1").velocity({left: 0, opacity: 1}, "easeInOut");
            $(".type_3").velocity({right: 0, opacity: 1}, "easeInOut");
        },
        a_1_2: function () {
            var pinLocation = {
                    x: [66, 60, 142, 266, 310, 328, 354, 426, 528, 284, 316],
                    y: [44, 92, 220, 46, 64, 42, 56, 80, 84, 130, 120]
                },
                i,
                l = $(".pin").length;

            for (i = 0; i < l; i += 1) {
                $(".pin").eq(i).css({
                    left: pinLocation.x[i],
                    top: pinLocation.y[i]
                }).delay(Math.random() * 1400 + 100).fadeIn();
            }
        },
        a_1_3: function () {
            function repeat() {
                var x = parseInt($(".mapDetail .num").html(), 10);
                if (x === 20) {
                    return false;
                }
                $(".mapDetail .num").html(x + 1);
                setTimeout(function () {
                    repeat();
                }, 50);
            }
            repeat();
        },
        a_1_4: function () {
            $(".pcontent_1 .pic").delay(100).fadeIn();
            $(".pcontent_1 .pdetail h3").delay(700).fadeIn();
            $(".pcontent_1 .pdetail ul li").delay(1100).eq(0).fadeIn();
            $(".pcontent_1 .pdetail ul li").delay(500).eq(1).fadeIn();
            $(".pcontent_1 .pdetail ul li").delay(500).eq(2).fadeIn();
            $(".pcontent_1 .pdetail ul li").delay(500).eq(3).fadeIn();
        },
        a_1_5: function () {
            $(".element_4").fadeIn();
            function jigsawMove() {
                if (parseInt($(".element_4 .pic i").css("marginLeft"), 10) / -148 === $(".element_4 .pic i").width() / 148 - 1) {
                    return false;
                }
                $(".element_4 .pic i").css({marginLeft: -148 * (parseInt($(".element_4 .pic i").css("marginLeft"), 10) / -148 + 1)});
                setTimeout(function () {
                    jigsawMove();
                }, 80);
            }
            jigsawMove();
        },
        a_2_1: function () {
            $(".spinPic").velocity({rotateZ: "360deg"}, {loop: true, duration: 4000, easing: "linear"});
            function iconMove(el) {
                if (parseInt(el.css("marginLeft"), 10) / -108 === el.width() / 108 - 1) {
                    return false;
                }
                el.css({marginLeft: -108 * (parseInt(el.css("marginLeft"), 10) / -108 + 1)});
                setTimeout(function () {
                    iconMove(el);
                }, 1500 / el.width() * 108);
            }
            iconMove($(".daa ul li.text_1 .pic i"));
            iconMove($(".daa ul li.text_2 .pic i"));
            iconMove($(".daa ul li.text_3 .pic i"));
        },
        a_3_1: function () {
            function repeatNum(target) {
                var n = parseInt(target.html(), 10);
                if (n === parseInt(target.attr("numLimit"), 10)) {
                    return false;
                }
                target.html(n + 1);
                setTimeout(function () {
                    repeatNum(target);
                }, 3500 / parseInt(target.attr("numLimit"), 10));
            }
            $(".resource ul li .num").each(function () {
                repeatNum($(this));
            });
        },
        a_3_2: function () {
            //limit w 570px
            $(".barItem .bar").each(function () {
                $(this).velocity({width: 570 * parseInt($(this).attr("data"), 10) / 100}, 1500);
            });
        },
        a_3_3: function () {
            var h,
                g = $(".dot").length;

            for (h = 0; h < g; h += 1) {
                $(".dot").eq(h).delay(Math.random() * 1400 + 100).fadeIn();
            }
            var time = setInterval(function () {
                $(".dot").css("z-index", "0").find(".country").hide();
                $(".dot").eq(Math.floor(Math.random() * g)).css("z-index", "9").find(".country").fadeIn();
            }, 5000);
            $(".dot").hover(function () {
                clearInterval(time);
                $(".dot").css("z-index", "0").find(".country").hide();
                $(this).css("z-index", "9").find(".country").fadeIn();
            }, function () {
                time = setInterval(function () {
                    $(".dot").css("z-index", "0").find(".country").hide();
                    $(".dot").eq(Math.floor(Math.random() * g)).css("z-index", "9").find(".country").fadeIn();
                }, 5000);
            });
        },
        a_4_1: function () {
            $(".fundLink li").eq(0).fadeIn();
            $(".fundLink li").eq(1).delay(500).fadeIn();
            $(".fundLink li").eq(2).delay(1000).fadeIn();
            $(".fundLink li").eq(3).delay(1500).fadeIn();
            $(".fundLink li").eq(4).delay(2000).fadeIn();
            $(".fundLink li").eq(5).delay(2500).fadeIn();
        }
    };

    function goAnimate(one) {
        switch (one) {
        case "1_1":
            animation.a_1_1();
            break;
        case "1_2":
            animation.a_1_2();
            break;
        case "1_3":
            animation.a_1_3();
            break;
        case "1_4":
            animation.a_1_4();
            break;
        case "1_5":
            animation.a_1_5();
            break;
        case "2_1":
            animation.a_2_1();
            break;
        case "3_1":
            animation.a_3_1();
            break;
        case "3_2":
            animation.a_3_2();
            break;
        case "3_3":
            animation.a_3_3();
            break;
        case "4_1":
            animation.a_4_1();
            break;
        }
    }

    var limit = 570;
    function scrollFun(target) {
        target.find(".scrollShow").each(function () {
            if (ieVersion() === 8) {
                if (Math.floor($(this).attr("pos") - $(this).parents(".scroll").data('jsp').getContentPositionY()) < limit) {
                    $(this).velocity({opacity: 1}, "slow", function () {
                        if (typeof $(this).attr("hasAnimation") !== typeof undefined && $(this).attr("hasAnimation") !== false) {
                            goAnimate($(this).attr("hasAnimation"));
                        }
                    });
                }
            }
            if ($(this).css("opacity") > 0) {
                return undefined;
            }
            if (Math.floor($(this).attr("pos") - $(this).parents(".scroll").data('jsp').getContentPositionY()) < limit) {
                $(this).velocity({opacity: 1}, "slow", function () {
                    if (typeof $(this).attr("hasAnimation") !== typeof undefined && $(this).attr("hasAnimation") !== false) {
                        goAnimate($(this).attr("hasAnimation"));
                    }
                });
            }
        });
    }

    //卷軸外掛
    $("body").on("click", ".hoverFrame", function () {
        $(".hide").hide();
        $(".scroll").jScrollPane({hideFocus: true, autoReinitialise: true, animateScroll: true});
        $(".content_" + $(this).find(".btn").attr("nav")).find(".scroll").on("scroll", function () {
            scrollFun($(this).find(".detail"));
        });
        $(".content_" + $(this).find(".btn").attr("nav")).find(".scroll").data('jsp').scrollTo(0, 1);
    });

    var $body = (window.opera)
        ? (document.compatMode === "CSS1Compat"
            ? $('html')
            : $('body'))
        : $('html,body');

    //回頂端
    $(".goTop").on('click', function () {
        $(this).parents(".scroll").data('jsp').scrollTo(0, 0);
        $body.animate({scrollTop: "0"}, 500);
        return false;
    });

    //捲動顯示
    $(".scrollShow").each(function () {
        $(this).attr("pos", $(this).position().top);
    });

    //了解更多DAA策略
    $(".more").click(function () {
        $(".hide").show();
        $(this).parents(".scroll").data('jsp').scrollTo(0, 870);
    });

    //內容二拼圖切換
    $(".puzzle li").on("mouseenter", function () {
        $(".everyway .title p").hide();
        $(".everyway .title p").eq($(this).index()).show();
    });

    //loading
    var imgDone = [];

    function getBgUrl(el) {
        var bg = "";
        if (el.currentStyle) { // IE
            bg = el.currentStyle.backgroundImage;
        } else if (document.defaultView && document.defaultView.getComputedStyle) { // Firefox
            bg = document.defaultView.getComputedStyle(el, "").backgroundImage;
        } else { // try and get inline style
            bg = el.style.backgroundImage;
        }
        return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
    }

    $("*").each(function () {
        if ($(this).css('background-image') !== "none") {
            var img = $('<img/>');
            img.attr('src', getBgUrl(this)).load(function () {
                imgDone.push(this);
                $(".icon-mask").css("width", Math.round((imgDone.length / 123) * 100) + "%");
                if (imgDone.length === 123) {
                    setTimeout(function () {
                        $("#loading").fadeOut();
                    }, 1500);
                }
            }).each(function () {
                if (this.complete) {
                    $(this).load();
                }
            });
        }
    });
}(jQuery));