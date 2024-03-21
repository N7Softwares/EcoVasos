// ----------------------------------------------
//    Scripts para el Canva y Fabric.js
// ----------------------------------------------

const canvasWidth = 1000; // Ancho del lienzo visible en píxeles
const canvasHeight = 400; // Alto del lienzo visible en píxeles
const scaleFactor = 2; // Factor de escala para aumentar la resolución

// Crear el lienzo con el tamaño visible
const canvas = new fabric.Canvas('canvas', {
    width: canvasWidth,
    height: canvasHeight,
    padding: 30,
    renderOnAddRemove: false,
    enableRetinaScaling: true, // Desactivar el escalado de retina para evitar problemas de renderizado
    webgl: true,
    antialias: true,
});

// Escalar el lienzo internamente para aumentar la resolución
canvas.setDimensions({
    width: canvasWidth * scaleFactor,
    height: canvasHeight * scaleFactor
}, { backstoreOnly: true });

// Escalar el lienzo de Fabric.js para mantener la apariencia visual
canvas.setZoom(scaleFactor);



canvas.on('object:moving', function(options) {
const padding = canvas.padding;
const obj = options.target;

// Limitar movimiento hacia arriba
if (obj.top < padding) {
    obj.top = padding;
}

// Limitar movimiento hacia abajo
if (obj.top + obj.height * obj.scaleY > canvas.height - padding) {
    obj.top = canvas.height - obj.height * obj.scaleY - padding;
}

});

// ---------------------- Inizializando tooltip de boostrap ----------------------

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// Para obtener el color de los objetos
const colorActual = (object) => {
    const paletaColores = document.querySelectorAll(".paleta-color");
    const colorActualNombre = document.getElementById("color-actual-nombre");

    const colorActualTD = document.getElementById("color-actual");
    object.on("mousedown", () => {
        
        let fillColor;
        if (object.type === "group" && object._objects.length > 0) {
            fillColor = object._objects[0].fill;
        } else {
            fillColor = object.fill;
        }
        colorActualTD.style.backgroundColor = fillColor;

        // Buscar el color correspondiente en la paleta de colores
        const paletaColor = Array.from(paletaColores).find(paletaColor => paletaColor.style.backgroundColor === fillColor);
        if (paletaColor) {
            colorActualNombre.textContent = paletaColor.dataset.bsTitle;
        }
    });
};

// Para leer el color actual en la tabla. <<No confundir con obtener el color de los objetos>>
const valorColorActual = ()=>{
    const colorActualTD = document.getElementById("color-actual");
    colorActualValor = colorActualTD.style.backgroundColor;
    return colorActualValor;
}

// ---------------------- SVG de la marca que se pone automaticamente ----------------------
const svgContainerBrand = document.getElementById('svg-container-brand');
const svgContentBrand = svgContainerBrand.innerHTML;

fabric.loadSVGFromString(svgContentBrand, function(objects, options) {
    const svgImg = fabric.util.groupSVGElements(objects, options);
    
    svgImg.set({
        scaleX: 0.07,
        selectable: true,
        scaleY: 0.07,
        left: 599,
        top: 263,
        dataTarget:"color-disenio"
    });
    const elementosEnGrupo = svgImg.getObjects();
    colorActual(svgImg);    // Para obtener el color del elemento

    // Itera sobre cada elemento dentro del grupo y cambia su color de relleno
    canvas.add(svgImg);
});


fabric.Object.prototype.objectCaching = false;
fabric.Object.prototype.statefullCache = false;
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerStrokeColor = '#aaaaaa';
fabric.Object.prototype.cornerSize = 12;
fabric.Object.prototype.cornersize = 12;

// Resto de tu código...


let selectedObject;
let selectedColorGlobal;
let validador = false;
// --------------- colRight sideBar ------------------
const btnDelete = document.getElementById("btn-delete");
const copyPasteBtn = document.getElementById("duplicateButton");
const mirrorBtn = document.getElementById("mirrorHorizontalButton");
// Botón de voltear verticalmente
const flipVertBtn = document.getElementById("flipVerticalButton");

const canvaLienzo = document.getElementById("canvas");

// set background default
canvas.setBackgroundColor("#fff");
canvas.renderAll();

// Cambiar el color del fondo del lienzo según la selección del usuario
const optionColor = document.querySelectorAll("#accordionExample .option-color");

optionColor.forEach(option=>{
    option.addEventListener("click", ()=>{
        const selectedColor = option.children[0].children[0].style.background;
        canvas.setBackgroundColor(selectedColor);
        canvas.renderAll();
    })
})

// Agregar evento de clic para eliminar un elemento
document.addEventListener('keydown', (event) => {
    if (event.key === 'Delete') {
        const activeObject = canvas.getActiveObject();
        // Verifica si el activeObject es un array
        if(activeObject.type === "activeSelection"){
            // Para eliminar multiples elementos seleccionados 
            activeObject._objects.forEach(element =>{
                // Eliminar el elemento
                canvas.remove(element);
                // Desseleccionar todos los objetos en el canvas
                canvas.discardActiveObject();
                canvas.requestRenderAll();
            })
        }else{
            // Eliminar un unico elemento
            canvas.remove(activeObject);
        }
        canvas.renderAll();
    }
});
// para eliminar con el boton btnDelete
btnDelete.addEventListener("click", ()=>{
    const activeObject = canvas.getActiveObject();
        if (activeObject) {
            // Verifica si el activeObject es un array
            if(activeObject.type === "activeSelection"){
                // Para eliminar multiples elementos seleccionados 
                activeObject._objects.forEach(element =>{
                    canvas.remove(element);
                    // Desseleccionar todos los objetos en el canvas
                    canvas.discardActiveObject();
                    canvas.requestRenderAll();
                })
            }else{
                // Eliminar un unico elemento
                canvas.remove(activeObject);
            }
        }
        canvas.renderAll();
})


// Cargar una imagen al lienzo
document.getElementById('image-upload').addEventListener('change', handleFileSelect);

const colorPicker = document.getElementById('color-picker'); // Asumiendo que tienes un color picker en tu HTML

function handleFileSelectPreview(event) {
    validador = true;
    return event;
}
function handleFileSelect(event) {
    validador = false;

    const file = event.target.files[0];
    const input = document.getElementById('image-upload');
    if (file) {
        if (file.type === 'image/svg+xml') {
            
            handleSvgFile(file);
        } else {
            



            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = new Image();
                    img.src = e.target.result;
                    img.onload = function () {
                        const fabricImage = new fabric.Image(img, {
                            scaleX: 0.2,
                            scaleY: 0.2,
                            dataTarget: "subir-archivo"

                        });
                        fabricImage.filters.push(new fabric.Image.filters.BlackWhite());
                        fabricImage.applyFilters();

                        if (validador === false) {
                            canvas.add(fabricImage);
                        }

                        canvas.renderAll();
                        addColorPicker(fabricImage);
                    };
                };
                reader.readAsDataURL(file);
            }



        }
        validador_2 = false;
    }
}
const addColorPicker = (fabricImage) => {
}

function handleSvgFile(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const svgString = e.target.result;
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(svgString, 'text/xml');
        

        if (selectedColorGlobal !== undefined) {
            const paths = xmlDoc.querySelectorAll('path');
            paths.forEach((path) => {
                path.setAttribute('fill', selectedColorGlobal);
            });
        }

        // Convertir objeto HTML modificado a SVG y luego a fabric.js
        const modifiedSVGString = new XMLSerializer().serializeToString(xmlDoc);
        fabric.loadSVGFromString(modifiedSVGString, function (objects, options) {
            const svgObjects = fabric.util.groupSVGElements(objects, options);

            svgObjects.set({
                scaleX: 0.2,
                scaleY: 0.2,
                dataTarget: "subir-archivo"
            });

            canvas.add(svgObjects);
            canvas.renderAll();
        });
    };

    reader.readAsText(file);
}


// generar paleta de colores aleatorios
const generarPaletaDeColores = (cantidad) => {
    const paleta = [];
    for (let i = 0; i < cantidad; i++) {
        const color = generarColorAleatorio();
        paleta.push(color);
    }
    return paleta;
}
// Generar color aleatorio
const generarColorAleatorio = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// componente para crear los rows dentro de crearPaletasColores()
const rowPaletasColores = (categoria, contenedor) =>{
    // Crear el elemento div
    const paletaColor = document.createElement('div');

    // Asignar la clase y el estilo de fondo
    paletaColor.className = 'paleta-color';
    paletaColor.style.backgroundColor = categoria;
    // Agregar el div al contenedor
    contenedor.appendChild(paletaColor);
}

// Para crear la paleta de colores en la seccion de "colores"
const crearPaletaColores = ()=>{
    const clasicas =["#000000", "#fff", "#f93822", "#fbe122", "#0072ce", "#ed8b00", 
    "#00b74f", "#87189d", "#ffcd00", "#e35205", "#279989"];

    const deModa = ["#da291c", "#f68d2e", "#5e8ab4", "#e56a54", "#9adbe8", "#006298", 
    "#c63663", "#0d5257", "#f0e991", "#874b52", "#ecbaa8", "#8f3237", "#c0a392", 
    "#253746", "#e5e1e6", "#c1c6c8"];

    const metalicas = ["#ac8400", "#d8d7df", "#b87333"];

    // const contenedorPaleta = document.querySelector('.container-paleta-color');
    const contenedorClasicas = document.querySelector('.colores-clasicos');
    const contenedorModa = document.querySelector('.colores-deModa');
    const contenedorMetalicos = document.querySelector('.colores-metalicos');
    // Para los colores aleatorios
    const contenedorMiscelaneos = document.querySelector(".colores-miscelaneos");

    clasicas.forEach(clasica =>{
        rowPaletasColores(clasica, contenedorClasicas);
    });

    deModa.forEach(moda =>{
        rowPaletasColores(moda, contenedorModa);
    });

    metalicas.forEach(metalica =>{
        rowPaletasColores(metalica, contenedorMetalicos);
    })
    
    const paletaAleatoria = generarPaletaDeColores(150);
    // Generando el row de la paleta de colores Miscelaneos
    paletaAleatoria.forEach(mixto =>{
        rowPaletasColores(mixto, contenedorMiscelaneos)
    })
};
// Ejecutando funcion para crear paleta de colores
// crearPaletaColores();

const cambiarColorATodos = () => {
    const colorActualTD = document.getElementById("color-actual");
    const colorActualNombre = document.getElementById("color-actual-nombre");
    const paletaColores = document.querySelectorAll(".paleta-color");
    const scopeColorCheck = document.getElementById("scopeColor");

    const addColorPickerToImage = (file, color) => {
        const colorMatrix = rgbToMatrix(color.style.backgroundColor);
        if (file) {
            file.filters[0].matrix= colorMatrix;
                    
            file.applyFilters();

            canvas.renderAll();

        }
    };

    paletaColores.forEach(color => {
        // Cuando se da click en cualquier color
        color.addEventListener("click", () => {
            selectedColorGlobal = color.style.backgroundColor;
            if (scopeColorCheck.checked) {
                const activeObject = canvas.getActiveObject() || canvas.getObjects()[0];
                if(activeObject.type === "group"){
                    cambiarColorUnicoSvg(selectedColorGlobal)
            
                }else{
                    activeObject.set('fill', selectedColorGlobal);
                }
                // Verifica si el objeto seleccionado es una imagen
                if (activeObject && activeObject.type === 'image') {
                    // Cambia el color de la imagen directamente
                    activeObject.set({ fill: selectedColorGlobal });
                    addColorPickerToImage(activeObject, color);
                } else {
                    // Si no es una imagen, cambia el color normalmente
                    activeObject.set('fill', selectedColorGlobal);
                }
            } else {
                // Recorre todos los objetos en el lienzo
                canvas.forEachObject(obj => {
                // Aplica la acción que desees, por ejemplo, cambiar el color
            
                    obj.set('fill', selectedColorGlobal);
                    // Nueva funcion para cambiar color al svg de medidas
                    cambiarColorSvg(selectedColorGlobal);

                });
                // Recorre todos los objetos en el lienzo
                canvas.forEachObject(obj => {
                    // Verifica si el objeto es una imagen
                    if (obj.type === 'image') {
                        // Cambia el color de la imagen directamente
                        obj.set({ fill: selectedColorGlobal });
                        addColorPickerToImage(obj, color);
                    } else {
                        // Si no es una imagen, cambia el color normalmente
                        obj.set('fill', selectedColorGlobal);
                    }
                });
            }
            colorActualTD.style.backgroundColor=selectedColorGlobal;
            colorActualNombre.textContent=color.dataset.bsTitle;

            canvas.renderAll();
        });
    });
}
const rgbToMatrix = (color) => {
    // Parsear el color RGB
    const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
        throw new Error('Formato de color no válido');
    }

    // Obtener los componentes de color
    const red = parseInt(match[1]);
    const green = parseInt(match[2]);
    const blue = parseInt(match[3]);

    // Normalizar los componentes a valores entre 0 y 1
    const normalizedRed = red / 255;
    const normalizedGreen = green / 255;
    const normalizedBlue = blue / 255;

    // Construir la matriz de filtro
    const matrix = [
        normalizedRed, 0, 0, 0, 0,
        0, normalizedGreen, 0, 0, 0,
        0, 0, normalizedBlue, 0, 0,
        0, 0, 0, 1, 0
    ];

    return matrix;
};
// Ejecutar funcion para cambiar color a todos los elementos
cambiarColorATodos();



//-----------------------------MEDIDOR---------------------------

const selectMedidas = document.getElementById("select-medidas");
// Objetos con los svgs
const arrayValores = [
    {
        svg: `240cc`,  // Aquí podrías agregar el contenido SVG
        width: 185,
        height: 60
    },
    {
        svg:`500cc`,
        width:220,
        height:85
    },
    {
        svg:`750cc`,
        width:240,
        height:95
    },
    {
        svg:`400cc_copa`,
        width:40,
        height:40
    }
];

// Este objeto voy a utilizar para manejar los valores de width y height del pdf y el modelo 3d
const MedidasCentral = {
    // objeto donde se guardan los valores, se definen por defecto pero se pueden actualizar
    medidasActuales: {
        svg:`500cc`,
        width:220,
        height:85
    },

    actualizarMedidas:  (svgName, width, height) => {
        this.medidasActuales = { svg: svgName, width: width, height: height };
    },

    obtenerMedidasActuales: ()=> {
        return this.medidasActuales;
    }
};



document.getElementById("btn-medidas").addEventListener("click",()=>{
    const svgName = selectMedidas.value;

    // Busca entre todos los objetos del canvas aquellos que tienen dataTarget igual a "medidor"
    const objetosMedidores = canvas.getObjects().filter(objeto => objeto.dataTarget === "medidor");
    objetosMedidores.forEach(objeto => {
        // Eliminar el medidor anterior, si existe
        canvas.remove(objeto);
    });

    agregarMedidas(svgName);

    
     // Obtén las medidas actuales y almacénalas en el objeto central
    const medidasObjeto = arrayValores.find(objeto => objeto.svg === svgName);
    if (medidasObjeto) {
        MedidasCentral.actualizarMedidas(svgName, medidasObjeto.width, medidasObjeto.height);
    }

})

const agregarMedidas = (svgName) => {
    // Ruta relativa al archivo SVG
    const svgFilePath = `/frontend/img/personalizacion_vasos/medidas/${svgName}.svg`;

    // Carga el contenido del archivo SVG utilizando una petición HTTP (puedes ajustar esto según tu entorno)
    fetch(svgFilePath)
        .then(response => response.text())
        .then(svgContent => {
            // Utiliza Fabric.js para cargar el SVG y agregarlo al lienzo
            fabric.loadSVGFromString(svgContent, (objects, options) => {
                const group = new fabric.Group(objects, options);

                // Ajusta la escala y la posición del grupo
                group.set({
                    left: ((canvas.width / scaleFactor / 4) * 3) - 60,
                    top: canvas.padding / scaleFactor,
                    scaleX: 2 / scaleFactor,
                    scaleY: 2 / scaleFactor,
                    lockScalingX: true,
                    lockScalingY: true,
                    lockMovementY: true,
                    dataTarget: "medidor",
                });

                // Establece el color de relleno del grupo y de todos los elementos dentro del grupo
                group.forEachObject(objeto => {
                    objeto.set({ fill: valorColorActual() });
                });

                // Agrega el objeto SVG al lienzo
                canvas.add(group);
                canvas.setActiveObject(group);
                colorActual(group);
                // canvas.renderAll();

                // Obtener medidas del vaso
                let width = MedidasCentral.obtenerMedidasActuales().width;
                let height= MedidasCentral.obtenerMedidasActuales().height;
                // Agrega un elemento de texto con las dimensiones en la esquina inferior izquierda
                // const textoMedidas = new fabric.Text(`${width}x${height}mm`, {
                //     left: 10 / scaleFactor,
                //     top: (canvas.height - canvas.padding) / scaleFactor - 30,
                //     fontSize: 20 / scaleFactor,
                //     fill: valorColorActual(),
                //     dataTarget:"medidor"
                // });
                // canvas.add(textoMedidas);
                canvas.renderAll();
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo SVG:', error);
        });
}
// Cambiar color a todos los SVG
const cambiarColorSvg = (color) =>{
    // Obtén todos los objetos en el lienzo
    const objetosEnLienzo = canvas.getObjects();

    // Filtra los objetos que son de tipo "group"
    const grupos = objetosEnLienzo.filter(objeto => objeto.type === "group");

    // Itera sobre cada grupo
    grupos.forEach(grupo => {
        // Obtiene todos los elementos dentro del grupo
        const elementosEnGrupo = grupo.getObjects();

        // Itera sobre cada elemento dentro del grupo y cambia su color de relleno
        elementosEnGrupo.forEach(elemento => {
            // Cambia el color de relleno del elemento (ajusta el color según tus necesidades)
            elemento.set({ fill: color });
        });

        // Actualiza el grupo en el lienzo después de cambiar los colores
        canvas.requestRenderAll();
    });

}
// cambiar color individual a svg
const cambiarColorUnicoSvg = (color) => {
    // Obtén el objeto actualmente seleccionado en el lienzo
    const objetoSeleccionado = canvas.getActiveObject();

    // Verifica si el objeto seleccionado es de tipo "group"
    if (objetoSeleccionado && objetoSeleccionado.type === "group") {
        // Obtiene todos los elementos dentro del grupo
        const elementosEnGrupo = objetoSeleccionado.getObjects();

        // Itera sobre cada elemento dentro del grupo y cambia su color de relleno
        elementosEnGrupo.forEach(elemento => {
            // Cambia el color de relleno del elemento (ajusta el color según tus necesidades)
            elemento.set({ fill: color });
        });

        // Actualiza el grupo en el lienzo después de cambiar los colores
        objetoSeleccionado.setCoords();  // Asegura que las coordenadas del grupo se actualicen correctamente
        canvas.renderAll();
    }
};

// Manejar el color del medidor
const handleColorChange = (event) => {
    const newColor = event;
    handleFileSelectPreview({
        target: { files: [document.getElementById('image-upload').files[0]] },
    });
    validador = false;
}

//----------------------- SideBar Dinamico --------------------------
let ultimoBloqClicado;

// Funcion para el sideBar dinamico con las opciones
const sideBar = () => {
    // Almacenar la referencia al último elemento clicado
    ultimoBloqClicado = null;

    // Obtener los bloq-side y contenidos
    const bloqSideElements = document.querySelectorAll('.bloq-side');
    const contenidoSideElements = document.querySelectorAll('.contenido-side');
    
    // Estableciendo el boton "color del vaso" como default
    ultimoBloqClicado = bloqSideElements[1];
    
    // Agregar evento de clic a cada bloq-side
    bloqSideElements.forEach((bloqSideElement) => {
        bloqSideElement.addEventListener('click', () => {
            // Restaurar el estilo del último elemento clicado
            if (ultimoBloqClicado) {
                ultimoBloqClicado.style.background = 'none';
            }

            // Ocultar todos los contenidos
            contenidoSideElements.forEach((contenidoSideElement) => {
                contenidoSideElement.style.display = 'none';
            });

            // Obtener el data-target del bloq-side clicado
            const targetId = bloqSideElement.getAttribute('data-target');

            // Mostrar el contenido correspondiente
            const targetContent = document.getElementById(targetId + '-content');
            if (targetContent) {
                targetContent.style.display = 'block';
                // Cambiar el estilo del bloqSideElement clicado
                bloqSideElement.style.background = '#f1f1f1';
            }

            // Actualizar la referencia al último elemento clicado
            ultimoBloqClicado = bloqSideElement;
        });
    });
};

// Ejecutando funcion del sideBar dinamico
sideBar();

// Para mostrar el contenido en base los elementos seleccionados

const ocultarContenidos = () => {
    const contenidoSideElements = document.querySelectorAll('.contenido-side');
    contenidoSideElements.forEach((contenido) => {
        contenido.style.display = 'none';
    });
};

const cambiarFondoBloqSide = (bloqSide, background) => {
    bloqSide.style.background = background;
};

const mostrarContenido = (idContenido, dataTarget) => {
    let colorActivo = false;

    const bloqSideElements = document.querySelectorAll('.bloq-side');
    bloqSideElements.forEach((bloqSide) => {
        const bloqDataTarget = bloqSide.getAttribute('data-target');

        if (bloqDataTarget === 'color-disenio' && bloqSide.style.background === 'rgb(241, 241, 241)') {
            colorActivo = true;
        }

        if (bloqDataTarget === dataTarget && !colorActivo) {
            cambiarFondoBloqSide(bloqSide, '#f1f1f1');
            ultimoBloqClicado = bloqSide;
        } else if (!colorActivo) {
            cambiarFondoBloqSide(bloqSide, 'none');
        }
    });

    if (!colorActivo) {
        ocultarContenidos();

        const targetContent = document.getElementById(idContenido);
        if (targetContent) {
            targetContent.style.display = 'block';
        }
    }
};



//----------------------- Para la seccion de textos --------------------------

const textEditor = document.getElementById('text-editor');
const nuevoTextoButton = document.getElementById('nuevo-texto');
const fontSizeSelect = document.getElementById('fontSizeSelect');
const cursivaBtn = document.getElementById("cursivaBtn");
const negritaBtn = document.getElementById("negritaBtn");
// acordeones de fontFamily y fontsize
const fontAcordion = document.querySelector(".btn-accn-1")
const fontSizeAcordion = document.querySelector(".btn-accn-2")
const fontSizeOptions = document.getElementById('fontSizeOptions');


// Función para agregar un nuevo objeto Text al lienzo
function agregarTextoAlCanvas(texto) {
    const textoPorDefecto = texto || 'Nuevo Texto';

    const newText = new fabric.Text(textoPorDefecto, {
        left: 50,
        top: 50,
        fontSize: 40,
        fontFamily: 'Arial',
        fill: valorColorActual(),
        selectable: true,
        dataTarget: 'textos'
    });

    canvas.add(newText);
    canvas.setActiveObject(newText);
    canvas.renderAll();
    // Aca se les agrega todas las funciones a los objetos
    // addColorPickerShape(newText);
    colorActual(newText);
    // Llena automáticamente el textarea con el contenido del nuevo texto
    textEditor.value = newText.text;
    
}

// Definir los valores de tamaño de fuente disponibles
const valoresTamanosFuente = Array.from({ length: 30 }, (_, index) => (index + 1) * 10);

// Generar las opciones del acordeón
valoresTamanosFuente.forEach(valor => {
    // Crear el contenedor del item
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('option-color', 'option-fontSize');
    itemContainer.setAttribute('value', valor.toString());

    // Crear el contenedor de opciones
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');

    // Crear el párrafo con el tamaño de fuente
    const paragraph = document.createElement('p');
    paragraph.classList.add('color-title');
    paragraph.textContent = `${valor}px`;

    // Agregar el párrafo al contenedor de opciones
    optionsContainer.appendChild(paragraph);

    // Agregar el contenedor de opciones al contenedor del item
    itemContainer.appendChild(optionsContainer);

    // Agregar el contenedor del item al accordion-body
    fontSizeOptions.appendChild(itemContainer);
});

// funcion para cambiar el fontSize de los textos
const fontSize = ()=>{
    fontSizeValue = fontSizeSelect.value;
    return fontSizeValue;
}

// Escucha el evento input del textarea para actualizar dinámicamente el objeto Text
textEditor.addEventListener('input', function () {
    const textoActualizado = textEditor.value;
    const objetoTextSeleccionado = canvas.getActiveObject();

    if (objetoTextSeleccionado && objetoTextSeleccionado.type === 'text') {
        // Actualiza el texto del objeto Text seleccionado
        objetoTextSeleccionado.set('text', textoActualizado);
        canvas.renderAll();
    }
});

// Escucha el clic en el botón "Nuevo Texto"
nuevoTextoButton.addEventListener('click', function () {
    agregarTextoAlCanvas();
});

// Escucha el cambio en el select de fuentes
const fontSelector = document.querySelectorAll(".option-fuentes");
document.addEventListener("DOMContentLoaded", () => {

    fontSelector.forEach(fuente => {
        const fontFamily = fuente.getAttribute("value");
        fuente.children[0].children[0].style.fontFamily = fontFamily;
    
        fuente.addEventListener("click", () => {
            // Utiliza getAttribute para obtener el valor del atributo value
            const fontValue = fuente.getAttribute("value");
    
            const objetoTextSeleccionado = canvas.getActiveObject();
    
            if (objetoTextSeleccionado && objetoTextSeleccionado.type === 'text') {
                // Actualiza la fuente del objeto Text seleccionado
                objetoTextSeleccionado.set('fontFamily', fontValue);
                // Estableciendo el texto del boton de del acordeon
                fontAcordion.textContent=fontValue;
                fontAcordion.setAttribute("value", fontValue);
                // ejecutamos la funcion para que fontAcordion tenga el fontFamily nuevo
                aplicarFontFamily()
                // Añade un pequeño retraso antes de renderizar el canvas
                setTimeout( () => {
                    canvas.renderAll();
                }, 50); // Puedes ajustar el valor del retraso según sea necesario
            }
        });
    });
})


// Obtiene ambos botones por su clase
const cerrarAcordeonesFonts = ()=>{
    let btnAcordeon1 = document.querySelector('.btn-accn-1');
    let btnAcordeon2 = document.querySelector('.btn-accn-2');

    // Cierra el primer acordeón si está abierto
    if (!btnAcordeon1.classList.contains('collapsed')) {
        btnAcordeon1.click();
    }

    // Cierra el segundo acordeón si está abierto
    if (!btnAcordeon2.classList.contains('collapsed')) {
        btnAcordeon2.click();
    }
}

// Función para aplicar el fontFamily a fontAcordion
const aplicarFontFamily = () => {
    // Obtenemos el fontFamily de fontAcordion
    const fontFamilyFontAcordion = fontAcordion.getAttribute("value");

    // Aplicamos el font-family a fontAcordion
    fontAcordion.style.fontFamily = fontFamilyFontAcordion;
};

// Ejecutamos la función al cargar la página (puedes ajustar esto según tus necesidades)
aplicarFontFamily();

// Función para manejar la actualización de la selección
const actualizarSeleccion = (objetoSeleccionado) => {
    // Verifica si el objeto seleccionado es un objeto Text
    if (objetoSeleccionado && objetoSeleccionado.type === 'text') {
        // Llena el textarea con el texto del objeto Text seleccionado
        textEditor.value = objetoSeleccionado.text;
        textEditor.disabled = false;
        // Habilita el select de fuentes
        fontAcordion.classList.remove("disabled");
        // Habilita el select de fontSize
        fontSizeAcordion.classList.remove("disabled");
        // Establece la fuente actual en el select
        fontAcordion.textContent= objetoSeleccionado.fontFamily || 'Arial';
        // Establece el valor del atributo 'value'
        fontAcordion.setAttribute("value", objetoSeleccionado.fontFamily || 'Arial');
        // ejecutamos la funcion para que fontAcordion tenga el fontFamily nuevo
        aplicarFontFamily()


        // Establece el tamaño de fuente actual en el select
        const fontSizeValue = objetoSeleccionado.fontSize;
        fontSizeAcordion.textContent = `${fontSizeValue}px`;
        // Botones para cursiva y negrita
        cursivaBtn.disabled=false;
        negritaBtn.disabled=false;
            // Para agregar y quitar la clase de boton activado a curviaBtn y negritaBtn
        if(objetoSeleccionado.fontStyle==="italic"){
            cursivaBtn.classList.add("btnActivated");
        }else{
            cursivaBtn.classList.remove("btnActivated");
        }
        if(objetoSeleccionado.fontWeight==="bold"){
            negritaBtn.classList.add("btnActivated");
        }else{
            negritaBtn.classList.remove("btnActivated");
        }

        
    } 
    // --------- Btn colRight --------
    btnDelete.disabled=false;
    copyPasteBtn.disabled=false;
    mirrorBtn.disabled=false;
    flipVertBtn.disabled=false;

    // ------------------ Para mostrar el contenido del sidebar en base al elemento clicado -------------------
    // Verifica que no se hayan seleccionado varios elementos a la vez
    if(objetoSeleccionado.type!== "activeSelection"){
        // Obtiene el data-target del objeto fabric
        const dataTarget = objetoSeleccionado.dataTarget;

        // Muestra el contenido de #textos-content y cambia el fondo de bloq-side
        mostrarContenido(`${dataTarget}-content`, dataTarget);
    }
}

// Escucha el evento de selección de objetos en el lienzo
canvas.on('selection:created', (evento) => {
    const objetoSeleccionado = evento.target;
    actualizarSeleccion(objetoSeleccionado);
});

// Escucha el evento de actualización de selección de objetos en el lienzo
canvas.on('selection:updated', (evento) => {
    const objetoSeleccionado = evento.target;
    actualizarSeleccion(objetoSeleccionado);
});

// Escucha el evento de deselección de objetos en el lienzo
canvas.on('selection:cleared',  ()=> {
    // Borra el contenido del textarea cuando no hay elementos seleccionados
    textEditor.value = '';
    textEditor.disabled = true;
    // deshabilita el select de fuentes
    fontAcordion.classList.add("disabled");

    // Deshabilita el select de fontSize
    fontSizeAcordion.classList.add("disabled");

    // Restablece la fuente predeterminada en el select
    fontAcordion.textContent="Arial";
    // Establece el valor predeterminado del atributo 'value'
    fontAcordion.setAttribute("value", 'Arial');
    // ejecutamos la funcion para que fontAcordion tenga el fontFamily nuevo
    aplicarFontFamily()
    fontSizeAcordion.textContent="40px";

    // cerrar ambos acordeones de fuentes
    cerrarAcordeonesFonts();
    
    // Botones para cursiva y negrita
    cursivaBtn.disabled=true;
    negritaBtn.disabled=true;
    negritaBtn.classList.remove("btnActivated");
    cursivaBtn.classList.remove("btnActivated");

    // colRight sideBar
    // --------------- btn-delete ------------------
    btnDelete.disabled=true;
    // --------------- btn-duplicated ------------------
    copyPasteBtn.disabled=true;
    // --------------- btn-mirror ------------------
    mirrorBtn.disabled=true;
    // --------------- btn-giroVertical ------------------
    flipVertBtn.disabled=true;


});

// Escucha el evento de eliminación de objetos en el lienzo
canvas.on('object:removed',  () =>{
    const objetosText = canvas.getObjects('text');

    // Si no hay más objetos Text en el lienzo, borra el contenido del textarea
    if (objetosText.length === 0) {
        textEditor.value = '';
        // deshabilita el select de fuentes
        fontAcordion.classList.add("disabled");

        // Deshabilita el select de fontSize
        fontSizeAcordion.classList.add("disabled");

        // Restablece la fuente predeterminada en el select
        fontAcordion.textContent="Arial";
        // Establece el valor predeterminado del atributo 'value'
        fontAcordion.setAttribute("value", 'Arial');
        // ejecutamos la funcion para que fontAcordion tenga el fontFamily nuevo
        aplicarFontFamily()
        fontSizeAcordion.textContent="40px";

        // cerrar ambos acordeones de fuentes
        cerrarAcordeonesFonts();
        // fontSizeSelect.disabled = true;
    }
});

// Para cambiar el tamaño del texto

// Función para cambiar el tamaño del texto
const cambiarTamanioTexto = (tamanio) => {
    const objetoTextSeleccionado = canvas.getActiveObject();

    if (objetoTextSeleccionado && objetoTextSeleccionado.type === 'text') {
        // Cambia el tamaño del texto del objeto Text seleccionado
        objetoTextSeleccionado.set('fontSize', tamanio);
        fontSizeAcordion.textContent=`${tamanio}px`;

        setTimeout(function () {
            canvas.renderAll();
        }, 50);
    }
}

// Contenido del fontSizeOptions. Este contenido se genera dinamicamente, por lo que debe estar en esta posicion
const fontSizeInnerOptions = document.querySelectorAll('.option-fontSize');

fontSizeInnerOptions.forEach((option, index) => {
    option.addEventListener('click', () => {
        const tamanioSeleccionado = (index + 1) * 10;
        cambiarTamanioTexto(tamanioSeleccionado);
    });
});

// Para el boton de cursiva 
cursivaBtn.addEventListener("click",()=>{
    const objetoTextSeleccionado = canvas.getActiveObject();
    let fontStyle = objetoTextSeleccionado.fontStyle;
    if(fontStyle === "normal"){
        objetoTextSeleccionado.fontStyle="italic";
        cursivaBtn.classList.add("btnActivated");
        
    }else{
        objetoTextSeleccionado.fontStyle="normal";
        cursivaBtn.classList.remove("btnActivated");
    }
    canvas.renderAll();
    
});
// Para el boton de cursiva 
negritaBtn.addEventListener("click", () => {
    const objetoTextSeleccionado = canvas.getActiveObject();
    let fontWeight = objetoTextSeleccionado.fontWeight; 
    if (fontWeight === "normal") {
        objetoTextSeleccionado.fontWeight = "bold";
        negritaBtn.classList.add("btnActivated");
    } else {
        objetoTextSeleccionado.fontWeight = "normal";
        negritaBtn.classList.remove("btnActivated");
    }
    canvas.renderAll();
});
// Agregar un texto de ejemplo al inicio

agregarTextoAlCanvas('Inserta tu texto aquí');

//----------------------- Descargar en PDF --------------------------

const btnPdf = document.getElementById("download-pdf");
// Para el manejo del cambio de color en el pdf
let originalBackgroundColor;
let originalElementColor;
let originalElementColors = {};
let originalState;

const invertColorsAndSaveOriginal = () => {
    // Guardar el estado original del lienzo
    originalState = canvas.toJSON();

    // Modificar el lienzo para que tenga fondo blanco y elementos negros
    canvas.backgroundColor = '#ffffff';
    
    canvas.forEachObject(obj => {
        if (obj.type === 'group' && obj._objects.every(innerObj => innerObj.type === 'path')) { // Si el objeto es un grupo con elementos SVG
            obj._objects.forEach(innerObj => {
                innerObj.set('fill', '#212121'); // Establecer a negro
            });
        } else {
            if (obj.type === 'group') {
                obj.forEachObject(innerObj => {
                    if (innerObj.fill !== undefined) {
                        innerObj.set('fill', '#212121'); // Establecer a negro
                    }
                });
            } else {
                if (obj.fill !== undefined) {
                    obj.set('fill', '#212121'); // Establecer a negro
                }
            }
        }
    });
    
    canvas.renderAll();
};


const restoreOriginalColors = () => {
    // Restaurar el estado original del lienzo
    canvas.loadFromJSON(originalState, canvas.renderAll.bind(canvas));
};

btnPdf.addEventListener('click', () => {
    eliminarSeparadorSvg();
    let canvas = document.getElementById("canvas");
    let width = canvas.width;
    let height = canvas.height;
    let pdf;

    // Establecer la orientación del PDF
    if (width > height) {
        pdf = new jsPDF('l', 'px', [width, height]);
    } else {
        pdf = new jsPDF('p', 'px', [height, width]);
    }

    // Esperar un breve período para que el lienzo se renderice completamente
    setTimeout(() => {
        // Obtener las dimensiones del lienzo en el PDF
        width = pdf.internal.pageSize.getWidth();
        height = pdf.internal.pageSize.getHeight();

        // Obtener los datos de la imagen del lienzo original
        const dataUrl = canvas.toDataURL({ format: 'png' });

        // Agregar la imagen original al PDF
        pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);

        // Modificar el lienzo para que tenga fondo blanco y elementos negros
        invertColorsAndSaveOriginal()

        // Obtener los datos de la imagen del lienzo modificado
        const modifiedDataUrl = canvas.toDataURL({ format: 'png' });

        // Agregar la imagen modificada al PDF
        pdf.addPage();
        pdf.addImage(modifiedDataUrl, 'PNG', 0, 0, width, height);

        // Guardar el PDF
        pdf.save("vaso-personalizado.pdf");

        // Restaurando los colores originales del lienzo
        restoreOriginalColors();

        agregarSeparador();
    }, 500); // Esperar 500 milisegundos (0.5 segundos) antes de generar el PDF
});

// codigo para el check de los colores
const checkValue = ()=>{
    const scopeColorCheck = document.getElementById("scopeColor");
    const msgSwitch = document.querySelector(".msg-switch");

    scopeColorCheck.addEventListener(("change"), ()=>{
        if(scopeColorCheck.checked){
            msgSwitch.textContent="Colores Individuales";
        }else{
            msgSwitch.textContent="Colores Globales";
        }
    })
}
// Ejecutando la funcion para el check de los colores
checkValue();

// ------------- Right COl sideBar ---------------

let _clipboard = null; // Variable para el portapapeles

const CopyAndPaste = () => {
    const activeObject = canvas.getActiveObject();

    if (!activeObject) {
        return;
    }

    // Copiar y Pegar
    activeObject.clone(function (clonedObj) {
        canvas.discardActiveObject();
        clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true,
        });

        if (clonedObj.type === 'activeSelection') {
            // Selección activa necesita una referencia al canvas.
            clonedObj.canvas = canvas;

            clonedObj.forEachObject(function (obj, index) {
                // Copiar propiedades personalizadas para cada objeto en la selección activa
                obj.dataTarget = activeObject.getObjects()[index].dataTarget;
                canvas.add(obj);
            });

            // Para solucionar la falta de selección
            clonedObj.setCoords();
        } else {
            // Copiar propiedades personalizadas para un solo objeto
            clonedObj.dataTarget = activeObject.dataTarget;
            canvas.add(clonedObj);
        }

        _clipboard = clonedObj; // Actualizar el portapapeles
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
    });
}


// Funcion para girar horizontalmente los elementos
const modoEspejo = () => {
    let activeObject = canvas.getActiveObject();

    if (activeObject) {
        activeObject.set('flipX', !activeObject.flipX); // Cambia el estado del espejo horizontal
        canvas.renderAll();
    } else {
    }
}
// Funcion para girar verticalmente los elementos
const giroVertical = () => {
    let activeObject = canvas.getActiveObject();

    if (activeObject) {
        // Voltea verticalmente el objeto
        activeObject.set({ scaleY: -1 * activeObject.scaleY });
        canvas.renderAll();
    } else {
    }
}

flipVertBtn.addEventListener('click', giroVertical);
// Asigna la función al evento click del botón
copyPasteBtn.addEventListener('click', CopyAndPaste);
// Botón de espejo horizontal
mirrorBtn.addEventListener('click', modoEspejo);


document.addEventListener("DOMContentLoaded", function() {
    const galeriaContainers = document.querySelectorAll('.galeria-container');

    galeriaContainers.forEach(function(container) {
        const galeria = container.querySelector('.galeria');
        const galeriaItems = container.querySelectorAll('.galeria-item');
        const galeriaPrev = container.querySelector('.galeria-prev');
        const galeriaNext = container.querySelector('.galeria-next');

        let currentIndex = 0;

        galeriaPrev.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                actualizarGaleria();
            }
        });

        galeriaNext.addEventListener('click', function() {
            if (currentIndex < galeriaItems.length - 1) {
                currentIndex++;
                actualizarGaleria();
            }
        });

        function actualizarGaleria() {
            const translateXValue = -currentIndex * 70 + 'px'; // Ancho de cada imagen
            galeria.style.transform = 'translateX(' + translateXValue + ')';
        }
    });
});


let ctx = canvas.getContext('2d');
let miimagen = new Image();


function cargarImagen(url) {
    validador = false;
    // Intento de galeano, funciona pero solo sube imagenes svg
    fetch(url)
        .then(response => response.text())
        .then(svgContent => {
            // Utiliza Fabric.js para cargar el SVG y agregarlo al lienzo
            fabric.loadSVGFromString(svgContent, (objects, options) => {
                const group = new fabric.Group(objects, options);

                // Ajusta la escala y la posición del grupo
                group.set({
                    scaleX:0.2,
                    scaleY:0.2,
                    selectable: true,
                    top: canvas.padding,
                    dataTarget: "elementos"
                });

                // Establece el color de relleno del grupo y de todos los elementos dentro del grupo
                group.forEachObject(objeto => {
                    objeto.set({ fill: valorColorActual() });
                });

                // Agrega el objeto SVG al lienzo
                canvas.add(group);
                canvas.setActiveObject(group);
                colorActual(group);
                agregarSeparador();
                canvas.renderAll();
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo SVG:', error);
        });
}




// Obtener referencias a elementos del DOM
let modal = document.getElementById('myModal');
let btn = document.getElementById('ver3DBtn');
let span = document.getElementsByClassName('close')[0];

// Agregar evento de clic al botón para mostrar el modal después de medio segundo
btn.onclick = function () {
    eliminarSeparadorSvg();
    canvas.discardActiveObject().renderAll();
    // Temporizador de medio segundo (500 milisegundos) Para que se quite el svgSeparador primero
    setTimeout(function() {
        modal.style.display = 'block';
        canvas.renderAll();
    }, 500);
};

// Agregar evento de clic al botón de cerrar para ocultar el modal
span.onclick = function () {
    modal.style.display = 'none';
    agregarSeparador();
    canvas.renderAll();
};

// Cerrar el modal si el usuario hace clic fuera del contenido
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        agregarSeparador();

        canvas.renderAll();
    }
};

// Para solucionar el error de deseleccionar elementos
canvas.on('mouse:down', function(options) {
    if (options.target === null) {
        // No se ha hecho clic en un objeto específico, deselecciona todo
        canvas.discardActiveObject();
        canvas.renderAll();
    }
});


// --------- Modal para la advertencia en responsive mobile ---------
// Definir la función que se ejecutará al cargar la página
const verificarAnchoPantalla = () => {
    // Detectar el ancho de la pantalla
    const anchoPantalla = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // Comprobar si el ancho de la pantalla es mayor a 600px
    if (anchoPantalla < 700) {
        // Mostrar un mensaje de alerta
        alert("Se recomienda utilizar la herramienta de personalización de EcoIngenio en un ordenador o en una pantalla de mayor tamaño.");
    }
};

// Asociar la función al evento de carga de la página
// window.addEventListener("load", verificarAnchoPantalla);

document.addEventListener('DOMContentLoaded', function () {
    const burgerBtn = document.getElementById('burger-btn');
    const colSideLeft = document.querySelector('.col-sideLeft');

    burgerBtn.addEventListener('click', function () {
        colSideLeft.classList.toggle('show-menu');
    });
});
function selectOption(btn) {
    let btns = document.getElementsByClassName("option-btn");
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove("active");
    }
    btn.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById('reduceSvg').addEventListener('click', ()=> {
        let svgElement = document.getElementById('svgContent');
        if(svgElement) {
            agregarSeparador();
            loadSVGToFabric(svgElement);
        }
    });

});

const loadSVGToFabric = (svgElement) => {
    // Obtener el contenido SVG como cadena
    let svgString = new XMLSerializer().serializeToString(svgElement);

    // Guardar el SVG y cargarlo en el lienzo
    fetch('/guardar-svg', {
        method: 'POST',
        body: JSON.stringify({ svg: svgString }),
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Hubo un problema al guardar el SVG.');
        }
        return response.text(); // Obtener el contenido del SVG optimizado
    })
    .then(svgContent => {
        // Cargar el SVG optimizado en el lienzo
        fabric.loadSVGFromString(svgContent, function(objects, options) {
            let group = new fabric.Group(objects, {
                left: 0,
                top: canvas.padding,
                selectable: true,
                dataTarget: "subir-archivo",
                scaleX: 0.3,
                scaleY: 0.3
            });

            // Añadir el grupo al lienzo
            canvas.add(group);
            canvas.setActiveObject(group);
            colorActual(group);
            canvas.renderAll();
        });
    })
    .catch(error => {
        console.error('Error al guardar y cargar el SVG:', error);
    });
}



document.addEventListener("DOMContentLoaded", () => {
    var button = document.querySelector('.browse-btn.btn');
    button.textContent = 'Subir imagen';
});



// ----------------------- Separador -----------------------

const agregarSeparador = () => {
//     // Ruta relativa al archivo SVG
    const svgFilePath = `/frontend/img/personalizacion_vasos/medidas/separador.svg`;

    // Carga el contenido del archivo SVG utilizando una petición HTTP (puedes ajustar esto según tu entorno)
    fetch(svgFilePath)
        .then(response => response.text())
        .then(svgContent => {
            // Utiliza Fabric.js para cargar el SVG y agregarlo al lienzo
            fabric.loadSVGFromString(svgContent, (objects, options) => {
                const group = new fabric.Group(objects, options);
                // Ajusta la escala y la posición del grupo
                group.set({
                    left: 0,
                    top: 0,
                    selectable: false,
                    evented: false,
                    hoverCursor:"default",
                    dataTarget:"separador",
                });

                // Agrega el objeto SVG al lienzo
                canvas.add(group);
                group.bringToFront(); // Para poner el separador en el fondo
            });
            canvas.renderAll();
        });
};
agregarSeparador();

// Encontrar separador
const eliminarSeparadorSvg = ()=>{
    const objects = canvas.getObjects();

    const objetosSeparadores = objects.filter(obj => obj.dataTarget === "separador");

    objetosSeparadores.forEach(objetoSeparador => {
        canvas.remove(objetoSeparador);
    });

    canvas.renderAll();
}
