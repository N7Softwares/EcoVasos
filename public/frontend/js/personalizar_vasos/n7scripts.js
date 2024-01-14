// ----------------------------------------------
//    Scripts para el Canva y Fabric.js
// ----------------------------------------------

const canvas = new fabric.Canvas('canvas');
let selectedObject;

// set background default
canvas.setBackgroundColor("#fff");
canvas.renderAll();

// Cambiar el color del fondo del lienzo según la selección del usuario
const optionColor = document.querySelectorAll(".option-color");
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
        if (activeObject) {
            canvas.remove(activeObject);
        }
        canvas.renderAll();
    }
});

// Cambiar la figura en el lienzo según la selección del usuario
const shapeSelector = document.getElementById('shape-selector');
shapeSelector.addEventListener('change', () => {
    const selectedShape = shapeSelector.value;
    drawShape(selectedShape);
});

// Cargar una imagen al lienzo
const imageUpload = document.getElementById('image-upload');
imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                const fabricImage = new fabric.Image(img, {
                    scaleX: 0.2, // Puedes ajustar la escala según tus necesidades
                    scaleY: 0.2,
                });
                canvas.add(fabricImage);
                canvas.renderAll();
                addColorPicker(fabricImage);
            };
        };
        reader.readAsDataURL(file);
    }
});

// Función para dibujar la figura seleccionada en el lienzo
function drawShape(shape) {
    let newShape;

    switch (shape) {
        case 'square':
            newShape = new fabric.Rect({
                width: 50,
                height: 50,
                fill: valorColorActual()
            });
            break;
        case 'triangle':
            newShape = new fabric.Triangle({
                width: 50,
                height: 50,
                fill: valorColorActual()
            });
            break;
        case 'circle':
            newShape = new fabric.Circle({
                radius: 25,
                fill: valorColorActual()
            });
            break;
        case 'star':
            // Fabric.js no tiene un objeto "estrella" incorporado, pero puedes crear uno personalizado
            newShape = createStar({
                x: 25,
                y: 25,
                outerRadius: 25,
                innerRadius: 10,
                fill: valorColorActual()
            });
            break;
        default:
            break;
    }

    if (newShape) {
        canvas.add(newShape);
        canvas.renderAll();
        // Aca se les agrega todas las funciones a los objetos
        addColorPicker(newShape);
        colorActual(newShape);
    }
}

// Para obtener el color de los objetos
const colorActual = (object)=>{
    const colorActualTD = document.getElementById("color-actual");
    object.on("mousedown",()=>{
        colorActualTD.style.backgroundColor=object.fill;
        // console.log(object.fill);
    })
}

// Para leer el color actual en la tabla. <<No confundir con obtener el color de los objetos>>
const valorColorActual = ()=>{
    const colorActualTD = document.getElementById("color-actual");
    colorActualValor = colorActualTD.style.backgroundColor;
    return colorActualValor;
}

// Función para generar un color aleatorio
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Función para crear un objeto "estrella" personalizado
function createStar(options) {
    const star = new fabric.Path('M 0 0 L 10 30 L 40 30 L 15 50 L 25 80 L 0 60 L -25 80 L -15 50 L -40 30 L -10 30 Z', options);
    return star;
}

// Función para agregar un cuadro de selección de colores al objeto
function addColorPicker(object) {
    object.on('mousedown', (event) => {
        selectedObject = object;
        showColorTable(event);
    });
}

// Función para mostrar la tabla de colores
function showColorTable(event) {
    const colorTable = document.getElementById('color-table');
    colorTable.style.left = `${event.clientX}px`;
    colorTable.style.top = `${event.clientY}px`;
    colorTable.style.display = 'block';

    // Agregar evento de clic para seleccionar un color de la tabla
    colorTable.addEventListener('click', (e) => {
        if (e.target.tagName === 'TD') {
            const selectedColor = e.target.style.backgroundColor;
            selectedObject.set('fill', selectedColor);
            canvas.renderAll();
        }
    });
}

// Función para ocultar la tabla de colores cuando se deselecciona el objeto
canvas.on('selection:cleared', () => {
    const colorTable = document.getElementById('color-table');
    colorTable.style.display = 'none';
});

// Para descargar el contenido del lienzo en forma de pdf
const downloadButton = document.getElementById('download-pdf');
downloadButton.addEventListener('click', () => {
    const pdfOptions = {
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        },
        html2canvas: {
            scale: 2
        },
    };

    html2pdf().from(canvas.getElement(), pdfOptions).save('lienzo.pdf');
});
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

    clasicas.forEach(clasica =>{
        rowPaletasColores(clasica, contenedorClasicas);
    });

    deModa.forEach(moda =>{
        rowPaletasColores(moda, contenedorModa);
    });

    metalicas.forEach(metalica =>{
        rowPaletasColores(metalica, contenedorMetalicos);
    })
    
};
// Ejecutando funcion para crear paleta de colores
crearPaletaColores();

// Funcion para cambiar color a todos los elementos
const cambiarColorATodos = () => {
    const colorActualTD = document.getElementById("color-actual");

    const paletaColores = document.querySelectorAll(".paleta-color");
    paletaColores.forEach(color =>{
        // Cuando se da click en cualquier color
        color.addEventListener("click",()=>{

            const selectedColor = color.style.backgroundColor;
            // Recorre todos los objetos en el lienzo
            canvas.forEachObject(obj => {
                    // Aplica la acción que desees, por ejemplo, cambiar el color
                    
                    obj.set('fill', selectedColor);
                });
            colorActualTD.style.backgroundColor=selectedColor;
            canvas.renderAll();
        })
    })
}
// Ejecutar funcion para cambiar color a todos los elementos
cambiarColorATodos();


//----------------------- Para la seccion de textos --------------------------

const textEditor = document.getElementById('text-editor');
const nuevoTextoButton = document.getElementById('nuevo-texto');
const fontSizeSelect = document.getElementById('fontSizeSelect');
const cursivaBtn = document.getElementById("cursivaBtn");
const negritaBtn = document.getElementById("negritaBtn");

// Función para agregar un nuevo objeto Text al lienzo
function agregarTextoAlCanvas(texto) {
    const textoPorDefecto = texto || 'Nuevo Texto';

    const newText = new fabric.Text(textoPorDefecto, {
        left: 50,
        top: 50,
        fontSize: fontSize(),
        fontFamily: 'Arial',
        fill: valorColorActual(),
        selectable: true
    });

    canvas.add(newText);
    canvas.setActiveObject(newText);
    canvas.renderAll();

    // Llena automáticamente el textarea con el contenido del nuevo texto
    textEditor.value = newText.text;
}

// Definir los valores de tamaño de fuente disponibles
const valoresTamanosFuente = Array.from({ length: 30 }, (_, index) => (index + 1) * 10);

// Generar las opciones del select
valoresTamanosFuente.forEach(valor => {
    const option = document.createElement('option');
    option.value = valor.toString();
    option.text = `${valor}px`;
    if (valor === 40) {
        option.selected = true;
    }
    fontSizeSelect.add(option);
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
const fontSelector = document.getElementById('font-selector');
fontSelector.addEventListener('change', function () {
    const objetoTextSeleccionado = canvas.getActiveObject();
    
    if (objetoTextSeleccionado && objetoTextSeleccionado.type === 'text') {
        // Actualiza la fuente del objeto Text seleccionado
        const nuevaFuente = fontSelector.value;
        objetoTextSeleccionado.set('fontFamily', nuevaFuente);
        canvas.renderAll();
    }
});

// Función para manejar la actualización de la selección
const actualizarSeleccion = (objetoSeleccionado) => {
    // Verifica si el objeto seleccionado es un objeto Text
    if (objetoSeleccionado && objetoSeleccionado.type === 'text') {
        // Llena el textarea con el texto del objeto Text seleccionado
        textEditor.value = objetoSeleccionado.text;
        textEditor.disabled = false;
        // Habilita el select de fuentes
        fontSelector.disabled = false;
        // Habilita el select de fontSize
        fontSizeSelect.disabled = false;

        // Establece la fuente actual en el select
        fontSelector.value = objetoSeleccionado.fontFamily || 'Arial';

        // Establece el tamaño de fuente actual en el select
        const fontSizeValue = objetoSeleccionado.fontSize;
        fontSizeSelect.value = fontSizeValue.toString();
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
    // Deshabilita el select de fuentes
    fontSelector.disabled = true;
    // Habilita el select de fontSize
    fontSizeSelect.disabled = true;
    // Restablece la fuente predeterminada en el select
    fontSelector.value = 'Arial';
    // Botones para cursiva y negrita
    cursivaBtn.disabled=true;
    negritaBtn.disabled=true;
    negritaBtn.classList.remove("btnActivated");
    cursivaBtn.classList.remove("btnActivated");

});

// Escucha el evento de eliminación de objetos en el lienzo
canvas.on('object:removed',  () =>{
    const objetosText = canvas.getObjects('text');

    // Si no hay más objetos Text en el lienzo, borra el contenido del textarea
    if (objetosText.length === 0) {
        textEditor.value = '';
        fontSelector.disabled = true;
        fontSizeSelect.disabled = true;
    }
});

// Para cambiar el tamaño del texto

// Función para cambiar el tamaño del texto
const cambiarTamanioTexto = (tamanio) => {
    const objetoTextSeleccionado = canvas.getActiveObject();

    if (objetoTextSeleccionado && objetoTextSeleccionado.type === 'text') {
        // Cambia el tamaño del texto del objeto Text seleccionado
        objetoTextSeleccionado.set('fontSize', tamanio);
        canvas.renderAll();
    }
}

// Escucha el evento change del select para cambiar el tamaño del texto

fontSizeSelect.addEventListener('change', function () {
    const tamanioSeleccionado = parseInt(fontSizeSelect.value);
    cambiarTamanioTexto(tamanioSeleccionado);
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

agregarTextoAlCanvas('Nombre de tu marca acá');

//----------------------- Descargar en PDF --------------------------

// Agregar un texto de ejemplo al inicio

const btnPdf = document.getElementById("download-pdf");
// // Función para deseleccionar objetos en Fabric.js
// function deseleccionarObjetos(canvas) {
//     return new Promise(resolve => {
//         canvas.discardActiveObject();
//         canvas.requestRenderAll();
//         resolve();
//     });
// }

// // Función para generar el PDF después de deseleccionar
// function generarPDF() {
//     return new Promise(resolve => {
//         const doc = new jsPDF('p', 'pt', 'letter');
//         const margin = 10;
//         const scale = (doc.internal.pageSize.width - margin * 2) / document.body.clientWidth;

//         doc.html(canvas.getElement(), {
//             x: margin,
//             y: margin,
//             html2canvas: {
//                 scale: scale,
//             },
//             callback: function(doc) {
//                 doc.save('canvas-content.pdf');
//                 resolve();
//             }
//         });
//     });
// }

// // Evento del botón
// btnPdf.addEventListener("click", async () => {

//     // Desseleccionar objetos y generar el PDF en orden
//     await deseleccionarObjetos(canvas);
//     await generarPDF();
// });

btnPdf.addEventListener("click", () => {
    // Desseleccionar todos los objetos en el canvas
    canvas.discardActiveObject();
    canvas.requestRenderAll();

    // Esperar un segundo antes de crear el PDF
    setTimeout(() => {
        const doc = new jsPDF('p', 'pt', 'letter');
        const margin = 10;
        const scale = (doc.internal.pageSize.width - margin * 2) / document.body.clientWidth;

        doc.html(document.querySelector('#canvas'), {
            x: margin,
            y: margin,
            html2canvas: {
                scale: scale,
            },
            callback: function(doc) {
                doc.save('canvas-content.pdf');
            }
        });
    }, 1000); // 1000 milisegundos (1 segundo) de espera
});
