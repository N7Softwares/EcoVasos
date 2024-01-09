// ----------------------------------------------
//    Scripts para el Canva y Fabric.js
// ----------------------------------------------

const canvas = new fabric.Canvas('canvas');
let selectedObject;

// Cambiar el color de fondo según la selección del usuario
const backgroundColorSelect = document.querySelectorAll('.background-color');
backgroundColorSelect.forEach(backSelect =>{
    backSelect.addEventListener('change', () => {
        const selectedColor = backSelect.value;
        canvas.setBackgroundColor(selectedColor);
        canvas.renderAll();
    });
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

// Funcion para cambiar color a todos los elementos
const cambiarColorATodos = () => {
    const colorTable = document.getElementById("color-table-globales");
    const colorActualTD = document.getElementById("color-actual");

    // Agregar evento de clic para seleccionar un color de la tabla
    colorTable.addEventListener('click', (e) => {
        if (e.target.tagName === 'TD') {

            const selectedColor = e.target.style.backgroundColor;
            // console.log(selectedColor)
            
            // Recorre todos los objetos en el lienzo
            canvas.forEachObject(obj => {
                // Aplica la acción que desees, por ejemplo, cambiar el color
                obj.set('fill', selectedColor);
            });
            
            colorActualTD.style.backgroundColor=selectedColor;

            // Renderiza el lienzo después de realizar los cambios
            canvas.renderAll();

        }
    });
}
// Ejecutar funcion para cambiar color a todos los elementos
cambiarColorATodos();