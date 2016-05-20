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

        $('.header-container .menu a').on('mouseenter', function(e) {

            if($(window).width() < 600) {
                return false;
            }

            e.preventDefault();

            var menuElement = $(this);

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
                        var element = e.toElement !== undefined ? e.toElement : e.relatedTarget;
                        if($(element).parents('.header-container').length || $(element).parents('#sub-menu').length) {
                            return;
                        }
                        // Hide current active menu
                        currentActiveMenu.dropdown.slideUp(300);
                        currentActiveMenu.link = null;
                        currentActiveMenu.linkId = null;
                        currentActiveMenu.dropdown = null;
                        // Unbind this event, we don't need it anymore
                        $('.header-container, #sub-menu').unbind('mouseleave');
                        $(this).unbind('click');
                        // Remove .active from main menu element
                        $('.header-container .menu li.active').removeClass('active');
                        // If we are on subpage, mark current menu tree as active
                        $('.header-container .menu li.current').addClass('active');
                    });
                    menuElement.on('click', function() {
                        // Hide current active menu
                        currentActiveMenu.dropdown.slideUp(300);
                        currentActiveMenu.link = null;
                        currentActiveMenu.linkId = null;
                        currentActiveMenu.dropdown = null;
                        // Unbind this event, we don't need it anymore
                        $('.header-container, #sub-menu').unbind('mouseleave');
                        menuElement.unbind('click');
                        // Remove .active from main menu element
                        $('.header-container .menu li.active').removeClass('active');
                        // If we are on subpage, mark current menu tree as active
                        $('.header-container .menu li.current').addClass('active');
                    });
                });
            }, currentActiveMenu.dropdown ? dropdownTimeout : 0);

        });

        // Mobile

        $('#bar').on('click', function() {
            var menu = $('.header-container .container > .menu');
            if(menu.is(':visible')) {
                menu.slideUp();
                $('.mobile-menu:visible').slideUp(400);
            } else {
                menu.slideDown();
            }
        });

        $('.header-container .container > .menu > ul > li > a').on('click', function(e) {
            if($(window).width() > 680) {
                console.log('out');
                return;
            }
            var submenu = $(this).parent().find('.mobile-menu');
            if(submenu.is(':visible')) {
                submenu.slideUp(400);
            } else {
                $('.mobile-menu:visible').slideUp(400);
                submenu.slideDown(400);
            }
        });

        $('.header-container .container > .menu ul ul a').on('click', function() {
            $('.mobile-menu:visible').slideUp(400);
            $('.header-container .container > .menu').slideUp(400);
        });

        // Internal links

        $('a[href^="#"]').on('click',function (e) {
            e.preventDefault();
            if(!this.hash) {
                return;
            }
            var target = this.hash;
            var $target = $('a[id="' + target + '"]').length ? $('a[id="' + target + '"]') : $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 18
            }, 900, 'swing', function () {
                window.location.hash = target;
            });
        });

        // Minimal height of body

        var minimumHeight = function() {

            $('.content-wrapper').css('min-height', 0);
            $('.content-container').css('min-height', 0);

            var windowHeight = $(window).height();

            var contentHeight = $('.content-wrapper').height();
            var footerHeight = $('.footer-wrapper').height();

            var headerHeight = $('#block-lja-content').offset().top; // $('.upper-header').height() + $('.header-container').height();

            if (contentHeight + footerHeight < windowHeight) {
                // Content
                var minHeight = windowHeight - footerHeight - 5;
                $('.content-wrapper').css('min-height', minHeight);
                // Inner
                var minInnerHeight = minHeight - headerHeight;
                $('.content-container').css('min-height', minInnerHeight);
            }

        };

        // Minimal height of body

        var minimumHomeHeight = function() {

            $('.footer').css('min-height', 0);

            var windowHeight = $(window).height();

            var contentHeight = $('.content-wrapper').height();
            var footerHeight = $('.footer-wrapper').height();
            var headerHeight = $('#block-lja-content').offset().top;

            console.log(contentHeight, footerHeight);

            if (contentHeight + footerHeight < windowHeight) {
                // Footer
                var minHeight = windowHeight - contentHeight - 60;
                $('.footer').css('min-height', minHeight);
            }

        };

        if(!$('body').hasClass('path-frontpage')) {
            setTimeout(minimumHeight, 100);
            $(window).resize(function() {
                minimumHeight();
            });
        } else {
            setTimeout(minimumHomeHeight, 100);
            $(window).resize(function() {
                minimumHomeHeight();
            });
        }

        // Replace SVG image into inline

        $('img.svg').each(function(){
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');
            $.get(imgURL, function(data) {
                var $svg = $(data).find('svg');
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }
                $svg = $svg.removeAttr('xmlns:a');
                if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
                }
                $svg.css('max-width', 35).css('max-height', 35);
                $img.replaceWith($svg);
            }, 'xml');
        });

        $('a').each(function() {
            var match = this.href.match(/\.([a-zA-Z0-9]{2,4})([#;?]|$)/);
            var name = 'link-icon-html link-icon';
            if(match) {
                var name = 'link-icon-' + match[1] + ' link-icon';
            }
            $(this).addClass(name);
            $(this).parents('.views-row').addClass(name);
        });

        var topButton = $('.goTopWrapper');

        $(window).on('scroll', function(e) {
           var scrollTop = $(window).scrollTop();
           var containerHeight = $('#block-lja-content').height();
           var containerOffset = $('#block-lja-content').offset().top;
           var position = scrollTop - containerOffset + 10; // $(window).height()
           if(position > containerHeight) {
               position = containerHeight;
           }
           topButton.css('top', position);
           if(scrollTop > 600 && topButton.css('display') == 'none') {
               topButton.fadeIn();
           } else if(scrollTop < 600 && topButton.css('display') != 'none') {
               topButton.fadeOut();
           }
        });

        topButton.find('a').on('click', function() {
            $('html, body').stop().animate({
                'scrollTop': $('#block-lja-content').offset().top - 30
            }, 900, 'swing', function () {
                window.location.hash = '';
            });
        });

        // Directories

        var prepareExtendableList = function(container, scoope) {
            // Variables
            var clone = $(container).clone();//.hide().appendTo('body');
            $(clone).find('div, ol, ul').remove();
            var label = $.trim($(clone).text());
            var content = $(container).html().replace(label, '');
            // Link
            var link = $('<a href="#">' + label + '</a>');
            // Recompose
            $(container).html('');
            $(container).append(link);
            $(container).append('<div class="childs">' + content + '</div>')
            // Listener
            link.on('click', function(e) {
                e.preventDefault();
                var parent = $(this).parent();
                // Hide clicked
                if(parent.hasClass('expanded')) {
                    parent.find('.childs').slideUp();
                    parent.removeClass('expanded');
                    return;
                }
                // Hide all expanded
                var current = $('.extendable-list .expanded');
                if(scoope !== undefined) {
                    var current = $('.extendable-list').find(scoope + '.expanded');
                }
                current.find('.childs').slideUp();
                current.removeClass('expanded');
                // Show clicked
                parent.find('> .childs').slideDown();
                parent.addClass('expanded');
            });
        };

        $('.extendable-list > ol > li').each(function() {
            $(this).addClass('level-1');
            prepareExtendableList(this);
            $('.childs > ol > li', this).each(function() {
               $(this).addClass('level-2');
               prepareExtendableList(this, '.level-2');
            });
        });

        $('#block-views-block-news-block-1 .views-rows').slick({
            //arrows: false,
            appendArrows: $('#block-views-block-news-block-1'),
            adaptiveHeight: true
        });

        // Home

        var container = $('.text-block.home.front-page .content p');
        var characters = container.text().split('');

        container.html('');
        $.each(characters, function (i, el) {
            container.append("<span>" + el + "</span");
        });

    });

})(jQuery);