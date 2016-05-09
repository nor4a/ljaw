(function ($) {

    $(document).ready(function () {

        $('#bar').on('click', function () {
            $('.menu-bar-container').slideToggle('medium', function () {
                if ($(this).is(':visible'))
                    $(this).css('display', 'inline-block');
            });
        });

        // Menu

        var currentActiveMenu = {
            link: null,
            linkId: null,
            dropdown: null,
            animatingTimeout: null
        };

        var isMobileMenu = function() {
            if($(window).width() < 680) {
                return true;
            }
            return false;
        };

        $('.header-container .menu a').on('click', function(e) {

            e.preventDefault();

            clearTimeout(currentActiveMenu.animatingTimeout);
            $('.header-container, #sub-menu').unbind('mouseleave');

            if(!isMobileMenu() && $(this).parent().hasClass('current')) {
                if(currentActiveMenu.link && !$(currentActiveMenu.link).hasClass('current')) {
                    $(currentActiveMenu.link).removeClass('active');
                    currentActiveMenu.dropdown.slideUp(300);
                }
                return;
            }

            // ---- Main menu

            if(currentActiveMenu.link && !$(currentActiveMenu.link).hasClass('current')) {
                $(currentActiveMenu.link).removeClass('active');
            }

            if(currentActiveMenu.linkId !== $(this).data('id')) {
                currentActiveMenu.link = $(this).parent();
                currentActiveMenu.linkId = $(this).data('id');
                currentActiveMenu.link.addClass('active');
            }

            // ---- Dropdown

            var dropdown = $('#sub-menu .menu[data-id="' + currentActiveMenu.linkId + '"]');
            var dropdownTimeout = 300;

            if(currentActiveMenu.dropdown) {
                currentActiveMenu.dropdown.slideUp(300);
            }

            if($(currentActiveMenu.dropdown).data('id') === $(dropdown).data('id')) {
                currentActiveMenu.link = null;
                currentActiveMenu.linkId = null;
                currentActiveMenu.dropdown = null;
                return;
            }

            currentActiveMenu.animatingTimeout = setTimeout(function() {
                currentActiveMenu.dropdown = dropdown;
                currentActiveMenu.dropdown.slideDown(300, function() {
                    $('.header-container, #sub-menu').mouseleave(function(e) {
                        // If we are moving mouse over childs
                        if($(e.toElement).parents('.header-container').length || $(e.toElement).parents('#sub-menu').length) {
                            return;
                        }
                        // Hide current active menu
                        currentActiveMenu.dropdown.slideUp(300);
                        currentActiveMenu.link = null;
                        currentActiveMenu.linkId = null;
                        currentActiveMenu.dropdown = null;
                        // Unbind this event, we don't need it anymore
                        $('.header-container, #sub-menu').unbind('mouseleave');
                        // Remove .active from main menu element
                        $('.header-container .menu li.active').removeClass('active');
                        // If we are on subpage, mark current menu tree as active
                        $('.header-container .menu li.current').addClass('active');
                    });
                });
            }, currentActiveMenu.dropdown ? dropdownTimeout : 0);

        });

        // Internal links

        $('a[href^="#"]').on('click',function (e) {
            e.preventDefault();
            var target = this.hash;
            var $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 18
            }, 900, 'swing', function () {
                window.location.hash = target;
            });
        });

        // Minimal height of body

        var minimumHeight = function() {

            var windowHeight = $(window).height();
            var contentHeight = $('.content-wrapper').height();
            var footerHeight = $('.footer-wrapper').height();

            var headerHeight = $('.upper-header').height() + $('.header-container').height();

            console.log(windowHeight, footerHeight);
            if (contentHeight + footerHeight < windowHeight) {
                // Content
                var minHeight = windowHeight - footerHeight;
                $('.content-wrapper').css('min-height', minHeight);
                // Inner
                var minInnerHeight = minHeight - headerHeight;
                $('.content-container').css('min-height', minInnerHeight);
            }

        };

        minimumHeight();

        $(window).resize(function() {
            minimumHeight();
        });

    });

})(jQuery);