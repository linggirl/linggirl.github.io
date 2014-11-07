/// <reference path="vector.js" />
/// <reference path="clock.js" />
/// <reference path="dest.js" />
"use strict";
var score = {
    type: "self",
    z: 12,
    text: 0,
    x: dest.sCurr.x * 5,
    y: dest.sCurr.y + 1,
    updateable: false,
    renderable: true,
    init: function () {
        //ctx = document.createElement("canvas").getContext("2d");
        ctx.font = "bold " + dest.r * 2.5 + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
    },
    get: function () {
        var text = this.text / 1000;
        text = text.toFixed(3).slice(2);
        return text;
    },
    render: function () {
        //ctx = document.createElement("canvas").getContext("2d");
        ctx.fillStyle = dest.color;
        ctx.fillText(this.get(), this.x, this.y);
    }
};
clock.add(score);