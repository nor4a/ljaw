'use strict';

(function ($, Drupal, drupalSettings, CKEDITOR) {

	CKEDITOR.plugins.add('topButton', {
		icons: 'topbutton',
		init: function (editor) {
			editor.addCommand('topButtonCommand', new CKEDITOR.dialogCommand('topButtonDialog'));
			editor.ui.addButton('topButton', {
				label: 'Insert "go to top" button',
				command: 'topButtonCommand'
			});

			if ( editor.addMenuItems ) {
				editor.addMenuItems({
					anchor: {
						label: 'Insert "go to top" button',
						command: 'topButtonCommand',
						group: 'anchor',
						order: 1
					}
				});
			}
		}
	});

})(jQuery, Drupal, drupalSettings, CKEDITOR);