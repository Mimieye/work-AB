/*global $, jQuery, window*/
(function ($) {

    'use strict';

    var easingSetting = "easeInOut",
        durationSetting = 400,
        isAnimating = false,
        according = ["1", "2", "3", "4"],
        btn = [
            "<div class='hoverFrame down add'><div nav='1' class='btn btn_1'><div class='title'><span class='icon'><i></i></span><p>資產類別多元</p></div><div class='btnHover'><span class='icon'></span><p>超過40年的大數據</p></div></div></div>",
            "<div class='hoverFrame down add'><div nav='2' class='btn btn_2'><div class='title'><span class='icon'><i></i></span><p>收益來源多元</p></div><div class='btnHover'><span class='icon'></span><p>各種收益機會<br />一次網羅</p></div></div></div>",
            "<div class='hoverFrame down add'><div nav='3' class='btn btn_3'><div class='title'><span class='icon'><i></i></span><p>研究觀點多元</p></div><div class='btnHover'><span class='icon'></span><p>集合股債團隊<br />強大後援</p></div></div></div>",
            "<div class='hoverFrame down add'><div nav='4' class='btn btn_4'><div class='title'><span class='icon'><i></i></span><p>產品選擇多元</p></div><div class='btnHover'><span class='icon'></span><p>提供各種投資<br />需求不同選擇</p></div></div></div>"
        ];

    //移動動作 function
    function move() {
        if (isAnimating) {
            return false;
        }

        isAnimating = true;

        $(".up").css("top", "").velocity('finish').velocity({top: "-100%"}, {
            duration: durationSetting,
            easing: easingSetting,
            complete: function () {
                $(this).removeClass("up");
                $(this).each(function () {
                    if ($(this).hasClass("add")) {
                        $(this).addClass("moved");
                    }
                });
                isAnimating = false;
            }
        });

        $(".down").css("top", "").velocity("finish").velocity({top: 0}, {
            duration: durationSetting,
            easing: easingSetting,
            complete: function () {
                $(this).removeClass("down").addClass("up");
                $(".linkIndex, .switch, .question").removeClass("up");
                isAnimating = false;
            }
        });
    }

    //第幾個按鈕click function
    function btnClick(target) {
        $(".hoverFrame:not('.hoverFrame-s')").addClass("up");
        $(".title_" + target).addClass("down");
        $(".content_" + target).addClass("down");

        according.splice(target - 1, 1);
        $(".column-right .section-top").append(btn[according[0] - 1]);
        $(".column-right .section-middle").append(btn[according[1] - 1]);
        $(".column-right .section-bottom").append(btn[according[2] - 1]);
        according.push(target);
        according.sort();
        move();
        $("div").remove(".add.moved");
    }

    //按鈕動作
    $("body").on("click", ".hoverFrame", function () {
        if (isAnimating) {
            return false;
        }
        $(".question > div").hide().eq($(this).find(".btn").attr("nav") - 1).show();
        btnClick($(this).find(".btn").attr("nav"));
    });

    //首頁按鈕動作
    $("body").on("click", ".linkIndex", function () {
        $(".display-index").addClass("down");
        $(".linkIndex, .switch, .question").addClass("up");
        move();
        $(".linkIndex, .switch, .question").addClass("down");
    });

    //下一頁按鈕動作
    $("body").on("click", ".next", function () {
        var i = $(".mainTitle.up").index();
        if (i === 4) {
            i = 0;
        }
        $(".btn_" + (i + 1)).click();
    });

    //上一頁按鈕動作
    $("body").on("click", ".prev", function () {
        var i = $(".mainTitle.up").index();
        if (i === 1) {
            i = 5;
        }
        $(".btn_" + (i - 1)).click();
    });

    function dataShow(targetData) {
        var j,
            targetL = targetData.find(".pdetail ul li").length;

        targetData.find(".pic").delay(500).fadeIn();
        targetData.find(".pdetail h3").delay(1100).fadeIn();
        targetData.find(".pdetail ul li").delay(1500).eq(0).fadeIn();
        for (j = 1; j < targetL; j += 1) {
            targetData.find(".pdetail ul li").delay(500).eq(j).fadeIn();
        }
    }

    $(".process-switch ul li").on("click", function () {
        var lastPage = $(".process-switch ul li.nowPage").index();
        $(".process-switch ul li").removeClass("nowPage");
        $(this).addClass("nowPage");
        $(".process-frame").velocity({marginLeft: -640 * $(this).index() + "px"});
        dataShow($(".pcontent_" + ($(this).index() + 1)));
        if (lastPage === 0 && $(this).index() === 1) {
            $(".pcontent_2 > span").hide();
            $(".pcontent_2 .btn-next").show();
        }
        if (lastPage === 2 && $(this).index() === 1) {
            $(".pcontent_2 > span").hide();
            $(".pcontent_2 .btn-prev").show();
        }
    });
    $(".pcontent_1 .btn-next").on("click", function () {
        $(".process-switch ul li").eq(1).click();
    });
    $(".pcontent_2 .btn-next").on("click", function () {
        $(".process-switch ul li").eq(2).click();
    });
    $(".pcontent_2 .btn-prev").on("click", function () {
        $(".process-switch ul li").eq(0).click();
    });
    $(".pcontent_3 .btn-prev").on("click", function () {
        $(".process-switch ul li").eq(1).click();
    });

    $(".column-middle .display-index .middle, .column-middle .display-index .bottom").on("click", function () {
        $(".btn_1").click();
    });


    $(".slider").slider({
        value: 4,
        //values: [4, 20, 32, 56, 84, 96],
        stop: function (event, ui) {
            if (ui.value < 4) {
                $(this).slider({value: 4});
            }
            if (ui.value >= 4 && ui.value < 12) {
                $(this).slider({value: 4});
            }
            if (ui.value >= 12 && ui.value < 20) {
                $(this).slider({value: 20});
            }
            if (ui.value >= 20 && ui.value < 26) {
                $(this).slider({value: 20});
            }
            if (ui.value >= 26 && ui.value < 32) {
                $(this).slider({value: 32});
            }
            if (ui.value >= 32 && ui.value < 44) {
                $(this).slider({value: 32});
            }
            if (ui.value >= 44 && ui.value < 56) {
                $(this).slider({value: 56});
            }
            if (ui.value >= 56 && ui.value < 70) {
                $(this).slider({value: 56});
            }
            if (ui.value >= 70 && ui.value < 84) {
                $(this).slider({value: 84});
            }
            if (ui.value >= 84 && ui.value < 90) {
                $(this).slider({value: 84});
            }
            if (ui.value >= 90 && ui.value < 96) {
                $(this).slider({value: 96});
            }
            if (ui.value >= 96) {
                $(this).slider({value: 96});
            }
        },
        change: function (event, ui) {
            $(".historyTime").stop().hide();
            $(".historyText").stop().hide();
            $(".ui-slider-handle").removeClass("left-limit");
            $(".ui-slider-handle").removeClass("right-limit");
            switch (ui.value) {
            case 4:
                $(".historyTime").eq(0).fadeIn();
                $(".historyText").eq(0).fadeIn();
                $(".ui-slider-handle").addClass("left-limit");
                break;
            case 20:
                $(".historyTime").eq(1).fadeIn();
                $(".historyText").eq(1).fadeIn();
                break;
            case 32:
                $(".historyTime").eq(2).fadeIn();
                $(".historyText").eq(2).fadeIn();
                break;
            case 56:
                $(".historyTime").eq(3).fadeIn();
                $(".historyText").eq(3).fadeIn();
                break;
            case 84:
                $(".historyTime").eq(4).fadeIn();
                $(".historyText").eq(4).fadeIn();
                break;
            case 96:
                $(".historyTime").eq(5).fadeIn();
                $(".historyText").eq(5).fadeIn();
                $(".ui-slider-handle").addClass("right-limit");
                break;
            }
        }
    });
    $(".ui-slider-handle").addClass("left-limit");
    //拉霸圖片動畫
    function dragMove() {
        var bg = parseInt($(".ui-slider-handle").css("background-position"), 10) / -40;
        if (bg === 12) {
            bg = -1;
        }
        $(".ui-slider-handle").css({backgroundPosition: -40 * (bg + 1) + "px 0"});
        setTimeout(function () {
            dragMove();
        }, 1500 / 13);
    }
    dragMove();

    var dragt;

    $('.slider').on({
        mouseenter: function () {
            clearInterval(dragt);
            $(".ui-slider-handle").animate({bottom: "20px"});
        },
        mouseleave: function () {
            clearInterval(dragt);
            dragt = window.setInterval(function () {
                $(".ui-slider-handle").animate({bottom: "25px"}).animate({bottom: "20px"});
            }, 800);
        }
    }).trigger('mouseleave');

    //footer
    var timer;
    function autoPlayFooter() {
        var FH = $("#footer .textContent").height(),
            FoutH = $("#footer .frame").height();

        timer = setTimeout(function () {
            $("#footer .textContent").stop().css("top", "0").animate({top: FoutH - FH}, 12000, "linear");
        }, 1500);
    }

    $(".openFooter").on("click", function () {
        $("#footer").velocity({bottom: 0});
        autoPlayFooter();
    });
    $("#footer .close").on("click", function () {
        $("#footer").velocity({bottom: "-100%"});
        clearTimeout(timer);
        $("#footer .textContent").stop().css("top", "0");
    });
}(jQuery));