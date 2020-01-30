(function($) {
	$.translate = {
		initialize : function(opts) {
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

				var $containers = $('[data-translate]');

				$.each($containers, function(idx, el){
					$(el).html(langdata[$(el).attr('data-translate')]);
				});

				$('body').find('*').each(function(){
					var el = this;
					$.each(this.attributes, function(idx, attr){
						if(attr.name.indexOf('data-translate-') != -1) {
							var elAttr = attr.name.replace('data-translate-', '');
							$(el).attr(elAttr, langdata[attr.value]);
						}
					});
				});
			});
		},
		changeLanguage : function(lang) {
			this.defaults.language = lang;
			this.initialize();
		},
		defaults : {
			'filepath' : '/language/',
			'language' : 'english',
			'type' : 'language'
		}
	};
})(jQuery);