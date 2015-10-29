function showModalDialog(url, args, options) {
    options = options || {};
    return new Promise(function (fullfil, fail) {
		var cover = $('<div>')
			.addClass('cover')
			.appendTo(document.body);
		var close = function () {
				iframe.remove();
				content.remove();
				cover.remove();
			};
		var content = $('<div>')
			.addClass('dialog')
			.css({
				width: options.width || '50%',
				height: options.height || '50%',
				left: options.left || '25%',
				top: options.top || '25%',
				display: 'none'
			})
			.appendTo(document.body);
		var iframe = $('<iframe>').appendTo(content).attr("src", url)
			.on("load", function () {
				content.css({ display: 'block' });
			});
		showModalDialog.dialogArguments = args;
		showModalDialog.returnValue = function (v) {
			close();
			fullfil(v);
		};
		showModalDialog.cancel = function () {
			close();
			fail();
		};
    });
}
