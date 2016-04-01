(function ($) {

    $(document).ready(function () {

        $('#bar').on('click', function () {
            $('.menu-bar-container').slideToggle('medium', function () {
                if ($(this).is(':visible'))
                    $(this).css('display', 'inline-block');
            });
        });

        $('.header-container .menu a').on('click', function(e) {

            e.preventDefault();

            $('.header-container .menu ul.active').removeClass('active');
            $('.header-container .menu li.active').removeClass('active');

            var link = $(this);
            var id = link.data('id');

            var container = $('.menu-bar-container');
            var menu = $('.menu[data-id="' + id + '"]', container);
            var activeMenu = $('.menu.visible', container);

            if(!$('.header-container .menu ul').hasClass('active')) {
                $('.header-container .menu ul').addClass('active');
            }

            link.parent().addClass('active');

            activeMenu.slideToggle(300, function() {
                if($(this).is(':visible')) {
                    $(this).addClass('visible');
                } else {
                    $(this).removeClass('visible');
                }
            });

            setTimeout(function() {
                menu.slideToggle(300, function () {
                    if ($(this).is(':visible')) {
                        $(this).addClass('visible');
                    } else {
                        $(this).removeClass('visible');
                    }
                });
            }, 200);

            if(container.hasClass('visible') && menu.hasClass('visible')) {
                //container.removeClass('visible');
                //menu.removeClass('visible');
            } else {
                $('.menu.visible').removeClass('visible');
                //container.addClass('visible');
                //menu.addClass('visible');
            }

        });

    });

})(jQuery);