/*
 Third party
 */

$(function () {
    /*console.log('in common.js! ');*/
})

$(document).ready(function () {

    // Ajax send mail
    /*$(".order").submit(function () {
        ajax(this);
	});
    */

    $('.submit').click(function () {
        var recipient = $(this).data('submit');
        $(this).prop('disabled', true);

        setTimeout(function () {
            $('.submit').prop('disabled', false);
        }, 1000);

        $(recipient).submit();
    });

    $('#modalOrder').on('show.bs.modal', function (event) {
        centerModal; /* вертикальное центрирование */
        var button = $(event.relatedTarget); // Button that triggered the modal
        var recipient = button.data('service'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        /*modal.find('#orderFormLabel').text('Заявка на услугу ' + '"' + recipient + '"');*/
        /*modal.find('#whichService').val(recipient);*/
        $('#whichService').val(recipient);

    });

    $('.modal-vertical-centered').on('show.bs.modal', centerModal);

    $(window).on("resize", function () {
        $('.modal-vertical-centered:visible').each(centerModal);
    });

    if (getPageSize()[2] < 768) {

    }

    $(window).resize(function () {

    });

    $('#header-carousel').on('slid.bs.carousel', function () {
        var slide = + $(this).find(".carousel-indicators li.active").attr("data-slide-to") + 1;
        $("#paginationNumber").text(slide);
    })

    $(".lnk-inform").click( function () {
        var target = $(this).attr("href");

        /*$(".inform").stop().removeClass("animated animDur fadeInRight").css("display", "none"); */
        $(".inform").stop().removeClass("animated animDur fadeInRight").fadeOut(); /* Одно окно одновременно */

        /*$(target).toggle("slow");*/
        /*$(target).find(".content").toggle("slow");*/

        $(target).addClass("animated animDur fadeInRight").css("display", "block");

        return false;
    } );

    $("html").click( function () {
        /*$(".inform").fadeOut("slow");*/
        /*$(".inform").find(".content").fadeOut("slow");*/

        $(".inform").stop().removeClass("animated animDur fadeInRight").fadeOut();
    } );

    $(".inform").click( function () {
        return false;
    } );

    $( ".carousel-indicators li" ).click( function () {
        return false;
    } );

    $('.teasers-paginators a').click(function () {
        var target = $(this).attr("href");

        /*$(".teasers").fadeOut();
        $(target).fadeIn();*/

        $(".teasers").stop().removeClass("animated animDur fadeInRight").animate({
            opacity: 0
        }, 700).css("display", "none");

        /*$(target).toggle("slow");*/
        $(target).addClass("animated animDur fadeInRight").animate({
            opacity: 1
        }, 700).css("display", "block");

        return false;
    });

    /*$(".lnk-inform").focusin(function () {
        var target = $(this).attr("href");
        $(target).toggle();
    });

    $(".lnk-inform").focusout(function () {
        var target = $(this).attr("href");
        $(target).css("display", "none");
    });*/

    /* смена фона кнопок в форме заяве */
    /*$('#modalOrder .modal-footer .phone')
        .mouseenter(function () {
            $('#modalOrder .modal-footer .submit').removeClass("bg_h");
            $(this).addClass("bg_h");
        })
        .mouseleave(function () {
            $(this).removeClass("bg_h");
            $('#modalOrder .modal-footer .submit').addClass("bg_h");
        });*/

    /* inview  */
    /*jQuery('#benefits .ico img').bind('inview', function (event, visible) {
        if (visible) {
            $(this).stop().addClass("animated bounceIn");
        } else {
            $(this).stop().removeClass("animated bounceIn");
        }
    });*/

    /*  */
    /*$('#carpark .car').one('inview', function (event) {

        var Block = $(this);

        // Show a smooth animation
        Block.animate({
            opacity: 1
        }, 1500);
    });*/

});

function centerModal() {
    $(this).css('display', 'block');
    var $dialog = $(this).find(".modal-dialog");
    var offset = ($(window).height() - $dialog.height()) / 2;
    $dialog.css("margin-top", offset);
}

function validate(target) {

    /*var name, tel;

    name = $(target).find('input:text').val();
    tel = $(target).find('input:tel').val();*/

    //переменная formValid
    var formValid = true;

    $(target).find('input').each(function () {
        //найти предков, которые имеют класс .form-group, для установления success/error
        var formGroup = $(this).parents('.form-group');
        //найти glyphicon, который предназначен для показа иконки успеха или ошибки
        var glyphicon = formGroup.find('.form-control-feedback');
        //для валидации данных используем HTML5 функцию checkValidity

        if (this.checkValidity() && ($(this).val() != "")) {
            //добавить к formGroup класс .has-success, удалить has-error
            formGroup.addClass('has-success').removeClass('has-error');
            //добавить к glyphicon класс glyphicon-ok, удалить glyphicon-remove
            /*glyphicon.addClass('glyphicon-ok').removeClass('glyphicon-remove');*/
        } else {
            //добавить к formGroup класс .has-error, удалить .has-success
            formGroup.addClass('has-error').removeClass('has-success');
            //добавить к glyphicon класс glyphicon-remove, удалить glyphicon-ok
            /*glyphicon.addClass('glyphicon-remove').removeClass('glyphicon-ok');*/
            //отметить форму как невалидную
            formValid = false;
        }
    });

    //если форма валидна, то
    if (formValid) {
        return true;
    }

    return false;
}

function ajax(ob) {
    var msg;
    var processor;
    var result;

    var result = $("#result");

    if (!validate(ob)) {
        /*result.addClass("text-danger bg-danger").text("Пожалуйста, проверьте введённые данные!");*/
        return false;
    }

    processor = "./mail.php";

    $.ajax({
        type: "POST",
        url: processor,
        data: $(ob).serialize(),
        error: function (xhr, str) {
            /*result.addClass("text-danger bg-danger").text("Пожалуйста, проверьте введённые данные!");*/
        }
    }).done(function (msg) {

        /*if(msg === "OK"){
            var result = "<div = 'bg-success'>Спасибо за заявку! Мы вам перезвоним!</div>"
            form.html(result);
        } else {
            form.html(msg);
        }*/

        $(ob).find("[type='text']").val("");
        $(ob).trigger("reset");
        /*result.addClass("text-success bg-success").removeClass("text-danger bg-danger").text("Ваша заявка принята!");*/

        /*setTimeout(function () {
        	$.fancybox.close();
        	result.addClass("animated zoomInDown show").fadeIn('slow');
        }, 500);*/

        setTimeout(function () {
            //сркыть модальное окно
            $('#modalOrder').modal('hide');
            //отобразить сообщение об успехе
            $('#modalAlert-success').modal('show');
            /*result.removeClass("text-danger bg-danger text-success bg-success").text("");*/
            $('.submit').prop('disabled', false);
        }, 1000);

    });

    return false;
}

/* create social networking pop-ups*/
/* Убрано со страницы */
/*(function () {
    // link selector and pop-up window size
    var Config = {
        Link: "a.share",
        Width: 500,
        Height: 500
    };

    // add handler links
    var slink = document.querySelectorAll(Config.Link);
    for (var a = 0; a < slink.length; a++) {
        slink[a].onclick = PopupHandler;
    }

    // create popup
    function PopupHandler(e) {
        e = (e ? e : window.event);

        var t = e.currentTarget;

        var
            px = Math.floor(((screen.availWidth || 1024) - Config.Width) / 2),
            py = Math.floor(((screen.availHeight || 700) - Config.Height) / 2);

        // open popup
        var popup = window.open(t.href, "social",
            "width=" + Config.Width + ",height=" + Config.Height +
            ",left=" + px + ",top=" + py +
            ",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
        if (popup) {
            popup.focus();
            if (e.preventDefault) e.preventDefault();
            e.returnValue = false;
        }

        return !!popup;
    }

}());*/

// Кроссбраузерное получение размеров окна на JS
function getPageSize() {
    var xScroll, yScroll;

    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else if (document.documentElement && document.documentElement.scrollHeight > document.documentElement.offsetHeight) { // Explorer 6 strict mode
        xScroll = document.documentElement.scrollWidth;
        yScroll = document.documentElement.scrollHeight;
    } else { // Explorer Mac...would also work in Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }

    // for small pages with total height less then height of the viewport
    if (yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }

    // for small pages with total width less then width of the viewport
    if (xScroll < windowWidth) {
        pageWidth = windowWidth;
    } else {
        pageWidth = xScroll;
    }

    return [pageWidth, pageHeight, windowWidth, windowHeight];
}
