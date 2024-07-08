/* Añade aquí tu código JavaScript.

Si estás usando la biblioteca jQuery, entonces no olvides envolver tu código dentro de jQuery.ready() así:

jQuery(document).ready(function( $ ){
    // Tu código aquí dentro
});

--

Si quieres enlazar a un archivo JavaScript que resida en otro servidor (como
<script src="https://example.com/your-js-file.js"></script>), entonces, por favor, usa
la página «Añadir código HTML» , ya que es un código HTML que enlaza a un archivo JavaScript.

Fin del comentario */ 

//ESPERAR A QUE CARGUE LA PAGINA PARA SELECCIONAR PRODUCTOS
document.addEventListener('DOMContentLoaded', function() {
    // Obtener la caja por su ID
    var catalogBox = document.getElementById('id-catalog-products-woo-n7');

    // Habilitar eventos de ratón y restaurar la opacidad
	catalogBox.style.backgroundColor = 'transparent';
    catalogBox.style.pointerEvents = 'auto';
    catalogBox.style.opacity = '1';
});


//====================================================================================================================================
//MOVER PRIMER ELEMENTO

// Primero, creamos un nuevo elemento div
var nuevoDivPrecio = document.createElement('div');

nuevoDivPrecio.className = 'price-box-woo';
// Luego, seleccionamos el código de precio
var codigoPrecio = document.querySelector('.woocommerce-Price-amount.amount');
codigoPrecio.id = 'wapo-total-order-price';
// Movemos el código de precio dentro del nuevo div
nuevoDivPrecio.appendChild(codigoPrecio);

var botonAMover = document.querySelector('.woocommerce div.product form.cart .button');

var nuevoDiv = document.createElement('div');

nuevoDiv.className = 'cart-box-woo';

// Movemos el botón dentro del nuevo div
nuevoDiv.appendChild(botonAMover);
// Primero, seleccionamos el elemento que queremos mover
var elementoAMover = document.querySelector('.woocommerce-product-details__short-description');
// Luego, seleccionamos el lugar donde queremos insertarlo
var contenedor = document.querySelector('.woocommerce-product-gallery.woocommerce-product-gallery--with-images.woocommerce-product-gallery--columns-4.images');

var contenedorForm = document.querySelector('.woocommerce div.product form.cart');
// Finalmente, usamos appendChild para mover el elemento
contenedor.appendChild(elementoAMover);
elementoAMover.appendChild(nuevoDivPrecio);
contenedorForm.appendChild(nuevoDiv);

//====================================================================================================================================
// Creamos el nuevo botón
var botonCerrar = document.createElement('div');

// Le asignamos un texto de "X"
botonCerrar.innerHTML = 'X';
botonCerrar.id = 'hide-iframe-button';
// Le damos un estilo en rojo
botonCerrar.className = 'red-button-woo';
botonCerrar.style.backgroundColor = 'red';
botonCerrar.style.color = 'white';

// Lo agregamos al inicio del div
nuevoDiv.prepend(botonCerrar);
//====================================================================================================================================
// Creamos el nuevo botón
var textoDescuento = document.createElement('span');

// Le asignamos un texto de "X"
textoDescuento.innerHTML = '20% de descuento pagando con transferencia bancaria o efectivo.';

// Lo agregamos al inicio del div
elementoAMover.appendChild(textoDescuento);

//====================================================================================================================================
// Primero, seleccionamos el botón
var botonCerrar = document.querySelector('.red-button-woo');

// Luego, añadimos un evento de clic al botón
botonCerrar.addEventListener('click', function() {
  // Seleccionamos el iframe
  var iframe = document.querySelector('#iframe_catalog');

  // Ocultamos el iframe
  iframe.style.display = 'none';
});

//====================================================================================================================================
jQuery(document).ready(function($) {
    // Agregar un evento de clic al botón dentro del iframe
 	$('#hide-iframe-button').click(function() {
        // Mostrar la pantalla de carga
        $('#loading_screen').fadeIn();
        // Enviar un mensaje al documento padre para indicar que se debe ocultar el iframe
        window.parent.postMessage('hide-iframe', '*');
    });
});
//====================================================================================================================================
// Primero, seleccionamos todos los tr
var todosLosTr = document.querySelectorAll('table.variations tbody tr');

// Luego, recorremos cada tr y le añadimos una clase
todosLosTr.forEach(function(tr) {
  tr.classList.add('border-box-woo-v2');
});

//====================================================================================================================================
// Primero, seleccionamos el elemento li que contiene "600cc"
// var li600cc = document.querySelector('li.variable-item.button-variable-item.button-variable-item-600cc');

// Luego, creamos los nuevos elementos th, td y ul
// var nuevoTh = document.createElement('th');
// nuevoTh.className = 'label';
// nuevoTh.innerHTML = '<label for="pa_tamano_termico">Térmico (cc)</label><span class="woo-selected-variation-item-name" data-default=""></span>';

// var nuevoTd = document.createElement('td');
// nuevoTd.className = 'value woo-variation-items-wrapper';

// var nuevoUl = document.createElement('ul');
// nuevoUl.className = 'variable-items-wrapper button-variable-items-wrapper wvs-style-squared';
// nuevoUl.setAttribute('role', 'radiogroup');
// nuevoUl.setAttribute('aria-label', 'Térmico (cc)');

// Movemos el li dentro del nuevo ul
// nuevoUl.appendChild(li600cc);

// Añadimos el nuevo ul al nuevo td
// nuevoTd.appendChild(nuevoUl);

// Finalmente, seleccionamos el tr y añadimos los nuevos elementos th y td
// var tr = document.querySelector('tr.border-box-woo-v2');
// tr.appendChild(nuevoTh);
// tr.appendChild(nuevoTd);


//====================================================================================================================================
document.querySelectorAll('.options-container').forEach(function(optionsContainer) {
    // Obtener todos los labels dentro de cada contenedor de opciones
    var labels = optionsContainer.querySelectorAll('.yith-wapo-label');
    
    // Añadir un event listener de clic a cada label
    labels.forEach(function(label) {
        label.addEventListener('click', function() {
            // Restablecer estilos para todos los labels dentro del mismo contenedor
            labels.forEach(function(otherLabel) {
                otherLabel.style.backgroundColor = '#fff'; // fondo blanco
                otherLabel.style.color = '#000'; // texto negro
            });
            
            // Aplicar estilos al label seleccionado
            this.style.backgroundColor = '#5e9d5e'; // fondo verde
            this.style.color = '#fff'; // texto blanco
        });
    });
});

//====================================================================================================================================
function waitForElement(selector, callback) {
    if (document.querySelector(selector)) {
        callback();
    } else {
        setTimeout(function() {
            waitForElement(selector, callback);
        }, 500);
    }
}

waitForElement('#yith-wapo-9-0', function() {
    // Encuentra el input
    var input = document.getElementById('yith-wapo-9-0');

    if (input) {
        // Crea un nuevo textarea
        var textarea = document.createElement('textarea');
        textarea.id = input.id;
        textarea.className = input.className;
        textarea.name = input.name;
        textarea.style.width = input.style.width;

        // Reemplaza el input con el textarea
        input.parentNode.replaceChild(textarea, input);
    } else {
        console.log('No se encontró el elemento con id yith-wapo-9-0');
    }
});



//====================================================================================================================================

var areatext = document.querySelector('.options.per-row-1');
areatext.classList.add('textarea-style');

//====================================================================================================================================
function waitForElement(selector, callback) {
    if (document.querySelector(selector)) {
        callback();
    } else {
        setTimeout(function() {
            waitForElement(selector, callback);
        }, 500);
    }
}

waitForElement('.woocommerce-product-gallery', function() {
    var nuevoDivImage = document.createElement('div');
    nuevoDivImage.classList.add('imagen-seleccionada');

    // Obtener la referencia de la caja de destino
    var productGallery = document.querySelector('.woocommerce-product-gallery');

    // Mover la imagen con su caja al principio de la caja de destino
    productGallery.insertBefore(nuevoDivImage, productGallery.firstChild);

    // Creamos una función para procesar las mutaciones
    function processMutation(mutation) {
        if (mutation.type === "childList") {
            // Seleccionamos la imagen dentro de 'option-image' o 'image-container'
            var imagen = mutation.target.querySelector('img');
            if (imagen) {
                // Creamos una copia de la imagen
                var copiaImagen = imagen.cloneNode(true);

                // Seleccionamos el div 'imagen-seleccionada'
                var divImagenSeleccionada = document.querySelector('.imagen-seleccionada');

                // Limpiamos 'imagen-seleccionada' antes de agregar la nueva imagen
                while (divImagenSeleccionada.firstChild) {
                    divImagenSeleccionada.removeChild(divImagenSeleccionada.firstChild);
                }

                // Insertamos la copia de la imagen en 'imagen-seleccionada'
                divImagenSeleccionada.appendChild(copiaImagen);
            }
        }
    }

    // Creamos un observador con una función de callback
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(processMutation);
    });

    // Configuramos el observador para monitorear los cambios en los hijos de cada div 'option-image' y 'image-container'
    var config = { childList: true };

    // Obtenemos y monitoreamos los elementos con las clases 'option-image' y 'image-container'
    var targets = document.querySelectorAll('.option-image, .image-container div.image');
    targets.forEach(function(target) {
        observer.observe(target, config);
    });
});


//====================================================================================================================================
jQuery(document).ready(function($) {
    function sendHeight() {
        var height = document.body.scrollHeight;
        window.parent.postMessage(height, '*');
    }

    // Llamar a sendHeight cuando la página se carga por primera vez
    sendHeight();

    // Llamar a sendHeight cada vez que el contenido cambia
    $(document).on('DOMSubtreeModified', sendHeight);

    // Ejemplo: llamar a sendHeight cuando se hace clic en un botón dentro del iframe
    $('#boton_mostrar_contenido').on('click', function() {
        // Mostrar el contenido adicional aquí
        // Después de mostrar el contenido, llamar a sendHeight()
        sendHeight();
    });
});
//====================================================================================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar todos los elementos con la clase 'option-description'
  const optionDescriptions = document.querySelectorAll('.option-description');

  // Función para comprobar y ocultar elementos sin texto
  function checkAndHide(element) {
    if (element.textContent.trim() === '') {
      element.style.display = 'none';
    } else {
      element.style.display = '';
    }
  }

  // Comprobar inicialmente todos los elementos
  optionDescriptions.forEach(checkAndHide);

  // Crear un MutationObserver para observar cambios en el DOM
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        checkAndHide(mutation.target);
      }
    });
  });

  // Configuración del observer
  const config = { childList: true, characterData: true, subtree: true };

  // Observar cada elemento con el observer
  optionDescriptions.forEach(element => {
    observer.observe(element, config);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar todos los labels
  const labels = document.querySelectorAll('.yith-wapo-label');

  // Función para mostrar la descripción
  function showDescription(event) {
    const label = event.target;
    const description = label.closest('.label').nextElementSibling;

    if (description && description.classList.contains('description')) {
      description.style.top = `${label.offsetTop + label.offsetHeight}px`;
      description.style.left = `${label.offsetLeft}px`;
      description.classList.add('show');
    }
  }

  // Función para ocultar la descripción
  function hideDescription(event) {
    const label = event.target;
    const description = label.closest('.label').nextElementSibling;

    if (description && description.classList.contains('description')) {
      description.classList.remove('show');
    }
  }

  // Añadir eventos a cada label
  labels.forEach(label => {
    label.addEventListener('mouseover', showDescription);
    label.addEventListener('mouseout', hideDescription);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Crear la nueva caja
  var stickyBox = document.createElement('div');
  
  // Agregar la clase y el estilo
  stickyBox.className = 'sticky-box-details-woo';

  // Seleccionar el contenido que quieres mover a la caja
  var content = document.querySelector('.woocommerce-product-gallery');
  
  // Mover el contenido a la caja
  while (content.firstChild) {
    stickyBox.appendChild(content.firstChild);
  }
  
  // Agregar la caja al elemento original
  content.appendChild(stickyBox);

});

//====================================================================================================================================
// Seccion de Diseño 

document.getElementById('wau_file_addon').addEventListener('change', function() {
	let fileName = this.files[0].name;
    document.querySelector('label[for="wau_file_addon"]').textContent = fileName;
});
// Seleccionar el input y el label
const inputFile = document.querySelector('#wau_file_addon');
const labelFile = document.querySelector('label[for="wau_file_addon"]');

// Aplicar estilos al input para ocultarlo
inputFile.style.display = 'none';

// Aplicar estilos al label para que parezca un botón verde
labelFile.style.display = 'inline-block';
labelFile.style.padding = '7px';
labelFile.style.cursor = 'pointer';
labelFile.style.backgroundColor = '#5e9d5e'; // Verde
labelFile.style.color = 'white';
labelFile.style.borderRadius = '4px';
labelFile.style.border = '1px solid #5e9d5e';
// Nuevos estilos :p
labelFile.style.width="100%";

labelFile.style.textAlign="center";

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', () => {
  // Limpiar el valor del input file
  inputFile.value = '';
  // Manualmente disparar el evento change
  const event = new Event('change');
  inputFile.dispatchEvent(event);
});
// Añadir un listener para actualizar el texto del label con el nombre del archivo seleccionado
inputFile.addEventListener('change', function () {
  const currentCard = this.closest('.card');

  if (inputFile.files.length > 0) {
    const fileName = inputFile.files[0].name;
    labelFile.textContent = fileName;
    console.log('Archivo cargado:', fileName);
    currentCard.classList.add('active');
	clearButton.classList.remove("d-none");
  } else {
    labelFile.textContent = "Adjuntar Diseño";
    console.log('No hay archivo cargado.');
    currentCard.classList.remove('active');
	clearButton.classList.add("d-none");
  }
});
//GENERAR ID
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c==='x' ? r : (r&0x3|0x8)).toString(16);
    });
}

// Generar ID único
var uniqueID = generateUUID();

document.addEventListener("DOMContentLoaded", function() {
    var designLink = document.getElementById('designLink');
    var uniqueID = generateUUID(); // Generar el ID único

    designLink.addEventListener('click', function(event) {
        // Agregar el ID único a la URL
        designLink.href = "https://ecoingenio.com.ar/diseno/?session_id=" + uniqueID;
    });
});

// Definir el HTML a insertar
let htmlToInsert = `
	<div class="card-row">
						<div class="card card-option" >
						  <span class="text-success card-span"><i class="fa fa-check"></i> SELECCIONADO</span>
						  <div class="card-body card-body-mdl">
							<div class="card-logo">
								<img src="http://ecotienda.ecoingenio.com.ar/wp-content/uploads/2024/07/orden-diseno.svg" class="card-svg">
							</div>
							<h5 class="card-title">3. Añadir Orden de Diseño</h5>
							
							<p class="card-text">
								Si preferís que del diseño nos ocupemos nosotros, añade una orden de diseño al ecovaso. <br>
								
							</p>
							
							<button class="btn btn-outline-success btn-card">Seleccionar Opcion de Diseño</button>
						  </div>
						  <!-- Pseudo Modal -->
						  <div class="card-mdl border" id="divCardMdl">
							<div class="container-fluid ">
				
								<h2 class="diseno-subtitle">Orden de Diseño</h2>
								<div class="mb-2 d-flex flex-column">
									<span>Tiempo: 24/48hs hábiles</span>
									<span>Diseño Personalizado</span>
								</div>				
								<p><span class="fw-bold">Incluye: </span>Vectorización de logos, armonización, agregado de redes sociales,
								agregado de frases, vista previa</p>
								<div class="d-flex justify-content-end">
									<span class="price-modal">$6000</span>
								</div>
								<div class="d-flex justify-content-around">
									<button type="button" class="btn btn-danger" id="cancelar-mdl">Cancelar</button>
									<button type="button" id="btn-order-design" class="btn btn-success border">Continuar</button>
								</div>
							</div>
						  </div>
						</div>
						<div class="card card-option" >
						  <span class="text-success card-span"><i class="fa fa-check"></i> SELECCIONADO</span>
						  <div class="card-body">
							<div class="card-logo">
								<img src="http://ecotienda.ecoingenio.com.ar/wp-content/uploads/2024/07/time.svg" class="card-svg">
							</div>
							<h5 class="card-title">4. Enviar Diseño más Tarde</h5>
							
							<p class="card-text">
								
								Si preferís podes realizar la compra y luego enviarnos el diseño a traves de nuestras vias de comunicación oficiales.
							</p>
							
							<button class="btn btn-outline-success btn-card">Seleccionar Opcion de Diseño</button>
						  </div>
						</div>
					</div>
						<div class="col-12 col-lg-6 col-md-6 col-sm-12 container-btn-design"> 


						</div>
`;
//=====================================================================================================
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c==='x' ? r : (r&0x3|0x8)).toString(16);
    });
}
document.addEventListener("DOMContentLoaded", function() {
    var designLink = document.getElementById('designLink');
    var uniqueID = generateUUID(); // Generar el ID único

    designLink.addEventListener('click', function(event) {
        // Agregar el ID único a la URL
        designLink.href = "https://ecoingenio.com.ar/diseno/?session_id=" + uniqueID;
    });
});
 // Función para manejar el evento de almacenamiento
    /*function onStorageEvent(event) {
        if (event.key === 'pdfLink') {
            const receivedHtml = event.newValue;
            if (receivedHtml) {
                console.log('URL recibida en producto: ' + receivedHtml);
                // Buscar el contenedor existente y reemplazar su contenido
                /*const container = document.querySelector('.col-12.col-lg-6.col-md-6.col-sm-12 .container-btn-design');
                if (container) {
                    container.innerHTML = receivedHtml;
                }
                // Opcional: eliminar los datos del Local Storage después de usarlos
                localStorage.removeItem('datos');
            }
        }
    }

    // Agregar un listener para el evento de almacenamiento
    window.addEventListener('storage', onStorageEvent);

    // Comprobar si ya hay datos en el Local Storage al cargar la página
    function checkInitialData() {
        const receivedHtml = localStorage.getItem('pdfLink');
        if (receivedHtml) {
            console.log('URL recibida en producto: ' + receivedHtml);
            // Buscar el contenedor existente y reemplazar su contenido
            const container = document.querySelector('.col-12.col-lg-6.col-md-6.col-sm-12 .container-btn-design');
            if (container) {
                container.innerHTML = receivedHtml;
            }
            localStorage.removeItem('datos');
        }
    }

    // Llamar a la función para verificar los datos iniciales
    checkInitialData();*/
//======================================================================================================
// Función para manejar el evento de almacenamiento
function onStorageEvent(event) {
    if (event.key === 'pdfLink') {
        const receivedUrl = event.newValue;
        if (receivedUrl) {
            console.log('URL recibida en producto: ' + receivedUrl);
            updateCardAndForm(receivedUrl);
        }
        localStorage.removeItem('pdfLink');
    }
}

// Agregar un listener para el evento de almacenamiento
window.addEventListener('storage', onStorageEvent);

// Comprobar si ya hay datos en el Local Storage al cargar la página
function checkInitialData() {
    const receivedUrl = localStorage.getItem('pdfLink');
    if (receivedUrl) {
        console.log('URL recibida en producto: ' + receivedUrl);
        updateCardAndForm(receivedUrl);
    }
    localStorage.removeItem('pdfLink');
}

// Llamar a la función para verificar los datos iniciales
checkInitialData();

// Función para actualizar la tarjeta y el formulario
function updateCardAndForm(pdfUrl) {
    // Buscar el contenedor existente y actualizar su contenido
    const card = document.querySelector('.card-option');
    if (card) {
        // Eliminar la clase 'd-none' para mostrar el elemento
        const selectedSpan = card.querySelector('#spanSelected');
        if (selectedSpan) {
            selectedSpan.classList.remove('d-none');
        }

        const designLink = card.querySelector('#designLink');
        if (designLink) {
            designLink.classList.add('d-none'); // Ocultar designLink

            // Crear un nuevo botón para mostrar la URL del PDF seleccionado
            let pdfSelectedButton = card.querySelector('#pdfSelectedButton');
            if (!pdfSelectedButton) {
                pdfSelectedButton = document.createElement('button');
                pdfSelectedButton.id = 'pdfSelectedButton';
                pdfSelectedButton.className = 'btn btn-success w-100';
                pdfSelectedButton.textContent = 'PDF Seleccionado';
                pdfSelectedButton.addEventListener('click', () => {
                    window.open(pdfUrl + '?nocache=' + new Date().getTime(), '_blank'); // Abrir enlace en una nueva pestaña
                });

                // Añadir el botón después de designLink
                designLink.parentNode.insertBefore(pdfSelectedButton, designLink.nextSibling);
            } else {
                pdfSelectedButton.addEventListener('click', () => {
                    window.open(pdfUrl + '?nocache=' + new Date().getTime(), '_blank'); // Actualizar el enlace con el parámetro de no cache
                });
                pdfSelectedButton.classList.remove('d-none');
            }

            // Añadir el botón de eliminar archivo
            let clearButton = card.querySelector('#clearButton');
            if (!clearButton) {
                clearButton = document.createElement('button');
                clearButton.id = 'clearButton';
                clearButton.className = 'btn btn-danger w-100';
                clearButton.textContent = 'Eliminar Archivo';
                clearButton.addEventListener('click', clearPdfLink);
                designLink.parentNode.appendChild(clearButton);
            } else {
                clearButton.classList.remove('d-none');
            }
        }

        // Añadir campo oculto al formulario
        const form = document.getElementById('formCart');
        if (form) {
            let hiddenInput = form.querySelector('input[name="pdfLink"]');
            if (!hiddenInput) {
                hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'pdfLink';
                hiddenInput.value = pdfUrl;
                form.appendChild(hiddenInput);
            } else {
                hiddenInput.value = pdfUrl;
            }
        }
    }
}

// Función para limpiar el enlace del PDF
function clearPdfLink(event) {
    event.preventDefault();
    localStorage.removeItem('pdfLink');
    const card = document.querySelector('.card-option');
    if (card) {
        const selectedSpan = card.querySelector('.text-success.card-span');
        if (selectedSpan) {
            selectedSpan.classList.add('d-none');
        }

        const designLink = card.querySelector('#designLink');
        if (designLink) {
            designLink.classList.remove('d-none'); // Mostrar designLink
        }

        const pdfSelectedButton = card.querySelector('#pdfSelectedButton');
        if (pdfSelectedButton) {
            pdfSelectedButton.classList.add('d-none');
        }

        const clearButton = card.querySelector('#clearButton');
        if (clearButton) {
            clearButton.classList.add('d-none');
        }

        const form = document.getElementById('formCart');
        if (form) {
            const hiddenInput = form.querySelector('input[name="pdfLink"]');
            if (hiddenInput) {
                hiddenInput.remove();
            }
        }
    }
}



//======================================================================================================
// Seleccionar el div con la clase diseno-section
let disenoSection = document.querySelector('.diseno-section-cards');

// Seleccionar el div que contiene el input file y el label
let fileInputDiv = disenoSection.querySelector('div');

// Insertar el HTML después del div del input file
fileInputDiv.insertAdjacentHTML('afterend', htmlToInsert);

document.addEventListener('DOMContentLoaded', function() {
    // Añade el input hidden al formulario del producto
    let productForm = document.querySelector('form.cart'); 
    if (productForm) {
        let hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id="design-input";
		hiddenInput.name = 'design_option';
        hiddenInput.value = '';
        productForm.appendChild(hiddenInput);

        // Detecta el clic en el botón "Enviar Diseño más Tarde"
        let designLaterButton = document.querySelector('.design-later-button');
        if (designLaterButton) {
            designLaterButton.addEventListener('click', function() {
				hiddenInput.value = 'design_later';	
				console.log(hiddenInput.value);
				
// 				Para llamar a la funcion que muestra el mensaje
				mensajeDesignOption(hiddenInput.value);
			});
			
        }
    }
});
/*
// Funcion para mostrar el aviso del tipo de diseño
const mensajeDesignOption =(option)=>{
	const divAlert = document.querySelector(".divAlert");
	let mensaje;
	if(option=="design_later"){
		mensaje = "Enviar Diseño mas Tarde, no olvide enviar el diseño a ecoingenio por sus vias de contacto!";
	}else if(option=="design-order"){
		mensaje = "Orden de Diseño, complete el campo de texto de abajo para describir su diseño!";
	}
	divAlert.innerHTML=	`
		<div class="alert alert-success alert-dismissible fade show" role="alert">
			<strong>Opcion de Diseño: </strong> ${mensaje} <br>
		<div class="d-flex justify-content-center mt-3">
			<button type="button" id="cleanDesignOption" class="btn btn-danger " data-bs-dismiss="alert">Cancelar Opcion de Diseño</button>
		</div>
		</div>`;
		
	// Llamar a la funcion para vaciar el design_option;
	cleanDesignOption();
}

// Funcion para vaciar el input de design_option
const cleanDesignOption=()=>{
	const cleanBtn = document.getElementById("cleanDesignOption");
// 	console.log(cleanBtn);
	cleanBtn.addEventListener("click",()=>{
		let hiddenInput = document.querySelector("input[name='design_option']");
		hiddenInput.value="";
		console.log(hiddenInput.value);
	})
}
*/

// Mover el boxDesign a la derecha

document.addEventListener('DOMContentLoaded', (event) => {
    
	// Seleccionar el div con la clase wau_wrapper_div
	const boxDesign = document.querySelector('.wau_wrapper_div');

	// Seleccionar el contenedor donde quieres mover el div
// 	const boxPrecio = document.querySelector('.sticky-box-details-woo');
	const siteMain = document.querySelector(".site-main");
	
	// Mover el boxDesign dentro del contenedor seleccionado
	siteMain.appendChild(boxDesign);

	// Definimos el formulario del carrito en una constante
	const formCart = document.querySelector("form");
	// Le agregamos el id formCart para su identificacion y posterior apuntado al inputFile
	formCart.id="formCart";
	// Agregamos el atributo form formCart al inputFile para apuntarlo al formulario del carrito
	inputFile.setAttribute('form', 'formCart');
	
	
	// Mover botones de cerrar iframe y enviar producto al carrito
// 	const btnCart = document.querySelector(".cart-box-woo");
// 	siteMain.appendChild(btnCart);
// 	const submitBtn = document.querySelector('.single_add_to_cart_button');
// 	submitBtn.setAttribute('form', 'formCart');
	

/*
	// Crear el modal
	const modal = document.createElement("div");
	modal.setAttribute("class", "modal fade ");
	modal.setAttribute("id", "exampleModal");
	modal.setAttribute("tabindex", "-1");
	modal.setAttribute("aria-labelledby", "exampleModalLabel");
	modal.setAttribute("aria-hidden", "true");

	// Crear el contenido del modal
	modal.innerHTML = `
	  <div class="modal-dialog">
		<div class="modal-content">
		  <div class="modal-header">
			<!--<h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>-->
			<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		  </div>
		  <div class="modal-body">
			<div class="container-fluid ">
				
				<h2 class="diseno-subtitle">Orden de Diseño</h2>
				<div class="mb-2 d-flex flex-column">
					<span>Tiempo: 24/48hs hábiles</span>
					<span>Diseño Personalizado</span>
				</div>				
				<p><span class="fw-bold">Incluye: </span>Vectorización de logos, armonización, agregado de redes sociales,
				agregado de frases, vista previa</p>
				<div class="d-flex justify-content-end">
					<span class="price-modal">$6000</span>
				</div>
				
			</div>
		  </div>
		  <div class="modal-footer d-flex justify-content-around">
			<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
			<button type="button" id="btn-order-design" class="btn btn-success border" data-bs-dismiss="modal">Continuar</button>
		  </div>
		</div>
	  </div>
	`;


	// Agregar el botón y el modal al div "site-main"
// 	siteMain.appendChild(button);
	siteMain.appendChild(modal);
*/
	
	// Codigo para el modal
	
// 	const btnModal = document.getElementById("btn-order-design");
	const productForm = document.querySelector('form.cart');
	// Selecciona el input con el atributo name igual a 'design_option'
	const hiddenInput = document.querySelector('input[name="design_option"]');
	const notasAd = document.querySelector('.yith-wapo-addon-type-text');
	//Crear texto
	const divText = document.createElement('div');
	divText.classList.add("design-order-text");
	divText.innerHTML=`<p class="text-success">Especificá los detalles del diseño a continuación. 
	Si tenés varios productos y queréss que se utilice el mismo diseño para los demás.</p>`;
	const textAreaInput = document.querySelector('.yith-wapo-option-value');
// 	btnModal.addEventListener("click",()=>{
// 		hiddenInput.value='design-order';
// 		console.log(hiddenInput.value);
// 		notasAd.appendChild(divText);
// 		btnModal.blur();
// 		// Remueve el foco del botón
// 		textAreaInput.focus();
// 		// Ejecuta el alert de design_option
// 		mensajeDesignOption(hiddenInput.value);
// 	})
});





//====================================================================================================================================
document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById('formCart');
    let cartBoxWoo = document.querySelector('.cart-box-woo');
    let wauWrapperDiv = document.querySelector('.wau_wrapper_div');
	let notasAdicionales = document.querySelector('.yith-wapo-addon-type-text');
	let textArea = document.querySelector('.yith-wapo-option-value');
	
    if (form && cartBoxWoo && wauWrapperDiv) {
        // Mover el cart-box-woo después de wau_wrapper_div
        wauWrapperDiv.parentNode.insertBefore(cartBoxWoo, wauWrapperDiv.nextSibling);

        // Crear un botón de envío oculto dentro del formulario
        let hiddenSubmitButton = document.createElement('button');
        hiddenSubmitButton.type = 'submit';
        hiddenSubmitButton.name = 'add-to-cart';
        hiddenSubmitButton.value = '2129';
        hiddenSubmitButton.style.display = 'none';
        form.appendChild(hiddenSubmitButton);

        // Obtener el botón visible fuera del formulario
        let visibleSubmitButton = cartBoxWoo.querySelector('button[type="submit"]');

        // Agregar el evento click al botón visible
        visibleSubmitButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir el comportamiento predeterminado del botón visible
            hiddenSubmitButton.click(); // Simular clic en el botón oculto dentro del formulario
        });
		
		//MOVER CAJA DE TEXTO AL FINAL
		if (wauWrapperDiv) {
            wauWrapperDiv.appendChild(notasAdicionales); // Mover notasAdicionales al final de wauWrapperDiv
            notasAdicionales.style.display = 'block'; // Asegurar que notasAdicionales se muestre
        }
		
		const elementsToAssociate = document.querySelectorAll('.yith-wapo-addon textarea');

		// Añadimos la clase y el atributo form a esos elementos
		elementsToAssociate.forEach(element => {
			element.classList.add('form-associated');
			element.setAttribute('form', 'formCart');
		});
    }
});

//=============================================COLORES=========================================================
document.addEventListener("DOMContentLoaded", function() {
    var labels = document.querySelectorAll('.yith-wapo-label');

    labels.forEach(function(label) {
        var text = label.textContent.trim();

        if (/^#[0-9A-F]{6}$/i.test(text)) {
            var colorCircle = document.createElement('span');
            colorCircle.style.display = 'inline-block';
            colorCircle.style.width = '40px';
            colorCircle.style.height = '40px';
            colorCircle.style.borderRadius = '50%';
            colorCircle.style.backgroundColor = text;

            var description = label.textContent.trim(); // Asumiendo que la descripción está en el texto del label

            var input = label.previousElementSibling.querySelector('input[type="radio"]');
            input.setAttribute('data-description', description);

            label.textContent = '';
            label.appendChild(colorCircle);
        }
    });

    var form = document.querySelector('#formCart'); // Selecciona el formulario adecuado por ID

    form.addEventListener('submit', function(event) {
        var selectedInput = form.querySelector('input[type="radio"]:checked');

        if (selectedInput) {
            var description = selectedInput.getAttribute('data-description');
            if (description) {
                selectedInput.value = description;
            }
        }
    });
});

//================================================================================================================

document.addEventListener("DOMContentLoaded", () =>{
	const btnCards = document.querySelectorAll('.card .btn-card');
	const btnContain = btnCards[0].textContent;
	const designInput = document.getElementById('design-input');
	const pseudoModal = document.getElementById('divCardMdl');
	const btnOrderDesign = document.getElementById('btn-order-design');
	const btnCancelMdl = document.getElementById('cancelar-mdl');

	btnCards.forEach((button, index) => {
	  button.addEventListener('click', function () {
		const currentCard = this.closest('.card');

		if (currentCard.classList.contains('active')) {
		  currentCard.classList.remove('active');
		  button.textContent = btnContain;
		  designInput.value = '';
		  pseudoModal.style.display = 'none';
		  return;
		}

		if (index === 0) {
		  pseudoModalDesignOrder();
		} else {
		  document.querySelectorAll('.card.card-option').forEach(card => {
			card.classList.remove('active');
			if(card.querySelector('.btn-card') != null){
				card.querySelector('.btn-card').textContent = btnContain;
			}
		  });

		  currentCard.classList.add('active');
		  button.textContent = "CANCELAR";

		  designInput.value = index === 1 ? 'design_later' : '';
		}
		console.log(designInput.value);
	  });
	});

	const pseudoModalDesignOrder = () => {
	  pseudoModal.style.display = "block";
	  document.addEventListener('click', handleOutsideClick);
	};

	const handleOutsideClick = (event) => {
	  if (!pseudoModal.contains(event.target) && !event.target.closest('.card')) {
		pseudoModal.style.display = 'none';
		document.removeEventListener('click', handleOutsideClick);
	  }
	};

	btnOrderDesign.addEventListener('click', () => {
	  document.querySelectorAll('.card.card-option').forEach(card => {
		card.classList.remove('active');
		if(card.querySelector('.btn-card') != null){
			card.querySelector('.btn-card').textContent = btnContain;
		}
	  });

	  designInput.value = 'design-order';
	  const card = document.querySelectorAll('.card.card-option')[1];
	  card.classList.add('active');
	  btnCards[0].textContent = "CANCELAR";
	  pseudoModal.style.display = 'none';
	  document.removeEventListener('click', handleOutsideClick);
	  console.log(designInput.value);
	});

	btnCancelMdl.addEventListener('click', () => {
	  /*designInput.name = '';*/
	  pseudoModal.style.display = 'none';
	  document.removeEventListener('click', handleOutsideClick);
	  console.log(designInput.value);
	});	
});