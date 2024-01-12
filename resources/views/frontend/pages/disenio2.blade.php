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
                    <label for="background-color">Translucido:</label>
                    <select id="background-color" class="background-color">
                        
                        <option value="rgba(219, 219, 219, 0.7)">Transparente</option>
                        <option value="rgba(0, 228, 240, 0.7)">Turquesa</option>
                        <option value="rgba(0, 241, 115, 0.7)">Verde</option>
                        <option value="rgba(234, 216, 70, 0.7)">Amarillo</option>
                        <option value="rgba(242, 54, 38, 0.7)">Rojo</option>
                        <option value="rgba(65, 134, 172, 0.7)">Azul</option>
                        <option value="rgba(255, 77, 183, 0.7)">Fucsia</option>
                        <option value="rgba(255, 140, 47, 0.7)">Naranja</option>
                        <!-- <option value="rgba(0, 0, 0, 0)">Transparente</option> -->
                    </select>
                </div>
                <div class="mb-3">
                    <label for="background-color">Opaco:</label>
                    <select id="" class="background-color">
                        <option value="white">Blanco</option>
                        <option value="#212121">Negro</option>
                    </select>
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
                <!--------------------------- Para subir figura --------------------------->

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
                    <div class="mb-3">
                        Colores Actuales
                        <table style="width:30px;">
                            <td id="color-actual" style="background-color: blue; width:30px; height:30px; border:1px solid #ccc;"></td>
                        </table>
                    </div>
                    <div class="mb-3" id="color-table-globales">
                        <table class="" >
                            <tr>
                                <td style="background-color: red;"></td>
                                <td style="background-color: blue;"></td>
                                <td style="background-color: yellow;"></td>
                                <td style="background-color: white;"></td>
                                <td style="background-color: green; "></td>
                            </tr>
                        </table>
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
        <div class="col-4 border border-danger">
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
