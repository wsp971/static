define([ "jquery","common/datautil", "../../../../common/views",
		"../service/addSignatureService", 'load-image', 'jquery.ui.widget',
		'canvas-to-blob', 'jquery_iframe_transport', 'jquery.fileupload',
		'jquery.fileupload-process', 'load-image-meta', 'load-image-exif',
		'jquery.fileupload-image', 'jquery.fileupload-validate'

], function($,DataUtil, view, AddSigService) {

	// var host= C.Api.prefix + '/work/user/';

	return view.extend({

		init : function() {
			var self = this;
			this.addSigService = new AddSigService(self);
		},

		events : {
			/*
			 * 'change #imgOne': 'preScan', 'click #submitInput': 'submitForm',
			 */
			'click #cancelInput' : 'cancelSubmitForm',
			'click #triggerInput' : 'triggerSelectFile'

		},

		handlers : {

			triggerSelectFile : function() {
				$("#imgOne").click();
			},

			preScan : function(e) {
				this.addSigService.preScan(e);
			},
			submitForm : function() {
				this.addSigService.submitForm();

			},
			cancelSubmitForm : function() {
				this.addSigService.hideUploadLayer();

			}

		}

	});

});