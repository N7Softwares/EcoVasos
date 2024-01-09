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
    <!-- Estilos propios -->
    <link rel="stylesheet" href="{{asset('frontend/css/n7styles.css')}}">

</head>

<body>
    <div class="container border">
        <!-- Contenido de las opciones -->
        <div class="row">
            <div class="col-4 border">
                <!--------------------------- Para cambiar el color del fondo --------------------------->
                <label for="background-color">Color del Vaso:</label>
                <select id="background-color">
                    <option value="white">Blanco</option>
                    <option value="#00e4f0">Turquesa</option>
                    <option value="#00f173">Verde</option>
                    <option value="#ead846">Amarillo</option>
                    <option value="#f23626">Rojo</option>
                    <option value="#4186ac">Azul</option>
                    <option value="#ff4db7">Fucsia</option>
                    <option value="#ff8c2f">Naranja</option>
                    <option value="rgba(0, 0, 0, 0)">Transparente</option>
                </select>
            </div>
            <div class="col-4 border">
                <!--------------------------- Para seleccionar figura --------------------------->
                <label for="shape-selector">Seleccionar Figura:</label>
                <select id="shape-selector">
                    <option value="square">Cuadrado</option>
                    <option value="triangle">Triángulo</option>
                    <option value="circle">Círculo</option>
                    <option value="star">Estrella</option>
                </select>
            </div>
            <div class="col-4 border">
                <!--------------------------- Para subir figura --------------------------->

                <label for="image-upload">Subir Imagen:</label>
                <input type="file" id="image-upload" accept="image/png, image/jpeg">
            </div>
            <div class="col-6 border" style="height:60px;">
                <button id="download-pdf">Descargar PDF</button>
            </div>
            <div class="col-6 border d-flex ">
                <!---------- color del elemento figura. Solo aparece cuando se hace clic en el elemento ------->

                <div>
                Color del elemento
                </div>
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
        
        <!--------------------------- Elemento Canva --------------------------->

        <canvas id="canvas" width="1000" height="400"></canvas>

        
        
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>
    <script src="{{asset('frontend/js/personalizar_vasos/n7scripts.js')}}"></script>

</body>

</html>
