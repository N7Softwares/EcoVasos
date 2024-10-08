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
    <!-- Tipografias importadas -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    @foreach($tipografias as $tipografia)
        <style>
            @font-face {
                font-family: '{{ $tipografia->name }}';
                src: url('{{ asset($tipografia->file_path) }}');
            }
        </style>
    @endforeach

</head>

<body>
    <!-- Contenedor Modelo 3D -->
    <section class="compartido3d">
        <h1 class="text-center y-margin">Modelo 3D</h1>
        <div class="logo-ecoingenio3d">
            <img src="{{asset('images/ecoingenio-logo2.svg')}}"  alt="">
        </div>
        <div class="subtitulo3d">
            <p>Previsualización 3D powered by Ecoingenio.<br> Este montaje 3D se utiliza únicamente con fines ilustrativos.</p>
        </div>
        <div class="d-flex justify-content-center gap-4 y-margin">
            <button id="vasoBtn" class="option-btn active">Vaso</button>
            <button id="copaBtn" class="option-btn">Copa</button>
        </div>

        <div class="container-fluid d-flex justify-content-center">  
            <div class="row" style="position: relative;">
                <div class="col-1" style="position: absolute; background: #fafafa; top: 0; left: 0; z-index: 9; padding: 300px 20px;">
                </div>
                <div class="col-12">
                    <div id="container3D" class="container3dClass"></div>   
                </div> 
                <div class="col-1" style="position: absolute; background: #fafafa; top: 0; right: 0; z-index: 9; padding: 300px 20px;">
                </div>
            </div>
        </div>
        
    </section>
    
    <!-- Imprime el JSON en un input oculto -->
    <input type="hidden" id="jsonInput" value="{{ $jsonContent }}">
    <section>
        <h2 class="text-center y-margin">Diseño en el Lienzo</h2>
        <div class="container-fluid d-flex flex-column align-items-center">
            <h4 class="text-center text-success mensaje-scroll">Deslizar Hacia los Lados para Ver el Diseño Completo</h4>
            <div class=" container-indicador-canva canva-modelo3d">
                
                <div class="row">
                    <div class="col-8 pl-0 ">
                        <canvas id="canvas" width="900" height="400"></canvas>
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