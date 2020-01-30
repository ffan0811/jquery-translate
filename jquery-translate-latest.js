(function($) {
	$.translate = {
		initialize : function(opts) {
			var me = this;

			var opts = $.extend({}, this.defaults, opts || {});
			var $langfiles = $('script[type="'+opts.type+'"]');
			var promises = [];

			$.each($langfiles, function(idx, lang){
				var src = $(lang).attr('src');
				src = (src.charAt(0) == '/') ? src.slice(1) : src;
				var path = opts.filepath + opts.language + '/' + src;
				promises.push($.getJSON(path));
			});

			Promise.all(promises).then(function(values) {
				var langdata = {};
				$.each(values, function(idx, val){
					$.extend(langdata, val);
				});

				me.defaults.langdata = langdata;

				var $containers = $('[data-translate]');

				$.each($containers, function(idx, el){
					var attrVal = $(el).attr('data-translate').replace(/\s/gi, "");
					var langArgs = attrVal.match(/\[.*\]/gi);
					var langKey = attrVal.replace(langArgs, "");

					if(langArgs) {
						langArgs += "";
						langArgs = langArgs.split('[').join('');
						langArgs = langArgs.split(']').join('');
						langArgs = langArgs.split(',');
					}
					else {
						langArgs = [];
					}

					var translateMsg = langdata.hasOwnProperty(langKey) ? langdata[langKey] : langKey;

					for(var i=0; i<langArgs.length; i++) {
						var replaceMsg = langdata.hasOwnProperty(langArgs[i]) ? langdata[langArgs[i]] : langArgs[i];
						translateMsg = translateMsg.replace('{'+i+'}', replaceMsg);
					}

					$(el).html(translateMsg);
				});

				$('body').find('*').each(function(){
					var el = this;
					$.each(this.attributes, function(idx, attr){
						if(attr.name.indexOf('data-translate-') != -1) {
							var elAttr = attr.name.replace('data-translate-', '');

							var attrVal = attr.value.replace(/\s/gi, "");
							var langArgs = attrVal.match(/\[.*\]/gi);
							var langKey = attrVal.replace(langArgs, "");

							if(langArgs) {
								langArgs += "";
								langArgs = langArgs.split('[').join('');
								langArgs = langArgs.split(']').join('');
								langArgs = langArgs.split(',');
							}
							else {
								langArgs = [];
							}

							var translateMsg = langdata.hasOwnProperty(langKey) ? langdata[langKey] : langKey;

							for(var i=0; i<langArgs.length; i++) {
								var replaceMsg = langdata.hasOwnProperty(langArgs[i]) ? langdata[langArgs[i]] : langArgs[i];
								translateMsg = translateMsg.replace('{'+i+'}', replaceMsg);
							}

							$(el).attr(elAttr, translateMsg);
						}
					});
				});
			});
		},
		changeLanguage : function(lang) {
			this.defaults.language = lang;
			this.initialize();
		},
		getLanguage : function(key) {
			return this.defaults.langdata.hasOwnProperty(key) ? this.defaults.langdata[key] : '';
		},
		defaults : {
			'filepath' : '/language/',
			'language' : 'english',
			'type' : 'language',
			'langdata' : {}
		}
	};
})(jQuery);