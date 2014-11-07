/// <reference path="var.js" />
"use strict";
var clock = {
    t: t * 1000,
    list: [],
    updateID: null,
    renderID: null,
    init: function () {
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
    },
    compare: function (a, b) {
        return a.z - b.z;
    },
    add: function (item) {
        this.list.push(item);
        this.list.sort(this.compare);
    },
    remove: function (item) {
        this.list.splice(this.list.indexOf(item), 1);
    },
    update: function () {
        var deadList = [];
        var item;
        for (var i = 0, l = this.list.length; i < l; i++) {
            item = this.list[i];
            if (item.updateable) {
                item.update();
                if (item.dead) {
                    deadList.push(item);
                }
            }
        }
        for (var i = 0, l = deadList.length; i < l; i++) {
            this.remove(deadList[i]);
        }
        this.updateID = setTimeout(this.update, this.t);
    },
    render: function () {
        for (var i = 0, l = this.list.length; i < l; i++) {
            if (this.list[i].renderable) {
                switch (this.list[i].type) {
                    case "circle":
                        this.drawCircle(this.list[i]);
                        break;
                    case "rect":
                        this.drawRect(this.list[i]);
                        break;
                    case "self":
                        this.list[i].render();
                        break;
                    default:
                        break;
                }
            }
        }
        this.renderID = requestAnimationFrame(this.render);
    },
    start: function () {
        this.updateID = setTimeout(this.update, this.t);
        this.renderID = requestAnimationFrame(this.render);
    },
    drawCircle: function (item) {
        //ctx = document.createElement("canvas").getContext("2d");
        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.arc(item.sCurr.x, item.sCurr.y, item.r, 0, Math.PI * 2);
        ctx.fill();
    },
    drawRect: function (item) {
        //ctx = document.createElement("canvas").getContext("2d");
        ctx.fillStyle = item.color;
        ctx.fillRect(item.x, item.y, item.w, item.h);
    }
};
clock.init();