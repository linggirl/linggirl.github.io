/// <reference path="dest.js" />
/// <reference path="bmr.js" />
/// <reference path="score.js" />
"use strict";
function Target() {
    this.type = "circle";
    this.color = "rgb(235,212,120)";
    this.z = 8;
    this.r = dest.r;
    this.aNorm = w/2;
    this.vNorm = w / 2;
    this.a=new Vector();
    this.v = new Vector();
    this.ds = new Vector();
    this.sCurr = new Vector();
    this.sLast = new Vector();
    this.miny = this.r * 3;
    this.maxy = a - this.r;
    this.updateable = false;
    this.renderable = false;
    this.collideBmr = false;
    this.collideDest = false;
    this.dead = false;
}
Target.prototype = {
    constructor: Target,
    on: function () {
        this.sCurr.y = Math.random() * (this.maxy - this.miny) + this.miny;
        this.sLast.y = Math.random() * (this.maxy - this.miny) + this.miny;
        if (Math.random() > 0.5) {
            this.sCurr.x = -this.r;
            this.sLast.x = w + this.r;
        }
        else {
            this.sLast.x = -this.r;
            this.sCurr.x = w + this.r;
        }
        this.v.subVectors(this.sLast, this.sCurr).setLength(this.vNorm);
        this.ds.copy(this.v).multiplyScalar(t);
        this.updateable = true;
        this.renderable = true;
        this.collideBmr = false;
        this.collideDest = false;
    },
    update: function () {
        if (this.collideDest) {
            this.updateable = false;
            score.text += 1;
        }
        else if (this.collideBmr) {
            if (this.sCurr.distanceTo(dest.sCurr) < this.ds.length()) {
                this.collideDest = true;
            }
            else {
                this.v.add(this.a.clone().multiplyScalar(t));
                this.ds.copy(this.v).multiplyScalar(t);
                this.sCurr.add(this.ds);
            }
        }
        else if (bmr.updateable && this.sCurr.distanceTo(bmr.sCurr) < this.r + bmr.r) {
            this.collideBmr = true;
            this.v.subVectors(dest.sCurr, this.sCurr).setLength(this.vNorm);
            this.a.copy(this.v).setLength(this.aNorm);
        }
        else {
            if (this.sLast.x > w) {
                if (this.sCurr.x >= this.sLast.x) {
                    this.updateable = false;
                }
            }
            else {
                if (this.sCurr.x <= this.sLast.x) {
                    this.updateable = false;
                }
            }
            if (this.updateable) {
                this.sCurr.add(this.ds);
            }
        }
        if (!this.updateable) {
            this.dead = true;
        }
    }
};