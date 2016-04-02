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

            $('.header-container .menu li.active').removeClass('active');

            var link = $(this);
            var id = link.data('id');

            var container = $('#sub-menu');
            var menu = $('.menu[data-id="' + id + '"]', container);
            var activeMenu = $('.menu.visible', container);

            link.parent().addClass('active');

            if(menu.hasClass('visible') && !menu.hasClass('current')) {
                link.parent().removeClass('active');
                menuSlide(menu);
            } else {
                menuSlide(activeMenu);
                if(activeMenu.is('div')) {
                    setTimeout(function() {
                        menuSlide(menu);
                    }, 300);
                } else {
                    menuSlide(menu);
                }
                menu.on('mouseleave', function(e) {
                    menuSlide(menu);
                    menu.unbind('mouseleave');
                    $('.header-container .menu li.active').removeClass('active');
                    $('.header-container .menu li.current').addClass('active');
                });
            }

        });

        var menuSlide = function(element, time) {
            if(time === undefined) var time = 300;
            element.slideToggle(time, function () {
                if ($(this).is(':visible')) {
                    $(this).addClass('visible');
                } else {
                    $(this).removeClass('visible');
                }
            });
        }

    });

})(jQuery);