<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personalizacion de Vasos - EcoIngenio</title>
    <!-- Para usar la biblioteca fabricjs -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.3.1/fabric.min.js"></script>
    <!-- Para descargar como pdf, **no funciona** -->
    <script src="https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js"></script>
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

        <!-- Estilos propios -->
    <link rel="stylesheet" href="{{asset('frontend/css/n7styles.css')}}">

</head>

<body>
    <section>
    <div class="container border">
        <!-- Contenido de las opciones -->
        <div class="row">
            <div class="col-4 border">
                <!--------------------------- Para cambiar el color del fondo --------------------------->
                <h4>Color del Vaso</h4>
                <div class="mb-3">
                    
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <div class="acordion-btnTranslucido">
                                    <h6>Translúcido</h6>
                                    <span>Transparente</span>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                        <div class="option-color">
                                            <div class="options-container">
                                                <div class="color-cube" 
                                                style="background:rgba(219, 219, 219, 0.7)"></div>
                                                <p class="color-title">Transparente</p>
                                            </div>
                                        </div>
                                        <div class="option-color">
                                            <div class="options-container">
                                                <div class="color-cube"
                                                style="background:rgba(0, 228, 240, 0.7)"></div>
                                                <p class="color-title">Turquesa</p>
                                            </div>
                                        </div>
                                        <div class="option-color">
                                            <div class="options-container">
                                                <div class="color-cube"
                                                style="background:rgba(0, 241, 115, 0.7)"></div>
                                                <p class="color-title">Verde</p>
                                            </div>
                                        </div>
                                        <div class="option-color">
                                            <div class="options-container">
                                                <div class="color-cube"
                                                style="background: rgba(234, 216, 70, 0.7)"></div>
                                                <p class="color-title">Amarillo</p>
                                            </div>
                                        </div>
                                        <div class="option-color">
                                            <div class="options-container">
                                                <div class="color-cube"
                                                style="background: rgba(242, 54, 38, 0.7)"></div>
                                                <p class="color-title">Rojo</p>
                                            </div>    
                                        </div>
                                        <div class="option-color">
                                            <div class="options-container">
                                                <div class="color-cube"
                                                style="background: rgba(65, 134, 172, 0.7)"></div>
                                                <p class="color-title">Azul</p>
                                            </div>
                                        </div>
                                        <div class="option-color">
                                            <div class="options-container">
                                                <div class="color-cube"
                                                style="background: rgba(255, 77, 183, 0.7)"></div>
                                                <p class="color-title">Fucsia</p>
                                            </div>
                                        </div>
                                        <div class="option-color">
                                            <div class="options-container">
                                                <div class="color-cube"
                                                style="background: rgba(255, 140, 47, 0.7)"></div>
                                                <p class="color-title">Naranja</p>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <strong>Opaco</strong>
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <div class="option-color">
                                        <div class="options-container">
                                            <div class="color-cube" 
                                            style="background:#fff;"></div>
                                            <p class="color-title">Blanco</p>
                                        </div>
                                    </div>
                                    <div class="option-color">
                                        <div class="options-container">
                                            <div class="color-cube"
                                            style="background:#212121;"></div>
                                            <p class="color-title">Negro</p>
                                    </div>
                                </div>    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                </div>
            <div class="col-4 border">
                <!--------------------------- Para seleccionar figura --------------------------->
                <h4>Seleccionar Figura:</h4>
                <select id="shape-selector">
                    <option value="square">Cuadrado</option>
                    <option value="triangle">Triángulo</option>
                    <option value="circle">Círculo</option>
                    <option value="star">Estrella</option>
                </select>
            </div>
            <div class="col-4 border">
                <!--------------------------- Para subir foto --------------------------->

                <h4>Subir Imagen</h4>
                 <!-- <label for="image-upload" id="file-label">Seleccionar archivo: -->
                    <input type="file" id="image-upload" accept="image/png, image/jpeg"S>
                <!-- </label> -->
            </div>
                <!--------------------------- Para descargar como pdf --------------------------->
            <div class="col-4 border" style="height:60px;">
                <h4>Descargar como PDF</h4>
                <!-- <button id="download-pdf">Descargar PDF</button> -->
                <button class="button" type="button" id="download-pdf" >
                <span class="button__text">Descargar PDF</span>
                <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="bdd05811-e15d-428c-bb53-8661459f9307" data-name="Layer 2" class="svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
                </button>
            </div>
            <div class="col-4 border ">

                <!---------- color del elemento figura. Solo aparece cuando se hace clic en el elemento ------->

                <div>
                
                <div class="mb-3">
                    <h4 class="text-center">Colores del diseño</h4>
                    <div class="">
                        <h6>Colores Actuales</h6>
                        <table style="width:20px;">
                            <td id="color-actual" style="background-color: blue;"></td>
                        </table>
                    </div>
                    <div class="mb-3" id="color-table-globales">
                        
                        <div class="container-paleta-color">
                            <div class="colores-clasicos">
                                <h6>Clásicas</h6>
                            </div>
                            <div class="colores-deModa">
                                <h6>De Moda</h6>
                            </div>
                            <div class="colores-metalicos">
                                <h6>Metálicas</h6>
                            </div>
                        
                        </div>
                    </div>
                </div>

                Color del elemento
                
                <div id="color-table" class="color-table">
                    <table>
                        <tr>
                            <td style="background-color: red;"></td>
                            <td style="background-color: blue;"></td>
                            <td style="background-color: green;"></td>
                            <td style="background-color: yellow;"></td>
                        </tr>
                        <tr>
                            <td style="background-color: orange;"></td>
                            <td style="background-color: pink;"></td>
                            <td style="background-color: purple;"></td>
                            <td style="background-color: brown;"></td>
                        </tr>
                    </table>
                
                </div>

            </div>
        </div>
        <div class="col-4 border col-texts">
            <h4>Agregar Texto</h4>
                <button id="nuevo-texto">Agregar Nuevo Texto</button>
                <textarea id="text-editor" placeholder="Texto"></textarea>
                <div class="bm-3 btns-fontStyle">
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
                    </select>
                    <select id="fontSizeSelect">
                        <!-- El codigo se genera dinamicamente por js -->
                    </select>
                </div>
                <div class="container-btns">
                    <button id="cursivaBtn" class="fontStyleBtn" title="Cursiva">I</button>
                    <button id="negritaBtn" class="fontStyleBtn" title="Negrita">B</button>
                </div>

                </div>
                <div>
                
                </div>
                
        </div>
        
        <!--------------------------- Elemento Canva --------------------------->
        <!-- -->
        <canvas id="canvas" width="1000" height="400"></canvas>

        
        
    </div>
    </section>
    <section class="border">
        <div class="container-fluid container-main border border-danger ">
            <div class="row">
                <div class="col-3 border bg-white">
                    <div class="row">
                        <div class="col-3 sideLeft border border-primary">
                            <!-- <div class=" border border-success"> -->
                                <div class="bloq-side">
                                    <div class="img-bloq-side">
                                        <img src="{{asset('frontend/img/personalizacion_vasos/layout.svg')}}" alt="" srcset="">
                                    </div>
                                    <h6>Temas</h6>
                                </div>
                                <div class="bloq-side">
                                    <div class="img-bloq-side">
                                        <img src="{{asset('frontend/img/personalizacion_vasos/vaso.svg')}}" alt="" srcset="">
                                    </div>
                                    <h6>Color del Vaso</h6>
                                </div>
                                <div class="bloq-side">
                                    <div class="img-bloq-side">
                                        <img src="{{asset('frontend/img/personalizacion_vasos/colors.svg')}}" alt="" srcset="">
                                    </div>
                                    <h6>Color del Diseño</h6>
                                </div>
                                <div class="bloq-side">
                                <div class="img-bloq-side">
                                        <img src="{{asset('frontend/img/personalizacion_vasos/upload.svg')}}" alt="" srcset="">
                                    </div>
                                    <h6>Subir Archivo</h6>
                                </div>
                                <div class="bloq-side">
                                <div class="img-bloq-side">
                                        <img src="{{asset('frontend/img/personalizacion_vasos/elements.svg')}}" alt="" srcset="">
                                    </div>
                                    <h6>Elementos</h6>
                                </div>
                                <div class="bloq-side">
                                    <div class="img-bloq-side">
                                        <img src="{{asset('frontend/img/personalizacion_vasos/texts.svg')}}" alt="" srcset="">
                                    </div>
                                    <h6>Textos</h6>
                                </div>
                                <div class="bloq-side">
                                <div class="img-bloq-side">
                                        <img src="{{asset('frontend/img/personalizacion_vasos/medidas.svg')}}" alt="" srcset="">
                                    </div>
                                    <h6>Medidor</h6>
                                </div>
                            <!-- </div> -->
                        </div>
                        <div class="col-9"></div>
                    </div>
                    
                </div>
                <div class="col-7 border">x</div>
                <div class="col-2 bg-white border">x</div>
            </div>
        </div>
    </section>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>
    <!-- jspdf cdn -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.js" integrity="sha512-sk0cNQsixYVuaLJRG0a/KRJo9KBkwTDqr+/V94YrifZ6qi8+OO3iJEoHi0LvcTVv1HaBbbIvpx+MCjOuLVnwKg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="{{asset('frontend/js/personalizar_vasos/n7scripts.js')}}"></script>

</body>

</html>
