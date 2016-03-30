$(document).ready(function(){
    $('#bar').on('click', function(){
        $('.menu-bar-container').slideToggle('medium', function(){
            if ($(this).is(':visible'))
                $(this).css('display','inline-block');
        });
    })
});