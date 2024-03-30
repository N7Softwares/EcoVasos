<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modelo 3D</title>
    <!-- FabricJS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.3.1/fabric.min.js"></script>
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="{{asset('frontend/css/n7styles.css')}}">
    
</head>
<body>
    <!-- Contenedor Modelo 3D -->
    <button id="vasoBtn" class="option-btn active" onclick="selectOption(this)">Vaso</button>
    <button id="copaBtn" class="option-btn" onclick="selectOption(this)">Copa</button>
    <div id="container3D" class="container3dClass"></div>
    <h1>Modelo 3d</h1>
    <!-- Imprime el JSON en un input oculto -->
    <input type="hidden" id="jsonInput" value="{{ $jsonContent }}">

    <canvas id="canvas" width="1000" height="400"></canvas>
    <!-- Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
        integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
    </script>
    <!-- Js para crear el modelo 3D -->
    <script type="module" src="{{asset('js/foraign3d.js')}}"></script>

</body>

</html>