<?php
/*
Plugin Name: Administración Ecoingenio
Author: N7 Softwares
Author URI: https://n7softwares.com.ar/
Description: Plugin que agrega un iframe personalizado en el panel de administración de WordPress.
*/

// Agregar el enlace en el menú
function custom_iframe_menu() {
    add_menu_page(
        'Herramienta de Customización',
        'Herramienta de Customización',
        'manage_options',
        'custom-iframe-plugin',
        'custom_iframe_page',
        'dashicons-admin-customizer',
        100
    );
}
add_action('admin_menu', 'custom_iframe_menu');

// Contenido de la página de opciones
function custom_iframe_page() {
    ?>
    <div class="wrap">
        <iframe src="https://prueba.ecoingenio.com.ar/admin-ncilcoperc/" width="100%" height="900" title="Example"></iframe>
    </div>
    <?php
}
