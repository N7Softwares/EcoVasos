<!DOCTYPE html>
<html lang="es">
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
    <section>
        <h1 class="text-center">Modelo 3d</h1>
        <div class="d-flex justify-content-center gap-4">
            <button id="vasoBtn" class="option-btn active">Vaso</button>
            <button id="copaBtn" class="option-btn">Copa</button>
        </div>
        <div id="container3D" class="container3dClass"></div>    
    </section>
    
    <!-- Imprime el JSON en un input oculto -->
    <input type="hidden" id="jsonInput" value="{{ $jsonContent }}">
    <section>
        <h2 class="text-center">Diseño en el Lienzo</h2>
        <div class="container-fluid d-flex justify-content-center">
            <div class="container-indicador-canva canva-modelo3d">
                
                <div class="row">
                    <div class="col-8 pl-0 ">
                        <canvas id="canvas" width="1000" height="400"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </section>
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