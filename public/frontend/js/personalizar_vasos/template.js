// <reference path="./jquery-3.5.1.min.js" />
// <reference path="./jquery-ui.js" />
// <reference path="./html2canvas.js" />
// <reference path="./common.js" />
// <reference path="../../js/js/serigrafia2.js" />
// <reference path="./pages/digital.js" />

// LOADERS
var loader = "<div class='loader-session flex content-center align-center'> <img src='/qero/assets/personalizacion_online/images/loader.gif'> </div>";

const cursorPosition = { x: 0, y: 0 }

const toolType = window.location.href.includes('serigrafia') ? 'serigrafia' : 'digital'
const isDigitalTool = toolType !== 'serigrafia';

window.onload = function() {
    const customSession = document.querySelector('.custom-session');
    console.log(customSession)

    customSession && customSession.scrollTo(0, customSession.scrollHeight);
  };

document.addEventListener('DOMContentLoaded', () => {
    hasRedirectMobile();
    verifyStylesTags();

    $("div.action-text-align-left").on('click', setElementTextAlign('left'));
    $("div.action-text-align-center").on('click', setElementTextAlign('center'));
    $("div.action-text-align-right").on('click', setElementTextAlign('right'));
    $("div.action-text-italic").on('click', setElementFontItalic);
    $("div.action-text-bold").on('click', setElementFontBold);
    $(document).on("keyup", onDocumentKeyup);
    $(document).on('click', '.excluir-elemento', deleteSelectedElement);
    $(document).on('click', '.excluir-elemento-painel', deleteSelectedElement);
    $(document).on('click', '.bloquear-elemento', blockElement);
    $(document).on('click', '.trazer-para-frente', moveForward);
    $(document).on('click', '.enviar-para-tras', moveBackward);
    $(document).on('click', '.duplicar-elemento', cloneElement);
    $(document).on('click', '.virar-horizontal', mirrorElement('x'));
    $(document).on('click', '.virar-vertical', mirrorElement('y'));
    $("#art-layers").sortable().on('mouseup touchend', onArtLayersMouseup);
    $(document).on('click', '.layer', onLayerClick);
    $(document).on('mousedown touchstart', '.layer', onLayerMousedown);
    $(document).on('mouseup touchend', '.layer', onLayerMouseup);
    $(document).on("mouseup touchend", "#medidor", onMedidorMouseup)
    $(document).on("mousedown touchstart", "#medidor", onMedidorMousedown)
    $("div#boxModelo .fechar-box-modelo").click(closeBoxModelo);
    $("div#boxAprovacao .fechar-box-aprovacao").click(closeBoxApproval);
    $(".checkbox-conferencia").on('click', onCheckApproval);
    $(".select").on('click', toggleCustomSelect);
    $(".select .select-option" ).on('click', onSelectCustomSelect);
    $(document).on('click', '.see-more-icons', seeMoreIcons);
    $(document).on("click", '.close-icon-list', closeIconList);
    $(document).on("click", '.close-arts-list', closeArtsList);
    $(document).on("click", ".create-session", hideElements);
    $(".copo-3d").on('click', generate3dModel);
    $(document).on('keydown', onDocumentKeydown)
    $('#search-pantone').on('keyup', searchPantones);
    $('i.search-elements-submit').on('click', buscaElementos);
    $('#search-elements').on('keyup', hasSearchElements);
    $(document).on("click", "a.art-selector", showSpinner);
    $("#save-continue").on('click', saveAndContinue);
    $('#generate-qrcode').on('click', generateQRCode);

    getQueryParameters()?.src == 'arte-final' && $(document).on('click', '.layer-qrcode', downloadQrcode);
    getQueryParameters()?.origem == 'personalizacion' && $("#continue").html('COTIZAR');
});

const downloadQrcode = ({ currentTarget }) => {
    const link = $(currentTarget).data('qrcode');

    window.open(link + '?download=1');
}

const removeElements = () => {
    const id_elemento = $('.selecionado').attr('id');
    
    id_elemento && $(`.layer[data-id-elemento="${id_elemento}"]`).remove();
    
    $('.selecionado').remove();
    $('textarea#insert-text').val('');
    
    countLayers();
}

const countLayers = () => {
    const $layers = $(".layer");
    const layersLength = $layers.length;

    if (layersLength === 0) {
        $(".content-art-layers").fadeOut();
        return;
    }

    let counterElements = 0;

    $layers.each(function() {
        $this = $(this);
        
        const id_elemento = $this.data('id-elemento');
        const elementPosition = Math.abs(counterElements - layersLength); 

        $this.attr('data-id-layer', elementPosition);
        $(`#${id_elemento}`).css('z-index', elementPosition);
        
        counterElements++;
        
        $(`.layer[data-id-layer="${elementPosition}"] .layer-number`).html(counterElements);
    });
}

const ajustaFontes = () => {
	$("div#html2canvas div.elemento").each(function() {
        const $this = $(this);

		const fontFamily = $this.css('font-family');
        
		if (fontFamily == 'Amigos' || fontFamily == '"Lovely Valentine"') {
            const diff = fontFamily == 'Amigos' ? -10 : 10;
			const topFS = parseInt($this.css('top').replace('px', '')) - diff;
			$this.css('top', topFS);
		} 
	});
}

const buscaElementos = () => {
    const search = $('#search-elements').val();

    if (!search.length) return;
    
	const unix = new Date().getTime();

    $("#carrousel-elements-session").fadeOut(300);

    setTimeout(() => {
        $(loader).hide().clone().appendTo('#category-elements-session');
        $("#category-elements-session").show();
        $("#category-elements-session .loader-session").fadeIn(300);
    }, 100);

    $("#category-elements-session #icons-list").html('');

    $.ajax({
        url: "/qero/personalizacion_online/getSearchedIcons/"+search+"?v=" + unix,
        context: document.body,
        success: (result) => {
            let delay = 0;
            let ms = 75;

            if (result.length > 100) ms = 50;
            if (result.length > 200) ms = 30;
            if (result.length > 300) ms = 25;

            for (var i in result) {
                const $icon = $(`<div class="icon-card flex mg-btm-10" id="icon-galeria-${result[i].id}" data-id_icon="${result[i].id}">${result[i].svg}</div>`);
                
                setTimeout(() => $icon.hide().appendTo('#icons-list').fadeIn(300), delay * ms);
                
                delay++;
            };

            $(".loader-session").fadeOut(500, () => $(".loader-session").remove());   
        }
    });
    
}

const appendNewElement = ({ id, type, style, ...data }, last = false) => {
    const $element = $(htmlString`
        <div
            id="elemento-${id}"
            class="elemento ${type}"
            style="${style}"
            data-espelharX="1"
            data-espelharY="1"
            data-degrees="0"
        >
            <i class="excluir-elemento" style="display: none;"></i>
        </div>
    `);

    const $layer = $(htmlString`
        <div
            data-id-elemento="elemento-${id}"
            class="layer mg-btm-10 flex align-center"
        >
            <p class="text fs-12">
                <span class="layer-number text-semi-bold">0</span>
            </p>
            <div class="flex content-center width-100"></div>
        </div>
    `);

    if (type === 'icon') {
        const color = (data.corAtual?.cor1 || '#000').replace('#', '');

        $element.css({ opacity: 0, transition: 'opacity .3s'});
        $element.attr('data-id_svg', data.id_svg)
        $element.prepend(`<img onload="verifyImageSize(this, ${id}, ${data.width || 0})" src="${svg_url(data.id_svg, color)}" />`);
        $layer.children('.content-center').css({
            width: 55,
            height: 55,
            margin: '0 auto',
            'background-image': `url(${svg_url(data.id_svg, color)})`,
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-size': 'contain',
            'background-color': 'rgba(255, 255, 255, 0)'
        });
    } else if (type === 'text') {
        $element.prepend(`<span>${data.text}</span>`);
        $layer.children('.content-center').css('fill', data.corAtual?.cor1 || '#000').append(`<span class="text-preview" style="font-family: ${data.fontFamily}; color: ${data.corAtual?.cor1 || '#000'}">${data.text}</span>`);
    } else if (type === 'img-svg') {
        $element.prepend(`<img src="${data.img}" style="width: 100%; height: 100%; object-fit: cover;" />`);
        $element.attr('data-link-img', data.img);
        
        $layer.children('.content-center').css({
            width: 55,
            height: 55,
            margin: '0 auto',
            'background-image': `url(${data.img})`,
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-size': 'contain',
            'background-color': 'rgba(255, 255, 255, 0)'
        });
    } else if (type === 'img-svg-qrcode') {
        $element.prepend(`<img onload="verifyImageSize(this, ${id}, ${data.width || 0})" src="${data.url}" style="width: 100%; height: 100%; object-fit: cover;" />`);
        $element.css({ opacity: 0, transition: 'opacity .3s'});
        
        $layer.children('.content-center').css({
            width: 55,
            height: 55,
            margin: '0 auto',
            'background-image': `url(${data.url})`,
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-size': 'contain',
            'background-color': 'rgba(255, 255, 255, 0)'
        });

        if (!$layer.hasClass('layer-qrcode')) {
            $layer.addClass('layer-qrcode');
            $layer.attr('data-qrcode', data.url);
        }
    }

    $('#gabarito')[last ? 'prepend' : 'append']($element);
    $('.content-art-layers').fadeIn();
    $('#art-layers')[last ? 'append' : 'prepend']($layer);

    onAddElement(id);
    countLayers();
}

const verifyStylesTags = () => document
    .querySelectorAll('body style')
    .forEach(element => element.id != 'current-styles' && element.remove());



let timeoutDraggableMedidor = null;
const draggableMedidor = () => $("#medidor").draggable({
    axis: "x",
    drag: function ( _event, ui ) {
        let newLeft = ui.position.left;

        newLeft < 10 && (newLeft = 10);
        newLeft > 692 && (newLeft = 680);

        ui.position.left = newLeft;
    },
    stop: () => {
        try { 
            clearTimeout(timeoutDraggableMedidor);
            timeoutDraggableMedidor = setTimeout(() => saveModificationHistory('draggableMedidor'), 500);
        } catch (_e) { }
    }
});

const onAddElement = id => {
    enableElementsDraggable();

    toolType === 'serigrafia' && draggableMedidor();
    
    const $element = $('#elemento-' + id);

    $('.ui-rotatable-handle').hide();
    $('.resizable-r').hide();

    $(".selecionado").removeClass("selecionado");
    setTimeout(() => {
        $element.trigger('mouseup');
    }, 50);

    hideElements();
    $('div.custom-session div.content .surrounded-session').hide();
}

const cloneElement = () => {
    const $selected = $('.selecionado');

    const unix = new Date().getTime();

    const top = parseInt($selected.css('top')) + 50;
    const left = parseInt($selected.css('left')) + 50;

    $selected
        .clone()
        .attr('id', 'elemento-' + unix)
        .css({ top, left })
        .appendTo("#gabarito");
    
    $('.layer.selected')
        .clone()
        .attr('data-id-elemento', 'elemento-' + unix)
        .prependTo('#art-layers');

    $('.excluir-elemento').hide();

    countLayers();
    onAddElement(unix);

    const { isImgSvgType } = getElementType($selected);

    if (!isImgSvgType) {
        try { saveModificationHistory('setElementFontItalic') } catch (_e) { }

        return;
    };

    showSpinner();

    const $newElement = $('#elemento-' + unix);

    const src = $newElement.attr('data-link-img');

    $.ajax({
        method: "POST",
        url: "/qero/personalizacion_online/cloneImg?v=" + unix,
        data: { src },
        context: document.body,
        success: result => {
            hideSpinner();

            result && $newElement
                .attr('data-link-img', result)
                .children('img')
                .attr('src', result);

            try { saveModificationHistory('setElementFontItalic') } catch (_e) { }
        }
    })
}

const onLayerClick = ({ currentTarget }) => {
    const $currentTarget = $(currentTarget);

    const $elements = $("div.elemento");

    $elements.removeClass('selecionado');
    $elements.children('.excluir-elemento').hide();
    $elements.children('.resizable-handle').hide();
    $elements.children('.ui-rotatable-handle').hide();

    $("div.layer").removeClass('selected');

    $currentTarget.addClass('selected');

    const elementID = $currentTarget.data('id-elemento');
    const $element = $('#' + elementID);

    if ($element.hasClass('bloqueado')) {
        $('div.bloquear-elemento').addClass('active');
        $('div.bloquear-elemento div.tooltip p.text-lighter').html('Liberar elemento');
    } else {
        $element.trigger('mouseup');
        $('div.bloquear-elemento div.tooltip p.text-lighter').html('Bloquear elemento');
    }
}

const moveBackward = () => {
    const $selected = $('.selecionado');
    const $cloneLayer = $('.layer.selected').clone();
    const zIndex = parseInt($selected.css('z-index'));

    if (zIndex <= 1) return;

    $selected.css('z-index', zIndex - 1);

    $('.layer.selected').remove();
    $cloneLayer.insertAfter(`.layer[data-id-layer="${zIndex - 1}"]`);
    countLayers();

    try { saveModificationHistory('moveBackward') } catch (_e) { }
}

const moveForward = () => {
    const $selected     = $('.selecionado');
    const $cloneLayer   = $('.layer.selected').clone();

    const layerID = $cloneLayer.data('id-layer');
    const totalLayers = $(".layer").length
    const zIndex = parseInt($selected.css('z-index'));

    $selected.css('z-index', zIndex + 1);

    if (layerID != totalLayers) {
        $(".layer.selected").remove();
        $cloneLayer.insertBefore(`.layer[data-id-layer="${zIndex + 1}"]`);
    }

    countLayers();

    try { saveModificationHistory('moveForward') } catch (_e) { }
}

const blockElement = ({ currentTarget }) => {
    const elementID = $("div.layer.selected").attr("data-id-elemento");

    const $currentTarget = $(currentTarget);
    const $layer = $(`.layer[data-id-elemento="${elementID}"]`);
    const $element = $(`#${elementID}`);
    const $tooltipText = $('div.bloquear-elemento div.tooltip p.text-lighter');

    if ($currentTarget.hasClass('active')) {
        $currentTarget.removeClass('active');
        $element.removeClass('bloqueado').addClass('selecionado');
        $layer.removeClass('bloqueado').trigger('click');
        $tooltipText.html('Bloquear elemento');
    } else {
        $currentTarget.addClass('active');
        $element.addClass('bloqueado').removeClass('selecionado');
        $layer.addClass('bloqueado');
        $tooltipText.html('Liberar elemento');
    }
}

const onDocumentKeydown = ({ key }) => {
    const $selected = $('.selecionado');

    if (!$selected.length) return;

    const distance = isDigitalTool ? 3 : 1;

    let top  = parseInt($selected.css('top'));
    let left = parseInt($selected.css('left'));

    if (key === 'ArrowLeft')  left -= distance;
    if (key === 'ArrowUp')    top  -= distance;
    if (key === 'ArrowRight') left += distance;
    if (key === 'ArrowDown')  top  += distance;

    $selected.css({ top, left })
}

let timeoutDocumentKeyup = null;
const onDocumentKeyup = ({ key, ctrlKey, metaKey }) => {
    if (key === 'Escape') return hideSpinner();

    const isNotInsertText = $(':focus').attr('id') != 'insert-text';

    if (key === 'Delete' && isNotInsertText) removeElements();

    const $selected = $('.selecionado');

    if (!$selected.length || !$selected?.hasClass('text')) return;

    const notAlowedKeys = ['Shift', 'Alt', 'Shift', 'Ctrl', 'Control', 'c', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'CapsLock', 'AltGraph', 'NumLock'];

    const hasPressControl = ctrlKey || metaKey;

    if (isNotInsertText && !notAlowedKeys.includes(key) && !hasPressControl) {
        let texto = $('.selecionado span').html();

        if (key === 'Backspace') {
            $selected.children('span').html(texto.substr(0, texto.length - 1));
        } else if (key === 'Enter') {
            $selected.children('span').html(texto + "<br />");
        } else {
            $selected.children('span').html(texto + key);
        }

        try { 
            clearTimeout(timeoutDocumentKeyup);
            timeoutDocumentKeyup = setTimeout(() => saveModificationHistory('onDocumentKeyup text'), 500);
         } catch (_e) { }
    }

    $selected.trigger('mouseup');
}

const hasRedirectMobile = () => {
    $("body").width() <= 1100 && Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'Oops...',
        text: 'Será redirigido a nuestra exclusiva versión simplificada de la herramienta de personalización.',
        footer: '<a href="https://ecovasos.com/qero/compra"></a>'
    }).then(() => {
        const url = window.location.href;
        const queryString = url.split('?')[1] || '';
        
        window.location.href = `https://ecovasos.com/qero/personalizacion_online/mobile/${toolType}?${queryString}`
    })
}

const onCheckApproval = () => {
    const allChecked = $('.checkbox-conferencia:checked').length == $('.checkbox-conferencia').length;

    allChecked
        ? $('div#aprovado').css({ opacity: '1', cursor: 'pointer' })
        : $('div#aprovado').css({ opacity: '0.5', cursor: 'not-allowed' });
}

const toggleCustomSelect = ({ currentTarget }) => {
    const $currentTarget = $(currentTarget);
    const idSelect = $currentTarget.data('id-select');

    $(`#${idSelect} .inside-select`).toggle();
}

const onSelectCustomSelect = ({ currentTarget }) => {
    const $currentTarget = $(currentTarget);
    const value = $currentTarget.data('value');

    const idSelect = $currentTarget.parent().data('id-select');
    const $customSelect = $(`#${idSelect}`);

    $currentTarget.css('background-color', '#f1f1f1');
    $customSelect.find('.select-option').css('background-color', 'unset');
    $customSelect.find('.changed-option').html(value);

    $currentTarget.hasClass('cup-size-option') && changeMeasureTemplate(value);

    if ($currentTarget.hasClass('font-option')) {
        $customSelect.find('.changed-option').css('font-family', value);
        try { saveModificationHistory('select font-family') } catch (_e) { }
    }

    const $selectedElement = $('.selecionado');

    if ($selectedElement.hasClass('text')) {
        if (idSelect == 'font-size-select') {
            $selectedElement.css('font-size', value);
        } else if(idSelect == 'font-select') {
            $selectedElement.css('font-family', value);
            $('.layer.selected span.text-preview').css('font-family', value);
        }
    }

    $('.inside-select').fadeOut();
}

const seeMoreIcons = async ({ currentTarget }) => {
    const $currentTarget = $(currentTarget);
    
    const unix = new Date().getTime();
    const idCategory = $currentTarget.data('id-categoria');

    $("#carrousel-elements-session").fadeOut(300);

    if ($('.content[data-button-id="destaques"]').css('display') != 'none') {
        $('.content[data-button-id="destaques"]').fadeOut(300);
        await sleep(300);
        $('.open-action.active').removeClass('active')
        $('.open-action[data-button-id="elements"]').addClass('active')
        $('.content[data-button-id="elements"]').fadeIn(300);
    }

    setTimeout(() => {
        $(loader).hide().clone().appendTo('#category-elements-session')
        $("#category-elements-session").show()
        $("#category-elements-session .loader-session").fadeIn(300)
    }, 100);

    $.ajax({
        url: `/qero/personalizacion_online/getCategoryIcons/${idCategory}?v=${unix}`,
        context: document.body,
        success: result => {
            let delay = 0;

            for (var i in result) {
                const $icon = $(htmlString`
                    <div
                        class="icon-card flex mg-btm-10"
                        id="icon-galeria-${result[i].id}"
                        data-id_icon="${result[i].id}"
                    >
                        ${result[i].svg}
                    </div>`);
                
                setTimeout(() => $icon.hide().appendTo('#icons-list').fadeIn(300), delay * 75);
                
                delay++;
            };

            $(".loader-session").fadeOut(300, () => $(".loader-session").remove());

            verifyStylesTags();
            setTimeout(verifyStylesTags, 1000);
            setTimeout(verifyStylesTags, 10000);
        },
    })
}

const closeIconList = () => {
    const $categoryElementsSession = $("#category-elements-session");

    $categoryElementsSession.fadeOut(300, () => {
        $categoryElementsSession.find('#icons-list').html('');
        $("#carrousel-elements-session").fadeIn(300);
        $("input#search-elements").val('');
    })
}

const closeArtsList = () => {
    const $categoryArtsListSession = $("#category-arts-list-session");

    $categoryArtsListSession.fadeOut(300, () => {
        $categoryArtsListSession.find('#arts-list').html('');
        $(".template-arts-content").fadeIn(300);
    });
}

const onArtLayersMouseup = () => setTimeout(countLayers, 100);
const onLayerMousedown = ({ currentTarget }) => $(currentTarget).css('cursor', 'grabbing');
const onLayerMouseup = ({ currentTarget }) => $(currentTarget).css('cursor', 'grab');

const onMedidorMouseup = () => {
    $('.open-action[data-button-id="meter"]').trigger('click');
    $('#medidor').css('transition', 'ease-in-out 0.5s' );
}

const onMedidorMousedown = () => $('#medidor').css('transition', 'ease-in-out 0s');

const searchPantones = ({ currentTarget }) => busca(currentTarget.value, '.bloco-pantone');

const hasSearchElements = ({ key }) => key === 'Enter' && buscaElementos();

const saveAndContinue = () => {
    showSpinner();
    hideElements();
    $('#continue').trigger('click');
    $("#aprovado").attr('data-action', 'salvar');
}

const closeBoxModelo = () => {
    $("#boxModelo").fadeOut()
	$("#boxModelo iframe").attr("src", "")
}

const closeBoxApproval = () => {
    $("div#boxAprovacao").fadeOut();
    $("div#boxAprovacao iframe").attr("src", "");
    $(".checkbox-conferencia").prop("checked", false);
}

const generate3dModel = ({ currentTarget }) => {
    hideElements();
    generate3D();
    $(currentTarget).removeClass('active')
}

const setCamadas = (trigger = true) => {
    let $lastElement;

    $('#art-layers').html('');

    $("div.elemento").each(function() {
        const $this = $(this);
        const id    = $this.attr('id');
        const id_svg = $this.data('id_svg');

        let layer = '';
        $lastElement = $this;

        if ($this.hasClass('text')) {
            layer = htmlString`
                <div
                    data-id-elemento="${id}"
                    class="layer mg-btm-10 flex align-center"
                >
                    <p class="text fs-12">
                        <span class="layer-number text-semi-bold">0</span>
                    </p>
                    <div class="flex content-center width-100" style="color: ${$this.css('color')};">
                        <span class="text-preview">${$this.children('span').html()}</span>
                    </div>
                </div>
            `
        } else if ($this.hasClass('icon') && !id_svg) {
            layer = htmlString`
                <div
                    data-id-elemento="${id}"
                    class="layer mg-btm-10 flex align-center"
                >
                    <p class="text fs-12">
                        <span class="layer-number text-semi-bold">0</span>
                    </p>
                    <div class="flex content-center width-100" style="fill: ${$this.css('fill')};">
                        ${$this.html()}
                    </div>
                </div>
            `
        } else if ($this.hasClass('icon') && id_svg) {
            layer = htmlString`
                <div
                    data-id-elemento="${id}"
                    class="layer mg-btm-10 flex align-center"
                >
                    <p class="text fs-12">
                        <span class="layer-number text-semi-bold">0</span>
                    </p>
                    <div
                        class="flex content-center width-100"
                        style="background-image: url(${$this.find('img').attr('src')}); width: 55px; height: 55px; margin: 0 auto; background-position: center; background-repeat: no-repeat; background-size: contain; background-color: rgba(255, 255, 255, 0);"
                    ></div>
                </div>
            `
        } else if ($this.hasClass('img-svg')) {
            layer = htmlString`
                <div
                    data-id-elemento="${id}"
                    class="layer mg-btm-10 flex align-center"
                >
                    <p class="text fs-12">
                        <span class="layer-number text-semi-bold">0</span>
                    </p>
                    <div
                        class="flex content-center width-100"
                        style="background-image: url(${$this.children('img').attr('src')}); width: 55px; height: 55px; margin: 0 auto; background-position: center; background-repeat: no-repeat; background-size: contain; background-color: rgba(255, 255, 255, 0);"
                    ></div>
                </div>
            `
        } else if ($this.hasClass('img-svg-qrcode')) {
            layer = htmlString`
                <div
                    data-id-elemento="${id}"
                    class="layer mg-btm-10 flex align-center layer-qrcode"
                    data-qrcode="${$this.children('img').attr('src')}"
                >
                    <p class="text fs-12">
                        <span class="layer-number text-semi-bold">0</span>
                    </p>
                    <div
                        class="flex content-center width-100"
                        style="background-image: url(${$this.children('img').attr('src')}); width: 55px; height: 55px; margin: 0 auto; background-position: center; background-repeat: no-repeat; background-size: contain; background-color: rgba(255, 255, 255, 0);"
                    ></div>
                </div>
            `
        }

        $("#art-layers").prepend(layer);
    });

    trigger && $lastElement?.trigger('mouseup');

    $('.content-art-layers').fadeIn();
    countLayers();
}

const copy = () => {
	const text = $("div.ampliar-box-modelo a").attr('href');
	
    navigator.clipboard.writeText(text).then(
        () => Swal.fire('Link copiado com sucesso', '', 'success'),
        err => console.error('Async: Could not copy text: ', err)
    );
}

const getAllAttrs = (elmnt) => {
    if (!elmnt) return {}

    const element = (elmnt instanceof jQuery)
        ? elmnt[0]
        : elmnt;

    const attrs = element
        .getAttributeNames()
        .reduce((acc, name) =>  ({ ...acc, [name]: element.getAttribute(name) }), {});

    return attrs || {}
}

const generateQRCode = async () => {
    const str = $('#qrcode-field').val();

    if (!str) return;

    const typeNumber = 0;
    const errorCorrectionLevel = 'L';

    const qr = qrcode(typeNumber, errorCorrectionLevel);

    qr.addData(str);
    qr.make();

    const hasCorAtual = typeof corAtual === 'object' && corAtual?.cor1;

    const fillColor = hasCorAtual || '#000000';

    const size = hasCorAtual ? 200 : 500;

    const svg = qr.createSvgTag({ cellSize: hasCorAtual ? 4 : 12 })
        .replace('fill="white"', 'fill="transparent"')
        .replace('fill="black"', `fill="${fillColor}"`);    

    const color = fillColor.replace('#', '');

    const url = await ajaxPromise({
        url: '/qero/personalizacion_online/salvar_qrcode',
        type: 'POST',
        data: { color, svg },
        context: document.body
    });

    const unix  = new Date().getTime();

    appendNewElement({
        id: unix,
        type: 'img-svg-qrcode',
        style: `z-index: 1; top: calc(50% - 75px); left: calc(50% - 75px); fill: ${fillColor}; width: ${size}px; height: ${size}px;`,
        url,
    });

    $('#qrcode-field').val('')

    saveModificationHistory('generateQRCode');
}