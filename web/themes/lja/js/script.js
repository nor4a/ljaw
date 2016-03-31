(function ($, Drupal) {

    $(document).ready(function () {

        $('#bar').on('click', function () {
            $('.menu-bar-container').slideToggle('medium', function () {
                if ($(this).is(':visible'))
                    $(this).css('display', 'inline-block');
            });
        });

        $('.header-container .menu a').on('click', function(e) {

            e.preventDefault();

            var link = $(this);
            var id = link.data('id');
            var menu = $('.menu[data-id="' + id + '"]');

            var container = $('.menu-bar-container');

            if(container.hasClass('visible') && menu.hasClass('visible')) {
                container.removeClass('visible');
                menu.removeClass('visible');
            } else {
                $('.menu.visible').removeClass('visible');
                container.addClass('visible');
                menu.addClass('visible');
            }

        });

    });

})(jQuery, Drupal);