define([ "jquery", "common/views",
		"lobby/account/contract/service/docListService","jQueryPlugin/jquery.nicescroll.min" ], function($,
		view, DocListService) {
	return view.extend({
		init : function() {
			this.docListService = new DocListService($("#doc-container"));
			this.docListService.initDocs();
		},
		events : {
			"click #goSign" : "goSignContract",
			"click #firstPageBtn" : "firstPageClick",
			"click #prevPageBtn" : "prevPageClick",
			"click #nextPageBtn" : "nextPageClick",
			"click #lastPageBtn" : "lastPageClick"
		},
		handlers : {
			goSignContract : function() {
				this.docListService.goSign();
			},
			firstPageClick : function(e) {
				this.docListService.firstPage();
			},
			prevPageClick : function(e) {
				this.docListService.prevPage();
			},
			nextPageClick : function(e) {
				this.docListService.nextPage();
			},
			lastPageClick : function(e) {
				this.docListService.lastPage();
			}

		}
	});
});
