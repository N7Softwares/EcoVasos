// LOADERS
var loader = "<div class='loader-session flex content-center align-center'> <img src='./assets/site/images/loader.gif'> </div>";

// SELECTS
var select;

// NOME DO PRODUTO
var productName = "Copo Eco";

//LARGURA DA TELA
var screenWidth = $("body").width();

$(document).ready(function() {
    if(screenWidth <= 1100) {
        Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: 'Oops...',
            text: 'Lo siento, nose puede utilizar esta herramienta de personalización en dispositivos mobile :(',
            footer: '<a href="https://ecoingenio.com.ar/"></a>'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'https://ecoingenio.com.ar/';
            } else if (result.isDenied) {
                window.location.href = 'https://ecoingenio.com.ar/';
            }
        })
    }
    
    $(".close-message").click(function(){
        $(".new-years-message").fadeOut();
        $(".custom-session").css({'margin-top' : '0px'});
        $(".create-session-extend").css({'margin-top' : '0px'});
        $(".create-session").css({'margin-top' : '0px'});
    });

    $( "div.action-text-align-left" ).click(function() {
        $(".selecionado").css('text-align', 'left');
        $('div.action-text-align-left').addClass('active');
        $('div.action-text-align-center').removeClass('active');
        $('div.action-text-align-right').removeClass('active');
    });

    $( "div.action-text-align-center" ).click(function() {
        $(".selecionado").css('text-align', 'center');
        $('div.action-text-align-left').removeClass('active');
        $('div.action-text-align-center').addClass('active');
        $('div.action-text-align-right').removeClass('active');
    });

    $( "div.action-text-align-right" ).click(function() {
        $(".selecionado").css('text-align', 'right');
        $('div.action-text-align-left').removeClass('active');
        $('div.action-text-align-center').removeClass('active');
        $('div.action-text-align-right').addClass('active');
    });

    $( "div.action-text-italic" ).click(function() {
        var fontStyle = $(".selecionado").css('font-style');
        //console.log(fontStyle);
        if(fontStyle == 'italic') {
            $(".selecionado").css('font-style', 'normal');
            $('div.action-text-italic').removeClass('active');
        } else if(fontStyle == 'normal') {
            $(".selecionado").css('font-style', 'italic');
            $('div.action-text-italic').addClass('active');
        }
    });

    $( "div.action-text-bold" ).click(function() {
        var fontWeight = $(".selecionado").css('font-weight');
        //console.log(fontWeight);
        if(fontWeight == '700') {
            $(".selecionado").css('font-weight', '400');
            $('div.action-text-bold').removeClass('active');
        } else if(fontWeight == '400') {
            $(".selecionado").css('font-weight', '700');
            $('div.action-text-bold').addClass('active');
        }
    });

    $( "span#close-spinner" ).click(function() {
        $("#spinner").fadeOut(200);
        return;
    });

    $(document).on("keyup", function (e) {
		if (e.keyCode == 27) {
            console.log('Esc');
        	$("#spinner").fadeOut(200);
            return;
		} else if ((e.keyCode == 46) && $(':focus').attr('id') != 'insert-text') {
        	removeElements();
            //$('button#apply-text').show();
		}

        if($('.selecionado').hasClass('text') && $(':focus').attr('id') != 'insert-text') {
            var texto = $('.selecionado span').html();
            if(e.key != 'Shift' && e.key != 'Alt' && e.key != 'Ctrl' && e.key != 'Control' && e.key != 'Tab' && e.key != 'ArrowUp' && e.key != 'ArrowRight' && e.key != 'ArrowDown' && e.key != 'ArrowLeft' && e.key != 'CapsLock' && e.key != 'AltGraph' && e.key != 'NumLock') {
                if (e.key == 'Backspace') {
                    $('.selecionado span').html(texto.substr(0, texto.length - 1));
                    if(texto.length <= 1) {
                        //removeElements();
                    }
                } else if (e.key == 'Enter') {
                    $('.selecionado span').html(texto + "<br />");
                } else {
                    $('.selecionado span').html(texto + e.key);
                }
            }
        }

        if($('.selecionado').hasClass('text')) {
            $('.selecionado').trigger('mouseup');
        }
	});

    $(document).on('click', '.excluir-elemento', function() {
        removeElements();
        hideElements();
    });

    $(document).on('click', '.excluir-elemento-painel', function() {
        removeElements();
        hideElements();
    });

    $(document).on('click', '.bloquear-elemento', function() {
        let id = $("div.layer.selected").attr("data-id-elemento");

        if(!$( this ).hasClass('active')) {
            $( this ).addClass('active');

            $('div#'+id).addClass('bloqueado').removeClass('selecionado');
            $( '.layer[data-id-elemento="'+id+'"]' ).addClass('bloqueado');
            $('div.bloquear-elemento div.tooltip p.text-lighter').html('Liberar elemento');
        } else {
            $( this ).removeClass('active');
            $('div#'+id).removeClass('bloqueado').addClass('selecionado');
            $( '.layer[data-id-elemento="'+id+'"]' ).removeClass('bloqueado');
            $( '.layer[data-id-elemento="'+id+'"]' ).trigger('click');
            $('div.bloquear-elemento div.tooltip p.text-lighter').html('Bloquear elemento');
        }
    });

    $(document).on('click', '.trazer-para-frente', function() {
        let counterElements = 0;
        let layerClone = $( ".layer.selected" ).clone();
        let layerId = $( ".layer.selected" ).data('id-layer');

        $( ".layer" ).each(function(){
            counterElements++;
        });

        $(".selecionado").css("z-index", parseInt($(".selecionado").css("z-index")) + 1);
        var zIndex = parseInt($(".selecionado").css('z-index'));

        console.log('z index ', zIndex);
        console.log('counter ', counterElements);
        console.log('counter ', counterElements);

        if(layerId != counterElements) {
            // $("span#layers").html(zIndex);
            $( ".layer.selected" ).remove();
            $( layerClone ).insertBefore( `.layer[data-id-layer="${zIndex}"]` );
        }

        countLayers();
    });

    $(document).on('click', '.enviar-para-tras', function() {
        let layerClone = $( ".layer.selected" ).clone();

        if ($(".selecionado").css("z-index") > 1) {
            $(".selecionado").css("z-index", parseInt($(".selecionado").css("z-index")) - 1);
            var zIndex = parseInt($(".selecionado").css('z-index'));
            // $("span#layers").html(zIndex);

            $( ".layer.selected" ).remove();
            $( layerClone ).insertAfter( `.layer[data-id-layer="${zIndex}"]` );
            
            countLayers();
        }
    });

    $(document).on('click', '.duplicar-elemento', function() {
        let unix = new Date().getTime()
        var tipoElemento;
        var topElemento = parseInt($('.selecionado').css('top')) + 50;
        var leftElemento = parseInt($('.selecionado').css('left')) + 50;
        let layerclone;

        if($('.selecionado').hasClass('icon')) {
            tipoElemento = 'icon';
        } else if($('.selecionado').hasClass('img-svg')) {
            tipoElemento = 'img';
        } else if($('.selecionado').hasClass('text')) {
            tipoElemento = 'text';
        }

        //console.log('Top = ' + topElemento);
        //console.log('Left = ' + leftElemento);
        
        $(".selecionado").clone().attr('id', 'elemento-'+unix).css({top: topElemento, left: leftElemento}).appendTo("div#gabarito");

        layerclone = $('.layer.selected').clone().attr('data-id-elemento', 'elemento-'+unix);
        $("#art-layers").prepend(layerclone);

        $('.excluir-elemento').hide();

        countLayers();
        addElement(unix, tipoElemento);

        if(tipoElemento == 'img') {
            $("#spinner").fadeIn(200);
            var src = $('div#elemento-'+unix).attr('data-link-img');
            //console.log('Src = ' + src);
            $.ajax({
                method: "POST",
                url: "cloneImg?v=" + unix,
                data: {
                    src: src,
                },
                context: document.body,
                success: (result) => {
                    if(result) {
                        $('div#elemento-'+unix).attr('data-link-img', result);
                        $('div#elemento-'+unix).css('background-image', 'url('+result+')');
                    }
                    $("#spinner").fadeOut(200);
                }
            })
        }
    });

    $(document).on('click', '.virar-horizontal', function() {
        let id = $(".selecionado").attr("id").replace("elemento-", "");
        let indice;
        elementos.forEach((v, i) => {
            v.id == id ? (indice = i) : false
        });
        var rotateDeg = 0;
        var espelharX = $(".selecionado").attr('data-espelharX');

        var selecionadoDeg = $('.selecionado').css('transform');
        if(selecionadoDeg) {
            rotateDeg = convertToAngle(selecionadoDeg);
        }
        
        if (espelharX == -1) {
            $(".selecionado").css("transform", "rotate(" + rotateDeg + "deg) scaleX(1)")
            $(".selecionado").attr('data-espelharX', 1);
        } else {
            $(".selecionado").css("transform", "rotate(" + rotateDeg + "deg) scaleX(-1)")
            $(".selecionado").attr('data-espelharX', -1);
        }

        $(".selecionado").trigger('mouseup');
    });

    $(document).on('click', '.virar-vertical', function() {
        let id = $(".selecionado").attr("id").replace("elemento-", "");
        let indice;
        elementos.forEach((v, i) => {
            v.id == id ? (indice = i) : false
        });
        var rotateDeg = 0;
        var espelharY = $(".selecionado").attr('data-espelharY');

        var selecionadoDeg = $('.selecionado').css('transform');
        if(selecionadoDeg) {
            rotateDeg = convertToAngle(selecionadoDeg);
        }
        
        if (espelharY == -1) {
            $(".selecionado").css("transform", "rotate(" + rotateDeg + "deg) scaleY(1)")
            $(".selecionado").attr('data-espelharY', 1);
        } else {
            $(".selecionado").css("transform", "rotate(" + rotateDeg + "deg) scaleY(-1)")
            $(".selecionado").attr('data-espelharY', -1);
        }

        $(".selecionado").trigger('mouseup');
    });

    // CAMADAS 
    $("#art-layers").sortable().on('mouseup touchend', function(){
        setTimeout(() => {
            countLayers();
        }, 100)
    });

    $(document).on('click', '.layer', function() {
        let id_elemento = $( this ).data('id-elemento');
        
        $( "div.elemento" ).removeClass('selecionado');
        $( "div.elemento .excluir-elemento" ).hide();
        $( "div.elemento .resizable-handle" ).hide();
        $( "div.elemento .ui-rotatable-handle" ).hide();
        $( "div.layer" ).removeClass('selected');
        $( this ).addClass('selected');
        //$( `#${id_elemento}` ).removeClass('bloqueado');

        if($('div#'+id_elemento).hasClass('bloqueado')) {
            $('div.bloquear-elemento').addClass('active');
            $('div.bloquear-elemento div.tooltip p.text-lighter').html('Liberar elemento');
        } else {
            $( `div#${id_elemento}` ).trigger('mouseup');
            $('div.bloquear-elemento div.tooltip p.text-lighter').html('Bloquear elemento');
        }
    });

    $( document ).on('mousedown touchstart', '.layer', function() {
        $( this ).css({'cursor': 'grabbing'});
    });

    $( document ).on('mouseup touchend', '.layer', function() {
        $( this ).css({'cursor': 'grab'});
    });
    // CAMADAS 

    $(document).on("mouseup touchend", "#medidor", function (e) {
        $('.open-action[data-button-id="meter"]').trigger('click');
        $('#medidor').css({'transition': 'ease-in-out 0.5s'});
    })

    $(document).on("mousedown touchstart", "#medidor", function () {
        $('#medidor').css({ 'transition' : 'ease-in-out 0s'});
    })

    $("div#boxModelo .fechar-box-modelo").click(function () {
		$("div#boxModelo").fadeOut()
		$("div#boxModelo iframe").attr("src", "")
	});

    $("div#boxAprovacao .fechar-box-aprovacao").click(function () {
		$("div#boxAprovacao").fadeOut();
        $("div#boxAprovacao iframe").attr("src", "");
        $(".checkbox-conferencia").prop("checked", false);
	});

    $(".checkbox-conferencia").click(function () {
		if ($('.checkbox-conferencia:checked').length == $('.checkbox-conferencia').length) {
			$('div#aprovado').css({opacity: '1', cursor: 'pointer'});
		} else {
			$('div#aprovado').css({opacity: '0.5', cursor: 'not-allowed'});
		}
	});

    // CURVAR TEXTO 
    $( ".bend-over-text" ).change(function() {
        /*
        let val = $(this).val();
        var text = '<span>' + $('#insert-text').val() + '</span>';
        var radius = 360 - (parseInt(val) * 10);

        $( ".bend-over-text" ).val(val);

        $('.selecionado').html(text).find('span').arctext({ radius: radius, dir: 1 });
        */

    })
    // CURVAR TEXTO 

    // SELECTS 
    $( ".select" ).click(function() {
        select = $(this).data('id-select');
        $( `#${select} .inside-select` ).toggle();
    })
    
    $( ".select .select-option" ).click(function() {
        let value = $(this).data('value');

        $(`#${select} .select-option`).css('background-color', 'unset');
        $( this ).css('background-color', '#f1f1f1');
        $(`#${select} .changed-option`).html(value);

        if($(this).hasClass('cup-size-option')) {
            changeMeasureTemplate(value);
        }

        if($(this).hasClass('font-option')) {
            $(`#${select} .changed-option`).css('font-family', value);
        }
        
        // MANIPULAR TEXT //
            if($('.selecionado').hasClass('text')) {
                console.log(select + ' = ' + value);
                if(select == 'font-size-select') {
                    $('.selecionado').css('font-size', value);
                } else if(select == 'font-select') {
                    $('.selecionado').css('font-family', value);
                    $('.layer.selected span.text-preview').css('font-family', value);
                }
            }
        // MANIPULAR TEXT //
    
        $( '.inside-select' ).fadeOut();
    })
    // SELECTS 

    // VER MAIS ICONS || FECHAR //
    $( document).on('click', '.see-more-icons', function(){
        let unix = new Date().getTime()
        var id_categoria = $(this).data('id-categoria');
        // se for aba da copa
        var copa = $(this).hasClass('see-more-icons-copa');

        if(copa) {
            $("#copa-content").slideUp();
            setTimeout(() => {
                $("#category-copa-session").show().append(loader);
            }, 300);
        } else {
            $("#carrousel-elements-session").slideUp();
            setTimeout(() => {
                $("#category-elements-session").show().append(loader);
            }, 300);
        }
        
        $.ajax({
            url: "getCategoryIcons/"+id_categoria+"?v=" + unix,
            context: document.body,
            success: (result) => {

                for(var i in result) {
                    var rowIcon = '<div class="icon-card flex mg-btm-10" id="icon-galeria-'+result[i].id+'">'+result[i].svg+'</div>';
                    if(copa) {
                        $('#copa-list').append(rowIcon);
                    } else {
                        $('#icons-list').append(rowIcon);
                    }
                };

                setTimeout(() => {
                    $(".loader-session").remove();
                }, 300);
            },
        })
    });

    $( document ).on("click", '.close-icon-list', function(){
        $("#category-elements-session").slideUp();
        $("#category-elements-session #icons-list").html('');
        setTimeout(() => {
            $("#carrousel-elements-session").show();
            $("input#search-elements").val('');
        }, 300);
    });
    $( document ).on("click", '.close-copa-list', function(){
        $("#category-copa-session").slideUp();
        $("#category-copa-session #copa-list").html('');
        setTimeout(() => {
            $("#copa-content").show();
        }, 300);
    });
    $( document ).on("click", '.close-arts-list', function(){
        $("#category-arts-list-session").slideUp();
        $("#category-arts-list-session #arts-list").html('');
        setTimeout(() => {
            $(".template-arts-content").show();
        }, 300);
    });
    // VER MAIS ICONS || FECHAR //

    $( document ).on("click", '.copa-button-action', function(){
        // let categoria = $( this ).data('category');
        
        // $( ".copa-extended-session" ).hide();
        // $(`#${categoria}-copa`).fadeIn();
    });

    $( document ).on("click", ".create-session", function(){
        hideElements();
    });

    $(".copo-3d").click(function(){
        hideElements();
        gerarModelo3D();
        $(this).removeClass('active')
    });

    $(document).on('keydown', e => {
        // e.preventDefault()
        const key = e.keyCode

        if (!$('.selecionado').length) return;

        let top  = $('.selecionado').css('top').replace('px', '')
        let left = $('.selecionado').css('left').replace('px', '')

        if (key == 37) left--
        if (key == 38) top--
        if (key == 39) left++
        if (key == 40) top++

        top  += 'px'
        left += 'px'

        $('.selecionado').css({'top': top, 'left':left})
    })

    // SEARCH PANTONES
        $('#search-pantone').keyup(function () {
            busca($(this).val(), '.bloco-pantone');
        });
    // SEARCH PANTONES

    // SEARCH ELEMENTS
        $('i.search-elements-submit').click(function () {
            buscaElementos();
        });

        $('#search-elements').keyup(function (e) {
            if(e.keyCode == 13) {
                buscaElementos();
            }
        });
    // SEARCH ELEMENTS

    // ARTE PRONTA
    $(document).on("click", "a.art-selector", function (e) {
        $("#spinner").fadeIn(200);
    });
    // ARTE PRONTA

    // SALVAR E CONTINUAR DEPOIS
    $("#save-continue").click(function(){
        $("#spinner").fadeIn(200);
        hideElements();
        $('#continue').trigger('click');
        $("#aprovado").attr('data-action', 'salvar');
    });
    // SALVAR E CONTINUAR DEPOIS
});

function hideElements() {
    $(".selecionado").removeClass("selecionado");
    $(`div.layer`).removeClass("selected");
    $('.excluir-elemento').hide();
    $('.resizable-r').hide();
    $('.ui-rotatable-handle').hide();
    $('div.custom-session div.surrounded-session').hide();
    $('div.custom-session div.infos-content').fadeIn(500);
}

function removeElements() {
    let id_elemento = $( '.selecionado' ).attr('id');
    if(id_elemento) {
        $( `.layer[data-id-elemento="${id_elemento}"]` ).remove();
    }
    
    $('.selecionado').remove();
    $('textarea#insert-text').val('');
    
    countLayers();
}

function convertToAngle(matrix) {
    
    var values = matrix.split('(')[1],
        values = values.split(')')[0],
        values = values.split(',');

    var sin = values[1]; // 0.5

    return Math.round(Math.asin(sin) * (180/Math.PI));
    
    /*
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }

    if(angle < 0) angle +=360;
    return angle;
    */
}

function componentToHex(c) {
    //console.log(c);
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
    var rgbElemento = rgb.replace('(', '').replace(')', '').replace('rgb', '').split(", ")
    r = parseInt(rgbElemento[0]);
    g = parseInt(rgbElemento[1]);
    b = parseInt(rgbElemento[2]);
    return "#" + componentToHex(r).toUpperCase() + componentToHex(g).toUpperCase() + componentToHex(b).toUpperCase();
}

function presetText(id) {
    var fontSize = $('div#elemento-'+id).css('font-size');
    var fontFamily = $('div#elemento-'+id).css('font-family').replaceAll('"', '');
    //console.log('ID = ' + id);
    //console.log('FS = ' + fontSize);
    //console.log('FF = ' + fontFamily);
    $('div#font-size-select span.changed-option').html(fontSize);
    $('div#font-select span.changed-option').html(fontFamily);
    $('div#font-select span.changed-option').css('font-family', fontFamily);
}

// FUNÃ‡Ã•ES //
function copy() {
	var text = $("div.ampliar-box-modelo a").attr('href');
	navigator.clipboard.writeText(text).then(function() {
		Swal.fire(
            'Link copiado com sucesso',
            '',
            'success'
        )
	}, function(err) {
		console.error('Async: Could not copy text: ', err);
	});
}

function countLayers() {
    let id_elemento;
    let zIndexElement;
    let counterElements = 1;
    let layersLength = $( ".layer" ).length + 1;
    let elementPosition;
    let svg;
    let layers = [];

    if($( ".layer" ).length == 0) {
        $(".content-art-layers").fadeOut();
        return;
    }

    $( ".layer" ).each(function(){
        id_elemento = $(this).data('id-elemento');
        elementPosition = layersLength - counterElements; 

        $( this ).attr('data-id-layer', elementPosition);
        $(`#${id_elemento}`).css({'z-index' : elementPosition});
        $( `.layer[data-id-layer="${elementPosition}"] .layer-number` ).html(counterElements);

        svg = $( `.layer[data-id-layer="${elementPosition}"] svg` ).html();

        counterElements++;
    });
}

/*
function verifyLock(id_elemento) {
    let elementoBloqueado = $( `div#elemento-${id_elemento}` ).hasClass('bloqueado');
    let layer = $( `.layer[data-id-elemento='${id_elemento}']` ).hasClass('bloqueado');

    $( ".bloquear-elemento" ).removeClass('active').attr('data-id-elemento', id_elemento);

    if(elementoBloqueado) {
        $( ".bloquear-elemento" ).addClass('active');
        $( `#${id_elemento}` ).removeClass('selecionado');
        $('.excluir-elemento').hide();
        setTimeout(() => {
            $('.resizable-r').hide();
        }, 1);
        $('.ui-rotatable-handle').hide();
    } 
}
*/

function busca(value,targetSelector){
	if(value != '') {
		$(targetSelector).show();
		$(targetSelector+':not([title^="'+ value +'"])').hide();
	} else {
		$(targetSelector).show();
	}
}

function ajustaFontes() {
	$("div#html2canvas div.elemento").each(function(){
		var fontFamily = $(this).css('font-family');
        //console.log(fontFamily);
		if(fontFamily == 'Amigos') {
			var topFS = parseInt($(this).css('top').replace('px', '')) - 10;
			$(this).css('top', topFS + 'px');
		} else if(fontFamily == '"Lovely Valentine"') {
			var topFS = parseInt($(this).css('top').replace('px', '')) + 10;
			$(this).css('top', topFS + 'px');
            //console.log(topFS);
		}
	});
}

function buscaElementos(){
	let unix = new Date().getTime();
    var search = $('#search-elements').val();
    if(search.length >= 1) {
        //$("#spinner").fadeIn(200);

        $("#carrousel-elements-session").slideUp();
        setTimeout(() => {
            $("#category-elements-session").show().append(loader);
        }, 300);

        $("#category-elements-session #icons-list").html('');

        $.ajax({
            url: "getSearchedIcons/"+search+"?v=" + unix,
            context: document.body,
            success: (result) => {

                for(var i in result) {
                    var rowIcon = '<div class="icon-card flex mg-btm-10" id="icon-galeria-'+result[i].id+'">'+result[i].svg+'</div>';
                    $('#icons-list').append(rowIcon);
                };

                //$("#spinner").fadeOut(200);
                
                setTimeout(() => {
                    $(".loader-session").remove();
                }, 500);
                
            }
        });
    }
}