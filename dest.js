/// <reference path="vector.js" />
/// <reference path="clock.js" />
"use strict";
var dest = {
    type: "circle",
    color: "rgb(207,112,87)",
    z: 11,
    r: x / 4,
    sCurr: new Vector(),
    updateable: false,
    renderable: true,
    init: function () {
        this.sCurr.set(this.r + 2, this.r + 2);
    }
};
dest.init();
clock.add(dest);