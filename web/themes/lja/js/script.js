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
            event: null,
            animatingTimeout: null
        };

        $('.header-container .menu a').on('click', function(e) {

            e.preventDefault();

            clearTimeout(currentActiveMenu.animatingTimeout);
            $('.header-container, #sub-menu').unbind('mouseleave');

            // ---- Main menu

            if(currentActiveMenu.link) {
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


    });

})(jQuery);