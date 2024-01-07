/// <reference path="../jquery-3.5.1.min.js" />
/// <reference path="../jquery-ui.js" />
/// <reference path="../html2canvas.js" />
/// <reference path="../common.js" />
/// <reference path="../template.js" />

let {
    versao,
    toques      = 1,
    id_medida   = 1,
    quantidade  = 500,
    cor_copo:       id_cor = 9,
    id:             getID,
    ap:             idArtePronta,
    cep:            getCep,
    kit:            getKit,
    radio:          getRadio,
    estado:         getEstado,
    indice:         getIndice,
    action:         getAction,
    origem:         getOrigem,
    cookie:         getCookie,
    point_id:       getPointId,
    cor_tampa:      id_cor_tampa,
    id_pedido:      getPedido,
    id_produto:     getIdProduto,
    id_carrinho:    getIdCarrinho,
} = getQueryParameters()

let filename = null;
let step = 1;
let id_tipo = 1;

if (id_medida == 4 && id_cor == 9) id_cor = 3;
if (id_medida == 4 && !id_cor_tampa) id_cor_tampa = 25;

let corAtual = {
	cor1: "#000000",
	cor2: null,
	cor3: null,
	cor4: null,
}

if (toques >= 2) corAtual.cor2 = '#F93822';
if (toques >= 3) corAtual.cor3 = '#FBE122';
if (toques >= 4) corAtual.cor4 = '#0072CE';

let corMedidor = "#000000";
let corGabarito = "#DBDBDB";

const gabaritoElement = document.getElementById('gabarito');

document.addEventListener('DOMContentLoaded', () => {
    gabaritoElement.addEventListener('mousemove', getCursorPosition)

    $('#got-it').on('click', skipTutorial);
    $('#learn').on('click', startTutorial);
    $('#tutorial').on('click', tutorialSteps);
    $('.next-step').on('click', tutorialSteps);
    $('.skip-tutorial').on('click', skipTutorial);
    $('#remove-meter').on('click', hideMedidor);
    $("#add-meter").on('click', showMedidor);
    $(".colors").on('click', toggleSelectCupColors);
    $(".cor").on('click', setCupColor);
    $(".cor-tampa").on('click', setCupLidColor);
    $(".escolher-cor").on('click', setElementsColor);
    $(".toques").on('click', setCurrentColorByToques);
    $(".cor-medidor").on('click', setCurrentColorByMedidor);
    $(".cor-elemento").on('click', selectCurrentColor);
    $(".button.open-action").on('click', openAction);
    $("#continue").on('click', onContinueClick);
    $("#aprovado").on('click', onApproving);
    $(".copo-3d-transparente").on('click', see3dModel);
    $(document).on("click", ".icon-card", addIcon);
    $("#apply-text").on('click', addText);
    $("#new-text").on('click', addNewtext);
    $("#insert-text").on('keyup', onChangeText);
    $(document).on("mouseup touchend", ".elemento", onSelectElement);
    $('#logo').on('change', attachImageElement);
    $('#grid').on('click', toggleGrid);
    $(document).on('click', '.see-more-arts', seeMoreArts);
    $('.go-back').on('click', backModificationHistory);
    $('.go-next').on('click', nextModificationHistory);
    
    hasInitTutorial();
    draggableMedidor();
    fillTemplate();
});

const tutorialSteps = () => {
    $(".tutorial-step").fadeIn().removeClass('alternative-border alternative-side');
    $(".button").removeClass('focused');

    const getOffsetTop = selector => $(selector).offset()?.top || 0;
    const setStorageStep = v => window.sessionStorage.setItem("tutorial-step", v);
    
    let offsetTop;
    let titleStep;
    let textStep;

    switch(step) {
        case 1:
            titleStep = 'Color del fondo';
            textStep = 'ElegÃ­ el color del fondo de tu ecovaso';
            offsetTop = getOffsetTop(".button[data-button-id='cup-colors']");

            $(".button[data-button-id='cup-colors']").addClass('focused');
            $(".button[data-button-id='art-colors']").addClass('focused');
            $(".skip-tutorial").show();

            $(".tutorial-step").css({'top' : offsetTop, 'bottom' : 'unset'});
            setStorageStep("1");
        break;
        case 2:
            titleStep = 'SubÃ­ tu archivo';
            textStep = 'CargÃ¡ tu logo, fotos u otros elementos para personalizar tu ecovaso.';
            offsetTop = getOffsetTop(".button[data-button-id='uploads']");

            $(".button[data-button-id='uploads']").addClass('focused');

            $(".tutorial-step").css('top', offsetTop);
            setStorageStep("2");
        break;
        case 3:
            titleStep = 'Elementos y textos';
            textStep = 'AgregÃ¡ elementos de nuestra galerÃ­a y textos personalizados.';
            offsetTop = getOffsetTop(".button[data-button-id='elements']");

            $(".button[data-button-id='elements']").addClass('focused');
            $(".button[data-button-id='copa']").addClass('focused');
            $(".button[data-button-id='texts']").addClass('focused');

            $(".tutorial-step").css('top', offsetTop);
            setStorageStep("3");
        break;
        case 4:
            titleStep = 'Medidor';
            textStep = 'AgregÃ¡ o removÃ© el medidor de tu ecovaso. ';
            offsetTop = getOffsetTop(".button[data-button-id='meter']");

            $(".button[data-button-id='meter']").addClass('focused');
            $(".tutorial-step").css('top', offsetTop - 157 + "px").addClass('alternative-border');
            setStorageStep("4");
        break;
        case 5:
            titleStep = 'Modificar textos y elementos';
            textStep = "<div class='flex mg-btm-10'><div class='flex'><div class='button top flex content-center align-center'><svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><path id='arrow_upward_FILL0_wght400_GRAD0_opsz48' d='M12.531,18V9.781L8.656,13.656,8,13l5-5,5,5-.656.656L13.469,9.781V18Z' transform='translate(-8 -8)'></path></svg></div><div class='button bottom flex content-center align-center'><svg class='rotate-arrow' xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><path id='arrow_upward_FILL0_wght400_GRAD0_opsz48' d='M12.531,18V9.781L8.656,13.656,8,13l5-5,5,5-.656.656L13.469,9.781V18Z' transform='translate(-8 -8)'></path></svg></div></div> <p class='text-step color-white fs-14'>Mueve un elemento entre capas.</p></div> <div class='flex'><div class='flex' style='width: 40px;'><div class='button top flex content-center align-center'><svg xmlns='http://www.w3.org/2000/svg' width='10' height='9.666' viewBox='0 0 10 9.666'><path d='M6.172,15.69a2.706,2.706,0,0,1-.9-.154,1.959,1.959,0,0,1-.776-.5,1.243,1.243,0,0,0,.669-.468,1.5,1.5,0,0,0,.2-.829,1.393,1.393,0,0,1,1.4-1.4,1.393,1.393,0,0,1,1.4,1.4,1.845,1.845,0,0,1-.582,1.4A2,2,0,0,1,6.172,15.69Zm0-.8a1.209,1.209,0,0,0,.836-.334,1.061,1.061,0,0,0,.368-.816.6.6,0,1,0-1.2,0,1.948,1.948,0,0,1-.114.769.529.529,0,0,1-.421.3l.268.047A1.752,1.752,0,0,0,6.172,14.887Zm3.077-2.368-1.2-1.271,5.03-5.03a.6.6,0,0,1,.415-.194.575.575,0,0,1,.428.194l.388.388a.582.582,0,0,1,.194.435.608.608,0,0,1-.194.421ZM6.774,13.737Z' transform='translate(-4.5 -6.024)'></path></svg></div></div> <p class='text-step color-white fs-14'>ModificÃ¡ el color del elemento.</p></div>";
            offsetTop = getOffsetTop(".surrounded-session");

            $(".tutorial-step").css({'top': offsetTop + "px", 'right': '210px', 'bottom' : 'unset'}).addClass('alternative-side').hide();
            $(".tutorial-step").fadeIn();
            setStorageStep("5");
        break;
        case 6:
            titleStep = 'Vaso 3D';
            textStep = 'VisualizÃ¡ como quedarÃ¡ tu vaso 3D en cualquier momento.';
            offsetTop = getOffsetTop(".button.copo-3d");

            $(".button.copo-3d").addClass('focused');
            $(".tutorial-step").css({ bottom: 30, top: 'unset' }).addClass('alternative-border');
            $(".tutorial-step").fadeIn();
            setStorageStep("6");
        break;
        case 7:
            titleStep = 'Continuar';
            textStep = 'Satisfecho con tu diseÃ±o? ClickeÃ¡ en "Comprar" y vas a seguir con tu pedido.';
            offsetTop = getOffsetTop("#continue");

            $(".next-step").html('OK, ENTENDIDO!');
            $(".skip-tutorial").hide('');

            $(".tutorial-step").css({'top': offsetTop - 180 + "px", 'bottom': "unset"}).addClass('alternative-side').hide();
            $(".tutorial-step").fadeIn();
            setStorageStep("7");
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

const hasInitTutorial = () => {
    if (!window.sessionStorage.getItem("tutorial")) {
        initTutorial();
    } else if (window.sessionStorage.getItem("tutorial-step")) {
        step = parseInt(window.sessionStorage.getItem("tutorial-step"));

        $('.shadow-background').hide();

        tutorialSteps();
    }
}

const initTutorial = () => {
    $('.shadow-background')
        .css({ display : 'flex', opacity: 0 })
        .animate({ opacity: 1  }, 300);

    $('.create-session .button').css({ 'pointer-events': 'none' });
    $('.custom-session').css({ 'pointer-events': 'none' });
    $('.custom-session .surrounded-session').css({ display: 'unset' });
}

const startTutorial = () => {
    tutorialSteps();
    $('.shadow-background').fadeOut();
}

const skipTutorial = () => {
    step = 0;

    $(".tutorial-step").hide();
    $('.shadow-background').hide();
    $('.create-session .button').css({ 'pointer-events': 'unset' });
    $('.custom-session').css({ 'pointer-events': 'unset' });
    $('.custom-session .surrounded-session').css({ display: 'none' });
    $(".button").removeClass('focused');

    window.sessionStorage.removeItem("tutorial-step");
    window.sessionStorage.setItem("tutorial", "true");
}

const onContinueClick = () => {
    const colors = [];

    $("div.elemento").each(function(){
        const $this = $(this);

        const color = $this.hasClass('text')
            ? $this.css('color')
            : $this.css('fill');

        colors.indexOf(color) < 0 && colors.push(color);
    });

    if (colors.length < toques) {
        hideSpinner();
        
        Swal.fire({
            icon: 'info',
            title: 'AtenciÃ³n',
            text: `Su diseÃ±o tiene menos colores (${colors.length}) que la cantidad elegida (${toques}). Desea continuar?`,
            showDenyButton: true,
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#007B8B',
            denyButtonText: 'Cambiar',
        }).then((result) => {
            result.isConfirmed && generate3D(true)
        })
    } else {
        generate3D(true)
    }
}

const generate3D = async (byAprovinng = false) => {
    $("#html2canvas").html('');

    hideElements();
    showSpinner();

    await sleep(200);

    const $gabarito = $('div#gabarito');

    const unix = new Date().getTime()
    const bgGabarito = $gabarito.css('background-color');

    $gabarito.clone().appendTo("#html2canvas");
    
    $(".cores-de-impressao-gabarito").html('');
    $("div#html2canvas div#gabarito").css('background-image', 'none');

    await fixElementsInCanvas();

    byAprovinng && $(".toques").each(function (i) {
        const idx = i + 1;

        const cor   = $(this).data('cor');
        const title = $(this).attr('title');

        const coresImpressao = `<p class="cor-impressao-${idx}"><span class="bolinha-cor bolinha-cor-${idx}" style="background-color: ${cor};"></span> <span class="nome-cor-impressao">${title}</span></p>`;

        $(".cores-de-impressao-gabarito").append(coresImpressao);
    });

    await sleep(200);

    const canvas = await artToCanvas(2);
    const img = canvas.toDataURL("image/jpeg");

    filename = unix + ".jpg";

    const customizerType = id_medida == 4 ? 'termico' : 'copo';

    const ajaxData = { filename, img, bg: bgGabarito, tipo: 'serigrafia', id_medida };

    if (id_tipo == 1) ajaxData.id_cor = id_cor;

    const tipo = id_medida == 4 ? 'termico' : 'copo';

    const data = await ajaxPromise({
        type: "POST",
        url: `/qero/personalizacion_online/${id_tipo == 1 ? 'gerarTransparencia' : 'gerarGabarito'}?v=${unix}`,
        data: ajaxData
    });

    if (byAprovinng) {
        $("div#html2canvas").html('');

        let iframeScr = `https://ecovasos.com/qero/customizer?medida=${id_medida}&tipo=${customizerType}&id_cor_tampa=${id_cor_tampa}`;

        iframeScr += (id_tipo == 1)
            ? `&id_tipo=${id_tipo}&ferramenta=${data}`
            : `&ferramenta=${filename}`;

        const $boxAprovacao = $("div#boxAprovacao");

        $boxAprovacao.fadeIn();
        $boxAprovacao.find('iframe').attr('src', iframeScr);
        $boxAprovacao.find('img#mascaraGabarito').attr("src", `/qero/assets/personalizacion_online/images/area-sem-impressao/${id_medida}.png`);
        $boxAprovacao.find('img#imgGabarito').attr("src", "/qero/uploads/personalizacion_online/" + filename);

        $("a#baixar-arte").attr("href", "/qero/uploads/personalizacion_online/" + filename);

        hideSpinner();

        await sleep(200);

        let height = (parseInt($boxAprovacao.find('#mascaraGabarito').css('height')) + 30);

        if (height < 200) height = 300;

        await sleep(200);

        $('#aprovacao-3d').css({ height });
    } else {
        let urlCustomizer = `https://ecovasos.com/qero/customizer?medida=${id_medida}&ferramenta=${id_tipo == 1 ? data : filename}&tipo=${tipo}&id_cor_tampa=${id_cor_tampa}&time=${unix}`

        if (id_tipo == 1) urlCustomizer += `&id_tipo=${id_tipo}`;

        $("#boxModelo iframe").attr("src", urlCustomizer);
        $("div.ampliar-box-modelo a").attr("href", urlCustomizer)

        $("#boxModelo").fadeIn()
        hideSpinner();
                                
        $gabarito.css("background-color") == "rgb(200, 200, 200)" && $gabarito.css("background-color", "rgb(255, 250, 250)")
    }
}

let timeoutModificationHistory = null;
const enableElementsDraggable = () => {
    const initalValuesDragElement = { y: 0, x: 0 }

    const $gabarito     = $("#gabarito");
    const $elements     = $(".elemento");
    const $midLineX     = $("#linha-mid-x");
    const $midLineY     = $("#linha-mid-y");

    const midGabaritoY  = parseInt($gabarito.width()) / 2;
    const midGabaritoX  = parseInt($gabarito.height()) / 2;

	$elements.draggable({
		grid: [1, 1],
		snap: true,
		snapMode: "outer",
		snapTolerance: 1,
		scroll: false,
        start: function() {
            const $element = $(this);

            const top       = parseInt($element.css("top"));
			const left      = parseInt($element.css("left"));
            const width     = parseInt($element.width());
            const height    = parseInt($element.height());

            const midY = top + (height / 2) - cursorPosition.y
            const midX = left + (width / 2) - cursorPosition.x

            initalValuesDragElement.y = midY;
            initalValuesDragElement.x = midX;
        },
		drag: function (_event, ui) {
            $(".linha").remove();

            const $this = $(this);

			const id            = $this.attr("id");
			const width         = parseInt($this.width());
			const height        = parseInt($this.height());
			const top           = parseInt($this.css("top"));
			const left          = parseInt($this.css("left"));

			const bottom        = top + height
			const right         = left + width;
			const midY          = left + width / 2;
			const midX          = top + height / 2;

            const shouldDisplayMidLine = (value, target) => value >= target - 5 && value <= target + 5;
            
            shouldDisplayMidLine(midX, midGabaritoX)
                ? $midLineX.css({ display: "block", top: midGabaritoX })
                : $midLineX.css("display", "none");       

            shouldDisplayMidLine(midY, midGabaritoY)
                ? $midLineY.css({ display: "block", left: midGabaritoY })
                : $midLineY.css("display", "none");
                
            const oldPointY = cursorPosition.y - (height / 2)
            const oldPointx = cursorPosition.x - (width / 2)
            
            const pointY = oldPointY + initalValuesDragElement.y
            const pointX = oldPointx + initalValuesDragElement.x
            
            ui.position.top = pointY;
            ui.position.left = pointX;               

            $elements.each(function () {
                const $this = $(this);
				const elID  = $this.attr("id");

                if (elID == id) return;

				const elTop     = parseInt($this.css("top"));
				const elLeft    = parseInt($this.css("left"));
				const elBottom  = parseInt($this.css("top")) + parseInt($this.height());
				const elRight   = parseInt($this.css("left")) + parseInt($this.width());
                
                const addLine = (type, value) => $gabarito.append(`<div class="linha linha-${type}" style="${type == 'x' ? 'top' : 'left'}:${value}px"></div>`);
                const withinRange = (value, target) => value >= target - 3 && value <= target + 3;

                withinRange(elTop, top) && addLine("x", elTop);
                withinRange(elLeft, left) && addLine("y", elLeft);
                withinRange(elBottom, bottom) && addLine("x", elBottom);
                withinRange(elRight, right) && addLine("y", elRight);
                withinRange(elTop, bottom) && addLine("x", elTop);
                withinRange(elLeft, right) && addLine("y", elLeft);
                withinRange(elBottom, top) && addLine("x", elBottom);
                withinRange(elRight, left) && addLine("y", elRight);
			})
		},
		stop: () => {
			$(".linha").fadeOut(400, () => $(".linha").remove());
			$midLineY.fadeOut(400);
			$midLineX.fadeOut(400);

            clearTimeout(timeoutModificationHistory);
            timeoutModificationHistory = setTimeout(() => {
                saveModificationHistory('draggable stop');
                timeoutModificationHistory = null;
            }, 400);
		},
	})
}

const showMedidor = () => {
    $("div#medidor").show();
    saveModificationHistory('showMedidor');
};
const hideMedidor = () => {
    $("div#medidor").hide();
    saveModificationHistory('hideMedidor');
};

const setCurrentColorByToques = ({ currentTarget }) => {
    const $currentTarget = $(currentTarget);

    const cor = $currentTarget.attr('data-cor');

    $(".toques").removeClass('toque-atual');
    $currentTarget.addClass('toque-atual');

    $(".cor-atual").removeClass('cor-atual');
    $(`.escolher-cor[data-cor="${cor}"]`).addClass('cor-atual');
}

const setCurrentColorByMedidor = ({ currentTarget }) => {
    const $currentTarget = $(currentTarget);

    const cor = $currentTarget.attr('data-cor');
    corMedidor = cor;

    $(".cor-medidor").removeClass('toque-atual');
    $currentTarget.addClass('toque-atual');

    $("div#medidor svg").css("fill", cor);
    $("div#medidor img").attr("src", svg_medidor_url(id_medida, cor.replace('#', '')));
    saveModificationHistory('setCurrentColorByMedidor');
}

const selectCurrentColor = ({ currentTarget }) => {
    const $currentTarget = $(currentTarget);
    const $selected = $(".selecionado");

    const cor = $currentTarget.attr('data-cor');
    const id_svg = $selected.attr('data-id_svg');
    
    $(".cor-elemento").removeClass('toque-selecionado');
    $currentTarget.addClass('toque-selecionado active');

    const cor_antiga = rgbToHex($selected.css('fill')).replace('#', '');
    const element_color = getElementColor($selected);

    const isSameColor = element_color === cor;

    if ($selected.hasClass('text')) {
        $selected.css("color", cor);
        $(".layer.selected span.text-preview").css("color", cor);
    } else if ($selected.hasClass('img-svg-qrcode')) {
        const url = $selected.find('img').attr('src').slice(0, -6) + cor.replace('#', '');
        $selected.find('img').attr('src', url);
        $selected.css("fill", cor);

        $(".layer.selected .content-center").css('background-image', `url(${url})`);
    } else if ($selected.hasClass('icon') && id_svg) {
        const url = svg_url(id_svg, cor.replace('#', ''));

        $selected.css("fill", cor);
        $selected.find('img').attr('src', url);
        $(".layer.selected .content-center").css('background-image', `url(${url})`);
    }  else {
        $selected.css("fill", cor);
        $(".layer.selected svg").css("fill", cor);
    }

    if ($selected.hasClass('img-svg')) {
        const id_elemento = $( '.selecionado' ).attr('id');
        const unix = new Date().getTime();
        const link = $selected.data('link-img') || $selected.children('img').attr('src');

        $selected.attr('data-cor_antiga', element_color)

        showSpinner();

        $.ajax({
            method: "POST",
            url: "/qero/personalizacion_online/img2svg?v=" + unix,
            data: { link, cor_antiga, cor_nova: cor },
            context: document.body,
            success: (result) => {
                const linkImg = `${result}&v=${unix}`

                $selected
                    .attr('data-link-img', linkImg)
                    .children('img')
                    .attr('src', linkImg);

                !$selected.children('img').length && $selected.css('background-image', `url(${linkImg})`);

                $(`.layer[data-id-elemento="${id_elemento}"] div`).css("background-image", `url(${linkImg})`);

                hideSpinner();
                console.log(isSameColor, element_color, cor);

                !isSameColor && setTimeout(() => saveModificationHistory('selectCurrentColor'), 200);
            },
        })
    } else {
        !isSameColor && saveModificationHistory('selectCurrentColor');
    }

    $(`.button[data-content="create-session"]`).removeClass('active');
    $(`.content[data-content="create-session"]`).hide();
    $(`[data-button-id="art-colors"]`).show();
    $(`div.toques[data-cor="${cor}"]`).trigger('click');
}

const toggleGrid = () => {
    const template = $("#gabarito");

    template.css("background-image") == "none"
        ? template.css({ 'background-image': 'url("/qero/assets/personalizacion_online/images/grid.svg")', 'background-size': 20 })
        : template.css({ 'background-image': 'none' })
}

const toggleSelectCupColors = ({ currentTarget }) => {
    const $currentTarget = $(currentTarget);

    const id_select = $currentTarget.data('id-select');

    if (!$currentTarget.hasClass('open')) {
        $('.select-colors').hide();
        $(`.select-colors[data-id-select="${id_select}"]`).slideDown();
    }
    
    $('.colors').removeClass('open');
    $currentTarget.addClass('open');
}

const setCupColor = ({ currentTarget }) => {
    const $currentTarget = $(currentTarget);

    const title = $currentTarget.attr('title');
    const data  = $currentTarget.data();

    const classe_cor    = data.classeCor;
    const cor           = data.cor;
    const tipoCor       = data.nome;

    id_tipo     = data.id_tipo;
    id_cor      = data.id_cor;
    corGabarito = data.cor;

    $currentTarget.removeClass('open');

    $(".template-area").css({ 'background-color' : cor });
    $('.color-name').html('');
    $(`.cores-${classe_cor}`).html(title);
    $('span.cor-modelo').html(tipoCor);
    $('.cup-color').html(tipoCor);

    saveModificationHistory('setCupColor');
}

const setCupLidColor = ({ currentTarget }) => {
    const $currentTarget = $(currentTarget);
    const title = $currentTarget.attr('title');

    id_cor_tampa = $currentTarget.data('id_cor');

    $('span.tampa-color').html('- Tapa ' + title);
    $('.cores-tampa').html(title);
    console.log(id_cor_tampa);
}

const setElementsColor = ({ currentTarget }) => {
    const $currentTarget = $(currentTarget);
    const $toqueAtual = $(".toques.toque-atual");

    const id = $toqueAtual.data("class");
    const corAnterior = $toqueAtual.css('background-color');

    if ($("#medidor img").length) {
        const hex = '#' + $("div#medidor img")
            .attr("src")
            .toLowerCase()
            .split('serigrafia/')[1]
            .split('/')[1]
            .toUpperCase();

        corMedidor = hex;
    } else {
        corMedidor = $("div#medidor svg").css("fill");
    }

    const cor = $currentTarget.data('cor');

    const nomeCor = $currentTarget.attr('title');

    $(".cor-atual").removeClass('cor-atual');

    $currentTarget.addClass('cor-atual');
    
    $toqueAtual.css('background-color', cor);
    $toqueAtual.attr('data-cor', cor);
    $toqueAtual.attr('title', nomeCor);

    corAtual['cor' + id] = cor;    

    if (rgbToHex(corAnterior) == corMedidor) {
        corMedidor = cor;
        $("#medidor svg").css("fill", cor);
        $("#medidor img").attr("src", svg_medidor_url(id_medida, cor.replace('#', '')));
    }

    $(`.cor-medidor[data-class="${id}"]`)
        .css('background-color', cor)
        .attr('data-cor', cor)
        .attr('title', nomeCor);

    $(`.cor-elemento[data-class="${id}"]`)
        .css('background-color', cor)
        .attr('data-cor', cor)
        .attr('title', nomeCor);

    let idx_interval = 0;

    const hasSaveModificationHistory = () => idx_interval === $("div.elemento").length && saveModificationHistory('setElementsColor');

    $("div.elemento").each(function() {
        const $this = $(this);

        const id_elemento = $this.attr('id');

        const { isIconType, isImgSvgType, isTextType, isImgSvgQrcodeType } = getElementType($this);

        const id_svg = $this.attr('data-id_svg');

        const corElemento = getElementColor($this);

        console.log(corElemento)

        if (corElemento == rgbToHex(corAnterior)) {
            if (isTextType) {
                $this.css("color", cor);
                $(`.layer[data-id-elemento="${id_elemento}"] span.text-preview`).css("color", cor);
            } else if (isImgSvgQrcodeType) {
                const url = $this.find('img').attr('src').slice(0, -6) + cor.replace('#', '');
                $this.find('img').attr('src', url);
                $this.css("fill", cor);

                $(`.layer[data-id-elemento="${id_elemento}"] .content-center`).css('background-image', `url(${url})`);
            } else if (isIconType && id_svg) {
                const url = svg_url(id_svg, cor.replace('#', ''));
        
                $this.css("fill", cor);
                $this.find('img').attr('src', url);
                $(`.layer[data-id-elemento="${id_elemento}"] .content-center`).css('background-image', `url(${url})`);
            } else {
                $this.css("fill", cor);
                $(`.layer[data-id-elemento="${id_elemento}"] svg`).css("fill", cor);
            }

            if (isImgSvgType) {
                const unix = new Date().getTime();
                const link = $this.data('link-img') || $this.children('img').attr('src');
                const corLogoAnterior = rgbToHex(corAnterior).replace('#', '');

                showSpinner();

                $.ajax({
                    method: "POST",
                    url: "/qero/personalizacion_online/img2svg?v=" + unix,
                    data: { link, cor_nova: cor, cor_antiga: corLogoAnterior },
                    context: document.body,
                    success: (result) => {
                        const linkImg = `${result}&v=${unix}`;

                        $this
                            .data('link-img', linkImg)
                            .children('img')
                            .attr('src', linkImg);

                        !$this.children('img').length && $this.css('background-image', `url(${linkImg})`);

                        $(`.layer[data-id-elemento="${id_elemento}"] div`).css("background-image", `url(${linkImg})`);
                        hideSpinner();

                        idx_interval++;
                        hasSaveModificationHistory();
                    },
                })
                
            } else {
                idx_interval++;
                hasSaveModificationHistory();
            }
        } else {
            idx_interval++;
            hasSaveModificationHistory();
        }
    });

    $('div.custom-session div.content .surrounded-session').hide();

    hideElements();
}

const addIcon = ({ currentTarget }) => {
    const $currentTarget = $(currentTarget);
    const seeMore = $currentTarget.hasClass('see-more-card');

    if (seeMore) return;

    const unix  = new Date().getTime()
    const id_svg = $currentTarget.data('id_icon');

    appendNewElement({
        id: unix,
        type: 'icon',
        style: `z-index: 1; top: calc(50% - 75px); left: calc(50% - 75px); fill: ${corAtual.cor1}`,
        id_svg,
        corAtual
    });

    $('.excluir-elemento').hide();

    saveModificationHistory('addIcon');
}

const addText = () => {
    const unix = new Date().getTime();
    const text = $('#insert-text').val().replace(/\n/g, "<br>");
    const fontSize = $('#font-size-select span.changed-option').html();
    const fontFamily = $('#font-select span.changed-option').html();

    if (!text) return;

    appendNewElement({
        id: unix,
        type: 'text',
        style: `z-index: 1; top: calc(50% - 75px); left: calc(50% - 75px); font-size: ${fontSize}; font-family: ${fontFamily}; color: ${corAtual.cor1}`,
        text,
        fontFamily,
        corAtual
    });

    $('#insert-text').val('');
    $('.excluir-elemento').hide();

    $(`#elemento-${unix}`).trigger('mouseup');

    saveModificationHistory('addText');
}

const addNewtext = () => {
    $('#insert-text').val('Novo texto');
    $('#apply-text').trigger('click');
}

let timeoutChangeText = null;
const onChangeText = ({ ctrlKey, metaKey }) => {
    const $selecionado = $(".selecionado");

    if (ctrlKey || metaKey) return;

    if ($selecionado.hasClass('text')) {
        const text = $('#insert-text').val().replace(/\n/g, "<br>");

        $selecionado.children('span').html(text);

        clearTimeout(timeoutChangeText);
        timeoutChangeText = setTimeout(() => saveModificationHistory('onChangeText'), 750);
    } else {
        $('#apply-text').trigger('click');
    }
}

const seeMoreArts = async ({ currentTarget }) => {
    const unix = new Date().getTime();
    const id_categoria = $(currentTarget).data('id-categoria');

    $(".template-arts-content").fadeOut(300);
    
    setTimeout(() => {
        $(loader).hide().clone().appendTo('#category-arts-list-session');
        $("#category-arts-list-session").show();
        $("#category-arts-list-session .loader-session").fadeIn(300);
    }, 100);

    $.ajax({
        url: `/qero/personalizacion_online/getCategoryArts/${id_categoria}/Serigrafia?v=${unix}`,
        context: document.body,
        success: (result = []) => {
            let delay = 0;

            id_arte = null;

            result.forEach(dataArt => {
                if (id_medida == 1)     id_arte = dataArt['360cc'];
                else if(id_medida == 2) id_arte = dataArt['500cc'];
                else if(id_medida == 3) id_arte = dataArt['750cc'];
                else if(id_medida == 4) id_arte = dataArt['290cc'];

                if (!id_arte) return;
                
                const $artElement = $(htmlString`
                    <div class="card mg-btm-10">
                        <a
                            class="art-selector"
                            href="https://www.ecovasos.com/qero/personalizacion_online/serigrafia?id_medida=${id_medida}&toques=${toques}&ap=${id_arte}&quantidade=${quantidade}&cor_copo=${id_cor}"
                        >
                            <img src="https://www.ecovasos.com/qero/uploads/modelos_arte/${dataArt.id}/${dataArt.arte_plana}">
                        </a>
                    </div>
                `);

                setTimeout(() => $artElement.hide().appendTo('#arts-list').fadeIn(300), delay * 125);
                delay++;
            });

            $(".loader-session").fadeOut(500, () => $(".loader-session").remove());
        }
    });
}

const attachImageElement = async ({ currentTarget }) => {
    const unix = new Date().getTime();

    showSpinner();

    const file = currentTarget.files[0];

    if (!file) return;

    const { x, y } = await getFileImageDimensions();
    
    const formData = new FormData($("#form")[0]);

    $.ajax({
        type: "POST",
        url: "/qero/personalizacion_online/salvarLogo?v=" + unix,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: async result => {
            const obj = JSON.parse(result);

            const divisor = parseFloat(y / x);
            const height = 200 * divisor;

            $("#logo").val("");

            await sleep(200);

            $.ajax({
                method: "POST",
                url: "/qero/personalizacion_online/img2svg?v=" + unix,
                data: {
                    cor: corAtual.cor1,
                    filename: obj.src,
                },
                context: document.body,
                success: (result) => {
                    const linkImg = `${result}?v=${unix}`;

                    appendNewElement({
                        id: unix,
                        type: 'img-svg',
                        style: `width: 200px; height: ${height}px; z-index: 1; top: calc(50% - 75px); left: calc(50% - 75px); fill: ${corAtual.cor1}`,
                        img: linkImg
                    });

                    hideSpinner();
                    setTimeout(() => saveModificationHistory('attachImageElement'), 200);
                },
            })
        },
    })
}

const onSelectElement = async ({ currentTarget }) => {
    const $currentTarget = $(currentTarget);

    const id = $currentTarget.attr("id").replace("elemento-", "");

    const top       = parseInt($currentTarget.css('top'));
    const left      = parseInt($currentTarget.css('left'));
    const width     = parseInt($currentTarget.css('width'));
    const height    = parseInt($currentTarget.css('height'));
    const zIndex    = parseInt($currentTarget.css('z-index'));
    const degrees   = parseInt($currentTarget.attr('data-degrees'));

    const { isIconType, isImgSvgType, isTextType, isImgSvgQrcodeType } = getElementType($currentTarget);

    let color;
    let divisorImgSvg = 0;
    let divisorIcon = 0
    let divisorText = 0

    if (isTextType) {
        const fontSize = parseInt($currentTarget.css('font-size'));
        divisorText = fontSize / width;

        color = $currentTarget.css('color');

        const text = $(`#elemento-${id} span`).html().replaceAll(/<br\s*[\/]?>/gi, "\n");

        $('.content[data-content="create-session"]').hide();
        $('.open-action').removeClass('active');
        $('[data-button-id="texts"]').show().addClass('active');

        $('#insert-text').val(text);
        $('#apply-text').hide();
        $('#new-text').show();

        presetText(id);

        const layerText = text.length >= 13 ? (text.substr(0, 13) + '...') : text;

        $(`div.layer[data-id-elemento="elemento-${id}"] div span`).html(layerText);
    } else {
        color = $currentTarget.css('fill');
        
        $('.content[data-content="create-session"]').hide();

        if (isImgSvgType) {
            divisorImgSvg = height / width;
            $('.button.open-action[data-button-id="uploads"]').trigger('click');
        } else if (isIconType) {
            const heightSVG = parseInt($currentTarget.children('svg').attr('height'));
            const widthSVG = parseInt($currentTarget.children('svg').attr('width'));
            
            divisorIcon = heightSVG / widthSVG;

            $('.button.open-action[data-button-id="elements"]').trigger('click');
        }
    }

    if (degrees) {
        $currentTarget.css('transform', `rotate(${degrees}deg)`);
        fixElementsIcons(id, degrees);
    }

    if (color) {
        color = rgbToHex(color);

        $('.cor-elemento').removeClass('toque-selecionado');
        $(`.cor-elemento[data-cor="${color}"]`).addClass('toque-selecionado');
    }

    $(".selecionado").removeClass("selecionado");
    $currentTarget.addClass("selecionado");

    $(`div.layer`).removeClass("selected");
    $(`div.layer[data-id-elemento="elemento-${id}"]`).addClass("selected");
    $('div.custom-session div.content .surrounded-session').fadeIn();

    $('.resizable-handle').remove();
    $('.ui-rotatable-handle').hide();
    $('.excluir-elemento').hide();

    $currentTarget.find('.ui-rotatable-handle').show();
    $currentTarget.find('.excluir-elemento').show();

    $("#layers").html(zIndex);

    $currentTarget.resizable({
        resize: function(_event, _ui) {
            const $this = $(this);
            const resizeWidth = parseInt($this.css('width'))
            
            $this.css({ top, left });

            if (isImgSvgQrcodeType) {
                let qrcodeWidth = resizeWidth > 100 ? resizeWidth : 100;
                qrcodeWidth = qrcodeWidth > 300 ? 300 : qrcodeWidth;

                $this.css({ width: qrcodeWidth, height: qrcodeWidth });
            } else if (isImgSvgType) {
                $this.css({ width: resizeWidth, height: resizeWidth * divisorImgSvg });
            } else if (isTextType) {
                $this.css({ "font-size" : (resizeWidth * divisorText), width: '', height: '' })
                presetText(id);
            } else if (isIconType) {
                $this.children('svg').attr({ width: resizeWidth, height: resizeWidth * divisorIcon });
            }
            
            this.currentWidth = resizeWidth
        },
        stop: function() {
            if (this.currentWidth != (this.lastWidth)) {
                clearTimeout(timeoutModificationHistory);
                timeoutModificationHistory = setTimeout(() => saveModificationHistory('resizable stop'), 550);
            }

            this.lastWidth = this.currentWidth;
        },
    });

    $currentTarget.rotatable({
        degrees,
        snap: true,
        step: 1,
        wheelRotate: false,
        rotate: function(_event, ui) {
            const given_angle = ui.angle.current < 0
                ? ui.angle.current+2*Math.PI
                : ui.angle.current; 

            this.degrees = Math.round(given_angle * 180 / Math.PI);

            fixElementsIcons(id, this.degrees);
        },
        stop: function(_event, _ui) {
            $currentTarget.css('transform', `rotate(${this.degrees}deg)`)
                .attr('data-degrees', this.degrees)
                .trigger('mouseup');

            saveModificationHistory('rotatable stop');
        }
    });

    $('div.virar-horizontal').removeClass('active').removeClass('mirror-disabled');
    $('div.virar-vertical').removeClass('active').removeClass('mirror-disabled');
    $('div.action-text-bold').removeClass('active');
    $('div.action-text-italic').removeClass('active');
    $('div.bloquear-elemento').removeClass('active');
    $('div.action-text-align-left').removeClass('active');
    $('div.action-text-align-center').removeClass('active');
    $('div.action-text-align-right').removeClass('active');

    await sleep(10);

    if (isImgSvgQrcodeType) {
        $('div.virar-horizontal').addClass('mirror-disabled');
        $('div.virar-vertical').addClass('mirror-disabled');
    } else {
        const mirrorX = $currentTarget.attr('data-espelharX');
        const mirrorY = $currentTarget.attr('data-espelharY');
    
        mirrorX == -1 && $('div.virar-horizontal').addClass('active');
        mirrorY == -1 && $('div.virar-vertical').addClass('active');
    }    

    $currentTarget.css('font-weight') == "700"    && $('div.action-text-bold').addClass('active');
    $currentTarget.css('font-style')  == "italic" && $('div.action-text-italic').addClass('active');
    $currentTarget.css('text-align')  == "left"   && $('div.action-text-align-left').addClass('active');
    $currentTarget.css('text-align')  == "center" && $('div.action-text-align-center').addClass('active');
    $currentTarget.css('text-align')  == "right"  && $('div.action-text-align-right').addClass('active');
}

const openAction = ({ currentTarget }) => {
    const $currentTarget = $(currentTarget);

    const content = $currentTarget.data("content");
    const id = $currentTarget.data("button-id");

    $(`.button[data-content="${content}"]`).removeClass('active');

    $currentTarget.addClass('active');

    $(`.content[data-content="${content}"]`).hide();
    $(`[data-button-id="${id}"]`).show();

    $("#icons-list").html('');
    $("#copa-list").html('');
    $("#arts-list").html('');

    hideElements();

    if (id == 'meter') {
        $(`.cor-medidor[data-cor="${corMedidor}"]`).addClass('toque-atual');
    } else if (id == 'texts') {
        $('textarea#insert-text').val('');
        $('button#apply-text').show();
        $('button#new-text').hide();
    } else if (id == 'elements') {
        $( "#carrousel-elements-session" ).fadeIn();
        $( "#category-elements-session" ).hide();   
    } else if (id == 'copa') {
        $(`#copa-content`).fadeIn();
        $("#category-copa-session").hide();
    } else if (id == 'ready-arts') {
        $(`.template-arts-content`).fadeIn();
        $("#category-arts-list-session").hide();
    }
}

const see3dModel = ({ currentTarget }) => {
    hideElements();
    generate3D();
    $(currentTarget).removeClass('active');
}

const onApproving = ({ currentTarget }) => {
    const hasSetArte = ($('.checkbox-conferencia:checked').length == $('.checkbox-conferencia').length || continuarDepois == 'salvar');
    
    if (!hasSetArte) return;
    
    const unix = new Date().getTime();
    const { medida, action: continuarDepois } = $(currentTarget).data();
    const gabaritoHTML = $("#gabarito").html();
    const largura = document.getElementById("gabarito").clientWidth;
    const altura = document.getElementById("gabarito").clientHeight;

    if (corMedidor.includes('rgb')) corMedidor = rgbToHex(corMedidor);

    let fixMedida = medida.substring(0,5);

    $.ajax({
        method: "POST",
        url: "/qero/personalizacion_online/setArte?v=" + unix,
        data: {
            medida: fixMedida,
            id_cor,
            altura,
            largura,
            id_tipo,
            id_medida,
            quantidade,
            tipo: "Serigrafia",
            html: gabaritoHTML,
            id_cor_gabarito: id_cor,
            cor_gabarito: corGabarito,
            serigrafia: toques,
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
            idCliente: null,
            continuarDepois
        },
        context: document.body,
        success: (result) => {
            let href = '/qero/';

            if (continuarDepois == 'salvar')          href += `login?id_arte=${result}`;
            else if (getOrigem == 'personalizacion')  href += `compra?id_arte=${result}&id_produto=${getIdProduto}&id_medida=${id_medida}&impressoes=${toques}&id_cor=${id_cor}&cor_tampa=${id_cor_tampa}`;
            else if (getAction == 'comprar')          href += `compra?id_arte=${result}&id_produto=1&id_medida=${id_medida}&impressoes=${toques}&id_cor=${id_cor}&cor_tampa=${id_cor_tampa}`;
            else if (getIdCarrinho)                   href += `personalizacion-productos?cep=${getCep}&estado=${getEstado}&radio=${getRadio}&point_id=${getPointId}`;
            else if (getPedido)                       href += `pedido/${getPedido}?id_arte=${result}`;
            else                                      href += `personalizacion-productos?cep=${getCep}&estado=${getEstado}&radio=${getRadio}&point_id=${getPointId}`;

            window.parent.location.href = href;
        },
    })
}

const fillTemplate = async () => {
    const unix = new Date().getTime();

    const clearHtmlElement = html => html
        .replaceAll('<div class="resizable-handle resizable-r" style="display: inline-block;">', '')
        .replaceAll('<div class="resizable-handle resizable-t">', '')
        .replaceAll('<div class="resizable-handle resizable-r">', '')
        .replaceAll('<div class="resizable-handle resizable-b">', '')
        .replaceAll('<div class="resizable-handle resizable-l">', '')
        .replaceAll('<div class="resizable-handle resizable-r" style="display: none;">', '')
        .replaceAll('<div class="resizable-handle resizable-r" style="display: flex;">', '');

    (() => {
        const $slcCor = $(`.select-colors .cor[data-id_cor="${id_cor}"]`);

        const title = $slcCor.attr('title');
        const data  = $slcCor.data();

        const classe_cor    = data.classeCor;
        const cor           = data.cor;
        const tipoCor       = data.nome;
        
        id_tipo = data.id_tipo;

        $(".template-area").css({ 'background-color' : cor });
        $('.color-name').html('');
        $(`.cores-${classe_cor}`).html(title);
        $('span.cor-modelo').html(tipoCor);
        $('.cup-color').html(tipoCor);
    })();

    id_medida == 4 && id_cor_tampa && (() => {
        const $slcCorTampa = $(`.select-colors .cor-tampa[data-id_cor="${id_cor_tampa}"]`);

        const title = $slcCorTampa.attr('title');

        $('span.tampa-color').html('- Tapa ' + title);
        $('.cores-tampa').html(title);
    })();

    if (id_medida == 1) {
        $('#medidor').css({ left: 702, height: 589 });
        $('#medidor img').css({ height: 589 });
    } else if (id_medida == 2) {
        $('#medidor').css({ left: 710, height: 705 });
        $('#medidor img').css({ height: 705 });
    } else if (id_medida == 3) {
        $('#medidor').css({ left: 696, height: 790 });
        $('#medidor img').css({ height: 790 });
        $('div.opcao.cor[data-cor="#00F173"]').css({ display: 'none'});
    } else if (id_medida == 4) {
        $('#medidor').css({ left: 365, height: 560 });
        $('#medidor img').css({ height: 560 });
    }

    if (getID || idArtePronta) {
        showSpinner();

        $.ajax({
            url: `/qero/personalizacion_online/getArte/${getID || idArtePronta}?v=${unix}`,
            context: document.body,
            success: result => {
                const cleanHtml = clearHtmlElement(result.html);

                $("#gabarito").html(cleanHtml);
                $(`div.cor[data-id_cor="${result.id_cor_gabarito}"]`).trigger('click');

                [result.cor_1, result.cor_2, result.cor_3, result.cor_4].forEach((r_cor, idx) => {
                    if (!r_cor) return;

                    const n_cor = idx+1;

                    $(`div.color-cube[data-class="${n_cor}"]`)
                        .attr({ title: r_cor, 'data-cor': r_cor })
                        .css('background-color', r_cor);

                    corAtual['cor'+n_cor] = r_cor;
                });

                corMedidor = result.cor_medidor;

                enableElementsDraggable();
                setCamadas();
                draggableMedidor();
                hideSpinner();

                if (getID) {
                    window.sessionStorage.setItem("tutorial", "true");

                    $('.shadow-background').hide();
                    $('.create-session .button').css({ 'pointer-events': 'unset' });
                    $('.custom-session').css({ 'pointer-events': 'unset' });
                }

                saveModificationHistory('fillTemplate');
            }
        });
    } else if (id_medida != 4) {
        let width = 65;

        if (id_medida == 3) width = 80;
        else if (id_medida == 2) width = 75;

        appendNewElement({
            id: unix,
            type: 'icon',
            style: `z-index: 1; top: 4px; left: 2px; fill: ${corAtual.cor1}; width: ${width}px;`,
            id_svg: 1007,
            width,
            corAtual
        });

        saveModificationHistory('fillTemplate');
    } else {
        saveModificationHistory('fillTemplate');
    }
}

const getCursorPosition = event => {
    const cursorX = event.clientX;
    const cursorY = event.clientY;

    const elementRect = gabaritoElement.getBoundingClientRect();

    const elementX = elementRect.left + window.scrollX;
    const elementY = elementRect.top + window.scrollY;

    const cursorInsideElementX = cursorX - elementX;
    const cursorInsideElementY = cursorY - elementY;

    cursorPosition.x = cursorInsideElementX;
    cursorPosition.y = cursorInsideElementY;
}

const hasElementsImgSvg = () => !!$("div.elemento.img-svg").length

let backHistory = [];
let historyIdx = 0;

const saveModificationHistory = async (by = '') => {
    await sleep(50);

    const cloneGabarito = $($('#gabarito').clone()[0].outerHTML);

    cloneGabarito.find(".selecionado").removeClass("selecionado");
    cloneGabarito.find(".resizable-r").hide();
    cloneGabarito.find("#linha-mid-x").hide();
    cloneGabarito.find("#linha-mid-y").hide();
    cloneGabarito.find(".excluir-elemento").hide();
    cloneGabarito.find(".ui-rotatable-handle").hide();
    cloneGabarito.find(".linha").remove();
    
    clearInterval(timeoutModificationHistory)

    const template = $('#gabarito').clone()[0].outerHTML;

    const variables = {
        toques,
        id_medida,
        id_cor,
        id_cor_tampa,
        corAtual: JSON.parse(JSON.stringify(corAtual)),
        corMedidor,
        corGabarito,
    }

    console.log(by);

    if (historyIdx > 0 && backHistory.length) {
        const idx = backHistory.length - historyIdx;
        const qntd = backHistory.length - idx;

        backHistory.splice(idx, qntd);
    }

    historyIdx = 0;

    backHistory.push({
        template,
        variables,
        by
    });

    backHistory.length >= 100 && backHistory.unshift();

    verifyHistoryButtons();

    await sleep(50);

    return true;
}

const onCallModification = async (template, variables) => {
    const $new = $(template);
    const $current = $('#gabarito');

    $new.find('.elemento').css({ opacity: 0, transition: 'opacity .5s' })

    $current.css('background-color', $new.css('background-color'));
    $current.html($new.html());

    toques       = variables.toques;
    id_medida    = variables.id_medida;
    id_cor       = variables.id_cor;
    id_cor_tampa = variables.id_cor_tampa;
    corAtual     = variables.corAtual;
    corMedidor   = variables.corMedidor;
    corGabarito  = variables.corGabarito;

    (() => {
        const $slcCor = $(`.select-colors .cor[data-id_cor="${id_cor}"]`);

        const title = $slcCor.attr('title');
        const data  = $slcCor.data();

        const classe_cor    = data.classeCor;
        const cor           = data.cor;
        const tipoCor       = data.nome;

        $(".template-area").css({ 'background-color' : cor });
        $('.color-name').html('');
        $(`.cores-${classe_cor}`).html(title);
        $('span.cor-modelo').html(tipoCor);
        $('.cup-color').html(tipoCor);
    })();

    id_cor_tampa && (() => {
        const $slcCorTampa = $(`.select-colors .cor-tampa[data-id_cor="${id_cor_tampa}"]`);

        const title = $slcCorTampa.attr('title');

        $('span.tampa-color').html('- Tapa ' + title);
        $('.cores-tampa').html(title);
    })();

    (() => {
        $(".cor-medidor").removeClass('toque-atual');
        $(`.cor-medidor[data-cor="${corMedidor}"]`).addClass('toque-atual');
    })();

    (() => {
        $('.img-svg').length && showSpinner();

        $('.img-svg').each(function() {
            const $this = $(this);

            const unix = new Date().getTime();
            const link = $this.data('link-img') || $this.children('img').attr('src');
            const id_elemento = $this.attr('id');

            const { cor } =  getQueryParameters(link);

            const cor_nova = '#'+cor;

            $.ajax({
                method: "POST",
                url: "/qero/personalizacion_online/img2svg?v=" + unix,
                data: { link, cor_nova },
                context: document.body,
                success: (result) => {
                    const linkImg = `${result}&v=${unix}`
    
                    $this
                        .attr('data-link-img', linkImg)
                        .children('img')
                        .attr('src', linkImg);
    
                    !$this.children('img').length && $this.css('background-image', `url(${linkImg})`);
    
                    $(`.layer[data-id-elemento="${id_elemento}"] div`).css("background-image", `url(${linkImg})`);
                },
            });

            setTimeout(hideSpinner, 500);
        })
    })();

    await sleep(50);

    enableElementsDraggable();
    setCamadas();
    draggableMedidor();

    sequentialArray(4).forEach(n => {
        const color = corAtual['cor'+n];

        if (color) {
            const $slcCor = $(`.select-colors .cor[data-id_cor="${id_cor}"]`);
            const title = $slcCor.attr('title');

            $(`.cor-medidor[data-class="${n}"]`)
                .css('background-color', color)
                .attr({ title, 'data-cor': color });

            $(`.cor-elemento[data-class="${n}"]`)
                .css('background-color', color)
                .attr({ title, 'data-cor': color });
        }
    });

    (async () => {
        await sleep(150);

        $('#gabarito .elemento').css({ opacity: 1 })
    })();
}

const verifyHistoryButtons = async () => {
    await sleep(100);

    const maxIdx = backHistory.length - 1;

    const goNextDisable = historyIdx > maxIdx || historyIdx <= 0;
    const goBackDisable = backHistory.length < 2 || historyIdx >= (maxIdx);

    goNextDisable ? $('.go-next').addClass('go-disabled') : $('.go-next').removeClass('go-disabled');
    goBackDisable ? $('.go-back').addClass('go-disabled') : $('.go-back').removeClass('go-disabled');
}

const triggerModificationHistory = ({ ctrlKey, metaKey, key }) => {
    const hasPressControl = ctrlKey || metaKey;

    if (!hasPressControl) return;

    const maxIdx = backHistory.length - 1;

    const goNextDisable = historyIdx > maxIdx || historyIdx <= 0;
    const goBackDisable = backHistory.length < 2 || historyIdx >= (maxIdx);
    
    (key === 'z' && !goBackDisable) && backModificationHistory();
    (key === 'y' && !goNextDisable) && nextModificationHistory();
}

const backModificationHistory = async () => {
    if (!backHistory.length) return;

    historyIdx++;

    const idx = backHistory.length - historyIdx - 1;

    const { template, variables } = backHistory[idx];

    onCallModification(template, variables);
    
    verifyHistoryButtons();
}

const nextModificationHistory = async () => {
    const maxIdx = backHistory.length - 1;

    if (historyIdx > maxIdx || historyIdx <= 0) return;

    historyIdx--;

    const idx = backHistory.length - historyIdx - 1;

    const { template, variables } = backHistory[idx];

    onCallModification(template, variables);
    
    verifyHistoryButtons();
}

document.addEventListener('keydown', triggerModificationHistory);