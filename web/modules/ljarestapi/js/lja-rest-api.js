(function ($) {
  'use strict';

  // Tabs

  $('.certificate-buttons a').on('click', function() {

      $('.certificate-buttons a').removeClass('active');
      $(this).addClass('active');

      $('.certificate-verification-screen').addClass('hidden').removeClass('active');
      $($(this).attr('data-screen-id')).addClass('acitve').removeClass('hidden');

      $('#certificate-verification-results').html('');

  });

  // Forms

  $('#certificate-verification-certificate-without-endorsement form').on('submit', function(event) {

    event.preventDefault();

    $('#certificate-verification-results').removeClass('hidden').addClass('active');
    $('#certificate-verification-results').html('<img src="/themes/lja/img/loader.gif"/>');

    var values = {};
    $.each($(this).serializeArray(), function(i, field) {
      values[field.name] = field.value;
    });

    values.certificateNumber = values.certificateNumber.replace('/', '::');

    $.ajax({
        url: 'https://dmz-api-01.lja.lv:5443/app_dev.php/api/certificates/' + values.holderName + '/names/' + values.holderSurname + '/surnames/' + values.certificateNumber + '/certificate.json',
        beforeSend: function(request) {
          request.setRequestHeader('apitoken', '2f75a1f6fc5cc4ffa3c43b1199ee303c');
        }
    }).then(function(data) {

      if(!data.length) {
        handleError();
        return;
      }

      data = data[0];

      data.endorsement_domain = JSON.parse(data.endorsement_domain);
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

    }, function(error) {

       handleError();
    });

  });

  $('#certificate-verification-certificate-with-endorsement form').on('submit', function(event) {

    event.preventDefault();

    $('#certificate-verification-results').removeClass('hidden').addClass('active');
    $('#certificate-verification-results').html('<img src="/themes/lja/img/loader.gif"/>');

    var values = {};
    $.each($(this).serializeArray(), function(i, field) {
      values[field.name] = field.value;
    });

    values.certificateNumber = values.certificateNumber.replace('/', '::');
    values.endorsementNumber = values.endorsementNumber.replace('/', '::');

    $.ajax({
      url: 'https://dmz-api-01.lja.lv:5443/app_dev.php/api/certificates/' + values.holderName + '/names/' + values.holderSurname + '/surnames/' + values.certificateNumber + '/certificates/' + values.endorsementNumber + '/endorsement.json',
      beforeSend: function(request) {
        request.setRequestHeader('apitoken', '2f75a1f6fc5cc4ffa3c43b1199ee303c');
      }
    }).then(function(data) {

      if(!data.length) {
        handleError();
        return;
      }

      data = data[0];

      data.endorsement_domain = JSON.parse(data.endorsement_domain);
      data.certificate_issued_at = parseDateToString(data.certificate_issued_at);
      data.endorsement_valid_till = parseDateToString(data.endorsement_valid_till);
      data.endorsement_issued_at = parseDateToString(data.endorsement_issued_at);

      var template = $('#certificate-verification-results-template');

      delete data.id;
      delete data.holder_name_non_diacritic;
      delete data.holder_surname_non_diacritic;

      var html = template.render(data);

      $('#certificate-verification-results').html(html);

    }, function(error) {

      handleError();
    });

  });

  $('#certificate-verification-endorsement-only form').on('submit', function(event) {

    event.preventDefault();

    $('#certificate-verification-results').removeClass('hidden').addClass('active');
    $('#certificate-verification-results').html('<img src="/themes/lja/img/loader.gif"/>');

    var values = {};
    $.each($(this).serializeArray(), function(i, field) {
      values[field.name] = field.value;
    });

    values.endorsementNumber = values.endorsementNumber.replace('/', '::');

    $.ajax({
      url: 'https://dmz-api-01.lja.lv:5443/app_dev.php/api/certificates/' + values.holderName + '/names/' + values.holderSurname + '/surnames/' + values.endorsementNumber + '/endorsement.json',
      beforeSend: function(request) {
        request.setRequestHeader('apitoken', '2f75a1f6fc5cc4ffa3c43b1199ee303c');
      }
    }).then(function(data) {

      if(!data.length) {
        handleError();
        return;
      }

      data = data[0];

      data.endorsement_domain = JSON.parse(data.endorsement_domain);
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

    }, function(error) {

      handleError();
    });

  });

  var parseDateToString = function(date) {
     if(!date) return '';
     date = new Date(date);
     return ('0' + date.getDay()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
  };

  var handleError = function() {

    $('#certificate-verification-results').removeClass('hidden').addClass('active');
    $('#certificate-verification-results').html('<p>We could not find any record for given search criteria. <br/>Please, verify inserted data and if they are correct contact with LJA to verify this request.</p>');

  };

})(jQuery);

