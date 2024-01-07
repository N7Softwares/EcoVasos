let url_string = window.location.href;
let url = new URL(url_string);
let id_medida = url.searchParams.get("id_medida") || 1;
let toques = url.searchParams.get("toques") || 1;
let quantidade = url.searchParams.get("quantidade") || 500;
let getCookie = url.searchParams.get("cookie");
let getKit = url.searchParams.get("kit");
let getID = url.searchParams.get("id");
let idArtePronta = url.searchParams.get("ap");
//console.log('ID Medida = ' + id_medida);

let getCep = url.searchParams.get("cep");
let getEstado = url.searchParams.get("estado");
let getRadio = url.searchParams.get("radio");
let getPointId = url.searchParams.get("point_id");

let getIdCarrinho = url.searchParams.get("id_carrinho");
let getPedido = url.searchParams.get("id_pedido");
let getIdProduto = url.searchParams.get("id_produto");
let getAction = url.searchParams.get("action");
let filename = null;
let idCliente = null;

// TUTORIAIS
let step = 1;
let titleStep;
let textStep;

// CORES DO GABARITO 
let id_cor = url.searchParams.get("cor_copo") || 9;
let id_tipo;
let tipo = 'copo';
let id_cor_tampa = url.searchParams.get("cor_tampa") || "";
let classe_cor;
let cor;

if(id_medida == 4 && id_cor == 9) {
    id_cor = 3;
}

if(id_medida == 4 && !id_cor_tampa) {
    id_cor_tampa = 25;
}

let corAtual = {
	cor1: "#000000",
	cor2: null,
	cor3: null,
	cor4: null,
}

if(toques >= 2) {
    corAtual.cor2 = '#F93822';
}

if(toques >= 3) {
    corAtual.cor3 = '#FBE122';
}

if(toques >= 4) {
    corAtual.cor4 = '#0072CE';
}

if(id_medida == 1) {
    $('div#medidor').css({'left' : '702px', 'height' : '589px'});
} else if(id_medida == 2) {
    $('div#medidor').css({'left' : '710px', 'height' : '705px'});
} else if(id_medida == 3) {
    $('div#medidor').css({'left' : '696px', 'height' : '790px'});
    $('div.opcao.cor[data-cor="#00F173"]').css({'display' : 'none'});
} else if(id_medida == 4) {
    $('div#medidor').css({'left' : '365px', 'height' : '560px'});
}

let corMedidor = "#000000";
let corGabarito = "#DBDBDB";

// ELEMENTOS
var topElemento;
var leftElemento;
var resizeWidth;
let elementos = [];
let corElemento;
let calcFontSize;


$(document).ready(function() {

    $("#medidor").draggable({
		axis: "x",
	});

    // TUTORIAL //
    if (!window.sessionStorage.getItem("tutorial"))
    {
        $('.shadow-background').css({'display' : 'flex'});
        $('.create-session .button').css({'pointer-events': 'none'});
        $('.custom-session').css({'pointer-events': 'none'});
        $('.custom-session .surrounded-session').css({'display': 'unset'});
    } 

    verifyTutorialStep();

    $('#tutorial').click(function(){
        TutorialSteps();
    });

    $('#got-it').click(function(){
        window.sessionStorage.setItem("tutorial", "true");
        $('.shadow-background').hide();
        $('.create-session .button').css({'pointer-events': 'unset'});
        $('.custom-session').css({'pointer-events': 'unset'});
        $('.custom-session .surrounded-session').css({'display': 'none'});
    });

    $('#learn').click(function(){
        TutorialSteps();
        $('.shadow-background').fadeOut();
    });

    $('.next-step').click(function(){
        TutorialSteps();
    });

    $('.skip-tutorial').click(function(){
        TutorialSteps(8);
    });
    // TUTORIAL //

    // MANIPULAR MEDIDOR //
    $(document).on("click", "#remove-meter", function (e) {
        $("div#medidor").hide();
    });

    $(document).on("click", "#add-meter", function (e) {
        $("div#medidor").show();
    });
    // MANIPULAR MEDIDOR //

    // CORES //
    $(".colors").click(function(){
        var id_select = $(this).data('id-select');

        if(!$(this).hasClass('open')) {
            $(`.select-colors`).hide();
            $(`.select-colors[data-id-select="${id_select}"]`).slideDown();
        }
        
        $(`.colors`).removeClass('open');
        $(this).addClass('open');
    });

    $(".cor").click(function(){
        id_tipo = $(this).data('id_tipo');
        id_cor = $(this).data('id_cor');
        classe_cor = $(this).data('classe-cor');
        cor = $(this).data('cor');
        corGabarito = cor;
        var tipoCor = $(this).data('nome');

        $(".template-area").css({'background-color' : cor});
        $( `.color-name` ).html('');
        $( `.cores-${classe_cor}` ).html($(this).attr('title'));
        $(this).removeClass('open');
        $('span.cor-modelo').html(tipoCor);
        $('.cup-color').html(tipoCor);
    });

    $(".cor-tampa").click(function(){
        id_cor_tampa = $(this).data('id_cor');

        $('span.tampa-color').html('- Tapa ' + $(this).attr('title'));
        $( `.cores-tampa` ).html($(this).attr('title'));
    });

    $(".escolher-cor").click(function(){
        var id = $(".toques.toque-atual").data("class")
        var corAnterior = $(".toques.toque-atual").css('background-color');
        corMedidor = $("div#medidor svg").css("fill");
        cor = $(this).data('cor');
        var nomeCor = $(this).attr('title');
        $(".cor-atual").removeClass('cor-atual');
        $(this).addClass('cor-atual');
        $(".toques.toque-atual").css('background-color', cor);
        $(".toques.toque-atual").attr('data-cor', cor);
        $(".toques.toque-atual").attr('title', nomeCor);

        set_color(id, cor)

        if(corAnterior == corMedidor) {
            $("div#medidor svg").css("fill", cor)
            corMedidor = cor
        }

        $('.cor-medidor[data-class="'+id+'"]').css('background-color', cor);
        $('.cor-medidor[data-class="'+id+'"]').attr('data-cor', cor);
        $('.cor-medidor[data-class="'+id+'"]').attr('title', nomeCor);

        $('.cor-elemento[data-class="'+id+'"]').css('background-color', cor);
        $('.cor-elemento[data-class="'+id+'"]').attr('data-cor', cor);
        $('.cor-elemento[data-class="'+id+'"]').attr('title', nomeCor);

        //console.log(corAtual);
        //console.log('Cor medidor = ' + corMedidor);

        $( "div.elemento" ).each(function() {
            let id_elemento = $( this ).attr('id');
            
            if($(this).hasClass('text')) {
                corElemento = rgbToHex($(this).css('color'));
            } else {
                corElemento = rgbToHex($(this).css('fill'));
            }
            //console.log(corElemento + '=' + rgbToHex(corAnterior))
            if(corElemento == rgbToHex(corAnterior)) {
                if($(this).hasClass('text')) {
                    $(this).css("color", cor);
                    $(`.layer[data-id-elemento="${id_elemento}"] span.text-preview`).css("color", cor);
                } else {
                    $(this).css("fill", cor);
                    $(`.layer[data-id-elemento="${id_elemento}"] svg`).css("fill", cor);
                }

                if($(this).hasClass('img-svg')) { // Altera a cor das logos
                    let unix = new Date().getTime();
                    var link = $(this).attr('data-link-img');
                    corLogoAnterior = rgbToHex(corAnterior).replace('#', '');
                    //console.log(link);
                    
                    $("#spinner").fadeIn(200)
                    $.ajax({
                        method: "POST",
                        url: "img2svg?v=" + unix,
                        data: {
                            link: link,
                            cor_nova: cor,
                            cor_antiga: corLogoAnterior,
                        },
                        context: document.body,
                        success: (result) => {
                            const linkImg = `${result}&v=${unix}`
                            $(this).css('background-image', `url(${linkImg})`);
                            $(this).data('link-img', linkImg);
                            $(`.layer[data-id-elemento="${id_elemento}"] div`).css("background-image", `url(${linkImg})`);
                            $("#spinner").fadeOut(200)
                        },
                    })
                    
                }
            }
        });

        $('div.custom-session div.content .surrounded-session').hide();

        hideElements();
    });

    $(".toques").click(function(){
        cor = $(this).attr('data-cor');
        $(".toques").removeClass('toque-atual');
        $(this).addClass('toque-atual');

        $(".cor-atual").removeClass('cor-atual');
        $('.escolher-cor[data-cor="'+cor+'"]').addClass('cor-atual');
    });

    $(".cor-medidor").click(function(){
        $(".cor-medidor").removeClass('toque-atual');
        $(this).addClass('toque-atual');
        cor = $(this).attr('data-cor');

        $("div#medidor svg").css("fill", cor)
        corMedidor = cor
    });

    $(".cor-elemento").click(function() {
        $(".cor-elemento").removeClass('toque-selecionado');
        $(this).addClass('toque-selecionado');
        cor = $(this).attr('data-cor');
        var corAnterior = rgbToHex($(".selecionado").css('fill')).replace('#', '');
        console.log('Cor anterior = ' + corAnterior);

        if($(".selecionado").hasClass('text')) {
            $(".selecionado").css("color", cor);
            $(".layer.selected span.text-preview").css("color", cor);
        } else {
            $(".selecionado").css("fill", cor);
            $(".layer.selected svg").css("fill", cor);
        }

        if($(".selecionado").hasClass('img-svg')) {
            let id_elemento = $( '.selecionado' ).attr('id');
            let unix = new Date().getTime();
            var link = $(".selecionado").attr('data-link-img');
            //console.log(link);
            
            $("#spinner").fadeIn(200)
            $.ajax({
                method: "POST",
                url: "img2svg?v=" + unix,
                data: {
                    link: link,
                    cor_nova: cor,
                    cor_antiga: corAnterior,
                },
                context: document.body,
                success: (result) => {
                    const linkImg = `${result}&v=${unix}`
                    $(".selecionado").css('background-image', `url(${linkImg})`)
                    $(".selecionado").data('link-img', linkImg);
                    $(`.layer[data-id-elemento="${id_elemento}"] div`).css("background-image", `url(${linkImg})`);
                    $("#spinner").fadeOut(200)
                },
            })
            
        }

        $(`.button[data-content="create-session"]`).removeClass('active');
        $(this).addClass('active');
        $(`.content[data-content="create-session"]`).hide();
        $(`[data-button-id="art-colors"]`).show();
        //$("#icons-list").html('');
        $('div.toques[data-cor="'+cor+'"]').trigger('click');
    });
    // CORES //

    $(".button.open-action").click(function(){
        var content = $(this).data("content");
        var id = $(this).data("button-id");
 
        $(`.button[data-content="${content}"]`).removeClass('active');
        $(this).addClass('active');
        $(`.content[data-content="${content}"]`).hide();
        $(`[data-button-id="${id}"]`).show();
        $("#icons-list").html('');
        $("#copa-list").html('');
        $("#arts-list").html('');
        hideElements();

        if(id == 'meter') { // Menu Medidor
            //console.log('Cor medidor = ' + corMedidor);
            $('.cor-medidor[data-cor="'+corMedidor+'"]').addClass('toque-atual');
        } else if(id == 'texts') {
            $('textarea#insert-text').val('');
            $('button#apply-text').show();
            $('button#new-text').hide();
        } else if (id == 'elements') {
            $( "#carrousel-elements-session" ).fadeIn();
            $( "#category-elements-session" ).hide();   
        } else if (id == 'copa') {
            $(`#copa-content`).fadeIn();
            $("#category-copa-session").hide();
            // $("#copa-content .see-more-icons-copa").trigger('click');
            //$('p.see-more-icons-copa').trigger('click');
        } else if (id == 'ready-arts') {
            $(`.template-arts-content`).fadeIn();
            $("#category-arts-list-session").hide();
        }
    });

    $("#continue").click(function(){
        hideElements();
        $("div#html2canvas").html('');
        $("#spinner").fadeIn(200);

        var unix = new Date().getTime()
        var bgGabarito = $('div#gabarito').css('background-color');
        $("div#gabarito").clone().appendTo("div#html2canvas");

        var el = document.getElementById('html2canvas');
        el.style.fontFeatureSettings = '"liga" 0';
        el.style.fontVariant = 'normal';

        $("div#html2canvas div#gabarito").css('background-image', 'none');
        ajustaFontes();

        var count = 1;
        var coresImpressao = null;
        $(".cores-de-impressao-gabarito").html('');
        $(".toques").each(function () {
            var coresImpressao = '<p class="cor-impressao-'+count+'"><span class="bolinha-cor bolinha-cor-'+count+'" style="background-color: ' + $(this).data('cor') + ';"></span> <span class="nome-cor-impressao">' + $(this).attr('title'); + '</span></p>';
            $(".cores-de-impressao-gabarito").append(coresImpressao);
            count++;
        });

        tipo = 'copo';
        if(id_medida == 4) {
            tipo = 'termico';
        }
        
        setTimeout(function() {
            html2canvas(document.querySelector("div#html2canvas"), { scale: 2 }).then((canvas) => {
                var a = document.createElement("a")
                a.href = canvas.toDataURL("image/jpeg")
    
                filename = unix + ".jpg";
                $.ajax({
                    type: "POST",
                    url: "gerarGabarito?v="+unix,
                    data: { filename: filename, img: a.href, bg: bgGabarito, tipo: 'serigrafia', id_medida: id_medida },
                    success: function (data) {
                        //console.log(filename);
                        $("div#html2canvas").html('');

                        $("div#boxAprovacao").fadeIn();
                        $("div#boxAprovacao iframe").attr("src", "http://127.0.0.1:5500/customizer?medida=" + id_medida + "&ferramenta=" + filename + "&tipo=" + tipo + "&id_cor_tampa=" + id_cor_tampa + "&time=" + unix);
				        $("div#boxAprovacao img#mascaraGabarito").attr("src", "http://127.0.0.1:5500/customizer/img/area-sem-impressao/"+id_medida+".png")
                        //$("div#boxAprovacao iframe").attr("src", "/customizer?medida=" + id_medida + "&ferramenta=" + filename)
                        $("div#boxAprovacao img#imgGabarito").attr("src", "./uploads/" + filename);
                        $("a#baixar-arte").attr("href", "./uploads/" + filename);

                        setTimeout(function() {
                            var height3D = (parseInt($('#mascaraGabarito').css('height').replace('px', '')) + 30);
                            if(height3D < 200) {
                                height3D = 300;
                            }
                            setTimeout(function() {
                                $('#aprovacao-3d').css('height', height3D + 'px');
                                console.log($('#mascaraGabarito').css('height'));
                            }, 500);
                        }, 500);
;
                        $("#spinner").fadeOut(200);
                    },
                })
            })
        }, 2000);
    });

    $("#aprovado").click(function() {
        var unix = new Date().getTime();
		id_transportadora = url.searchParams.get("id_transportadora");
		servico_frete = url.searchParams.get("servico_frete");
        medida = $(this).data('medida');
        let continuarDepois = $(this).data('action');
        //console.log(continuarDepois);

        if ($('.checkbox-conferencia:checked').length == $('.checkbox-conferencia').length || continuarDepois == 'salvar') {
            $("#spinner").fadeIn(200);

            gabaritoHTML = new $("#gabarito").html();

            if(corMedidor.includes('rgb')) {
                corMedidor = rgbToHex(corMedidor);
            }

            $.ajax({
				method: "POST",
				url: "setArte?v=" + unix,
				data: {
					tipo: "Serigrafia",
					medida: medida,
					id_medida: id_medida,
					html: gabaritoHTML,
					largura: document.getElementById("gabarito").clientWidth,
					altura: document.getElementById("gabarito").clientHeight,
                    id_cor_gabarito: id_cor,
					cor_gabarito: corGabarito,
					id_tipo: id_tipo,
					quantidade: quantidade,
					serigrafia: toques,
					id_cor: id_cor,
                    id_cor_tampa: id_cor_tampa || null,
					update: getID || null,
					id_carrinho: getIdCarrinho || null,
					id_pedido: getPedido || null,
					id_produto: getIdProduto || null,
					cookie: getCookie,
                    kit: getKit || null,
					quantidade_cores: toques,
					cor_1: corAtual.cor1,
					cor_2: corAtual.cor2,
					cor_3: corAtual.cor3,
					cor_4: corAtual.cor4,
					customizer: filename,
					cor_medidor: corMedidor,
					id_arte_pronta: idArtePronta || null,
                    idCliente: idCliente || null,
                    continuarDepois: continuarDepois
				},
				context: document.body,
				success: (result) => {
                    if(continuarDepois == 'salvar') {
                        window.parent.location.href = "/qero/login?v=" + unix + "&id_arte="+result;
                    } else if(getAction == 'comprar') {
						window.parent.location.href = "/qero/compra?id_arte="+result+"&id_produto=1&id_medida="+id_medida+"&impressoes="+toques+"&id_cor="+id_cor+"&v=" + unix
						return;
					} else if(getIdCarrinho) {
						window.parent.location.href = "/qero/personalizacion-productos?cep="+getCep+"&estado="+getEstado+"&radio="+getRadio+"&point_id="+getPointId+"&v=" + unix
						return;
					} else if(getPedido) {
						window.parent.location.href = "/qero/pedido/"+getPedido+"?v=" + unix
					} else {
						window.parent.location.href = "/qero/personalizacion-productos?cep="+getCep+"&estado="+getEstado+"&radio="+getRadio+"&point_id="+getPointId+"&v=" + unix
					}
				},
			})
        }
    });

    // ADD ICONS //
        $(document).on("click", ".icon-card", function (e) {
            let seeMore = $( this ).hasClass( 'see-more-card' );

            if(!seeMore) {
                let unix = new Date().getTime()
                let svg = $(this).html();
                let divElemento = '<div id="elemento-'+unix+'" class="elemento icon" style="z-index: 1; top: calc(50% - 75px); left: calc(50% - 75px); fill: '+corAtual.cor1+'" data-espelharX="1" data-espelharY="1" data-degrees="0">' + svg + '<i class="excluir-elemento far fa-trash-alt" style="display: none;"></i></div>';
                let divCamada = '<div data-id-elemento="elemento-'+unix+'" class="layer mg-btm-10 flex align-center"><p class="text fs-12"><span class="layer-number text-semi-bold">0</span></p><div class="flex content-center width-100" style="fill: '+corAtual.cor1+'">' + svg + '</div></div>';
        
                document.getElementById("gabarito").innerHTML += divElemento;

                // ADD CAMADA - LATERAL
                $( ".content-art-layers" ).fadeIn();
                $( "#art-layers" ).prepend( divCamada );
        
                $('.excluir-elemento').hide();

                var viewbox = $('div#elemento-'+unix+' svg').attr('viewBox');
                var split = viewbox.split(" ");
                console.log(split);

                $('div#elemento-'+unix+' svg').attr('width', split[2]);
                $('div#elemento-'+unix+' svg').attr('height', split[3]);

                addElement(unix, "icon");
                countLayers();
            }
        });
    // ADD ICONS //

    // COLOR ICONS //
        $('.color-picker').change(function(){
            let idColorPicker = $(this).data('color');
            let color = $(this).val();

            $(`.${idColorPicker}`).css('fill', color)
        })
    // COLOR ICONS //

    // ADD TEXT //
        $(document).on("click", "#apply-text", function (e) {
            //console.log($('textarea#insert-text').val());
            let unix = new Date().getTime()
            let text = $('textarea#insert-text').val().replace(/\n/g, "<br>");
            let fontSize = $('div#font-size-select span.changed-option').html();
            let fontFamily = $('div#font-select span.changed-option').html();
            //console.log('FS = ' + fontSize);

            if(text) {
                let divElemento = '<div id="elemento-'+unix+'" class="elemento text" style="z-index: 1; top: calc(50% - 75px); left: calc(50% - 75px); font-size: '+fontSize+'; font-family: '+fontFamily+'; color: '+corAtual.cor1+'" data-espelharX="1" data-espelharY="1" data-degrees="0"><span>' + text + '</span><i class="excluir-elemento far fa-trash-alt" style="display: none;"></i></div>';
                let divCamada = '<div data-id-elemento="elemento-'+unix+'" class="layer mg-btm-10 flex align-center"><p class="text fs-12"><span class="layer-number text-semi-bold">0</span></p><div class="flex content-center width-100"><span class="text-preview" style="font-family: '+fontFamily+'; color: '+corAtual.cor1+'">' + text + '</span></div></div>';
        
                document.getElementById("gabarito").innerHTML += divElemento;

                    // ADD CAMADA - LATERAL
                $( ".content-art-layers" ).fadeIn();
                $( "#art-layers" ).prepend( divCamada );
        
                $('textarea#insert-text').val('');

                $('.excluir-elemento').hide();
                addElement(unix, "text");

                $('div#elemento-' + unix).trigger('mouseup');
                countLayers();
            }
        });

        $(document).on("click", "#new-text", function (e) {
            $('textarea#insert-text').val('Novo texto');
            $('#apply-text').trigger('click');
        });

        $(document).on("keyup", "textarea#insert-text", function (e) {
            if($(".elemento").hasClass('selecionado') && $(".selecionado").hasClass('text')) {
                let text = $('textarea#insert-text').val().replace(/\n/g, "<br>");
                $(".selecionado span").html(text);
                $('.selecionado').trigger('click');
            } else {
                $('#apply-text').trigger('click');
            }
        });
    // ADD TEXT //

    // MANIPULAR ELEMENTOS //
        $(document).on("mouseup touchend", ".elemento", function (e) {
            let id = $(this).attr("id").replace("elemento-", "");
            let corElemento;
            let indice;
            elementos.forEach((v, i) => {
                v.id == id ? (indice = i) : false
            })
            let rotateDeg = 0;
            let divisor = parseInt($(this).css('font-size')) / (parseInt($(this).css('width')));
            let divisorIcon = parseFloat($('div#elemento-' + id + ' svg').attr('height') / $('div#elemento-' + id + ' svg').attr('width'));
            let divisorImg = parseInt($(this).css('height')) / (parseInt($(this).css('width')));
            console.log(divisor);

            if($(this).hasClass('text')) {
                corElemento = $(this).css('color');
                var texto = $('div#elemento-'+id + ' span').html()
                .replaceAll(/<br\s*[\/]?>/gi, "\n")

                //$('.open-action[data-button-id="texts"]').trigger('click');
                $('.content[data-content="create-session"]').hide();
                $('.open-action').removeClass('active');
                $('[data-button-id="texts"]').show().addClass('active');

                $('textarea#insert-text').val(texto);
                $('button#apply-text').hide();
                $('button#new-text').show();

                presetText(id);

                if(texto.length >= 13) {
                    texto = texto.substr(0, 13) + '...';
                }
                $(`div.layer[data-id-elemento="elemento-${id}"] div span`).html(texto);
            } else if($(this).hasClass('icon')) {
                corElemento = $(this).css('fill');
                $('.content[data-content="create-session"]').hide();
                $('.button.open-action[data-button-id="elements"]').trigger('click');
            } else if($(this).hasClass('img-svg')) {
                $('.content[data-content="create-session"]').hide();
                $('.button.open-action[data-button-id="uploads"]').trigger('click');
                corElemento = $(this).css('fill');
            } else {
                corElemento = $(this).css('fill');
            }
            
            var selecionadoDeg = $('div#elemento-'+id).css('transform');
            if(selecionadoDeg) {
                rotateDeg = $('div#elemento-'+id).attr('data-degrees');
                $('div#elemento-'+id).css('transform', rotateDeg);
            }

            if(corElemento) {
                corElemento = rgbToHex(corElemento);
                $('.cor-elemento').removeClass('toque-selecionado');
                $('.cor-elemento[data-cor="'+corElemento+'"]').addClass('toque-selecionado');
            }

            // adiciona classe "selecionado" nos elementos
            $(".selecionado").removeClass("selecionado");
            $('div#elemento-'+id).addClass("selecionado");
            // adiciona classe "selected" nas camadas
            $(`div.layer`).removeClass("selected");
            $(`div.layer[data-id-elemento="elemento-${id}"]`).addClass("selected");
            $('div.custom-session div.content .surrounded-session').fadeIn();

            topElemento = $(".selecionado").css('top');
            leftElemento = $(".selecionado").css('left');

            $( ".resizable" ).resizable( "destroy" );

            $('.excluir-elemento').hide();
            $('.resizable-r').hide();
            $('.ui-rotatable-handle').hide();

            $('div#elemento-'+id+' .excluir-elemento').show();
            $('div#elemento-'+id+' .resizable-r').show();
            $('div#elemento-'+id+' .ui-rotatable-handle').show();

            var zIndex = parseInt($(this).css('z-index'));
		    $("span#layers").html(zIndex);

            $( function() {    
                $('div#elemento-'+id+'.resizable').resizable({
                    resize: function(event, ui) {  
                        let calcFontSize;
                        let resizeWidth = parseInt($('div#elemento-'+id).css('width'));
                        
                        $('div#elemento-'+id).css({top: topElemento, left: leftElemento});

                        if($('div#elemento-'+id).hasClass('img-svg')) { // Se for upload de logo
                            $('div#elemento-' + id).css({ 'width': resizeWidth, 'height': resizeWidth * divisorImg });
                        } else if($('div#elemento-'+id).hasClass('text')) { // Se for elemento TEXT
                            calcFontSize = parseInt(resizeWidth * divisor);
                            $(this).css({"font-size" : calcFontSize + "px", "width" : "", "height" : ""})
                            presetText(id);
                        } else if($('div#elemento-'+id).hasClass('icon')) { // Se for elemento SVG
                            $('div#elemento-' + id + ' svg').attr('width', resizeWidth);
                            $('div#elemento-' + id + ' svg').attr('height', (resizeWidth * divisorIcon));
                        }                          
                    },
                });

                $('div#elemento-'+id+'.selecionado').rotatable({
                    degrees: rotateDeg,
                    snap: true,
                    step: 1,
                    wheelRotate: false,
                    start: function(event, ui) {
                        //console.log('start');
                    },
                    // Callback fired during rotation.
                    rotate: function(event, ui) {
    
                        if(ui.angle.current < 0){
                            var given_angle = ui.angle.current+2*Math.PI;
                        } else {
                            var given_angle = ui.angle.current; 
                        }

                        degrees = Math.round(given_angle*180/ Math.PI);
                        
                        console.log(degrees)
                    },
                    // Callback fired on rotation end.
                    stop: function(event, ui) {
                        $('div#elemento-'+id).css('transform', 'rotate('+degrees+'deg)');
                        $('div#elemento-'+id).attr('data-degrees', degrees);
                        $('div#elemento-'+id).trigger('mouseup');
                    }
                });

                if(selecionadoDeg) {
                    $('div.virar-horizontal').removeClass('active');
                    $('div.virar-vertical').removeClass('active');
                    $('div.action-text-bold').removeClass('active');
                    $('div.action-text-italic').removeClass('active');
                    $('div.bloquear-elemento').removeClass('active');
                    $('div.action-text-align-left').removeClass('active');
                    $('div.action-text-align-center').removeClass('active');
                    $('div.action-text-align-right').removeClass('active');
                    var espelharX = $('div#elemento-'+id).attr('data-espelharX');
                    var espelharY = $('div#elemento-'+id).attr('data-espelharY');
                    setTimeout(() => {
                        $('div#elemento-'+id).css('transform', rotateDeg)
                        if(espelharX == -1) {
                            $('div#elemento-'+id).css('transform', 'rotate('+rotateDeg+'deg) scaleX(-1)');
                            $('div.virar-horizontal').addClass('active');
                        }
                        if(espelharY == -1) {
                            $('div#elemento-'+id).css('transform', 'rotate('+rotateDeg+'deg) scaleY(-1)');
                            $('div.virar-vertical').addClass('active');
                        }
                        if($('div#elemento-'+id).css('font-weight') == "700") {
                            $('div.action-text-bold').addClass('active');
                        }
                        if($('div#elemento-'+id).css('font-style') == "italic") {
                            $('div.action-text-italic').addClass('active');
                        }
                        if($('div#elemento-'+id).css('text-align') == "left") {
                            $('div.action-text-align-left').addClass('active');
                        }
                        if($('div#elemento-'+id).css('text-align') == "center") {
                            $('div.action-text-align-center').addClass('active');
                        }
                        if($('div#elemento-'+id).css('text-align') == "right") {
                            $('div.action-text-align-right').addClass('active');
                        }
                    }, 10);
                    //console.log(elementos[indice].rotate);
                }                
            });
        });
        
    // MANIPULAR ELEMENTOS //

    // ANEXAR LOGO
    $("#logo").change(function () {
        var unix = new Date().getTime()
		$("#spinner").fadeIn(200)

		let formData = new FormData($("#form")[0])
		$.ajax({
			type: "POST",
			url: "salvarLogo?v=" + unix,
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			success: result => {
				//console.log(result)
                const obj = JSON.parse(result);
                var divisor = parseFloat(obj.height / obj.width);
                var height = 200 * divisor;

                setTimeout(function() {
					$.ajax({
						method: "POST",
						url: "img2svg?v=" + unix,
						data: {
							cor: corAtual.cor1,
							filename: obj.src,
						},
						context: document.body,
						success: (result) => {
							
                            const linkImg = `${result}?v=${unix}`;
							let divElemento = `<div id="elemento-${unix}" data-link-img="${linkImg}" class="elemento img-svg" style="background-image: url(${linkImg}); width: 200px; height: ${height}px; z-index: 1; top: calc(50% - 75px); left: calc(50% - 75px); fill: ${corAtual.cor1}" data-espelharX="1" data-espelharY="1" data-degrees="0"><i class="excluir-elemento far fa-trash-alt" style="display:none"></i></div>`;
                            let divCamada = '<div data-id-elemento="elemento-'+unix+'" class="layer mg-btm-10 flex align-center"><p class="text fs-12"><span class="layer-number text-semi-bold">0</span></p><div class="flex content-center width-100" style="background-image: url(' + linkImg + '); width: 55px; height: 55px; margin: 0 auto; background-position: center; background-repeat: no-repeat; background-size: contain; background-color: rgba(255, 255, 255, 0);"></div></div>';
                            
                            // ADD CAMADA - LATERAL
                            $( ".content-art-layers" ).fadeIn();
                            $( "#art-layers" ).prepend( divCamada );

							document.getElementById("gabarito").innerHTML += divElemento
			
							addElement(unix, "img", null, null, null, null, linkImg);
                            countLayers();
							$("#spinner").fadeOut(200);
                    
						},
					})
				}, 1000);

                $("#logo").val("")
			},
		})
	})
    // ANEXAR LOGO

    // GRID
    $('#grid').click(function(){
        let template = $("div#gabarito");

		if (template.css("background-image") == "none") {
			template.css("background-image", 'url("./assets/img/grid.svg")')
			template.css("background-size", "20px")
		} else {
			template.css("background-image", "none")
		}
    });
    // GRID

    // GET ID //
    if(getID) {
        var unix = new Date().getTime();
        console.log(getID);
        $('#spinner').fadeIn();
        $.ajax({
            url: "getArte/" + getID + "?v=" + unix,
            context: document.body,
            success: (result) => {
                var cleanHtml = result.html.replaceAll('<div class="resizable-handle resizable-r" style="display: inline-block;">', '')
                .replaceAll('<div class="resizable-handle resizable-t">', '')
                .replaceAll('<div class="resizable-handle resizable-r">', '')
                .replaceAll('<div class="resizable-handle resizable-b">', '')
                .replaceAll('<div class="resizable-handle resizable-l">', '')
                .replaceAll('<div class="resizable-handle resizable-r" style="display: none;">', '')
                .replaceAll('<div class="resizable-handle resizable-r" style="display: flex;">', '')
                $("#gabarito").html(cleanHtml);
                $('div.cor[data-id_cor="'+result.id_cor_gabarito+'"]').trigger('click');

                $('div.color-cube[data-class="1"]').attr('title', result.cor_1);
                $('div.color-cube[data-class="1"]').attr('data-cor', result.cor_1);
                $('div.color-cube[data-class="1"]').css('background-color', result.cor_1);
                corAtual.cor1 = result.cor_1;

                if(result.cor_2) {
                    $('div.color-cube[data-class="2"]').attr('title', result.cor_2);
                    $('div.color-cube[data-class="2"]').attr('data-cor', result.cor_2);
                    $('div.color-cube[data-class="2"]').css('background-color', result.cor_2);
                    corAtual.cor2 = result.cor_2;
                }

                if(result.cor_3) {
                    $('div.color-cube[data-class="3"]').attr('title', result.cor_3);
                    $('div.color-cube[data-class="3"]').attr('data-cor', result.cor_3);
                    $('div.color-cube[data-class="3"]').css('background-color', result.cor_3);
                    corAtual.cor3 = result.cor_3;
                }

                if(result.cor_4) {
                    $('div.color-cube[data-class="4"]').attr('title', result.cor_4);
                    $('div.color-cube[data-class="4"]').attr('data-cor', result.cor_4);
                    $('div.color-cube[data-class="4"]').css('background-color', result.cor_4);
                    corAtual.cor4 = result.cor_4;
                }
                
                corMedidor = result.cor_medidor;

                enableElementsDraggable();

                setCamadas();

                $("#medidor").draggable({ axis: "x" });

                $('#spinner').fadeOut();
                
                window.sessionStorage.setItem("tutorial", "true");
                $('.shadow-background').hide();
                $('.create-session .button').css({'pointer-events': 'unset'});
                $('.custom-session').css({'pointer-events': 'unset'});

                console.log(corAtual);
            }
        }) // GET ID
    } else if(idArtePronta) { // GET AP //
        var unix = new Date().getTime();
        console.log(idArtePronta);
        $('#spinner').fadeIn();
        $.ajax({
            url: "getArte/" + idArtePronta + "?v=" + unix,
            context: document.body,
            success: (result) => {
                var cleanHtml = result.html.replaceAll('<div class="resizable-handle resizable-r" style="display: inline-block;">', '')
                .replaceAll('<div class="resizable-handle resizable-t">', '')
                .replaceAll('<div class="resizable-handle resizable-r">', '')
                .replaceAll('<div class="resizable-handle resizable-b">', '')
                .replaceAll('<div class="resizable-handle resizable-l">', '')
                .replaceAll('<div class="resizable-handle resizable-r" style="display: none;">', '')
                .replaceAll('<div class="resizable-handle resizable-r" style="display: flex;">', '')
                $("#gabarito").html(cleanHtml);
                $('div.cor[data-id_cor="'+result.id_cor_gabarito+'"]').trigger('click');

                $('div.color-cube[data-class="1"]').attr('title', result.cor_1);
                $('div.color-cube[data-class="1"]').attr('data-cor', result.cor_1);
                $('div.color-cube[data-class="1"]').css('background-color', result.cor_1);
                corAtual.cor1 = result.cor_1;

                if(result.cor_2) {
                    $('div.color-cube[data-class="2"]').attr('title', result.cor_2);
                    $('div.color-cube[data-class="2"]').attr('data-cor', result.cor_2);
                    $('div.color-cube[data-class="2"]').css('background-color', result.cor_2);
                    corAtual.cor2 = result.cor_2;
                }

                if(result.cor_3) {
                    $('div.color-cube[data-class="3"]').attr('title', result.cor_3);
                    $('div.color-cube[data-class="3"]').attr('data-cor', result.cor_3);
                    $('div.color-cube[data-class="3"]').css('background-color', result.cor_3);
                    corAtual.cor3 = result.cor_3;
                }

                if(result.cor_4) {
                    $('div.color-cube[data-class="4"]').attr('title', result.cor_4);
                    $('div.color-cube[data-class="4"]').attr('data-cor', result.cor_4);
                    $('div.color-cube[data-class="4"]').css('background-color', result.cor_4);
                    corAtual.cor4 = result.cor_4;
                }

                corMedidor = result.cor_medidor;

                enableElementsDraggable();

                setCamadas();

                $("#medidor").draggable({ axis: "x" });

                $('#spinner').fadeOut();

                console.log(corAtual);
            }
        }) // GET AP //
    } else if(id_medida != 4) {
        setTimeout(() => {
            let unix = new Date().getTime()
            let svg = '<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 26.11 150"><polygon class="st0" points="1.11,138.13 1.11,135.87 1.71,135.87 1.71,137.47 2.32,137.47 2.32,136.06 2.91,136.06 2.91,137.47   3.54,137.47 3.54,135.85 4.13,135.85 4.13,138.13 "/><path class="st0" d="M3.69,135.38l-0.47-0.39c0.23-0.24,0.36-0.56,0.37-0.89c0-0.27-0.11-0.44-0.28-0.44H3.29   c-0.17,0-0.25,0.1-0.38,0.61c-0.13,0.5-0.32,0.99-0.92,0.99l0,0c-0.51-0.02-0.92-0.44-0.91-0.96c0,0,0-0.05,0-0.08  c-0.01-0.4,0.13-0.79,0.38-1.11l0.5,0.34c-0.18,0.22-0.29,0.5-0.3,0.78c0,0.25,0.12,0.38,0.27,0.38l0,0c0.2,0,0.27-0.13,0.4-0.65    s0.38-0.95,0.9-0.95l0,0c0.6,0,0.93,0.46,0.93,1.1C4.16,134.58,3.99,135.03,3.69,135.38z"/><polygon class="st0" points="1.73,131.71 1.73,132.63 1.11,132.63 1.11,130.15 1.73,130.15 1.73,131.06 4.13,131.06 4.13,131.71 "/><polygon class="st0" points="1.11,129.56 1.11,127.3 1.71,127.3 1.71,128.9 2.32,128.9 2.32,127.49 2.91,127.49 2.91,128.9     3.54,128.9 3.54,127.28 4.13,127.28 4.13,129.56 "/><polygon class="st0" points="1.11,125.1 1.11,122.84 1.71,122.84 1.71,124.44 2.32,124.44 2.32,123.03 2.91,123.03 2.91,124.44   3.54,124.44 3.54,122.82 4.13,122.82 4.13,125.1 "/><path class="st0" d="M3.69,122.35l-0.47-0.39c0.23-0.24,0.36-0.56,0.37-0.89c0-0.27-0.11-0.44-0.28-0.44H3.29    c-0.17,0-0.25,0.1-0.38,0.61c-0.13,0.5-0.32,1-0.92,1l0,0c-0.5-0.02-0.9-0.43-0.91-0.94c0,0,0-0.05,0-0.08  c-0.01-0.4,0.13-0.79,0.38-1.11l0.5,0.34c-0.18,0.22-0.29,0.5-0.3,0.78c0,0.25,0.12,0.38,0.27,0.38l0,0c0.2,0,0.27-0.13,0.4-0.65    c0.13-0.52,0.38-0.95,0.9-0.95l0,0c0.6,0,0.93,0.46,0.93,1.11C4.15,121.57,3.99,122.01,3.69,122.35z"/><path class="st0" d="M2.84,117.86H1.11v-0.66h1.71c0.49,0,0.74-0.25,0.74-0.65c0-0.4-0.24-0.65-0.74-0.65H1.11v-0.66h1.7    c0.66-0.09,1.27,0.38,1.36,1.04c0.01,0.09,0.01,0.18,0,0.27c0.06,0.66-0.42,1.24-1.08,1.31C3.01,117.88,2.92,117.87,2.84,117.86z"/><polygon class="st0" points="1.11,114.5 1.11,113.88 2.97,112.48 1.11,112.48 1.11,111.83 4.13,111.83 4.13,112.39 2.21,113.84  4.13,113.84 4.13,114.5 "/><polygon class="st0" points="1.11,109.52 1.11,107.26 1.71,107.26 1.71,108.86 2.32,108.86 2.32,107.45 2.91,107.45 2.91,108.86  3.54,108.86 3.54,107.24 4.13,107.24 4.13,109.52 "/><path class="st0" d="M2.63,106.7L2.63,106.7c-0.83,0.01-1.52-0.64-1.55-1.48v-0.06c-0.02-0.44,0.15-0.87,0.47-1.18l0.49,0.42    c-0.21,0.19-0.33,0.46-0.34,0.74c0.01,0.49,0.42,0.88,0.91,0.87c0,0,0,0,0,0l0,0c0.5,0.03,0.92-0.35,0.95-0.85c0,0,0,0,0,0l0,0  c0.02-0.32-0.1-0.63-0.33-0.85l0.43-0.42c0.36,0.31,0.55,0.76,0.54,1.23c0.02,0.84-0.64,1.54-1.48,1.57c0,0,0,0,0,0L2.63,106.7z"/><path class="st0" d="M2.63,103.58L2.63,103.58c-0.88-0.06-1.54-0.82-1.48-1.7c0.05-0.8,0.69-1.43,1.48-1.48l0,0  c0.86-0.01,1.56,0.68,1.57,1.54c0,0,0,0.01,0,0.01v0.04c0.02,0.84-0.63,1.55-1.48,1.59H2.63z M2.63,101.08L2.63,101.08  c-0.5-0.02-0.92,0.37-0.94,0.87c0,0,0,0,0,0l0,0c0.01,0.5,0.43,0.9,0.93,0.89c0,0,0,0,0,0l0,0c0.51,0.02,0.93-0.37,0.95-0.88    c0,0,0,0,0,0l0,0c-0.01-0.5-0.42-0.89-0.92-0.89l0,0L2.63,101.08z"/><polygon class="st0" points="1.11,100.14 1.11,99.4 3.24,98.62 1.11,97.84 1.11,97.13 4.16,98.34 4.16,98.92 "/><path class="st0" d="M1.08,95.99v-0.61l3.04-1.28v0.69l-0.68,0.27v1.27l0.68,0.27v0.68L1.08,95.99z M2.86,95.29L2.86,95.29  l-0.98,0.4l0.98,0.39V95.29z"/><path class="st0" d="M3.69,93.79L3.22,93.4c0.23-0.24,0.36-0.57,0.37-0.9c0-0.27-0.11-0.44-0.28-0.44H3.29   c-0.17,0-0.25,0.1-0.38,0.61c-0.13,0.5-0.32,0.99-0.92,0.99l0,0c-0.51-0.02-0.92-0.45-0.91-0.96c0,0,0-0.05,0-0.07  c-0.01-0.41,0.13-0.8,0.38-1.11l0.5,0.34c-0.18,0.22-0.29,0.5-0.3,0.78c0,0.25,0.12,0.38,0.27,0.38l0,0c0.2,0,0.27-0.13,0.4-0.65    c0.13-0.52,0.38-0.95,0.9-0.95l0,0c0.6,0,0.93,0.46,0.93,1.1C4.16,92.98,4,93.44,3.69,93.79z"/><path class="st0" d="M2.63,90.89L2.63,90.89c-0.88-0.06-1.54-0.82-1.48-1.7c0.05-0.8,0.69-1.43,1.48-1.48l0,0  c0.86-0.01,1.56,0.68,1.57,1.54c0,0,0,0.01,0,0.01v0.04c0.03,0.85-0.63,1.56-1.48,1.59H2.63z M2.63,88.4L2.63,88.4  c-0.5-0.02-0.92,0.37-0.94,0.87c0,0,0,0,0,0l0,0c-0.02,0.5,0.37,0.92,0.86,0.94c0,0,0.01,0,0.01,0h0.04 c0.51,0.02,0.93-0.37,0.95-0.88c0,0,0,0,0,0l0,0c0-0.5-0.4-0.9-0.9-0.9h0L2.63,88.4z"/><path class="st0" d="M1.82,86.68L1.82,86.68c-0.41,0-0.74-0.33-0.74-0.74c0-0.41,0.33-0.74,0.74-0.74l0,0  c0.41,0,0.74,0.33,0.74,0.74C2.55,86.35,2.22,86.68,1.82,86.68z M1.82,85.28L1.82,85.28c-0.36-0.06-0.7,0.19-0.76,0.56  C1,86.2,1.25,86.54,1.62,86.59h0.2c0.36,0.04,0.69-0.23,0.73-0.59c0.04-0.36-0.23-0.69-0.59-0.73C1.91,85.27,1.86,85.27,1.82,85.28  L1.82,85.28z M1.41,86.26h0.8v-0.22H1.97v-0.09l0.24-0.16v-0.26l-0.27,0.19c-0.04-0.1-0.14-0.17-0.25-0.16  c-0.18,0-0.27,0.13-0.27,0.32L1.41,86.26L1.41,86.26z M1.79,85.9h0.03c0-0.07,0-0.12-0.1-0.12s-0.09,0.04-0.09,0.12v0.14h0.18   L1.79,85.9z"/><path class="st0" d="M1.11,82.7v-1.37c-0.02-0.32,0.09-0.63,0.3-0.87c0.19-0.18,0.44-0.27,0.69-0.26l0,0 c0.42-0.02,0.81,0.24,0.94,0.64l1.08-0.74v0.74l-0.97,0.64V82h0.97v0.66L1.11,82.7z M2.59,81.38H2.55c0-0.32-0.17-0.51-0.42-0.51    l0,0c-0.29,0-0.44,0.2-0.44,0.52v0.66h0.86L2.59,81.38z"/><polygon class="st0" points="1.11,79.52 1.11,77.26 1.71,77.26 1.71,78.86 2.32,78.86 2.32,77.45 2.91,77.45 2.91,78.86 3.54,78.86     3.54,77.24 4.13,77.24 4.13,79.52 "/><path class="st0" d="M2.84,76.61H1.11v-0.66h1.71c0.49,0,0.74-0.24,0.74-0.64s-0.24-0.65-0.74-0.65H1.11v-0.62h1.7 c0.66-0.09,1.27,0.38,1.36,1.04c0.01,0.09,0.01,0.18,0,0.27c0.04,0.66-0.46,1.22-1.12,1.26C2.98,76.62,2.91,76.62,2.84,76.61z"/><polygon class="st0" points="1.73,72.55 1.73,73.46 1.11,73.46 1.11,70.98 1.73,70.98 1.73,71.89 4.13,71.89 4.13,72.55 "/><rect x="1.11" y="69.7" class="st0" width="3.02" height="0.66"/><polygon class="st0" points="1.11,68.86 1.11,68.2 3.53,68.2 3.53,66.71 4.13,66.71 4.13,68.86 "/><rect x="1.11" y="65.44" class="st0" width="3.02" height="0.66"/><polygon class="st0" points="3.63,64.7 1.7,63.05 1.7,64.65 1.11,64.65 1.11,62.2 1.62,62.2 3.55,63.85 3.55,62.2 4.13,62.2   4.13,64.7 "/><path class="st0" d="M1.08,60.47v-0.61l3.06-1.31v0.74l-0.68,0.27v1.26l0.68,0.28v0.66L1.08,60.47z M2.86,59.77L2.86,59.77    l-0.98,0.4l0.98,0.39V59.77z"/><polygon class="st0" points="1.11,58.02 1.11,57.37 3.53,57.37 3.53,55.87 4.13,55.87 4.13,58.02 "/><path class="st0" d="M2.63,55.59L2.63,55.59c-0.88-0.06-1.54-0.82-1.48-1.7c0.05-0.8,0.69-1.43,1.48-1.48l0,0  c0.88,0.06,1.54,0.82,1.48,1.7C4.06,54.9,3.42,55.53,2.63,55.59z M2.63,53.09L2.63,53.09c-0.5-0.02-0.92,0.37-0.94,0.87c0,0,0,0,0,0 l0,0c-0.02,0.5,0.37,0.92,0.86,0.94c0,0,0.01,0,0.01,0h0.04c0.51,0.02,0.93-0.37,0.95-0.88c0,0,0,0,0,0l0,0 c0-0.49-0.4-0.89-0.89-0.89c0,0-0.01,0-0.01,0H2.63V53.09z"/><polygon class="st0" points="2.94,49.38 1.11,50.54 1.11,49.77 2.33,49.05 1.11,48.33 1.11,47.58 2.93,48.73 4.13,48.73 4.13,49.38  "/><path class="st0" d="M2.63,45.71L2.63,45.71c-0.83,0.01-1.52-0.64-1.55-1.48v-0.09c-0.02-0.44,0.15-0.87,0.47-1.18l0.49,0.42    c-0.21,0.19-0.33,0.46-0.34,0.74C1.7,44.61,2.11,45,2.61,44.99c0,0,0,0,0,0l0,0c0.5,0.04,0.93-0.33,0.97-0.82c0-0.01,0-0.02,0-0.03  l0,0c-0.01-0.3-0.13-0.59-0.35-0.79l0.43-0.42c0.36,0.31,0.55,0.76,0.54,1.23c0.02,0.84-0.64,1.54-1.48,1.57c0,0,0,0,0,0L2.63,45.71 z"/><path class="st0" d="M2.84,42.38H1.11v-0.66h1.71c0.49,0,0.74-0.24,0.74-0.65s-0.24-0.64-0.74-0.64H1.11v-0.66h1.7 c0.66-0.09,1.27,0.38,1.36,1.04c0,0,0,0.01,0,0.01c0.01,0.09,0.01,0.18,0,0.27c0.06,0.66-0.42,1.24-1.08,1.31   C3.01,42.4,2.92,42.4,2.84,42.38z"/><rect x="1.11" y="38.32" class="st0" width="3.02" height="0.66"/><path class="st0" d="M1.11,37.49v-1.17c-0.06-0.81,0.55-1.52,1.36-1.58h0.12c0.8,0,1.45,0.63,1.48,1.43c0.01,0.05,0.01,0.1,0,0.16  v1.17L1.11,37.49z M3.53,36.32L3.53,36.32c0.03-0.47-0.33-0.87-0.79-0.9c0,0,0,0,0,0h-0.1c-0.48-0.03-0.89,0.33-0.92,0.81   c0,0,0,0,0,0v0.6h1.82V36.32z"/><path class="st0" d="M1.08,33.25v-0.61l3.04-1.28v0.69l-0.68,0.27v1.26l0.68,0.27v0.67L1.08,33.25z M2.86,32.55L2.86,32.55  l-0.98,0.4l0.98,0.4V32.55z"/><polygon class="st0" points="1.11,29.3 1.11,27.04 1.71,27.04 1.71,28.65 2.32,28.65 2.32,27.23 2.91,27.23 2.91,28.65 3.54,28.65     3.54,27.01 4.13,27.01 4.13,29.3 "/><polygon class="st0" points="1.11,26.34 1.11,25.69 3.53,25.69 3.53,24.19 4.13,24.19 4.13,26.34 "/><path class="st0" d="M1.11,22.1v-1.22c-0.06-0.57,0.34-1.08,0.91-1.14h0.13c0.59,0,1.07,0.48,1.07,1.07c0,0,0,0.01,0,0.01 c0,0.04,0,0.09,0,0.13v0.49h0.91v0.66L1.11,22.1z M2.64,20.92L2.64,20.92c0.03-0.25-0.14-0.48-0.39-0.52c0,0-0.01,0-0.01,0H2.18 c-0.3,0-0.46,0.21-0.46,0.53v0.51h0.92L2.64,20.92z"/><polygon class="st0" points="1.11,19.16 1.11,18.5 3.53,18.5 3.53,17 4.13,17 4.13,19.16 "/><path class="st0" d="M1.08,15.39v-0.61l3.06-1.28v0.69l-0.68,0.28v1.25l0.68,0.27v0.67L1.08,15.39z M2.86,14.71L2.86,14.71   L1.88,15.1l0.98,0.4V14.71z"/><polygon class="st0" points="1.11,12.96 1.11,12.34 2.97,10.94 1.11,10.94 1.11,10.29 4.13,10.29 4.13,10.85 2.21,12.31 4.13,12.31    4.13,12.96 "/><polygon class="st0" points="1.11,9.49 1.11,7.23 1.71,7.23 1.71,8.84 2.32,8.84 2.32,7.42 2.91,7.42 2.91,8.84 3.54,8.84    3.54,7.21 4.13,7.21 4.13,9.49 "/><polygon class="st0" points="1.73,5.84 1.73,6.76 1.11,6.76 1.11,4.27 1.73,4.27 1.73,5.18 4.13,5.18 4.13,5.84 "/><path class="st0" d="M1.08,3.03V2.43l3.04-1.28v0.69L3.44,2.1v1.27l0.68,0.27v0.67L1.08,3.03z M2.86,2.35L2.86,2.35L1.88,2.74 l1,0.43L2.86,2.35z"/><rect x="3.44" class="st0" width="0.69" height="0.69"/></svg>';
            let divElemento = '<div id="elemento-'+unix+'" class="elemento icon" style="z-index: 1; top: 4px; left: 2px; fill: '+corAtual.cor1+'" data-espelharX="1" data-espelharY="1" data-degrees="0">' + svg + '<i class="excluir-elemento far fa-trash-alt" style="display: none;"></i></div>';
            let divCamada = '<div data-id-elemento="elemento-'+unix+'" class="layer mg-btm-10 flex align-center"><p class="text fs-12"><span class="layer-number text-semi-bold">0</span></p><div class="flex content-center width-100" style="fill: '+corAtual.cor1+'">' + svg + '</div></div>';
    
            document.getElementById("gabarito").innerHTML += divElemento;

            // ADD CAMADA - LATERAL
            $( ".content-art-layers" ).fadeIn();
            $( "#art-layers" ).prepend( divCamada );

            if(id_medida == 3) {
                width = 65;
                height = 368;
            } else if(id_medida == 2) {
                width = 60;
                height = 340;
            } else {
                width = 51;
                height = 289;
            }
            $('div#elemento-'+unix+' svg').attr('width', width);
            $('div#elemento-'+unix+' svg').attr('height', height);

            addElement(unix, "icon");
            countLayers();
        }, 1000);
    }

    // Ver mais Artes
    $( document).on('click', '.see-more-arts', function(){
        let unix = new Date().getTime()
        var id_categoria = $(this).data('id-categoria');
        // se for aba da copa
        var copa = $(this).hasClass('see-more-arts-copa');

        if(copa) {
            $("#copa-content").slideUp();
            setTimeout(() => {
                $("#category-copa-session").show().append(loader);
            }, 300);
        } else {
            $(".template-arts-content").slideUp();
            setTimeout(() => {
                $("#category-arts-list-session").show().append(loader);
            }, 300);
        }
        
        $.ajax({
            url: "getCategoryArts/"+id_categoria+"/Serigrafia?v=" + unix,
            context: document.body,
            success: (result) => {
                setTimeout(() => {
                    $(".loader-session").remove();
                }, 300);
                id_arte = null;

                for(var i in result) {
                    if(id_medida == 1) {
                        id_arte = result[i].id_medida_1;
                    } else if(id_medida == 2) {
                        id_arte = result[i].id_medida_2;
                    } else if(id_medida == 3) {
                        id_arte = result[i].id_medida_3;
                    } else if(id_medida == 4) {
                        id_arte = result[i].id_medida_4;
                    } else if(id_medida == 29) {
                        id_arte = result[i].id_medida_29;
                    }

                    if(id_arte) {
                        var rowArt = "<div class='card mg-btm-10'><a class='art-selector' href='https://www.meucopoeco.com.br/personalizacion-online/serigrafia?id_medida="+id_medida+"&toques="+toques+"&ap="+id_arte+"&quantidade="+quantidade+"&cor_copo="+id_cor+"'><img src='https://www.meucopoeco.com.br/sistema/uploads/modelos_arte/"+result[i].id+"/"+result[i].image+"'></a></div>";
                        if(copa) {
                            $('#copa-list').append(rowArt);
                        } else {
                            $('#arts-list').append(rowArt);
                        }
                    }
                };
            },
        })
    });
    // Ver mais Artes

    $('div.cor[data-id_cor="'+id_cor+'"]').trigger('click');
    if(id_medida == 4) {
        $('div.cor-tampa[data-id_cor="'+id_cor_tampa+'"]').trigger('click');
    }
});

// TUTORIAL //
    function TutorialSteps(stepNumber) {
        $(".tutorial-step").fadeIn().removeClass('alternative-border alternative-side');
        $(".button").removeClass('focused');
        var butttonPosition;

        if(stepNumber) {
            step = stepNumber;
        }

        switch(step) {
            case 1:
                titleStep = 'Color del fondo';
                textStep = 'Elija el color del fondo de tu ecovaso';
                butttonPosition = $(".button[data-button-id='cup-colors']").offset();

                $(".button[data-button-id='cup-colors']").addClass('focused');
                $(".button[data-button-id='art-colors']").addClass('focused');
                $(".skip-tutorial").show();

                $(".tutorial-step").css({'top' : butttonPosition.top, 'bottom' : 'unset'});
                window.sessionStorage.setItem("tutorial-step", "1");
            break;
            case 2:
                titleStep = 'Subir archivos/logo';
                textStep = 'Sube tu logo, fotos u otros elementos sin limitación de colores para personalizar tu ecovaso.';
                butttonPosition = $(".button[data-button-id='uploads']").offset();

                $(".button[data-button-id='uploads']").addClass('focused');

                $(".tutorial-step").css('top', butttonPosition.top);
                window.sessionStorage.setItem("tutorial-step", "2");
            break;
            case 3:
                titleStep = 'Elementos y textos';
                textStep = 'Agrega elementos de nuestra galeri­a y textos personalizados.';
                butttonPosition = $(".button[data-button-id='elements']").offset();

                $(".button[data-button-id='elements']").addClass('focused');
                $(".button[data-button-id='copa']").addClass('focused');
                $(".button[data-button-id='texts']").addClass('focused');

                $(".tutorial-step").css('top', butttonPosition.top);
                window.sessionStorage.setItem("tutorial-step", "3");
            break;
            case 4:
                titleStep = 'Medidor';
                textStep = 'Agrega o remueve el medidor de tu ecovaso. ';
                butttonPosition = $(".button[data-button-id='meter']").offset();

                $(".button[data-button-id='meter']").addClass('focused');
                $(".tutorial-step").css('top',  butttonPosition.top - 157 + "px").addClass('alternative-border');
                window.sessionStorage.setItem("tutorial-step", "4");
            break;
            case 5:
                titleStep = 'Modificar textos y elementos';
                textStep = "<div class='flex mg-btm-10'><div class='flex'><div class='button top flex content-center align-center'><svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><path id='arrow_upward_FILL0_wght400_GRAD0_opsz48' d='M12.531,18V9.781L8.656,13.656,8,13l5-5,5,5-.656.656L13.469,9.781V18Z' transform='translate(-8 -8)'></path></svg></div><div class='button bottom flex content-center align-center'><svg class='rotate-arrow' xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><path id='arrow_upward_FILL0_wght400_GRAD0_opsz48' d='M12.531,18V9.781L8.656,13.656,8,13l5-5,5,5-.656.656L13.469,9.781V18Z' transform='translate(-8 -8)'></path></svg></div></div> <p class='text-step color-white fs-14'>Mueve un elemento entre capas.</p></div> <div class='flex'><div class='flex' style='width: 40px;'><div class='button top flex content-center align-center'><svg xmlns='http://www.w3.org/2000/svg' width='10' height='9.666' viewBox='0 0 10 9.666'><path d='M6.172,15.69a2.706,2.706,0,0,1-.9-.154,1.959,1.959,0,0,1-.776-.5,1.243,1.243,0,0,0,.669-.468,1.5,1.5,0,0,0,.2-.829,1.393,1.393,0,0,1,1.4-1.4,1.393,1.393,0,0,1,1.4,1.4,1.845,1.845,0,0,1-.582,1.4A2,2,0,0,1,6.172,15.69Zm0-.8a1.209,1.209,0,0,0,.836-.334,1.061,1.061,0,0,0,.368-.816.6.6,0,1,0-1.2,0,1.948,1.948,0,0,1-.114.769.529.529,0,0,1-.421.3l.268.047A1.752,1.752,0,0,0,6.172,14.887Zm3.077-2.368-1.2-1.271,5.03-5.03a.6.6,0,0,1,.415-.194.575.575,0,0,1,.428.194l.388.388a.582.582,0,0,1,.194.435.608.608,0,0,1-.194.421ZM6.774,13.737Z' transform='translate(-4.5 -6.024)'></path></svg></div></div> <p class='text-step color-white fs-14'>Modifica el color del elemento.</p></div>";
                butttonPosition = $(".surrounded-session").offset();

                $(".tutorial-step").css({'top': butttonPosition.top + "px", 'right': '210px', 'bottom' : 'unset'}).addClass('alternative-side').hide();
                $(".tutorial-step").fadeIn();
                window.sessionStorage.setItem("tutorial-step", "5");
            break;
            case 6:
                titleStep = 'Vaso 3D';
                textStep = 'Visualizá como quedará tu vaso 3D en cualquier momento.';
                butttonPosition = $(".button.copo-3d").offset();

                $(".button.copo-3d").addClass('focused');
                $(".tutorial-step").css({'bottom' : '0', 'top' : 'unset'}).addClass('alternative-border');
                $(".tutorial-step").fadeIn();
                window.sessionStorage.setItem("tutorial-step", "6");
            break;
            case 7:
                titleStep = 'Continuar';
                textStep = 'Satisfecho con tu diseño? Clickea en "Enviar" y vas a seguir con tu pedido.';
                butttonPosition = $("#continue").offset();

                $(".next-step").html('OK, ENTENDIDO!');
                $(".skip-tutorial").hide('');

                $(".tutorial-step").css({'top': butttonPosition.top - 180 + "px", 'bottom': "unset"}).addClass('alternative-side').hide();
                $(".tutorial-step").fadeIn();
                window.sessionStorage.setItem("tutorial-step", "7");
            break;
            case 8:
                $(".tutorial-step").hide();

                step = 0;

                $('.create-session .button').css({'pointer-events': 'unset'});
                $('.custom-session').css({'pointer-events': 'unset'});

                $('.custom-session .surrounded-session').css({'display': 'none'});

                window.sessionStorage.removeItem("tutorial-step");
                window.sessionStorage.setItem("tutorial", "true");
            break;
        }

        $(".step-number").html(step);
        $(".title-step").html(titleStep);
        $(".text-step").html(textStep);

        step++;
    }

    function verifyTutorialStep() {
        if(window.sessionStorage.getItem("tutorial-step")) {
            step = parseInt(window.sessionStorage.getItem("tutorial-step"));

            $('.shadow-background').hide();
            TutorialSteps();
        }
    }
// TUTORIAL //

function gerarModelo3D() {
    $("div#html2canvas").html('');
	$("#spinner").fadeIn(200);

    var unix = new Date().getTime()
    var bgGabarito = $('div#gabarito').css('background-color');
    $("div#gabarito").clone().appendTo("div#html2canvas");

	var el = document.getElementById('html2canvas');
	el.style.fontFeatureSettings = '"liga" 0';
	el.style.fontVariant = 'normal';
    //$("div#html2canvas div#medidor").css('width', '6%');

    $("div#html2canvas div#gabarito").css('background-image', 'none');
    ajustaFontes();

    tipo = 'copo';
    if(id_medida == 4) {
        tipo = 'termico';
    }

    setTimeout(function() {
		html2canvas(el, { scale: 2 }).then((canvas) => {
			var a = document.createElement("a")
			a.href = canvas.toDataURL("image/jpeg")

			var filename = unix + ".jpg"
			$.ajax({
				type: "POST",
				url: "./gerarGabarito?v="+unix,
				data: { filename: filename, img: a.href, bg: bgGabarito, tipo: 'serigrafia', id_medida: id_medida },
				success: function (data) {
                    $("div#boxModelo iframe").attr("src", "http://127.0.0.1:5500/customizer?medida=" + id_medida + "&ferramenta=" + filename + "&tipo=" + tipo + "&id_cor_tampa=" + id_cor_tampa + "&time=" + unix);
				    $("div.ampliar-box-modelo a").attr("href", "http://127.0.0.1:5500/customizer?medida=" + id_medida + "&ferramenta=" + filename + "&tipo=" + tipo + "&id_cor_tampa=" + id_cor_tampa + "&time=" + unix)

					//$("div#boxModelo iframe").attr("src", "/customizer?medida=" + id_medida + "&ferramenta=" + filename);
					//$("div.ampliar-box-modelo a").attr("href", "https://www.meucopoeco.com.br/customizer?medida=" + id_medida + "&ferramenta=" + filename)
					$("div#boxModelo").fadeIn()
					$("#spinner").fadeOut(200);
					
					//$("div#html2canvas").html('');http://127.0.0.1:5500/customizer
					
					if ($("#gabarito").css("background-color") == "rgb(200, 200, 200)") {
						$("#gabarito").css("background-color", "rgb(255, 250, 250)")
					}
				},
			})
		})
	}, 1000);
}

function set_color (id, cor = null) {
	id == 1 ? (corAtual.cor1 = cor) : false
	id == 2 ? (corAtual.cor2 = cor) : false
	id == 3 ? (corAtual.cor3 = cor) : false
	id == 4 ? (corAtual.cor4 = cor) : false
}

function addElement(el, tipo, text, font, n, i, link) {
	let tamanho = 150;

	elementos.push({
		id: el,
		rotate: 0,
		espelharX: 1,
        espelharY: 1,
		size: tamanho,
		type: tipo,
		text: text,
		curvar: 0,
		font: font || null,
		ladoCurvar: 1,
		styles: text
			? {
				n: n || null,
				i: i || null,
			}
			: null,
		link: link
	})

	enableElementsDraggable()
	$("#medidor").draggable({
		axis: "x",
	})

    $('#elemento-' + el).rotatable({ wheelRotate: false });
	$('#elemento-' + el).resizable();

    $('.ui-rotatable-handle').hide();
    $('.resizable-r').hide();

    $(".selecionado").removeClass("selecionado");
    $('#elemento-' + el).addClass('selecionado');

    hideElements();
    $('div.custom-session div.content .surrounded-session').hide();
}

function setCamadas() {
    let idElemento;
    $( "div.elemento" ).each(function(){
        idElemento = $(this).attr('id');
        if($(this).hasClass('text')) {
            var divCamada = '<div data-id-elemento="'+idElemento+'" class="layer mg-btm-10 flex align-center"><p class="text fs-12"><span class="layer-number text-semi-bold">0</span></p><div class="flex content-center width-100"><span class="text-preview">' + $('#'+idElemento+ ' span').html() + '</span></div></div>';
            $( "#art-layers" ).prepend( divCamada );
            $("div.layer[data-id-elemento="+idElemento+"] span.text-preview").css("color", $('#'+idElemento).css('color'));
        } else if($(this).hasClass('icon')) {
            var divCamada = '<div data-id-elemento="'+idElemento+'" class="layer mg-btm-10 flex align-center"><p class="text fs-12"><span class="layer-number text-semi-bold">0</span></p><div class="flex content-center width-100">' + $('#'+idElemento).html() + '</div></div>';
            $( "#art-layers" ).prepend( divCamada );
            $("div.layer[data-id-elemento="+idElemento+"] svg").css("fill", $('#'+idElemento).css('fill'));
        } else if($(this).hasClass('img-svg')) {
            let unix = new Date().getTime();
            var divCamada = '<div data-id-elemento="'+idElemento+'" class="layer mg-btm-10 flex align-center"><p class="text fs-12"><span class="layer-number text-semi-bold">0</span></p><div class="flex content-center width-100" style="background-image: url(' + $('#'+idElemento).attr('data-link-img') + unix + '); width: 55px; height: 55px; margin: 0 auto; background-position: center; background-repeat: no-repeat; background-size: contain; background-color: rgba(255, 255, 255, 0);"></div></div>';
            $( "#art-layers" ).prepend( divCamada );
        }
    });

    $('div#'+idElemento).trigger('mouseup');

    $( ".content-art-layers" ).fadeIn();
    countLayers();
}

function enableElementsDraggable() {
	$(".elemento").draggable({
		grid: [1, 1],
		snap: true,
		snapMode: "outer",
		snapTolerance: 1,
		scroll: false,
		drag: function (event, ui) {
            $(".linha").remove()

			const id = $(this).attr("id")
			const top = parseInt($(this).css("top"))
			const left = parseInt($(this).css("left"))
			const bottom = parseInt($(this).css("top")) + parseInt($(this).height())
			const right = parseInt($(this).css("left")) + parseInt($(this).width())
			const midY = left + parseInt($(this).width()) / 2
			const midGabaritoY = parseInt($("#gabarito").width()) / 2
			const midX = top + parseInt($(this).height()) / 2
			const midGabaritoX = parseInt($("#gabarito").height()) / 2

			if (midX >= midGabaritoX - 5 && midX <= midGabaritoX + 5) {
				$("#linha-mid-x").css({
					display: "block",
					top: midGabaritoX + "px",
				})
			} else {
				$("#linha-mid-x").css("display", "none")
			}

			if (midY >= midGabaritoY - 5 && midY <= midGabaritoY + 5) {
				$("#linha-mid-y").css({
					display: "block",
					left: midGabaritoY + "px",
				})
			} else {
				$("#linha-mid-y").css("display", "none")
			}

            $(".elemento").each(function () {
				const elId = $(this).attr("id")
				const elTop = parseInt($(this).css("top"))
				const elLeft = parseInt($(this).css("left"))
				const elBottom = parseInt($(this).css("top")) + parseInt($(this).height())
				const elRight = parseInt($(this).css("left")) + parseInt($(this).width())

				if (elId != id) {
					elTop <= top + 3 && elTop >= top - 3
						? $("#gabarito").append(`<div class="linha linha-x" style="top:${elTop}px;"></div>`)
						: false
					elLeft <= left + 3 && elLeft >= left - 3
						? $("#gabarito").append(`<div class="linha linha-y" style="left:${elLeft}px;"></div>`)
						: false
					elBottom <= bottom + 3 && elBottom >= bottom - 3
						? $("#gabarito").append(`<div class="linha linha-x" style="top:${elBottom}px;"></div>`)
						: false
					elRight <= right + 3 && elRight >= right - 3
						? $("#gabarito").append(`<div class="linha linha-y" style="left:${elRight}px;"></div>`)
						: false

					elTop <= bottom + 3 && elTop >= bottom - 3
						? $("#gabarito").append(`<div class="linha linha-x" style="top:${elTop}px;"></div>`)
						: false
					elLeft <= right + 3 && elLeft >= right - 3
						? $("#gabarito").append(`<div class="linha linha-y" style="left:${elLeft}px;"></div>`)
						: false
					elBottom <= top + 3 && elBottom >= top - 3
						? $("#gabarito").append(`<div class="linha linha-x" style="top:${elBottom}px;"></div>`)
						: false
					elRight <= left + 3 && elRight >= left - 3
						? $("#gabarito").append(`<div class="linha linha-y" style="left:${elRight}px;"></div>`)
						: false
				}
			})
		},
		stop: () => {
			$(".linha").fadeOut(400)
			$("#linha-mid-y").hide()
			$("#linha-mid-x").hide()
		},
	})
}

function changeMeasureTemplate(measure) {    
    $( ".size-name" ).html(measure);

    if(measure) {
        $("#spinner").fadeIn(200);
        let unix = new Date().getTime();

        if(measure == '290cc') {
            id_medida = 4;
        } else if(measure == '360cc') {
            id_medida = 1;
        } else if(measure == '500cc') {
            id_medida = 2;
        } else if(measure == '750cc') {
            id_medida = 3;
        }
        
        $.ajax({
            url: "getMedidor/"+id_medida+"/Serigrafia?v=" + unix,
            context: document.body,
            success: (medidor) => {
                $( ".print-area" ).removeClass('measure-290cc measure-360cc measure-500cc measure-750cc');
                $( ".print-area" ).addClass('measure-'+measure);
                $( "#medidor" ).html(medidor.medidor);
                $( "#medidor svg" ).css({'fill' : corMedidor});

                if(id_medida == 1) {
                    $('div#medidor').css({'left' : '702px', 'height' : '589px'});
                } else if(id_medida == 2) {
                    $('div#medidor').css({'left' : '710px', 'height' : '705px'});
                } else if(id_medida == 3) {
                    $('div#medidor').css({'left' : '710px', 'height' : '790px'});
                } else if(id_medida == 4) {
                    $('div#medidor').css({'left' : '365px', 'height' : '560px'});
                }

                $("#spinner").fadeOut(200);
                $("#aprovado").attr('data-medida', measure);
            }
        })
    }
}