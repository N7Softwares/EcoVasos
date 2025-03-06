document.addEventListener('DOMContentLoaded', function() {
    var el = document.getElementById('sortable-list');
    
    if (!el) {
        console.error('Elemento con id "sortable-list" no encontrado.');
        return;
    }

    // Usar "Sortable" con mayúscula
    var sortable = new Sortable(el, {  // Cambiar a "Sortable"
        handle: '.list-group-item',  // Define el área de arrastre
        animation: 150,  // Velocidad de la animación (en ms)
        onEnd: function(evt) {
            console.log('Elemento movido', evt);
            var ids = Array.from(el.children).map(function(item) {
                return item.getAttribute('data-id');
            });
            updateOrder(ids);
        }
    });
});

function updateOrder(ids) {
    fetch('/api/update-order', {  // <- Asegúrate de que coincida con api.php
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: ids })  // Enviamos los IDs en JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Orden actualizado:', data);
    })
    .catch(error => {
        console.error('Error al actualizar el orden:', error);
    });
}

// Suponiendo que cada vez que se hace clic en una imagen, se guarda el ID del elemento
function setLastUsedElement(elementId) {
    // Guardar el último ID de elemento en la sesión o en la base de datos
    // Usar una llamada AJAX o localStorage para guardar este dato
    sessionStorage.setItem('ultimoElementoUsado', elementId);
}


