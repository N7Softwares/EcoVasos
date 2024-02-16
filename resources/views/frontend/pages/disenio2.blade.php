@extends('frontend.layouts.master')

@section('title','EcoIngenio || Diseño')

@section('main-content')

<div id="main" class="mt-5">
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personalizacion de Vasos - EcoIngenio</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.3.1/fabric.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('frontend/css/n7styles.css')}}">
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
                    <!--------------------------- Version Oficial --------------------------->
    <div class="burger-menu">
        {{-- <button id="burger-btn">&#9776;</button> --}}
        <input type="checkbox" id="burger-btn" name="check-toggle" hidden="">
        <label for="burger-btn" class="toggle">
            <div class="toggle__circle"></div>
        </label>
    </div>
    <section class="padding-top-disenio">
        <div class="container-fluid container-main ">
            <div class="row ">
                <div class=" col-sideLeft border bg-white">
                    <div class="row">
                        <div class="col-3 sideLeft ">
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
                                                    </div>
                                                </button>
                                            </h2>
                                            <div id="collapseOne" class="accordion-collapse collapse"
                                                aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                
                                                    @foreach($array['colors'] as $color)
                                                        <div class="option-color">
                                                            <div class="options-container-personalized">
                                                                <div class="color-cube" style="background:{{ $color->hex_code }}"></div>
                                                                <p class="color-title">{{ $color->name }}</p>
                                                            </div>
                                                        </div>
                                                    @endforeach
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
                                        <div class="table-color-actual">
                                            <!-- <td id="color-actual" style="background-color: blue;"></td> -->
                                            @if(isset($array['colors']) && count($array['colors']) > 0)
                                            @php
                                            $firstColor = $array['colors'][0];
                                            @endphp
                                            <div id="color-actual"
                                                style="background-color: {{ $firstColor->hex_code }};"></div>
                                            <div class="" id="color-actual-nombre">{{ $firstColor->name }}</div>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="mb-3" id="color-table-globales">
                                        
                                        <div class="container-paleta-color">
                                            <div class="colores-bd">
                                                <h6>Colores disponibles</h6>
                                                @foreach($array['colors'] as $color)
                                                    <div class="paleta-color" title="{{ $color->name }}"
                                                    style="background-color: {{ $color->hex_code }}"></div>
                                                @endforeach
                                            </div>
                                            <div class="colores-clasicos d-none">
                                                <h6>Clásicas</h6>
                                            </div>
                                            <div class="colores-deModa d-none">
                                                <h6>De Moda</h6>
                                            </div>
                                            <div class="colores-metalicos d-none">
                                                <h6>Metálicas</h6>
                                            </div>
                                            <div class="colores-miscelaneos d-none">
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
                                    <p class="bold-text">Formatos aceptados: JPG, PNG y SVG</p>
                                    <p>1. Elementos con dos o más cores pasan a un color único.</p>

                                    <p>2. razados muy finos pueden perder su detalle.</p>

                                    <p>3. Utilizá siempre imagenes en alta resolución para garantizar buena calidad en el elemento.</p>

                                    <p class="bold-text">4. No utilice el QR Code generado por Instagram.</p>

                                    <p>Se recomienda que el imagen tenga una resolución de por lo menos 300 DPI.</p>

                                    <p>Elemplo:</p>

                                    <div class="text-center d-none">
                                        
                                        <!-- Agrega un evento onclick al botón para ejecutar la función de clic -->
                                        <button class="upload-image" onclick="document.getElementById('image-upload').click()">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="#fffffff" stroke-width="2"></path>
                                                <path d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="#fffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                            <!-- Oculta el input para que no sea visible -->
                                            <input type="file" id="image-upload" accept=".svg" style="display: none;">
                                            Subir SVG
                                        </button>
                                    </div>
                                    <div class="text-center">
                                        <img width="130" class="mx-2 my-2" src="{{ asset('images/logo-example.png') }}" alt="Inspiración">
                                        <p class="bold-text">Una vez cargada la imagen, dar clic para agregar al lienzo</p>
                                    </div>
                                    <!-- <button id="agregarSvgToLienz">Agregar SVG al lienzo</button> -->
                                    <div id="root">
                                        <div class="grid-base">
                                            <div class="grid-main">
                                                <div class="grid-canvas">
                                                    <div class="grid-canvas-inner">
                                                        <div class="browse-btn-wrapper">
                                                            <div><input type="file" accept="image/png,image/jpeg,image/jpg,image/svg+xml" multiple="" name="file"
                                                                    style="display: none;">
                                                                <div class="files-dropzone-list">
                                                                    <button class="btn-wrap">
                                                                    </button></div>
                                                            </div>
                                                        </div>
                                                        <div id="reduceSvg" style="display: none;"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="contenido-side" id="elementos-content" style="display: none;">
                                <!--------------------------- Para seleccionar figura --------------------------->
                                
                                <h4 class="text-center">Elementos</h4>

                                @foreach ($array['elements']->groupBy('category.image_type') as $categoria => $imagenes)
                                    <div class="galeria-container px-3">
                                        <h6 class="mt-3">{{ $categoria }}</h6>
                                        <div class="galeria">
                            
                                                @foreach ($imagenes as $element)
                                                    <div class="galeria-item d-flex align-self-center">
                                                        <img class="mx-2 zoomable-image" src="{{ asset($element->url) }}" alt="Inspiración" onclick="cargarImagen('{{ asset($element->url) }}')">
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
                                        <!-- Acordeon de fuentes -->
                                        <div class="accordion" id="accordionExample2">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="headingThree">
                                                    <button class="accordion-button btn-accn-1 collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                        aria-expanded="false" aria-controls="collapseThree" value="Arial">
                                                        Arial
                                                    </button>
                                                </h2>
                                                <div id="collapseThree" class="accordion-collapse collapse"
                                                    aria-labelledby="headingThree" data-bs-parent="#accordionExample2">
                                                    <div class="accordion-body">
                                                        <!-- Primer ítem -->
                                                        <div class="option-color option-fuentes" value="Arial">
                                                            <div class="options-container-personalized">
                                                                <p class="color-title">Arial</p>
                                                            </div>
                                                        </div>
                                                        <!-- Segundo ítem -->
                                                        <div class="option-color option-fuentes" value="Arial Black">
                                                            <div class="options-container-personalized">
                                                                <p class="color-title">Arial Black</p>
                                                            </div>
                                                        </div>
                                                        <!-- Tercer ítem -->
                                                        <div class="option-color option-fuentes" value="Comic Sans MS">
                                                            <div class="options-container-personalized">
                                                                <p class="color-title">Comic Sans MS</p>
                                                            </div>
                                                        </div>
                                                        <!-- Cuarto ítem -->
                                                        <div class="option-color option-fuentes" value="Courier New">
                                                            <div class="options-container-personalized">
                                                                <p class="color-title">Courier New</p>
                                                            </div>
                                                        </div>
                                                        <!-- Quinto ítem -->
                                                        <div class="option-color option-fuentes" value="Impact">
                                                            <div class="options-container-personalized">
                                                                <p class="color-title">Impact</p>
                                                            </div>
                                                        </div>
                                                        <!-- Sexto ítem -->
                                                        <div class="option-color option-fuentes"
                                                            value="Times New Roman">
                                                            <div class="options-container-personalized">
                                                                <p class="color-title">Times New Roman</p>
                                                            </div>
                                                        </div>
                                                        <!-- Séptimo ítem -->
                                                        <div class="option-color option-fuentes" value="Montserrat">
                                                            <div class="options-container-personalized">
                                                                <p class="color-title">Montserrat</p>
                                                            </div>
                                                        </div>
                                                        <!-- Octavo ítem -->
                                                        <div class="option-color option-fuentes" value="Lato">
                                                            <div class="options-container-personalized">
                                                                <p class="color-title">Lato</p>
                                                            </div>
                                                        </div>
                                                        <!-- Noveno ítem -->
                                                        <div class="option-color option-fuentes"
                                                            value="Helvetica, sans-serif">
                                                            <div class="options-container-personalized">
                                                                <p class="color-title">Helvetica</p>
                                                            </div>
                                                        </div>
                                                        <!-- Décimo ítem -->
                                                        <div class="option-color option-fuentes" value="Georgia, serif">
                                                            <div class="options-container-personalized">
                                                                <p class="color-title">Georgia</p>
                                                            </div>
                                                        </div>
                                                        <!-- Undécimo ítem -->
                                                        <div class="option-color option-fuentes"
                                                            value="Courier New, monospace">
                                                            <div class="options-container-personalized">
                                                                <p class="color-title">Courier New</p>
                                                            </div>
                                                        </div>
                                                        <!-- Duodécimo ítem -->
                                                        <div class="option-color option-fuentes"
                                                            value="Palatino, serif">
                                                            <div class="options-container-personalized">
                                                                <p class="color-title">Palatino</p>
                                                            </div>
                                                        </div>
                                                        <!-- Decimotercero ítem -->
                                                        <div class="option-color option-fuentes"
                                                            value="Verdana, sans-serif">
                                                            <div class="options-container-personalized">
                                                                <p class="color-title">Verdana</p>
                                                            </div>
                                                        </div>
                                                        <!-- Decimocuarto ítem -->
                                                        <div class="option-color option-fuentes"
                                                            value="Garamond, serif">
                                                            <div class="options-container-personalized">
                                                                <p class="color-title">Garamond</p>
                                                            </div>
                                                        </div>
                                                        <!-- ... Tipografias traidas de la base de datos -->
                                                        @foreach($array['tipografias'] as $tipografia)
                                                        <div class="option-color option-fuentes"
                                                            value="{{ $tipografia->name }}">
                                                            <div class="options-container-personalized">
                                                                <p class="color-title">{{ $tipografia->name }}</p>
                                                            </div>
                                                        </div>
                                                        @endforeach
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="headingFour">
                                                    <button class="accordion-button btn-accn-2 collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#collapseFour"
                                                        aria-expanded="false" aria-controls="collapseFour">
                                                        40px
                                                    </button>
                                                </h2>
                                                <div id="collapseFour" class="accordion-collapse collapse"
                                                    aria-labelledby="headingFour" data-bs-parent="#accordionExample2">
                                                    <!-- id en accordion-body -->
                                                    <div class="accordion-body" id="fontSizeOptions">
                                                        <!-- Contenido generado dinámicamente se agregará aca por JavaScript -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container-btns">
                                        <button id="cursivaBtn" class="fontStyleBtn" title="Cursiva">I</button>
                                        <button id="negritaBtn" class="fontStyleBtn" title="Negrita">B</button>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                            <div class="contenido-side" id="medidor-content">
                                <!--------------------------- Para agregar medidor --------------------------->
                                <div class="sub-contenido-side mt-3">
                                    <h4 class="text-center">Medidor</h4>
                                    <select id="select-medidas" class="mb-3">
                                        <option value="240cc">240cc 185x60mm</option>
                                        <option value="500cc" selected>500cc 220x85mm</option>
                                        <option value="750cc">750cc 240x95mm</option>
                                        <option value="400cc_copa">400cc 40x40mm (Copa)</option>
                                    </select>
                                    <button class="btn btn-general" id="btn-medidas">Agregar Medida</button>
                                </div>
                            </div>
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
                    <div id="svg-container-brand" class="d-none">
                        <svg xmlns="http://www.w3.org/2000/svg"
                        width="975.000000pt" height="922.000000pt" viewBox="0 0 975.000000 922.000000"
                        preserveAspectRatio="xMidYMid meet">
                        <metadata>
                        Created by potrace 1.16, written by Peter Selinger 2001-2019
                        </metadata>
                        <g transform="translate(0.000000,922.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M5004 8639 c-133 -16 -249 -67 -373 -165 -331 -261 -615 -909 -729
                        -1659 -33 -218 -36 -515 -9 -694 63 -402 221 -746 448 -972 142 -141 305 -235
                        497 -286 84 -23 118 -26 262 -27 144 -1 175 2 243 22 340 98 550 368 634 815
                        13 69 17 145 17 302 1 182 -2 224 -23 319 -54 253 -122 397 -216 451 -113 66
                        -196 7 -355 -250 -161 -261 -258 -326 -395 -261 -27 13 -62 36 -77 52 -99 106
                        -171 324 -193 585 -8 94 9 324 36 487 51 308 130 492 243 570 50 33 100 41
                        135 22 29 -15 77 -97 126 -215 93 -221 141 -285 215 -285 110 0 180 177 180
                        461 0 206 -37 387 -106 520 -48 92 -75 114 -164 137 -41 11 -113 31 -160 45
                        -101 29 -154 35 -236 26z m346 -204 c59 -31 97 -123 59 -148 -54 -35 -180 85
                        -149 143 13 24 50 26 90 5z"/>
                        <path d="M3518 8266 c-385 -164 -726 -375 -998 -618 -154 -138 -215 -215 -240
                        -302 -32 -112 -43 -137 -232 -571 -244 -558 -276 -621 -412 -815 -221 -315
                        -272 -460 -207 -588 65 -128 275 -237 521 -271 151 -21 1017 -115 1171 -127
                        97 -8 140 6 230 71 160 118 294 438 353 845 66 450 25 717 -124 818 -29 20
                        -45 23 -90 20 -114 -8 -188 -67 -340 -268 -153 -204 -236 -273 -362 -300 -46
                        -10 -63 -10 -87 0 -43 17 -88 72 -125 149 -24 53 -31 82 -34 151 -3 74 0 91
                        20 130 39 77 121 114 199 91 22 -7 64 -35 98 -66 32 -30 68 -55 79 -55 93 0
                        204 296 206 550 1 123 -11 175 -45 185 -26 9 -51 -7 -145 -95 -117 -108 -195
                        -142 -255 -110 -78 42 71 310 255 458 171 138 324 165 412 74 18 -19 54 -76
                        80 -126 61 -122 81 -141 144 -141 42 0 54 5 85 35 113 109 175 446 130 705
                        -26 149 -72 225 -134 225 -14 0 -83 -25 -153 -54z m103 -77 c15 -15 19 -28 14
                        -47 -8 -35 -50 -72 -81 -72 -26 0 -64 32 -64 53 1 22 27 60 51 73 34 19 56 17
                        80 -7z"/>
                        <path d="M6536 8224 c-62 -19 -139 -95 -188 -184 -78 -139 -155 -423 -192
                        -710 -50 -378 -64 -780 -36 -1035 58 -520 230 -951 483 -1205 183 -184 386
                        -275 642 -286 403 -19 828 185 1055 508 66 93 102 165 143 281 31 91 32 95 32
                        272 -1 177 -1 182 -34 280 -112 336 -357 735 -705 1150 -145 173 -531 557
                        -681 677 -307 245 -398 290 -519 252z m551 -673 c82 -59 194 -224 309 -452
                        130 -260 192 -441 203 -594 13 -183 -17 -327 -82 -401 -44 -51 -82 -67 -155
                        -67 -220 2 -386 244 -459 668 -12 74 -17 160 -17 330 -1 296 23 446 80 514 33
                        40 68 40 121 2z"/>
                        <path d="M2403 4969 c-126 -62 -202 -266 -203 -545 0 -127 11 -196 81 -524 31
                        -143 53 -273 56 -331 6 -92 5 -97 -16 -109 -59 -31 -141 43 -215 193 -86 174
                        -113 320 -126 677 -12 335 -35 434 -126 547 -54 66 -180 116 -249 99 -38 -10
                        -103 -73 -131 -128 -40 -80 -57 -170 -57 -308 0 -284 106 -540 413 -1000 115
                        -173 249 -389 330 -535 152 -272 291 -465 460 -636 153 -155 246 -209 288
                        -167 29 29 8 149 -78 453 -94 327 -95 333 -94 580 1 164 8 283 28 470 33 300
                        43 603 27 813 -17 235 -50 350 -118 414 -61 59 -191 76 -270 37z"/>
                        <path d="M7880 4720 c-142 -13 -229 -56 -324 -161 -138 -153 -232 -445 -243
                        -759 -6 -167 5 -229 62 -346 35 -72 94 -137 205 -226 74 -59 87 -84 72 -135
                        -15 -52 -71 -115 -121 -137 -77 -35 -87 -4 -49 160 26 113 20 137 -40 153 -49
                        14 -124 -5 -173 -41 -73 -56 -133 -195 -216 -498 -115 -421 -134 -637 -57
                        -656 55 -14 216 93 389 257 396 376 667 706 794 969 41 84 46 103 49 175 3 74
                        1 83 -26 126 -26 41 -45 54 -150 108 -127 64 -162 95 -162 142 0 40 35 130 70
                        178 25 34 36 41 63 41 52 0 57 -12 50 -116 l-6 -93 30 -30 c108 -107 285 17
                        393 275 40 96 60 189 60 280 0 178 -86 291 -251 328 -73 17 -264 19 -419 6z"/>
                        <path d="M6398 4706 c-251 -90 -438 -478 -542 -1127 -60 -370 -80 -655 -81
                        -1139 0 -344 2 -406 18 -478 48 -224 129 -316 277 -315 169 1 349 100 503 277
                        210 243 371 587 481 1022 84 334 107 699 61 982 -56 345 -305 710 -530 778
                        -59 17 -138 17 -187 0z m193 -908 c36 -37 69 -106 90 -188 22 -87 17 -315 -9
                        -420 -65 -262 -211 -455 -309 -408 -36 17 -69 68 -91 137 -22 71 -24 354 -3
                        446 51 230 135 409 210 450 43 23 76 18 112 -17z"/>
                        <path d="M4898 4686 c-227 -88 -371 -399 -385 -832 -6 -182 5 -284 44 -409 58
                        -185 147 -319 349 -526 78 -80 151 -164 163 -187 44 -87 18 -191 -55 -211 -55
                        -15 -96 5 -118 58 -19 50 -36 154 -36 234 0 72 -17 114 -63 154 -46 40 -97 56
                        -158 51 -107 -11 -146 -101 -156 -363 -10 -242 26 -565 82 -745 47 -150 101
                        -247 180 -326 62 -63 79 -74 140 -94 81 -25 223 -30 295 -10 308 83 509 497
                        527 1085 6 204 -6 293 -57 423 -59 146 -119 220 -295 362 -66 53 -139 118
                        -162 143 -68 74 -78 159 -32 281 24 66 48 89 82 81 48 -13 60 -37 68 -148 9
                        -123 30 -177 94 -236 96 -89 198 -74 258 38 66 120 97 274 97 476 0 146 -11
                        230 -42 325 -67 208 -171 310 -365 361 -104 27 -398 37 -455 15z"/>
                        <path d="M3370 4674 c-216 -46 -357 -156 -404 -314 -30 -102 -21 -170 60 -429
                        61 -197 82 -287 93 -409 16 -168 -2 -238 -95 -368 -57 -82 -84 -163 -84 -260
                        0 -259 169 -686 387 -974 111 -148 260 -260 344 -260 82 0 132 82 131 215 0
                        110 -21 190 -103 388 -97 236 -117 332 -84 397 12 23 22 30 46 30 71 0 101
                        -71 179 -420 90 -400 203 -573 384 -587 103 -9 159 37 197 159 72 231 4 636
                        -241 1431 -108 349 -127 445 -140 722 -14 280 -39 430 -90 525 -22 40 -83 101
                        -123 121 -92 47 -317 63 -457 33z m324 -851 c82 -127 113 -496 48 -582 -12
                        -17 -31 -27 -51 -29 -27 -3 -39 3 -70 36 -85 89 -114 332 -60 507 33 109 88
                        137 133 68z"/>
                        <path d="M847 4323 l-208 -117 7 -51 c3 -27 10 -57 14 -65 6 -11 49 -24 132
                        -39 68 -13 132 -27 142 -31 15 -5 -11 -23 -113 -80 -96 -54 -130 -78 -127 -89
                        3 -9 8 -37 12 -63 3 -27 7 -48 8 -48 1 0 99 -18 217 -40 117 -22 217 -40 222
                        -40 4 0 -65 -71 -154 -157 l-161 -158 27 -58 27 -59 92 6 c50 4 118 9 151 12
                        l60 6 -108 -109 -108 -109 26 -57 c18 -39 32 -57 45 -57 10 0 104 7 210 16
                        106 8 201 14 211 12 16 -2 -3 -36 -105 -193 l-124 -189 20 -31 c12 -16 30 -40
                        40 -51 l19 -21 136 39 c74 21 137 37 140 35 2 -3 -30 -57 -72 -122 -47 -72
                        -74 -123 -70 -133 3 -9 20 -34 38 -55 l32 -38 230 70 c148 44 229 73 227 81
                        -6 25 -55 80 -71 80 -9 -1 -79 -20 -156 -44 -77 -24 -142 -42 -143 -40 -2 1
                        37 62 87 134 l90 133 -31 43 c-17 24 -39 44 -47 44 -9 0 -80 -20 -158 -44 -79
                        -24 -143 -42 -143 -40 0 3 40 64 89 137 l89 133 -30 40 c-17 21 -42 63 -56 93
                        l-27 53 -105 -6 c-58 -4 -132 -9 -165 -12 l-60 -6 120 115 120 114 -25 53 -25
                        52 -70 -6 c-38 -3 -112 -9 -163 -12 l-94 -7 107 104 c59 57 111 106 116 107
                        14 6 11 30 -11 72 -11 22 -25 62 -31 89 l-10 49 -112 21 c-62 11 -131 23 -155
                        27 -23 4 -44 9 -46 13 -2 3 59 40 136 81 l139 75 -6 55 c-4 30 -8 56 -10 58
                        -2 2 -312 62 -325 62 -3 0 58 34 135 76 77 42 143 79 147 83 8 7 -11 121 -20
                        121 -4 0 -101 -53 -215 -117z"/>
                        <path d="M8766 3814 c-10 -26 -7 -104 5 -126 10 -18 9 -19 -18 -14 -28 7 -30
                        5 -47 -50 -10 -30 -15 -58 -12 -61 10 -11 420 -153 425 -147 8 7 41 97 41 110
                        0 6 -54 31 -120 54 -144 51 -175 78 -167 145 3 22 8 47 11 55 5 12 -5 20 -41
                        33 -59 21 -69 21 -77 1z"/>
                        <path d="M8642 3384 c-76 -39 -139 -151 -149 -266 l-6 -58 57 0 56 0 0 47 c0
                        64 34 131 75 149 26 11 75 10 75 -1 0 -2 -16 -34 -35 -72 -60 -119 -63 -193
                        -12 -241 58 -55 142 -47 200 17 42 46 60 97 55 156 -3 39 -1 42 15 34 9 -6 21
                        -8 25 -5 11 6 56 105 51 110 -2 2 -64 34 -138 71 -151 75 -211 88 -269 59z
                        m220 -192 c26 -22 32 -66 12 -107 -21 -45 -48 -61 -79 -47 -38 18 -40 46 -6
                        118 31 67 35 69 73 36z"/>
                        <path d="M8626 2799 c-14 -17 -26 -41 -26 -54 0 -33 39 -74 77 -81 27 -5 37
                        -1 63 24 38 39 40 79 4 116 -38 37 -84 36 -118 -5z"/>
                        <path d="M8285 2745 c-5 -2 -22 -6 -37 -9 -66 -15 -138 -112 -141 -191 -2 -42
                        -3 -43 -40 -48 -74 -10 -151 -89 -163 -169 -6 -33 -8 -35 -25 -25 -16 10 -24
                        5 -56 -33 -21 -24 -38 -47 -38 -50 0 -4 68 -64 150 -135 83 -70 160 -137 172
                        -148 l23 -20 39 44 c22 24 40 49 41 55 0 6 -36 41 -79 78 -140 118 -160 151
                        -126 215 8 16 28 34 45 41 42 18 70 3 188 -99 52 -45 97 -81 102 -81 4 0 26
                        22 49 48 l40 48 -100 85 c-136 113 -156 156 -103 218 20 25 34 31 63 31 33 0
                        51 -11 135 -82 54 -46 105 -88 114 -95 15 -10 23 -4 59 38 l43 51 -118 100
                        c-64 55 -128 106 -142 113 -27 13 -79 24 -95 20z"/>
                        <path d="M1754 2100 c-55 -22 -70 -95 -29 -135 36 -37 86 -34 119 6 14 17 26
                        37 26 44 0 31 -21 65 -49 80 -34 17 -37 17 -67 5z"/>
                        <path d="M2090 2084 c-44 -19 -97 -69 -120 -114 -47 -93 -30 -185 50 -274 59
                        -63 119 -96 178 -96 l42 0 0 49 c0 47 -1 49 -32 55 -47 9 -95 41 -118 78 -20
                        32 -27 102 -12 111 4 3 65 -45 136 -106 145 -125 143 -124 189 -37 66 126 11
                        268 -127 331 -50 23 -138 24 -186 3z m191 -133 c30 -30 39 -46 39 -72 0 -69
                        -12 -68 -105 11 -86 72 -87 73 -64 86 46 26 88 17 130 -25z"/>
                        <path d="M7633 2070 c-17 -4 -52 -19 -76 -33 -171 -100 -183 -323 -22 -422 42
                        -26 58 -30 119 -30 82 1 128 21 190 82 52 51 76 105 76 173 0 72 -26 126 -84
                        177 -62 54 -127 72 -203 53z m117 -159 c42 -44 52 -78 39 -127 -18 -64 -99
                        -100 -157 -70 -52 27 -82 72 -82 123 0 38 5 50 34 79 29 29 41 34 82 34 42 0
                        51 -4 84 -39z"/>
                        <path d="M2543 1754 c-26 -9 -60 -35 -86 -64 -71 -79 -86 -168 -41 -258 50
                        -100 144 -157 250 -150 85 5 92 14 60 76 -25 50 -26 51 -58 41 -94 -27 -180
                        80 -135 167 57 109 188 108 226 -3 15 -43 34 -53 102 -53 33 0 37 17 17 81
                        -36 123 -213 208 -335 163z"/>
                        <path d="M7165 1747 c-101 -49 -159 -133 -159 -232 0 -128 105 -235 230 -235
                        126 0 263 118 264 229 0 30 -2 33 -22 27 -13 -3 -40 -6 -60 -6 -32 0 -38 -4
                        -38 -20 0 -63 -71 -117 -139 -106 -45 7 -97 61 -106 109 -9 46 18 103 58 124
                        20 10 46 14 77 11 l46 -5 27 48 c23 42 24 49 10 60 -8 7 -43 15 -77 17 -49 2
                        -71 -2 -111 -21z"/>
                        <path d="M3579 1526 c-34 -16 -52 -58 -40 -90 11 -27 57 -56 91 -56 28 0 70
                        44 70 73 0 54 -73 97 -121 73z"/>
                        <path d="M3040 1510 c-134 -25 -217 -166 -179 -304 16 -57 101 -138 168 -161
                        76 -25 156 -17 217 21 98 61 139 201 87 300 -53 101 -182 164 -293 144z m115
                        -124 c43 -18 66 -54 67 -103 1 -78 -52 -138 -122 -138 -105 0 -154 121 -83
                        206 42 49 80 59 138 35z"/>
                        <path d="M5975 1435 c-71 -71 29 -167 109 -104 35 27 37 90 4 113 -34 24 -85
                        20 -113 -9z"/>
                        <path d="M6451 1381 c-129 -52 -193 -171 -157 -292 44 -153 202 -214 355 -138
                        64 32 100 69 126 132 46 110 -17 255 -132 304 -45 18 -139 15 -192 -6z m165
                        -134 c38 -41 52 -103 32 -144 -16 -34 -73 -73 -105 -73 -67 0 -123 64 -123
                        140 1 109 123 157 196 77z"/>
                        <path d="M3505 1337 c-85 -239 -144 -422 -138 -428 11 -9 113 -42 118 -37 6 6
                        145 412 145 425 0 17 -120 55 -125 40z"/>
                        <path d="M3721 1178 c-12 -51 -34 -151 -50 -223 -16 -71 -28 -132 -26 -136 7
                        -10 114 -31 125 -24 5 3 10 12 10 18 0 7 12 64 26 127 32 138 56 170 124 170
                        33 0 48 -6 71 -29 36 -37 36 -51 -1 -211 -15 -69 -28 -126 -27 -127 1 -1 31
                        -8 65 -16 46 -11 65 -12 67 -3 14 44 65 295 65 319 0 52 -37 115 -85 143 -57
                        33 -137 42 -189 20 l-38 -16 4 25 c4 21 1 26 -21 31 -33 7 -61 14 -83 20 -13
                        4 -20 -12 -37 -88z"/>
                        <path d="M6068 1252 c-32 -9 -58 -22 -58 -29 0 -19 112 -417 120 -426 4 -5 35
                        -1 69 9 48 13 60 20 56 33 -2 9 -30 106 -61 216 -31 110 -59 203 -62 206 -4 3
                        -33 -1 -64 -9z"/>
                        <path d="M6913 1244 c-50 -50 -10 -134 64 -134 44 0 83 37 83 80 0 72 -94 107
                        -147 54z"/>
                        <path d="M5655 1156 c-16 -8 -42 -25 -57 -39 l-28 -26 -6 25 c-4 17 -12 23
                        -23 20 -9 -2 -35 -8 -58 -11 -35 -6 -43 -11 -43 -28 0 -27 68 -428 73 -433 9
                        -9 127 19 127 31 0 7 -9 66 -20 132 -12 65 -18 129 -15 143 20 82 144 110 180
                        41 8 -16 25 -88 37 -160 25 -146 19 -139 107 -120 45 9 50 13 46 32 -3 12 -14
                        78 -25 147 -34 206 -70 253 -195 257 -43 2 -82 -3 -100 -11z"/>
                        <path d="M4400 1119 c-113 -45 -169 -183 -120 -297 37 -87 110 -132 211 -134
                        34 0 70 6 89 16 18 9 35 15 37 13 11 -12 -14 -71 -39 -92 -49 -41 -159 -32
                        -232 18 l-29 21 -24 -30 c-48 -58 -47 -61 3 -90 62 -36 133 -54 215 -54 113 0
                        174 32 214 115 21 42 28 85 46 268 12 119 20 219 18 221 -2 2 -30 6 -61 10
                        -56 6 -58 5 -64 -20 -6 -25 -7 -25 -28 -6 -40 37 -83 52 -148 51 -35 0 -74 -5
                        -88 -10z m175 -113 c86 -36 85 -166 -2 -202 -82 -35 -173 19 -173 100 0 92 83
                        140 175 102z"/>
                        <path d="M5060 1101 c-48 -15 -87 -40 -123 -80 -114 -126 -50 -327 119 -377
                        95 -27 199 -8 262 49 l22 21 -36 37 -37 38 -27 -21 c-35 -26 -110 -35 -150
                        -18 -30 12 -70 54 -70 71 0 5 38 9 83 9 46 0 125 3 175 6 91 7 92 7 92 34 0
                        56 -31 131 -70 170 -57 57 -163 84 -240 61z m115 -105 c28 -12 65 -58 65 -81
                        0 -3 -52 -5 -115 -5 -105 0 -114 1 -108 18 10 28 36 54 68 68 39 17 48 17 90
                        0z"/>
                        </g>
                        </svg>
                    </div>
                    <!--------------------------- Elemento Canva --------------------------->
                    <div id="canvas-container" style="position: relative;">
                        <div class="container" style="max-width: 1000px">
                            <div class="row">
                                <div class="col-12 text-center">
                                    <p class="signal-red">Aviso: los elementos que sobrepasen los bordes del lienzo, no serán visibles en su diseño final.</p>
                                </div>
                            </div>
                            <div class="row text-center mb-1">
                                <div class="col-3 lado-1">Lateral Izquierdo</div>
                                <div class="col-3 lado-2">Frente</div>
                                <div class="col-3 lado-3">Lateral Derecho</div>
                                <div class="col-3 lado-4">Contrafrente</div>
                            </div>
                            <div class="row">
                                <div class="col-8 pl-0">
                                    <canvas id="canvas" width="1000" height="400"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="myModal" class="modal">
                    <div class="d-flex justify-content-center">
                        <button id="vasoBtn" class="option-btn active" onclick="selectOption(this)">Vaso</button>
                        <button id="copaBtn" class="option-btn" onclick="selectOption(this)">Copa</button>
                    </div>
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>
    <script src="{{asset('frontend/js/personalizar_vasos/n7scripts.js')}}"></script>
    <script type="module" src="{{asset('js/main3d.js')}}"></script>
    <script src="{{asset('js/scope/runtime-main.11747796.js')}}"></script>
    <script src="{{asset('js/scope/2.3a3362a2.chunk.js')}}"></script>
    <script src="{{asset('js/scope/main.f169c95d.chunk.js')}}"></script>
</body>
</html>
</div>
@endsection