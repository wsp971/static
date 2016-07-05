define([ "jquery","common/datautil", "common/views", "../service/signatureListService" ],
		function($,DataUtil, view, SigListService) {
			var _parent=parent;
			// var host= C.Api.prefix + '/work/user/';
			return view.extend({
				init : function() {
					this.sigListService = new SigListService(this,DataUtil);
				},

				events : {
					/**
					 * click delete in the signature item then show layer
					 */
					'click .my-sig-img a' : 'showDelLayer',
					/**
					 * add or upload the signature name or stamp
					 */
					'click #my-sig-name-list .add-sig-a' : 'addSig',
					'click #my-sig-stamp-list .add-sig-a' : 'addSig',
					'mouseover .my-sig-item' : 'showDel',
					'mouseout .my-sig-item' : 'hideDel',
					"click #testlayer1":"testlayer1"
				},

				handlers : {
					testlayer1:function(){
						console.log("testlayer1")
					},
					showDel : function(e) {
						var em = "#"
								+ $(e.currentTarget || e.target).attr("id")
								+ " a";
						$(em).removeClass("hideSelf").addClass("clsb");
					},
					hideDel : function(e) {
						var em = "#"
								+ $(e.currentTarget || e.target).attr("id")
								+ " a";
						$(em).removeClass("clsb").addClass("hideSelf");
					},

					showDelLayer : function(e) {
						this.sigListService.showLayerDel($(e.currentTarget
								|| e.target));
					},
					addSig : function(e) {
						var type = $(e.currentTarget || e.target).attr('type');
						this.sigListService.addSig(type);
					}
				}

			});

		});