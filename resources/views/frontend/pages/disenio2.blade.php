{{-- @extends('frontend.layouts.master')

@section('title','EcoIngenio || Diseño')

@section('main-content')

<div id="main" class="mt-5"> --}}
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personalizacion de Vasos - EcoIngenio</title>
    <!-- Para usar la biblioteca fabricjs -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.3.1/fabric.min.js"></script>
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

        <!-- Estilos propios -->
    <link rel="stylesheet" href="{{asset('frontend/css/n7styles.css')}}">

    <!-- Importar tipografías -->
    @foreach($array['tipografias'] as $tipografia)
        <style>
            @font-face {
                font-family: '{{ $tipografia->name }}';
                src: url('{{ asset($tipografia->file_path) }}');
            }
        </style>
    @endforeach

</head>

<body>

    <!-- <section>
    <div class="container border">
        Contenido de las opciones
        <div class="row">
            <div class="col-4 border"> -->
                <!--------------------------- Para cambiar el color del fondo --------------------------->
                
            <!-- </div>
            <div class="col-4 border"> -->
                <!--------------------------- Para seleccionar figura --------------------------->
                
            <!-- </div>
            <div class="col-4 border"> -->
                <!--------------------------- Para subir foto --------------------------->

            <!-- </div>
            <div class="col-4 border"> -->
                <!--------------------------- Para descargar como pdf --------------------------->
                
            <!-- </div> 
            <div class="col-4 border "> -->

                <!---------- color del elemento figura. Solo aparece cuando se hace clic en el elemento ------->

                
        <!-- </div>
        <div class="row">
            <div class="col-6 border">
                
            </div>
        <div class="col-4 border ">

        </div>
        
    </div>
    </section> -->
    
                    <!--------------------------- Version Oficial --------------------------->
    <section class="padding-top-disenio">
        <div class="container-fluid container-main ">
            <div class="row ">
                <div class=" col-sideLeft border bg-white">
                    <div class="row">
                        <div class="col-3 sideLeft ">
                                <div class="bloq-side" data-target="temas">
                                    <div class="img-bloq-side">
                                        <img src="{{asset('frontend/img/personalizacion_vasos/layout.svg')}}" alt="" srcset="">
                                    </div>
                                    <h6>Temas</h6>
                                </div>
                                <div class="bloq-side" data-target="color-vaso" style="background: #f1f1f1;">
                                    <div class="img-bloq-side">
                                        <img src="{{asset('frontend/img/personalizacion_vasos/vaso.svg')}}" alt="" srcset="">
                                    </div>
                                    <h6>Color del Vaso</h6>
                                </div>
                                <div class="bloq-side" data-target="color-disenio">
                                    <div class="img-bloq-side">
                                        <img src="{{asset('frontend/img/personalizacion_vasos/colors.svg')}}" alt="" srcset="">
                                    </div>
                                    <h6>Color del Diseño</h6>
                                </div>
                                <div class="bloq-side" data-target="subir-archivo">
                                <div class="img-bloq-side">
                                        <img src="{{asset('frontend/img/personalizacion_vasos/upload.svg')}}" alt="" srcset="">
                                    </div>
                                    <h6>Subir Imagen</h6>
                                </div>
                                <div class="bloq-side" data-target="elementos">
                                <div class="img-bloq-side">
                                        <img src="{{asset('frontend/img/personalizacion_vasos/elements.svg')}}" alt="" srcset="">
                                    </div>
                                    <h6>Elementos</h6>
                                </div>
                                <div class="bloq-side" data-target="textos">
                                    <div class="img-bloq-side">
                                        <img src="{{asset('frontend/img/personalizacion_vasos/texts.svg')}}" alt="" srcset="">
                                    </div>
                                    <h6>Textos</h6>
                                </div>
                                <div class="bloq-side" data-target="medidor">
                                    <div class="img-bloq-side">
                                        <img src="{{asset('frontend/img/personalizacion_vasos/medidas.svg')}}" alt="" srcset="">
                                    </div>
                                    <h6>Medidor</h6>
                                </div>
                                
                        </div>
                        <div class="col-9 sideLeftContent">
                            <div class="contenido-side" id="temas-content" style="display: none;">
                                <h4 class="text-center">Temas</h4>
                                @foreach ($array['inspirates']->groupBy('category.image_type') as $categoria => $imagenes)
                                    <div class="galeria-container px-3">
                                        <h6 class="mt-3">{{ $categoria }}</h6>
                                        <div class="galeria">
                                                @foreach ($imagenes as $inspirate)
                                                    <div class="galeria-item d-flex align-self-center" >
                                                        <img width="130" class="mx-2 zoomable-image" src="{{ asset($inspirate->url) }}" alt="Inspiración" onclick="cargarImagen('{{ asset($inspirate->url) }}')">
                                                    </div>
                                                @endforeach
                                        </div>
                                        <button class="galeria-prev">&#8249;</button>
                                        <button class="galeria-next">&#8250;</button>
                                    </div>
                                @endforeach
                                
                            </div>
                            <div class="contenido-side" id="color-vaso-content" style="display: block;">
                                <!--------------- Para cambiar el color del fondo --------------------->
                                
                                <h4 class="text-center">Color del Vaso</h4>
                                <div class="mb-3">

                                    <div class="accordion" id="accordionExample">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingOne">
                                                <button class="accordion-button collapsed" type="button"
                                                    data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                                    aria-expanded="true" aria-controls="collapseOne">
                                                    <div class="acordion-btnTranslucido">
                                                        <h6>Cromáticos</h6>
                                                        <!-- <span>Transparente</span> -->
                                                    </div>
                                                </button>
                                            </h2>
                                            <div id="collapseOne" class="accordion-collapse collapse"
                                                aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                
                                                    @foreach($array['colors'] as $color)
                                                        <div class="option-color">
                                                            <div class="options-container">
                                                                <div class="color-cube" style="background:{{ $color->hex_code }}"></div>
                                                                <p class="color-title">{{ $color->name }}</p>
                                                            </div>
                                                        </div>
                                                    @endforeach
                                                    

                                                </div>
                                            </div>
                                        </div>
                                    <!------------------------ Acordeon de colores opacos ----------------------->
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingTwo">
                                                <button class="accordion-button collapsed" type="button"
                                                    data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                                    aria-expanded="false" aria-controls="collapseTwo">
                                                    <strong>Monocromáticos</strong>
                                                </button>
                                            </h2>
                                            <div id="collapseTwo" class="accordion-collapse collapse"
                                                aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <div class="option-color">
                                                        <div class="options-container">
                                                            <div class="color-cube" style="background:#fff;"></div>
                                                            <p class="color-title">Blanco</p>
                                                        </div>
                                                    </div>
                                                    <div class="option-color">
                                                        <div class="options-container">
                                                            <div class="color-cube" style="background:#212121;"></div>
                                                            <p class="color-title">Negro</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="contenido-side" id="color-disenio-content" style="display: none;">
                                <!---------- color de los elementos.------->
                                <div class="mb-3">
                                    <h4 class="text-center">Colores del diseño</h4>
                                    <div class="">
                                        <div class="mb-2 container-msg-switch">
                                        <h6 class="msg-switch">Colores Globales</h6>
                                        <label class="switch">
                                            <input type="checkbox" id="scopeColor">
                                            <span class="slider"></span>
                                        </label>
                                        </div>
                                        
                                        <h6>Colores Actuales</h6>
                                        <table style="width:20px;">
                                            <td id="color-actual" style="background-color: blue;"></td>
                                        </table>
                                    </div>
                                    <div class="mb-3" id="color-table-globales">
                                        
                                        <div class="container-paleta-color">
                                            <div class="colores-bd">
                                                <h6>Colores de la Base de Datos</h6>
                                                @foreach($array['colors'] as $color)
                                                    <div class="paleta-color" 
                                                    style="background-color: {{ $color->hex_code }}"></div>
                                                @endforeach
                                            </div>
                                            <div class="colores-clasicos">
                                                <h6>Clásicas</h6>
                                            </div>
                                            <div class="colores-deModa">
                                                <h6>De Moda</h6>
                                            </div>
                                            <div class="colores-metalicos">
                                                <h6>Metálicas</h6>
                                            </div>
                                            <div class="colores-miscelaneos">
                                                <h6>Misceláneos</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="contenido-side" id="subir-archivo-content" style="display: none;">
                                <!--------------------------- Para subir foto --------------------------->
                                <h4 class="text-center">Subir Imagen</h4>
                                <div class="size-texts px-3">
                                    <p>Agregá tu logo, ilustracciones y outros elementos do seu computador.
                                    </p>
                                    <p class="bold-text">Formatos aceptados: JPG e PNG</p>
                                    <p>1. Elementos con dos o más cores pasan a un color único.</p>

                                    <p>2. razados muy finos pueden perder su detalle.</p>

                                    <p>3. Utilizá siempre imagenes en alta resolución para garantizar buena calidad en el elemento.</p>

                                    <p class="bold-text">4. No utilice el QR Code generado por Instagram.</p>

                                    <p>Se recomienda que el imagen tenga una resolución de por lo menos 300 DPI.</p>

                                    <p>Elemplo:</p>

                                    <div class="text-center">
                                        <img width="130" class="mx-2 my-2" src="{{ asset('images/logo-example.png') }}" alt="Inspiración">
                                        <!-- Agrega un evento onclick al botón para ejecutar la función de clic -->
                                        <button class="upload-image" onclick="document.getElementById('image-upload').click()">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="#fffffff" stroke-width="2"></path>
                                                <path d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="#fffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                            <!-- Oculta el input para que no sea visible -->
                                            <input type="file" id="image-upload" accept=".svg, image/png, image/jpeg" style="display: none;">
                                            Subir imagen
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="contenido-side" id="elementos-content" style="display: none;">
                                <!--------------------------- Para seleccionar figura --------------------------->
                                <h4 class="text-center">Seleccionar Figura:</h4>
                                <select id="shape-selector">
                                    <option value="square">Cuadrado</option>
                                    <option value="triangle">Triángulo</option>
                                    <option value="circle">Círculo</option>
                                    <option value="star">Estrella</option>
                                </select>

                                <h4 class="text-center mt-4">Elementos</h4>

                                @foreach ($array['elements']->groupBy('category.image_type') as $categoria => $imagenes)
                                    <div class="galeria-container px-3">
                                        <h6 class="mt-3">{{ $categoria }}</h6>
                                        <div class="galeria">
                            
                                                @foreach ($imagenes as $element)
                                                    <div class="galeria-item d-flex align-self-center">
                                                        <img width="130" class="mx-2 zoomable-image" src="{{ asset($element->url) }}" alt="Inspiración" onclick="cargarImagen('{{ asset($element->url) }}')">
                                                    </div>
                                                @endforeach
                                
                                        </div>
                                        <button class="galeria-prev">&#8249;</button>
                                        <button class="galeria-next">&#8250;</button>
                                    </div>
                                @endforeach
                            </div>
                            <div class="contenido-side" id="textos-content" style="display: none;">
                                <div class="col-texts">
                                    <h4 class="text-center">Agregar Texto</h4>
                                    <button id="nuevo-texto">Agregar Nuevo Texto</button>
                                    <textarea id="text-editor" placeholder="Texto"></textarea>
                                        <div class="container-fonts">
                                            <!-- Para cambiar el font-family -->
                                            <select id="font-selector">
                                                <option value="Arial">Arial</option>
                                                <option value="Arial Black">Arial Black</option>
                                                <option value="Comic Sans MS">Comic Sans MS</option>
                                                <option value="Courier New">Courier New</option>
                                                <option value="Impact">Impact</option>
                                                <option value="Times New Roman">Times New Roman</option>
                                                <option value="Montserrat">Montserrat</option>
                                                <option value="Lato">Lato</option>
                                                <option value="Helvetica, sans-serif">Helvetica</option>
                                                <option value="Georgia, serif">Georgia</option>
                                                <option value="Courier New, monospace">Courier New</option>
                                                <option value="Palatino, serif">Palatino</option>
                                                <option value="Verdana, sans-serif">Verdana</option>
                                                <option value="Garamond, serif">Garamond</option>
                                                @foreach($array['tipografias'] as $tipografia)
                                                    <option value="{{ $tipografia->name }}">
                                                        {{ $tipografia->name }}
                                                    </option>
                                                @endforeach
                                            </select>
                                            <select id="fontSizeSelect">
                                                <!-- El codigo se genera dinamicamente por js -->
                                            </select>
                                        </div>
                                        <div class="container-btns">
                                            <button id="cursivaBtn" class="fontStyleBtn" title="Cursiva">I</button>
                                            <button id="negritaBtn" class="fontStyleBtn" title="Negrita">B</button>
                                        </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                            <div class="contenido-side" id="medidor-content" style="display: none;">
                                <!--------------------------- Para agregar medidor --------------------------->
                                <div class="sub-contenido-side">
                                    <h4 class="text-center">Medidor</h4>
                                    <!-- Botones para agregar/eliminar la imagen -->
                                    <div class="d-flex flex-column gap-2">
                                        <button id="agregarBtn" onclick="agregarImagen()" class="btn-general">Agregar</button>
                                        <button id="eliminarBtn" onclick="eliminarImagen()" class="btn-general btn-red" disabled>Quitar</button>
                                    </div>
                                    {{-- <img
                                        src="{{asset('images/0000002.svg')}}"
                                        class="img-fluid rounded-top"
                                        alt=""
                                    /> --}}
                                    
                                    {{-- <div id="colorPalette" class="color-palette">
                                        <div class="color-button" style="background-color: #000000" onclick="handleColorChange('#000000')"></div>
                                        <div class="color-button" style="background-color: #F93822" onclick="handleColorChange('#F93822')"></div>
                                        <div class="color-button" style="background-color: #FBE122" onclick="handleColorChange('#FBE122')"></div>
                                        <div class="color-button" style="background-color: #0072CE" onclick="handleColorChange('#0072CE')"></div>
                                    </div> --}}
                                    <div id="svgHidden" style="display: none;">
                                    <!-- <'?'xml version="1.0"?> -->

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 457" style="height: 100%; fill: #000000;"><rect class="st-0" x="2.77" y="97.95" width="17.36" height="2"/><rect class="st-0" x="2.77" y="41.57" width="17.36" height="2"/><rect class="st-0" x="2.76" y="168.67" width="17.37" height="2"/><g><path class="st-0" d="M1.28,97.19v-.43l.55-.54c1.33-1.26,1.93-1.93,1.94-2.72,0-.53-.26-1.01-1.03-1.01-.47,0-.86,.24-1.1,.44l-.22-.5c.36-.3,.87-.53,1.47-.53,1.12,0,1.59,.77,1.59,1.51,0,.96-.7,1.74-1.79,2.79l-.41,.38v.02h2.33v.58H1.28Z"/><path class="st-0" d="M8.84,94.54c0,1.77-.66,2.74-1.81,2.74-1.02,0-1.7-.95-1.72-2.67,0-1.74,.75-2.7,1.81-2.7s1.72,.98,1.72,2.63Zm-2.82,.08c0,1.35,.42,2.12,1.06,2.12,.72,0,1.06-.84,1.06-2.17s-.33-2.12-1.06-2.12c-.61,0-1.06,.75-1.06,2.17Z"/><path class="st-0" d="M12.94,94.54c0,1.77-.66,2.74-1.81,2.74-1.02,0-1.7-.95-1.72-2.67,0-1.74,.75-2.7,1.81-2.7s1.72,.98,1.72,2.63Zm-2.82,.08c0,1.35,.42,2.12,1.06,2.12,.72,0,1.06-.84,1.06-2.17s-.33-2.12-1.06-2.12c-.61,0-1.06,.75-1.06,2.17Z"/><path class="st-0" d="M16.57,97.05c-.18,.1-.59,.22-1.11,.22-1.17,0-1.93-.79-1.93-1.97s.82-2.06,2.08-2.06c.42,0,.78,.1,.98,.2l-.16,.54c-.17-.1-.43-.18-.82-.18-.89,0-1.37,.66-1.37,1.46,0,.9,.58,1.45,1.34,1.45,.4,0,.66-.1,.86-.19l.12,.53h0Z"/><path class="st-0" d="M20.11,97.05c-.18,.1-.59,.22-1.11,.22-1.17,0-1.93-.79-1.93-1.97s.82-2.06,2.08-2.06c.42,0,.78,.1,.98,.2l-.16,.54c-.17-.1-.43-.18-.82-.18-.89,0-1.37,.66-1.37,1.46,0,.9,.58,1.45,1.34,1.45,.4,0,.66-.1,.86-.19l.12,.53h0Z"/></g><g><path class="st-0" d="M2.81,163.2h-.02l-.9,.49-.14-.54,1.14-.61h.6v5.2h-.68v-4.54h0Z"/><path class="st-0" d="M8.84,165.08c0,1.77-.66,2.74-1.81,2.74-1.02,0-1.7-.95-1.72-2.67,0-1.74,.75-2.7,1.81-2.7s1.72,.98,1.72,2.63h0Zm-2.82,.08c0,1.35,.42,2.12,1.06,2.12,.72,0,1.06-.84,1.06-2.17s-.33-2.12-1.06-2.12c-.61,0-1.06,.75-1.06,2.17Z"/><path class="st-0" d="M12.94,165.08c0,1.77-.66,2.74-1.81,2.74-1.02,0-1.7-.95-1.72-2.67,0-1.74,.75-2.7,1.81-2.7s1.72,.98,1.72,2.63h0Zm-2.82,.08c0,1.35,.42,2.12,1.06,2.12,.72,0,1.06-.84,1.06-2.17s-.33-2.12-1.06-2.12c-.61,0-1.06,.75-1.06,2.17Z"/><path class="st-0" d="M16.57,167.59c-.18,.1-.59,.23-1.11,.23-1.17,0-1.93-.79-1.93-1.98s.82-2.05,2.08-2.05c.42,0,.78,.1,.98,.2l-.16,.54c-.17-.1-.43-.18-.82-.18-.89,0-1.37,.66-1.37,1.46,0,.9,.58,1.45,1.34,1.45,.4,0,.66-.1,.86-.19l.12,.53h0Z"/><path class="st-0" d="M20.11,167.59c-.18,.1-.59,.23-1.11,.23-1.17,0-1.93-.79-1.93-1.98s.82-2.05,2.08-2.05c.42,0,.78,.1,.98,.2l-.16,.54c-.17-.1-.43-.18-.82-.18-.89,0-1.37,.66-1.37,1.46,0,.9,.58,1.45,1.34,1.45,.4,0,.66-.1,.86-.19l.12,.53h0Z"/></g><g><path class="st-0" d="M1.45,39.38c.2,.13,.66,.33,1.15,.33,.9,0,1.18-.58,1.18-1.01,0-.73-.66-1.04-1.34-1.04h-.39v-.53h.39c.51,0,1.16-.26,1.16-.88,0-.42-.27-.78-.91-.78-.41,0-.82,.18-1.04,.34l-.18-.51c.27-.2,.8-.4,1.36-.4,1.02,0,1.49,.61,1.49,1.24,0,.54-.32,.99-.96,1.22v.02c.64,.13,1.16,.61,1.16,1.33,0,.83-.65,1.56-1.9,1.56-.58,0-1.1-.18-1.35-.35l.19-.54h0Z"/><path class="st-0" d="M8.84,37.53c0,1.77-.66,2.74-1.81,2.74-1.02,0-1.7-.95-1.72-2.67,0-1.74,.75-2.7,1.81-2.7s1.72,.98,1.72,2.63Zm-2.82,.08c0,1.35,.42,2.12,1.06,2.12,.72,0,1.06-.84,1.06-2.17s-.33-2.12-1.06-2.12c-.61,0-1.06,.75-1.06,2.17Z"/><path class="st-0" d="M12.94,37.53c0,1.77-.66,2.74-1.81,2.74-1.02,0-1.7-.95-1.72-2.67,0-1.74,.75-2.7,1.81-2.7s1.72,.98,1.72,2.63Zm-2.82,.08c0,1.35,.42,2.12,1.06,2.12,.72,0,1.06-.84,1.06-2.17s-.33-2.12-1.06-2.12c-.61,0-1.06,.75-1.06,2.17Z"/><path class="st-0" d="M16.57,40.04c-.18,.1-.59,.22-1.11,.22-1.17,0-1.93-.79-1.93-1.97s.82-2.06,2.08-2.06c.42,0,.78,.1,.98,.2l-.16,.54c-.17-.1-.43-.18-.82-.18-.89,0-1.37,.66-1.37,1.46,0,.9,.58,1.45,1.34,1.45,.4,0,.66-.1,.86-.19l.12,.53h0Z"/><path class="st-0" d="M20.11,40.04c-.18,.1-.59,.22-1.11,.22-1.17,0-1.93-.79-1.93-1.97s.82-2.06,2.08-2.06c.42,0,.78,.1,.98,.2l-.16,.54c-.17-.1-.43-.18-.82-.18-.89,0-1.37,.66-1.37,1.46,0,.9,.58,1.45,1.34,1.45,.4,0,.66-.1,.86-.19l.12,.53h0Z"/></g></svg>

                                    </div>
                                </div>
                                <div class="sub-contenido-side mt-3">
                                    <select id="select-medidas" class="mb-3">
                                        <option value="240cc">240cc 185x60mm</option>
                                        <option value="500cc" selected>500cc 220x85mm</option>
                                        <option value="750cc">750cc 240x95mm</option>
                                        <option value="400cc_copa">400cc 40x40mm (Copa)</option>
                                    </select>
                                    <button class="btn btn-warning" id="btn-medidas">Medida</button>
                                </div>
                            </div>
                            <!-- <div class="contenido-side" id="pdf-content" style="display: none;">
                                
                            </div> -->
                        </div>
                        </div>

                        </div>
                <div class=" col-main">
                    <div class=" bg-white col-rightSide border">
                        <div class="right-functions">
                            <h5>Modificar Texto y Elementos</h5>
                            <div class="col-rightOpciones">
                                <button class="btn btn-rightOptions" id="btn-delete" title="Borrar Elemento">
                                    <img src="{{asset('frontend/img/personalizacion_vasos/delete.svg')}}" alt="" srcset="">
                                </button>
                                <button class="btn btn-rightOptions" id="duplicateButton" title="Duplicar Elemento">
                                    <img src="{{asset('frontend/img/personalizacion_vasos/copy-paste.svg')}}" alt="" srcset="">
                                </button>
                                <button class="btn btn-rightOptions" id="mirrorHorizontalButton" title="Girar Horizontalmente">
                                    <img src="{{asset('frontend/img/personalizacion_vasos/mirror.svg')}}" alt="" srcset="">
                                </button>
                                <button class="btn btn-rightOptions" id="flipVerticalButton" title="Girar Verticalmente">
                                    <img src="{{asset('frontend/img/personalizacion_vasos/flip-v.svg')}}" alt="" srcset="">
                                </button>
                            </div>  
                        </div>  
                        <div class="right-functions">
                            <!--------------------------- Para descargar como pdf --------------------------->
                            
                            <h5>Descargar en PDF</h5>
                            <button class="button" type="button" id="download-pdf" >
                                <span class="button__text">Descargar PDF</span>
                                <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="bdd05811-e15d-428c-bb53-8661459f9307" data-name="Layer 2" class="svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
                            </button>
                                        
                        </div>
                        <div class="right-functions vaso3D-section">
                            <!--------------------------- Para Visualizar Modelo 3D --------------------------->
                            <h5>Visualizar Vaso en 3D</h5>
                            <button class="btn3d" id="ver3DBtn">Ver 3D</button>
                        </div>
                    </div>
                    <!--------------------------- Elemento Canva --------------------------->
                
                    <canvas id="canvas" width="1000" height="400"></canvas>

                </div>
                <div id="myModal" class="modal">
                    <span class="close">&times;</span>
                    <div id="container3D"></div>
                </div>
            </div>
        </div>
    </section>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>
    <!-- jspdf cdn -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>
	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.js" integrity="sha512-sk0cNQsixYVuaLJRG0a/KRJo9KBkwTDqr+/V94YrifZ6qi8+OO3iJEoHi0LvcTVv1HaBbbIvpx+MCjOuLVnwKg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.es.js" integrity="sha512-VTufZOUx+Gc0N4JkluA0ZkVs2x4wfDI3p60gRWpHT761kMQ+hiNlYI+8MGXbLO48ymPKAeRa1wsEm3BIaxSEvw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.js" integrity="sha512-oa6kn7l/guSfv94d8YmJLcn/s3Km4mm/t4RqFqyorSMXkKlg6pFM6HmLXsJvOP/Cl/dv/N5xW7zuaA+paSc55Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->

    <script src="{{asset('frontend/js/personalizar_vasos/n7scripts.js')}}"></script>
    <script type="module" src="{{asset('js/main3d.js')}}"></script>

</body>

</html>
{{-- </div>

	
@endsection --}}
