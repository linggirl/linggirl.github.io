/// <reference path="bomb.js" />
"use strict";
var manager = {
    mint: 500,
    maxt: 1000,
    //list: [],
    id: null,
    init: function () {
        this.loop = this.loop.bind(this);
        var that = this;
        ps.sub("bomb", function () {
            setTimeout(function () {
                var bomb = new Bomb();
                clock.add(bomb);
                bomb.on();
            }, Math.random() * 1000 + that.mint);
        });
        ps.sub("dead", function (data) {
            alert(score.text);
            location.reload();
        });
    },
    loop: function () {
        var target = new Target();
        clock.add(target);
        target.on();
        this.id = setTimeout(this.loop, Math.random() * (this.maxt - this.mint) + this.mint);
    },
    start: function () {
        this.id = setTimeout(this.loop, this.mint);
    }
};
manager.init();