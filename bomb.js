/// <reference path="pubsub.js" />
/// <reference path="target.js" />
"use strict";
function Bomb() {
    Target.call(this);
    this.color = "rgb(31,31,31)";
    this.z = 9.1;
}
Bomb.prototype = Object.create(Target.prototype);
Bomb.prototype.constructor = Bomb;
Bomb.prototype.update = function () {
    if (bmr.updateable && this.sCurr.distanceTo(bmr.sCurr) < this.r + bmr.r) {
        ps.pub("dead",this);
        this.updateable = false;
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
};