(function ($) {
  'use strict';

  var moduleSettings = window.drupalSettings.ljarestapi;

  // Tabs

  $('.certificate-buttons a').on('click', function() {

      if($(this).hasClass('active')) {
        $('.certificate-buttons a').removeClass('active');
        $('.certificate-verification-screen').addClass('hidden').removeClass('active');
        $('#certificate-verification-results').html('');
        return;
      }

      $('.certificate-buttons a').removeClass('active');
      $(this).addClass('active');

      $('.certificate-verification-screen').addClass('hidden').removeClass('active');
      $($(this).attr('data-screen-id')).addClass('acitve').removeClass('hidden');

      $('#certificate-verification-results').html('');

  });

  // Forms

  $('#certificate-verification-certificate-without-endorsement form').validate({
      ignore: ".ignore",
      rules: {
        certificateNumber: {
          required: true,
        },
        holderName: {
          required: true,
        },
        holderSurname: {
          required: true,
        },
        hiddenRecaptcha: {
          required: function () {
            if(!window.drupalSettings.ljarestapi.captcha_key) {
              return false;
            }
            if (grecaptcha.getResponse(0) == '') {
              return true;
            } else {
              return false;
            }
          }
        }
      },
      submitHandler: function(form, event) {

        event.preventDefault();

        $('#certificate-verification-results').removeClass('hidden').addClass('active');
        $('#certificate-verification-results').html('<img src="/themes/lja/img/loader.gif"/>');

        var values = {};
        $.each($('#certificate-verification-certificate-without-endorsement form').serializeArray(), function(i, field) {
          values[field.name] = field.value;
        });

        values.certificateNumber = values.certificateNumber.replace('/', '::');
        values.reCaptcha = grecaptcha.getResponse(0);

        $.ajax({
          url: '/certificates/certificate/' + values.certificateNumber + '/' + values.holderName + '/' + values.holderSurname + '?captcha=' + values.reCaptcha,
          beforeSend: function(request) {
            request.setRequestHeader('apitoken', '2f75a1f6fc5cc4ffa3c43b1199ee303c');
          }
        }).then(function(data) {

          grecaptcha.reset(0);

          if(!data.length || (data.length && !data[0].id)) {

            handleError();
            return;
          }

          try {

            data = data[0];

            if (data.endorsement_domain) {
              data.endorsement_domain = JSON.parse(data.endorsement_domain);
            }

            data.certificate_issued_at = parseDateToString(data.certificate_issued_at);
            data.endorsement_valid_till = parseDateToString(data.endorsement_valid_till);
            data.endorsement_issued_at = parseDateToString(data.endorsement_issued_at);

            var template = $('#certificate-verification-results-template');

            delete data.id;
            delete data.endorsement_number;
            delete data.holder_name_non_diacritic;
            delete data.holder_surname_non_diacritic;

            var html = template.render(data);

            $('#certificate-verification-results').html(html);

          } catch(exception) {

            handleError();

          }

        }, function(error) {

          handleError();
        });

        return false;

      }
  });

  $('#certificate-verification-certificate-with-endorsement form').validate({
    ignore: ".ignore",
    rules: {
      certificateNumber: {
        required: true,
      },
      endorsementNumber: {
        required: true,
      },
      holderName: {
        required: true,
      },
      holderSurname: {
        required: true,
      },
      hiddenRecaptcha: {
        required: function () {
          if(!window.drupalSettings.ljarestapi.captcha_key) {
            return false;
          }
          if (grecaptcha.getResponse(1) == '') {
            return true;
          } else {
            return false;
          }
        }
      }
    },
    submitHandler: function (form, event) {

      event.preventDefault();

      $('#certificate-verification-results').removeClass('hidden').addClass('active');
      $('#certificate-verification-results').html('<img src="/themes/lja/img/loader.gif"/>');

      var values = {};
      $.each($('#certificate-verification-certificate-with-endorsement form').serializeArray(), function (i, field) {
        values[field.name] = field.value;
      });

      values.certificateNumber = values.certificateNumber.replace('/', '::');
      values.endorsementNumber = values.endorsementNumber.replace('/', '::');
      values.reCaptcha = grecaptcha.getResponse(1);

      $.ajax({
        url: 'certificates/certificate/' + values.certificateNumber + '/' + values.endorsementNumber + '/' + values.holderName + '/' + values.holderSurname + '?captcha=' + values.reCaptcha,
        beforeSend: function (request) {
          request.setRequestHeader('apitoken', '2f75a1f6fc5cc4ffa3c43b1199ee303c');
        }
      }).then(function (data) {

        grecaptcha.reset(1);

        if (!data.length || (data.length && !data[0].id)) {

          handleError();
          return;
        }

        try {

          data = data[0];

          if (data.endorsement_domain) {
            data.endorsement_domain = JSON.parse(data.endorsement_domain);
          }

          data.certificate_issued_at = parseDateToString(data.certificate_issued_at);
          data.endorsement_valid_till = parseDateToString(data.endorsement_valid_till);
          data.endorsement_issued_at = parseDateToString(data.endorsement_issued_at);

          var template = $('#certificate-verification-results-template');

          delete data.id;
          delete data.holder_name_non_diacritic;
          delete data.holder_surname_non_diacritic;

          var html = template.render(data);

          $('#certificate-verification-results').html(html);

        } catch (exception) {

          handleError();

        }

      }, function (error) {

        handleError();
      });

    }
  });

  $('#certificate-verification-endorsement-only form').validate({
    ignore: ".ignore",
    rules: {
      endorsementNumber: {
        required: true,
      },
      holderName: {
        required: true,
      },
      holderSurname: {
        required: true,
      },
      hiddenRecaptcha: {
        required: function () {
          if(!window.drupalSettings.ljarestapi.captcha_key) {
            return false;
          }
          if (grecaptcha.getResponse(2) == '') {
            return true;
          } else {
            return false;
          }
        }
      }
    },
    submitHandler: function (form, event) {

      event.preventDefault();

      $('#certificate-verification-results').removeClass('hidden').addClass('active');
      $('#certificate-verification-results').html('<img src="/themes/lja/img/loader.gif"/>');

      var values = {};
      $.each($('#certificate-verification-endorsement-only form').serializeArray(), function (i, field) {
        values[field.name] = field.value;
      });

      values.endorsementNumber = values.endorsementNumber.replace('/', '::');
      values.reCaptcha = grecaptcha.getResponse(2);

      $.ajax({
        url: '/certificates/endorsement/' + values.endorsementNumber + '/' + values.holderName + '/' + values.holderSurname + '?captcha=' + values.reCaptcha,
        beforeSend: function (request) {
          request.setRequestHeader('apitoken', '2f75a1f6fc5cc4ffa3c43b1199ee303c');
        }
      }).then(function (data) {

        grecaptcha.reset(2);

        if (!data.length || (data.length && !data[0].id)) {

          handleError();
          return;
        }

        try {

          data = data[0];

          if (data.endorsement_domain) {
            data.endorsement_domain = JSON.parse(data.endorsement_domain);
          }

          data.certificate_issued_at = parseDateToString(data.certificate_issued_at);
          data.endorsement_valid_till = parseDateToString(data.endorsement_valid_till);
          data.endorsement_issued_at = parseDateToString(data.endorsement_issued_at);

          var template = $('#certificate-verification-results-template');

          delete data.certificate_number;
          delete data.id;
          delete data.holder_name_non_diacritic;
          delete data.holder_surname_non_diacritic;

          var html = template.render(data);

          $('#certificate-verification-results').html(html);

        } catch (exception) {

          handleError();

        }

      }, function (error) {

        handleError();
      });

    }
  });

  var parseDateToString = function(date) {
    if(!date) return '';
    var parts = date.split('T');
    var datePart = parts[0];
    var dateParts = datePart.split('-');
    date = new Date(dateParts[0], (dateParts[1]-1), dateParts[2]);
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
  };

  var handleError = function() {

    $('#certificate-verification-results').removeClass('hidden').addClass('active');
    $('#certificate-verification-results').html(moduleSettings.texts.error);

  };

})(jQuery);

var onReCaptchaLoad = function() {

  var siteKey = window.drupalSettings.ljarestapi.captcha_key;

  if(siteKey) {

    grecaptcha.render('certificate-only-captcha', {
      'sitekey': siteKey,
      'callback': function () {
        jQuery('#certificate-verification-certificate-without-endorsement').find('.hiddenRecaptcha').valid();
      }
    });
    grecaptcha.render('certificate-with-endorsement-captcha', {
      'sitekey': siteKey,
      'callback': function () {
        jQuery('#certificate-verification-certificate-with-endorsement').find('.hiddenRecaptcha').valid();
      }
    });
    grecaptcha.render('endorsement-only-captcha', {
      'sitekey': siteKey,
      'callback': function () {
        jQuery('#certificate-verification-endorsement-only').find('.hiddenRecaptcha').valid();
      }
    });

  }

};
