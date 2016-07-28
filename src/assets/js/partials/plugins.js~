/*
 Third party
 */

$(function(){
    /*console.log('in plugins.js! ');*/
})

$(document).ready(function() {

    // Скроллинг
    $(".scrollTo").click(function () {
        $.scrollTo($(this).attr('href'), 800, {
			offset: 0
		});
        /*$('.navbar-toggle').click();*/ /*для того, чтобы свернуть менюшку для удобства*/
		return false;
	});

    /* mask of inputs */

    $.mask.definitions['~']='[+-]';
    $.mask.definitions['h'] = "[2349]";
    $.mask.definitions['!'] = "[0-9]";

    $("#bsPhone").mask("+375 (hh) 999-99-99", {placeholder:"_"});

});
