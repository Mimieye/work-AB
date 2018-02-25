/*global $, jQuery*/
(function ($) {
    'use strict';
    //判斷IE版本
    function ieVersion() {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') !== -1)
            ? parseInt(myNav.split('msie')[1], 10)
            : false;
    }

    var Icon = function (targetIcon) {
        var that = this;
        this.target = targetIcon.find(".icon > i");
        this.width = this.target.width();
        this.frame = this.target.height();
        this.randomTimeOrder = this.target.attr("iconanimate");

        setTimeout(function () {
            that.startAnimate();
        }, this.randomTimeArray[this.randomTimeOrder - 1]);
    };

    Icon.prototype.randomTimeArray = [Math.floor(Math.random() * 3000 + 3000), Math.floor(Math.random() * 3000 + 3000), Math.floor(Math.random() * 3000 + 3000), Math.floor(Math.random() * 3000 + 3000)];
    Icon.prototype.startAnimate = function () {
        var that = this,
            t;

        this.marginLeft = parseInt(this.target.css("marginLeft"), 10);
        this.target.css({marginLeft: -1 * this.frame * ((this.marginLeft * -1 / this.frame) + 1)});

        if (this.marginLeft / this.frame * -1 === this.width / this.frame - 2) {
            clearTimeout(t);
            setTimeout(function () {
                that.target.css({marginLeft: 0});
                that.startAnimate(this);
            }, this.randomTimeArray[this.randomTimeOrder - 1]);
            return false;
        }

        var callThisFunction = function () {
            that.startAnimate(this);
        };
        t = setTimeout(callThisFunction, 80);
    };

    var test = new Icon($(".btn_1"));
    var test1 = new Icon($(".btn-s_2"));
    var test2 = new Icon($(".btn_3"));
    var test3 = new Icon($(".btn_4"));

}(jQuery));