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
                <input type="file" id="image-upload" accept="image/png, image/jpeg">
            </div>
            <div class="col-4 border" style="height:60px;">
            <h4>Descargar como PDF</h4>
                <button id="download-pdf">Descargar PDF</button>
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
        <div class="col-4 border ">
            <h4>Agregar Texto</h4>
                <textarea id="text-editor" placeholder="Escribe aquí..."></textarea>
                <button id="nuevo-texto">Nuevo Texto</button>
                <!-- Para cambiar el font-family -->
                <label for="font-selector">Seleccione una fuente:</label>
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
                <div class="bm-3">
                    <button id="cursivaBtn" class="fontStyleBtn" title="Cursiva">I</button>
                    <button id="negritaBtn" class="fontStyleBtn" title="Negrita">B</button>

                </div>
        </div>
        
        <!--------------------------- Elemento Canva --------------------------->

        <canvas id="canvas" width="1000" height="400"></canvas>

        
        
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>
    <script src="{{asset('frontend/js/personalizar_vasos/n7scripts.js')}}"></script>

</body>

</html>
