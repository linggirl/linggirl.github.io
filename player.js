/// <reference path="vector.js" />
/// <reference path="clock.js" />
"use strict";
var player = {
    type: "circle",
    color: "rgb(117,117,117)",
    z: 10,
    r: x / 2,
    vNorm: w,
    v: new Vector(),
    ds: new Vector(),
    sCurr: new Vector(w / 2, a + b / 2),
    sLast: new Vector(),
    min: new Vector(),
    max: new Vector(),
    updateable: false,
    renderable: true,
    init: function () {
        this.sLast.copy(this.sCurr);
        this.min.set(this.r, a + this.r);
        this.max.set(w - this.r, h - this.r);
    },
    on: function (e) {
        //e = new Vector();
        e.clamp(this.min, this.max);
        if (!e.equals(this.sCurr)) {
            this.sLast.copy(e);
            this.v.subVectors(this.sLast, this.sCurr).setLength(this.vNorm);
            this.ds.copy(this.v).multiplyScalar(t);
            this.updateable = true;
        }
    },
    update: function () {
        if (this.sCurr.distanceTo(this.sLast) < this.ds.length()) {
            this.sCurr.copy(this.sLast);
            this.updateable = false;
        }
        else {
            this.sCurr.add(this.ds);
        }
    }
};
player.init();
clock.add(player);