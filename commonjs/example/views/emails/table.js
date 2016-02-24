var WindowManager = require('helper/WindowManager');
var Utils = require('helper/Utils');
var Cloud = require('ti.cloud');
exports['Emails'] = function(evt) {
	var win = WindowManager.createWindow({
		backgroundColor: 'white'
	});
	var content = Ti.UI.createScrollView({
		top: 0,
		contentHeight: 'auto',
		layout: 'vertical'
	});
	win.add(content);

	var template = Ti.UI.createTextField({
		hintText: 'Template Name',
		top: 10 + Utils.u,
		left: 10 + Utils.u,
		right: 10 + Utils.u,
		height: 40 + Utils.u,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
		autocorrect: false,
		color: 'black',
		hintTextColor: 'gray'
	});
	content.add(template);

	var recipients = Ti.UI.createTextField({
		hintText: 'Recipients (csv)',
		top: 10 + Utils.u,
		left: 10 + Utils.u,
		right: 10 + Utils.u,
		height: 40 + Utils.u,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
		autocorrect: false,
		color: 'black',
		hintTextColor: 'gray'
	});
	content.add(recipients);

	var button = Ti.UI.createButton({
		title: 'Send Email',
		top: 10 + Utils.u,
		left: 10 + Utils.u,
		right: 10 + Utils.u,
		bottom: 10 + Utils.u,
		height: 40 + Utils.u
	});
	content.add(button);

	var fields = [template, recipients];

	function submitForm() {
		for (var i = 0; i < fields.length; i++) {
			if (!fields[i].value.length) {
				fields[i].focus();
				return;
			}
			fields[i].blur();
		}
		button.hide();

		Cloud.Emails.send({
			template: template.value,
			recipients: recipients.value
		}, function(e) {
			if (e.success) {
				alert('Sent!');
			} else {
				Utils.error(e);
			}
			button.show();
		});
	}

	button.addEventListener('click', submitForm);
	for (var i = 0; i < fields.length; i++) {
		fields[i].addEventListener('return', submitForm);
	}

	win.addEventListener('open', function() {
		template.focus();
	});
	return win;
};