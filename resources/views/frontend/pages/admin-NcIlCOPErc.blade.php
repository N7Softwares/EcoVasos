<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<div class="container text-center mt-5">
    <!-- CATEGORÍAS DE IMÁGENES -->
    <a href="{{ route('images_categories.index') }}" class="box d-block p-3 mb-4 shadow rounded bg-primary text-white text-decoration-none">
        CATEGORÍAS DE IMÁGENES
    </a>
    <!-- ELEMENTOS -->
    <a href="{{route('elements.index')}}" class="box d-block p-3 mb-4 shadow rounded bg-success text-white text-decoration-none">
        ELEMENTOS
    </a>
    <!-- COLORES -->
    <a href="{{ route('colors.index') }}" class="box d-block p-3 mb-4 shadow rounded bg-danger text-white text-decoration-none">
        COLORES
    </a>
    <!-- TIPOGRAFÍAS -->
    <a href="{{ route('tipografias.index') }}" class="box d-block p-3 mb-4 shadow rounded bg-warning text-dark text-decoration-none">
        TIPOGRAFÍAS
    </a>
</div>
