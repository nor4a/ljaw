(function ($) {
  'use strict';
  Drupal.behaviors.ljaw = {
    attach: function (context, settings) {
      $('#node-contact-edit-form, #node-contact-form').each(function(){
        $('#edit-title-0-value').prop('readonly',true).css('background-color','#ddd');
        $('#edit-field-post-0-value').change(setContactsTitle);
        $('#edit-field-department').change(setContactsTitle);
      });
    }
  };
})(jQuery);

function setContactsTitle() {
  jQuery('#edit-title-0-value').val(jQuery('#edit-field-post-0-value').val() + ' - ' + jQuery('#edit-field-department option:selected').text());
}