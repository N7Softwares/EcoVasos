const toolInfos = {
    device: window.location.href.includes('mobile') ? 'mobile' : 'desktop',
    type: window.location.href.includes('serigrafia') ? 'serigrafia' : 'digital',
}

const rgbToHex = rgb => {
    const componentToHex = (c = '') => c.toString(16).padStart(2, '0').toUpperCase();

    const rgbElemento = rgb.replace('(', '').replace(')', '').replace('rgb', '').split(", ");

    const r = componentToHex(parseInt(rgbElemento[0]));
    const g = componentToHex(parseInt(rgbElemento[1]));
    const b = componentToHex(parseInt(rgbElemento[2]));

    return `#${r}${g}${b}`;
}

const presetText = id => {
    const $element = $('#elemento-'+id);

    const fontSize = $element.css('font-size');
    const fontFamily = $element.css('font-family').replaceAll('"', '');

    $('#font-size-select span.changed-option').html(fontSize);
    $('#font-select span.changed-option').css('font-family', fontFamily).html(fontFamily);
}

const busca = (value, targetSelector) => {
    const $targetSelector = $(targetSelector);

    $targetSelector.show();

	value && $(`${targetSelector}:not([title^="${value}"])`).hide();
}

const htmlString = (strings, ...values) => {
    const html = strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');

    const tagPattern = />\s+</g;
    const tagAttrsPattern = /<(\w+)([\s\S]*?)?>/g;
    const tagAttrsSpacesPattern = /(\S+)\s*=\s*(['"][^'"]*['"])/g;

    let format = html;

    format = format.replace(tagPattern, '><');
    format = format.replace(tagAttrsPattern, (match, p1, p2) => `<${p1}${p2.replace(/\n|\r|\s+/g, ' ')}>`);
    format = format.replace(tagAttrsSpacesPattern, (match, p1, p2) => `${p1}=${p2}`);

    return format
}

const setCurrentStyles = (styles = '') => document.getElementById('current-styles').innerHTML = styles;

const fixElementsIcons = (id, degrees = 0) => id && setCurrentStyles(`
    #elemento-${id} .excluir-elemento {
        transform: rotate(${0-degrees}deg);
    }

    #elemento-${id} .resizable-r:before {
        transform: rotate(${0-degrees}deg);
    }
    
    #elemento-${id} .ui-rotatable-handle:before {
        transform: rotate(${0-degrees}deg);
    }
`);

const sleep = ms => new Promise(r => setTimeout(r, ms));

const getElementType = (element) => {
    const $element = (element instanceof jQuery)
        ? element
        : $(element);

    const initialData = {
        isTextType: false,
        isIconType: false,
        isImgSvgType: false,
        isImgSvgQrcodeType: false,
        type: ''
    }

    if ($element.hasClass('text'))           return { ...initialData, type: 'text', isTextType: true };
    if ($element.hasClass('icon'))           return { ...initialData, type: 'icon', isIconType: true };
    if ($element.hasClass('img-svg'))        return { ...initialData, type: 'img-svg', isImgSvgType: true };
    if ($element.hasClass('img-svg-qrcode')) return { ...initialData, type: 'img-svg-qrcode', isImgSvgQrcodeType: true };
    
    return initialData;
}

const getElementColor = element => {
    const $element = (element instanceof jQuery)
        ? element
        : $(element);

    const { isTextType } = getElementType($element);

    let color = isTextType ? $element.css("color") : $element.css("fill");

    if (!color.includes('#')) color = rgbToHex(color);

    return color;
}

const mirrorElement = (type = 'x') => () => {
    const $selected = $(".selecionado");
   
    let scaleX = parseInt($selected.attr('data-espelharX'));
    let scaleY = parseInt($selected.attr('data-espelharY'));
    
    if (type === 'x') scaleX = (scaleX === 1) ? -1 : 1;
    if (type === 'y') scaleY = (scaleY === 1) ? -1 : 1;

    const { isIconType, isImgSvgType, isTextType } = getElementType($selected);

    if (isIconType) {
        $selected.children('svg').css('transform', `scaleX(${scaleX}) scaleY(${scaleY})`);
        $selected.children('img').css('transform', `scaleX(${scaleX}) scaleY(${scaleY})`);
    } else if (isImgSvgType) {
        $selected.children('img').css('transform', `scaleX(${scaleX}) scaleY(${scaleY})`);
    } else if (isTextType) {
        $selected.children('span').css({ display: 'inline-block', transform: `scaleX(${scaleX}) scaleY(${scaleY})` });
    }

    $selected.attr({ 'data-espelharX': scaleX, 'data-espelharY': scaleY })

    $selected.trigger('mouseup');

    try { saveModificationHistory('mirrorElement ' + type) } catch (_e) { }
}

const deleteSelectedElement = () => {
    removeElements();
    hideElements();
    try { saveModificationHistory('deleteSelectedElement') } catch (_e) { }
}

const getFileImageDimensions = async file => {
    if (!file) return { };

    let _URL = window.URL || window.webkitURL;
    let img, x, y;
    
    await new Promise(resolve => {
        const objectUrl = _URL.createObjectURL(file);
        
        img = new Image();
        img.onload = function () {
            x = this.width;
            y = this.height;
    
            _URL.revokeObjectURL(objectUrl);
    
            resolve();
        };
        img.src = objectUrl;
    });

    return { x, y }
}

const getQueryParameters = (url = window.location.href) => {
    if (url.indexOf('?') === -1) return {};
    
    const queryString = url.split('?')[1];
    const queryParams = queryString.split('&');
  
    const params = {};
  
    for (const param of queryParams) {
      const [key, value] = param.split('=');

      params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  
    return params;
}

const hideElements = () => {
    $(".selecionado").removeClass("selecionado");
    $(`div.layer`).removeClass("selected");
    $('.excluir-elemento').hide();
    $('.resizable-r').hide();
    $('.ui-rotatable-handle').hide();
    $('.ui-resizable-handle').hide();
    $('div.custom-session div.surrounded-session').hide();
    $('div.custom-session div.infos-content').fadeIn(500);
}

const showSpinner = () => $("#spinner").fadeIn(300);
const hideSpinner = () => $("#spinner").fadeOut(300);

const setElementTextAlign = (align = 'left') => () => {
    $(".selecionado").css('text-align', align);

    $('div.action-text-align-left').removeClass('active');
    $('div.action-text-align-center').removeClass('active');
    $('div.action-text-align-right').removeClass('active');

    $(`div.action-text-align-${align}`).addClass('active');

    try { saveModificationHistory('setElementTextAlign ' + align) } catch (_e) { }
}

const setElementFontBold = () => {
    const $selected = $('.selecionado');
    const fontWeight = $selected.css('font-weight');

    if (fontWeight == 700) {
        $selected.css('font-weight', 400);
        $('div.action-text-bold').removeClass('active');
    } else {
        $selected.css('font-weight', '700');
        $('div.action-text-bold').addClass('active');
    }

    try { saveModificationHistory('setElementFontBold') } catch (_e) { }
}

const setElementFontItalic = () => {
    const $selected = $('.selecionado');
    const fontStyle = $selected.css('font-style');

    if (fontStyle == 'italic') {
        $selected.css('font-style', 'normal');
        $('div.action-text-italic').removeClass('active');
    } else {
        $selected.css('font-style', 'italic');
        $('div.action-text-italic').addClass('active');
    }

    try { saveModificationHistory('setElementFontItalic') } catch (_e) { }
}

const svg_url = (id, color) => `https://ecovasos.com/qero/personalizacion_online/svg/${id}/${color}`;
const svg_medidor_url = (id, color) => `https://ecovasos.com/qero/personalizacion_online/svg_medidor/${toolInfos.type}/${id}/${color}`;

const rule3 = (n1, n2, n3) => (n3 * n2) / n1;

const artToCanvas = (scale = 1) => new Promise(resolve => {
    html2canvas(document.querySelector("div#html2canvas"), { scale }).then(resolve)
});

const ajaxPromise = async (settings = {}) => new Promise((resolve, reject) => $.ajax({ ...settings, success: resolve, error: reject }));

const defaultSvgImgSizes = {
    width: {
        desktop: {
            serigrafia: 180,
            digital: 550
        },
        mobile: {
            serigrafia: 150,
            digital: 650
        },
    },
    height: {
        desktop: {
            serigrafia: 80,
            digital: 250
        },
        mobile: {
            serigrafia: 70,
            digital: 235
        },
    },
}

const verifyImageSize = async (img, id, w = 0) => {
    const height = img.clientHeight;
    const width = img.clientWidth;

    if (!height || !width) return;

    const $element = $('#elemento-'+id);

    const maxWidth = defaultSvgImgSizes.width[toolInfos.device][toolInfos.type];
    const maxHeight = defaultSvgImgSizes.height[toolInfos.device][toolInfos.type];

    if (w) {
        $element.css('width', w)
    } else if (height > width) {
        const idealWidth = rule3(width, height, maxHeight);
        $element.css('width', idealWidth > maxWidth ? maxWidth : idealWidth);
    } else {
        $element.css('width', maxWidth)
    }

    img.removeAttribute("onload");

    $element.css({ opacity: 1 });
}

const matrixToDeg = (matrix = '') => {
    const matrixValues = matrix?.match(/matrix\((.+)\)/)[1].split(', ');

    const a = parseFloat(matrixValues[0]);
    const b = parseFloat(matrixValues[1]);
    const c = parseFloat(matrixValues[2]);
    const d = parseFloat(matrixValues[3]);

    const angleRad = Math.atan2(b, a);
    const angleDeg = (angleRad * 180) / Math.PI;

    return angleDeg
}

const fixElementsInCanvas = async () => {
    const canvas = document.getElementById('html2canvas');
    
    canvas.style.fontFeatureSettings = '"liga" 0';
    canvas.style.fontVariant = 'normal';

    $("#html2canvas div.elemento.text").each(function() {
        const $this = $(this);

		const fontFamily = $this.css('font-family');
        const hasFont = ['Amigos', '"Lovely Valentine"'].includes(fontFamily);
        
		if (hasFont) {
            const diff = fontFamily == '"Lovely Valentine"' ? -10 : 25;
			const topFS = parseInt($this.css('top').replace('px', '')) - diff;
			$this.css('top', topFS);
		} 
	});

    const hasMedidorSerirgafia = toolInfos.type == 'serigrafia' && $('#html2canvas #medidor img').attr('src');

    hasMedidorSerirgafia && (async () => {
        const src = $('#html2canvas #medidor img').attr('src');
        const response = await fetch(src);
        const svg = (await response.text())?.replace('<?xml version="1.0"?>', '');

        const width = $('#html2canvas #medidor').width();
        const height = $('#html2canvas #medidor').height();

        $('#html2canvas #medidor img').remove();
        $('#html2canvas #medidor').css({ width, height }).append(svg);
    })();

    await sleep(100);

    await new Promise(r => {
        if (!$("#html2canvas div.elemento.icon").length) return r();

        let idx_interval = 0;

        const hasFinish = () => idx_interval === $("#html2canvas div.elemento.icon").length;

        $("#html2canvas div.elemento.icon").each(async function() {
            const $this = $(this);
    
            const $img = $this.find('img');
    
            if ($img.length) {
                const src = $img.attr('src');
        
                const response = await fetch(src);
                const svg = (await response.text())?.replace('<?xml version="1.0"?>', '');
        
                const width = $this.width();
                const height = $this.height();

                const mirroY = $this.attr('data-espelhary');
                const mirroX = $this.attr('data-espelharx');

                const matrix = window.getComputedStyle($this[0]).getPropertyValue('transform');

                $this.find('img').remove();
                $this.css({ width, height });
                $this.append(svg);
                $this.find('svg').attr({ width, height });

                if (matrix.includes('matrix')) {
                    const deg = matrixToDeg(matrix);

                    $this.css('transform', `rotate(${deg}deg) scaleX(${mirroX}) scaleY(${mirroY})`);
                } else {
                    $this.css('transform', `scaleX(${mirroX}) scaleY(${mirroY})`);
                }
            }

            idx_interval++;
            hasFinish() && r();
        });
    });

    await sleep(100);
}

const sequentialArray = (num = 1) => Array(num).fill(1).map((n, idx) => idx + n);

document.addEventListener('DOMContentLoaded', () => {
    $(document).on("click", '#close-spinner', hideSpinner);
})