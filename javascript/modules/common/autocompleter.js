define(['bootstrap-suggest.min'], function () {
    var firstData, layer = layer ? layer : (parent.layer ? parent.layer : parent.parent.layer);
    $.fn.ficSuggest = function (options) {
        var $target = $(this);
        var defaults = {
            placeholder: '请输入机构名称关键字',
            isShowButton: true,
            method: 'post',
            url: '/product/queryInstByNameLike?instName='
        };

        var settings = _.extend({}, defaults, options);

        var auto = new autoCompleter($target, settings);
        auto.init();
    };
    var autoCompleter = function ($target, settings) {
        function init() {
            $target.attr('placeholder', settings.placeholder);
            var suggest = $target.bsSuggest({
                url: window.rootPath + settings.url,
                showBtn: false,
                idField: 'Id',
                keyField: 'Keyword',
                processData: processData,
                allowNoKeyword: false,
                getDataMethod: "url",
                //effectiveFieldsAlias: {Id: "机构ID", Keyword: "机构名称"},
                effectiveFields: ['Keyword'],
                listStyle: {
                    'padding-top': 0,
                    'overflow': 'auto',
                    'width': '80px',
                    'height': '105px',
                    'transition': '0.5s',
                    '-webkit-transition': '0.5s',
                    '-moz-transition': '0.5s',
                    '-o-transition': '0.5s'
                }
            }).on('onSetSelectValue', function (e, keyword) {
                var id = keyword.id, value = keyword.key;
                (event.button == '0') ? addTag(id, value) : (firstData = keyword);
            }).on('onDataRequestSuccess', function (e, result) {
            	firstData = null;
            	if((result.rtnCode == '000') && result.data && (result.data.length > 0)){
            		firstData = {id: result.data[0].instId, key: result.data[0].instName};
            	}
           	}).on('keyup', function(e){
            	(e.keyCode == '13') && firstData && (addTag(firstData.id, firstData.key), firstData = null);
            });
//            .on('onUnsetSelectValue', function (e) {
//                console.log('onUnsetSelectValue')
//            }).on('onDataRequestSuccess', function (e, result) {
//                console.log('onDataRequestSuccess: ', result)
//            });
        }

        function processData(json) {
            var i, len, data = {value: []};
            if (!json || !json.data || json.data.length == 0) {
                return false
            }
            len = json.data.length;
            for (i = 0; i < len; i++) {
                data.value.push({"Id": json.data[i].instId, "Keyword": json.data[i].instName})
            }
            return data
        }

        function addTag(id, value) {
            var item = $('.mzlable[data-id=' + id + ']');
            if (item.length === 0) {
                var label = "<a href='javascript:;' data-id='{0}' data-value='{1}' class='mzlable data-common'><label class='label'>{2}<span><i class='iconfont close f12'>&#xe60c;</i></span></label></a>".format(id, value, value);
                $(label).appendTo('#selectedTags');
                $('a.mzlable').off();
                $('a.mzlable').on('click', '.close', function () {
                    $(this).parents('a.mzlable').remove();
                });
            } else {
                layer.alert('[{0}]已添加'.format(value));
            }
            $target.attr('data-value', '');
            $target.val('');
        }

        if (settings.isShowButton) {
            $('#addTag').on('click', function () {
            	firstData ? (addTag(firstData.id, firstData.key), firstData = null) : layer.alert('该机构不存在');
            });
        } else {
            $('#addTag').hide();
        }
        return {init: init};
    }
});




