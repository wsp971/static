define(function() {
    function Map() {
        this.keys = new Array,
        this.data = new Object,
        this.put = function(e, t) {
            this.data[e] == null && this.keys.push(e),
            this.data[e] = t
        },
        this.get = function(e) {
            return this.data[e]
        },
        this.remove = function(e) {
            this.keys.splice(this.keys.indexOf(e), 1),
            delete this.data[e];
        },
        this.removeAll = function() {
            this.keys = null,
            this.keys = new Array,
            this.keys.length = 0,
            this.data = null,
            this.data = new Object
        },
        this.entrys = function() {
            var e = this.keys.length,
            t = new Array(e);
            for (var n = 0; n < e; n++) t[n] = {
                key: this.keys[n],
                value: this.data[n]
            };
            return t
        },
        this.each = function(e) {
            if (typeof e != "function") return;
            var t = this.keys.length;
            for (var n = 0; n < t; n++) {
                var r = this.keys[n];
                e(r, this.data[r], n)
            }
        },
        this.isEmpty = function() {
            return this.keys.length === 0
        },
        this.size = function() {
            return this.keys.length
        },
        this.toString = function() {
            var e = "{";
            for (var t = 0; t < this.keys.length; t++, e += ",") {
                var n = this.keys[t];
                e += n + "=" + this.data[n]
            }
            return e += "}",
            e
        }
    }
    return Map;
})