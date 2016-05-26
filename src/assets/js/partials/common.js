/*
 Third party
 */

$(function () {
    /*console.log('in common.js! ');*/
})

$(document).ready(function () {

    // Ajax send mail
    $(".order").submit(function (e) {
        ajax(this);

        return false;
	});

    $('.submit').click(function () {
        var recipient = $(this).data('submit');

        $(recipient).submit();
        //ajax(recipient);

        return false;
    });

    $('form').find('input').on('input', function () {
        //найти предка, который имеет класс .form-group, для удаления success/error
        var formGroup = $(this).parents('.form-group');

        formGroup.removeClass('has-error has-success');
        $('#formOrder .form-control-feedback-message-success').animate({
            opacity: 0
        }, 300);

        $(this).closest('form').find('.submit').prop('disabled', false);
    })

    if (getPageSize()[2] < 768) {

    }

    $('#modalOrder').on('show.bs.modal', function (event) {
        //centerModal; /* вертикальное центрирование */
        var button = $(event.relatedTarget); // Button that triggered the modal
        var recipient = button.data('service'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        /*modal.find('#orderFormLabel').text('Заявка на услугу ' + '"' + recipient + '"');*/
        /*modal.find('#whichService').val(recipient);*/
        $('#whichService').val(recipient);

        $('#placeInFooter>.form-order').detach().prependTo('#placeInModal');  // перемещаем форму из футера в модальное окно

    });

    $('#modalOrder').on('hidden.bs.modal', function (event) {
        $('#placeInModal>.form-order').detach().prependTo('#placeInFooter');  // перемещаем форму из модального окна в футер
    });

    $('.modal-vertical-centered').on('show.bs.modal', centerModal);

    $(window).on("resize", function () {
        $('.modal-vertical-centered:visible').each(centerModal);
    });

    $('#header-carousel').on('slid.bs.carousel', function () {
        var slide = + $(this).find(".carousel-indicators li.active").attr("data-slide-to") + 1;
        $("#paginationNumber").text(slide);
    })

    $(".lnk-inform").click( function () {
        if($(this).hasClass("active")) { return false; }

        var target = $(this).attr("href");

        /*$(".inform").stop().css("display", "none").removeClass("animated animDur fadeInRight"); */
        $(".inform").stop().fadeOut().removeClass("animated animDur fadeInRight"); /* Одно окно одновременно */

        $(target).addClass("animated animDur fadeInRight").fadeIn();

        return false;
    } );

    $("html").click( function () {
        var service = $('.service.active');

        $(".inform").stop().fadeOut().removeClass("animated animDur fadeInRight");
        closeFDescServ(service);
    } );

    $(".inform").click( function () {
        return false;
    } );

    $( ".carousel-indicators li" ).click( function () {
        return false;
    } );

    $('.teasers-paginators a').click(function () {
        if($(this).hasClass("active")) { return false; }

        var target = $(this).attr("href");

        $(".teasers.active").stop().removeClass("active");
        $('.teasers-paginators a.active').removeClass('active');

        $(target).addClass("active");
        $(this).addClass('active');

        return false;
    });

    $('.service-tab').click(function () {
        if($(this).hasClass("active")) { return false; }

        var serviceTab = $(this),
            service    = $( $(this).data('target') );

        $('.service-tab.active').stop().removeClass('active').find('.blackout').stop().removeClass('rotateBlackout');
        $('.service.active').stop().removeClass("active");

        serviceTab.stop().addClass('active').find('.blackout').stop().addClass('rotateBlackout');
        service.stop().addClass("active").fadeIn(500);

        return false;
    });

    $('.service').click(function () {
        return false;
    });

    $('.servReturn').click(function () {
        var service = $(this).closest('.service');
        closeFDescServ(service);
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

function checkingVisible(elem) {
    var res = $(elem).is(":visible");

    return res;
}

function closeFDescServ(service) {
    service.stop().removeClass("active").fadeOut(500);
    $('.service-tab.active').stop().removeClass('active').find('.blackout').stop().removeClass('rotateBlackout');
}

function centerModal() {
    $(this).css('display', 'block');
    var $dialog = $(this).find(".modal-dialog");
    var offset = (getPageSize()[3] - $dialog.height()) / 2; // getPageSize()[3] - использовал собст. функцию, т.к. $(windows).height() на iPhone не работала правильно ;(
    var offsetLeft = (getPageSize()[2] - $dialog.width()) / 2;
    $dialog.css("margin-top", offset);
    $dialog.css("margin-left", offsetLeft); // Добавил выравнивание по горизонтали, т.к. на iPhone не выравнивалось
}

function validate(target) {

    /*var name, tel;

    name = $(target).find('input:text').val();
    tel = $(target).find('input:tel').val();*/

    //переменная formValid
    var formValid = true;

    $(target).find('input.validating').each(function () {
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

    /*$('.form-control-feedback-icon').each(function () {
        if( !checkingVisible(this) ) {
            $( this ).fadeIn();
        }
    });

    $('#formOrder > .form-group.has-error > .form-control-feedback-message-error').each(function () {
        if( !checkingVisible(this) ) {
            $( this ).fadeIn();
        }
    });*/

    /*if(!checkingVisible('.form-control-feedback-icon')) { $('.form-control-feedback-icon').fadeIn(); }
    if(!checkingVisible('.form-control-feedback-message-error')) { $('.form-control-feedback-message-error').fadeIn(); }*/

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
        beforeSend: function(data) { // сoбытиe дo oтпрaвки
            /*$(ob).find('input[type="submit"]').attr('disabled', 'disabled');*/ // нaпримeр, oтключим кнoпку, чтoбы нe жaли пo 100 рaз
            $(ob).find('.submit').attr('disabled', 'disabled');
        },
        complete: function(data) { // сoбытиe пoслe любoгo исхoдa
            /*$(ob).find('input[type="submit"]').prop('disabled', false);*/ // в любoм случae включим кнoпку oбрaтнo
            $(ob).find('.submit').prop('disabled', false);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            /*result.addClass("text-danger bg-danger").text("Пожалуйста, проверьте введённые данные!");*/
            /*alert("Ошибка: "+xhr.responseCode+" | сообщение: "+str);*/ /* отладка */
            //alert("send email ERROR! "+ xhr.responseText); /* xhr.responseCode */
            //alert(xhr.status); // пoкaжeм oтвeт сeрвeрa
            //alert(thrownError); // и тeкст oшибки
        },
        success: function(data) {
            //alert(data); /* $('.results').html(data); */
        },
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
            $(ob).modal('hide');
            //отобразить сообщение об успехе
            $(ob).find('.form-control-feedback-message-success').animate({
                opacity: 1
            }, 300);
            $(ob).find('#whichService').val("Подвал"); /* нужно заменить на класс */
            $(ob).find('.has-feedback').removeClass('has-success');
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
