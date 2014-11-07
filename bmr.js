/// <reference path="player.js" />
/// <reference path="pubsub.js" />
var bmr = {
    type: "circle",
    color: "#3cb4bb",
    z: 9,
    r: player.r,
    aNorm: 0,
    vNorm: 25 * x,
    a: new Vector(),
    dv: new Vector(),
    v: new Vector(),
    sPrev: new Vector(),
    sCurr: new Vector(),
    min: new Vector(0, a + b / 2),
    max: new Vector(w, h),
    hmin: new Vector(w, a + b / 2),
    hmax: new Vector(0, h),
    updateable: false,
    renderable: false,
    farthest: false,
    cross: false,
    init: function () {
        this.aNorm = -this.vNorm;
    },
    on: function (e) {
        if (!this.updateable) {
            this.sCurr.copy(player.sCurr);
            this.sPrev.copy(this.sCurr).y += 0.01;
            this.v.subVectors(e, this.sCurr).setLength(this.vNorm);
            this.a.copy(this.v).setLength(this.aNorm);
            this.dv.copy(this.a).multiplyScalar(t);
            this.updateable = true;
            this.renderable = true;
        }
    },
    update: function () {
        if (this.farthest) {
            if (this.sCurr.y > a) {
                if (this.cross) {
                    var v = new Vector().subVectors(player.sCurr, this.sCurr).setLength(this.vNorm / 2);
                    this.v.add(v).multiplyScalar(0.5);
                    var ds = this.v.clone().multiplyScalar(t);
                    if (this.sCurr.distanceTo(player.sCurr) < ds.length()) {
                        this.updateable = false;
                    }
                    else {
                        this.sCurr.add(ds);
                    }
                }
                else if (this.sCurr.x + this.r < 0 || this.sCurr.x - this.r > w || this.sCurr.y - this.r > h) {
                    this.updateable = false;
                    ps.pub("bomb");
                }
                else {
                    if (this.sCurr.distanceTo(player.sCurr) < this.r + player.r) {
                        this.cross = true;
                    }
                    else {
                        this.steps();
                    }
                }
            }
            else {
                this.steps();
            }
        }
        else {
            if (this.sPrev.y <= this.sCurr.y) {
                this.random();
            }
            else {
                this.sPrev.copy(this.sCurr);
                this.steps();
            }
        }
        if (!this.updateable) {
            this.farthest = false;
            this.cross = false;
            this.renderable = false;
        }
    },
    steps: function () {
        this.v.add(this.dv);
        this.sCurr.add(this.v.clone().multiplyScalar(t));
    },
    random: function () {
        if (this.sCurr.x < 0) {
            this.a.random(this.hmin, this.max);
        }
        else if (this.sCurr.x > w) {
            this.a.random(this.min, this.hmax);
        }
        else {
            this.a.random(this.min, this.max)
        }
        this.a.sub(this.sCurr).setLength(-this.aNorm);
        this.dv.copy(this.a).multiplyScalar(t);
        this.v.set(0, 0);
        this.farthest = true;
    }
};
bmr.init();
clock.add(bmr);