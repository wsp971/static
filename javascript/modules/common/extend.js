define(function() {
	String.prototype.format = function () {
	    var args = arguments;
	    return this.replace(/\{(\d+)\}/g,
	        function (m, i) {
	            return args[i];
	        });
	}

	String.prototype.trim = function () {
	    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}

	String.prototype.formatDate = function (format) {
	    if (validator.isDate(this) || validator.isDateTime(this)) {
	        var date = new Date(this.toString().replace(/\-+/g, '/'));
	        return date.format(format);
	    } else {
	        try {
	            var date = new Date(this);
	            return date.format(format);
	        } catch (e) {
	            return "-";
	        }
	    }
	}
 
	Number.prototype.formatDate = function (format) {
	    try {
	        var date = new Date(+this.toString());
	        return date.format(format);
	    } catch (e) {
	        return "-";
	    };
	}

	String.prototype.formatMoney = function (n) {
		var _n = n;
	    n = n > 0 && n <= 20 ? n : 2;
	    var s = parseFloat((this + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
	    var l = s.split('.')[0].split('').reverse(), r = s.split('.')[1];
	    t = '';
	    for (var i = 0; i < l.length; i++) {
	        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
	    }
	    return _n==0 ? t.split('').reverse().join('') : t.split('').reverse().join('') + '.' + r;
	};

	Date.prototype.diff = function (date) {
	    return parseInt((Math.abs(this.getTime() - date.getTime()))/(24 * 60 * 60 * 1000));
	}

	Date.prototype.format = function (format) {
	    var o = {
	        "M+": this.getMonth() + 1, // month
	        "d+": this.getDate(), // day
	        "h+": this.getHours(), // hour
	        "m+": this.getMinutes(), // minute
	        "s+": this.getSeconds(), // second
	        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
	        "S": this.getMilliseconds() // millisecond
	    }
	    if (/(y+)/.test(format)) {
	        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    }
	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(format)) {
	            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	        }
	    }
	    return format;
	}
})