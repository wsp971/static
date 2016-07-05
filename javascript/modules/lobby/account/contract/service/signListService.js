define(function() {
	// SignListService = sign list service. provide the methods to init
	// signature list
	function SignListService() {
		// signature image
		this.imgWidth = null;
		this.imgHeight = null;

		// signature panel instance
		this.signListPanel = $("#signPanel");
		this.signArray = new Array;

		// signet image
		this.signetWidth = null;
		this.signetHeight = null;

		// signet panel instance
		this.signetListPanel = $("#signetPanel");
		this.signetArray = new Array;
		
		// date panel instance
		this.datePanel = $("#datePanel");
	}

	function genId() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	function LoadData() {
		var service = this, t = !1,
		reqData = {
			"userCode" : parent.cookies.get("username")
		};
		parent.$.loadAjax({
			url : "/contract/signature/list",
			type : "POST",
			data : JSON.stringify(reqData),
			contentType : "application/json",
			async: true,
			isLoading: true,
			targets: [$("#signPanel"),$("#signetPanel"),$("#datePanel")],
			success : function(res) {
				$("#signatureHint").removeClass("hidden");
				$("#signetHint").removeClass("hidden");
				if (res.rtnCode == "000") {
					$.each(res.data, function(i, e) {
						if (e.category == 0) {
							service.signArray.push({
								id : e.signatureCode,
								url : "data:image/png;base64," + e.imageStream,
								signCate: 0
							});
						} else if (e.category == 1) {
							service.signetArray.push({
								id : e.signatureCode,
								url : "data:image/png;base64," + e.imageStream,
								signCate: 1
							});
						} else if (e.category == 2) {
							//先这么写吧没时间了快上车！
							var dateSign = '<div class="signature" id="signature">'
							+ '<em class="clsb"/><img data-signids="' + e.signatureCode
							+ '"src="' + "data:image/png;base64," + e.imageStream + '" width="' + e
							+ '" height="' + t
							+ '" style="padding: 5px; cursor: move"/></div>';
							service.datePanel.append($(dateSign));
						}
					});
					service.initSignList();
					service.initSignetList();
				} else {
					console.log("else: ");
					console.log(res);
				}
			},
			error : function(err) {
				console.log(err);
			}
		});
	}

	function InitSignList() {
		var service = this, t = !1;

		if (this.signArray.length > 0) {
			var r = new Image;
			r.src = this.signArray[0].url, r.onload = function() {
				if (t)
					return !1;
				service.buildSignList(r.width, r.height)
			};
			if (r.complete) {
				if (t)
					return !1;
				service.buildSignList(r.width, r.height)
			}
		}
	}

	function BuildSignList(e, t) {
		var r = new Array;
		var self = this;
		$(this.signArray).each(
				function(i) {
					r.push('<div class="signature" id="signature">'
							+ '<em class="clsb"/><img data-signids="' + this.id
							+ '" data-signCate="' + this.signCate
							+ '" src="' + this.url + '" width="' + e
							+ '" height="' + t
							+ '" style="padding: 5px; cursor: move"/></div>');
				});
		r.push("</br>");
		r = r.join("");
		if (this.signArray.length > 0) {
			this.signListPanel.empty();
			this.signListPanel.append($(r));
		}
		setTimeout(function() {
			self.signListPanel.niceScroll({
				cursorcolor : "#615D5F",
				cursoropacitymax : 1,
				touchbehavior : !1,
				cursorwidth : "3px",
				cursorborder : "0",
				cursorborderradius : "2px"
			})
		}, 500)
	}

	function InitSignetList() {
		var service = this, t = !1;

		if (this.signetArray.length > 0) {
			var r = new Image;
			r.src = this.signetArray[0].url, r.onload = function() {
				if (t)
					return !1;
				service.buildSignetList(r.width, r.height)
			};
			if (r.complete) {
				if (t)
					return !1;
				service.buildSignetList(r.width, r.height)
			}
		}
	}

	function BuildSignetList(e, t) {
		var result = new Array;
		var self = this;
		$(this.signetArray).each(
				function(i) {
					result.push('<div class="signature" id="signature">'
							+ '<em class="clsb"/><img data-signids="' + this.id
							+ '" data-signCate="' + this.signCate
							+ '"src="' + this.url + '" width="' + e
							+ '" height="' + t
							+ '" style="padding: 5px; cursor: move"/></div>');
				});
		result.push("</br>");
		result = result.join("");
		if (this.signetArray.length > 0) {
			this.signetListPanel.empty();
			this.signetListPanel.append($(result));
		}
		setTimeout(function() {
			self.signetListPanel.niceScroll({
				cursorcolor : "#615D5F",
				cursoropacitymax : 1,
				touchbehavior : !1,
				cursorwidth : "3px",
				cursorborder : "0",
				cursorborderradius : "2px"
			})
		}, 500)
	}

	// signature related
	SignListService.prototype.loadData = LoadData;
	SignListService.prototype.initSignList = InitSignList;
	SignListService.prototype.buildSignList = BuildSignList;
	SignListService.prototype.initSignetList = InitSignetList;
	SignListService.prototype.buildSignetList = BuildSignetList;

	return SignListService;
})
