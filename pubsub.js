"use strict";
function PubSub() {
    if (!(this instanceof PubSub)) {
        return new PubSub();
    }
    this.handlers = {};
}
PubSub.prototype = {
    constructor: PubSub,
    sub: function (topic, handler) {
        if (!(topic in this.handlers)) {
            this.handlers[topic] = [];
        }
        this.handlers[topic].push(handler);
    },
    pub: function (topic, data) {
        var list = this.handlers[topic];
        for (var i = 0, l = list.length; i < l; i++) {
            list[i](data);
        }
    },
    unsub: function (topic, handler) {
        if (handler) {
            var list = this.handlers[topic];
            list.splice(list.indexOf(handler), 1);
        }
        else {
            delete this.handlers[topic];
        }
    }
};
var ps = new PubSub();