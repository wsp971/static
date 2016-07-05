define(["jquery", "common/views", 'common/datautil', "lobby/account/contract/service/docListService", "lobby/account/contract/service/signListService", "lobby/account/contract/service/signService", "jQueryPlugin/jquery.nicescroll.min", "bootstrap"],
function($, view, DataUtil, DocListService, SignListService, SignService) {
    return view.extend({
        init: function() {
            var contractCode = DataUtil.getUrlParam('id', window.location);
            this.signService;
            this.docListService = new DocListService($("#doc-container"));
            this.signListService = new SignListService();
            this.signService = new SignService($("#doc-container"));
            this.docListService.initDocs(this.signService.initSize);
            this.signListService.loadData();
           
        },

        events: {
            "click #firstPageBtn": "firstPageClick",
            "click #prevPageBtn": "prevPageClick",
            "click #nextPageBtn": "nextPageClick",
            "click #lastPageBtn": "lastPageClick",
            "click #signature img": "getSignature",
            "click #nav-tabs a": "switchTab",
            "click #submitBtn": "submitSign",
            "click #signHelp": "openSignHelp",
            "click .goAddSign": "goAddSigs"
        },
        handlers: {
            goAddSigs: function() {
                console.log(parent.tab);
                parent.tab.link("myaccount","acc-signatureManager","account/signature/signatureManager.html");
            },

            firstPageClick: function(e) {
                this.docListService.firstPage();
            },

            prevPageClick: function(e) {
                this.docListService.prevPage();
            },
            nextPageClick: function(e) {
                this.docListService.nextPage();
            },
            lastPageClick: function(e) {
                this.docListService.lastPage();
            },
            getSignature: function(e) {
                this.signService.getSignature(e);
            },
            switchTab: function() {
                $(this).show("tab");
            },
            submitSign: function() {
                this.signService.submitSign();
            },
            openSignHelp: function() {
                parent.layer.open({
                    type: 2,
                    title: false,
                    shade: false,
                    area: ['560px;', '120px'],
                    content: '../../../page/lobby/account/contract/contractSignHelp.html'
                });
            }
        }
    });
});