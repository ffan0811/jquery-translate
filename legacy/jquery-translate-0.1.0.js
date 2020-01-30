(function($) {
	$.translate = {
		initialize : function() {
			var opts = this.defaults;
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