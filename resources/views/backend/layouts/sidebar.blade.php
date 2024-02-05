<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="{{route('admin')}}">
      
      {{-- <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">EcoIngenio</div> --}}

      <img src="{{asset('backend/img/LogoEco.png')}}" style="max-width:75%" alt="LogoEco.png">
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <a class="nav-link" href="{{route('admin')}}">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
        Banner
    </div>

    <!-- Nav Item - Pages Collapse Menu -->
    <!-- Nav Item - Charts -->
    <li class="nav-item">
        <a class="nav-link" href="{{route('file-manager')}}">
            <i class="fas fa-fw fa-chart-area"></i>
            <span>Media Manager</span></a>
    </li>

    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
        <i class="fas fa-image"></i>
        <span>Banners</span>
      </a>
      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Opciones de Banner:</h6>
          <a class="collapse-item" href="{{route('banner.index')}}">Banners</a>
          <a class="collapse-item" href="{{route('banner.create')}}">Agregar Banners</a>
        </div>
      </div>
    </li>
    <!-- Divider -->
    <hr class="sidebar-divider">
        <!-- Heading -->
        <div class="sidebar-heading">
            Comercio
        </div>

    <!-- Categories -->
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#categoryCollapse" aria-expanded="true" aria-controls="categoryCollapse">
          <i class="fas fa-sitemap"></i>
          <span>Categoria</span>
        </a>
        <div id="categoryCollapse" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Opciones de Categoria:</h6>
            <a class="collapse-item" href="{{route('category.index')}}">Categoria</a>
            <a class="collapse-item" href="{{route('category.create')}}">Agregar Categoria</a>
          </div>
        </div>
    </li>
    {{-- Products --}}
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#productCollapse" aria-expanded="true" aria-controls="productCollapse">
          <i class="fas fa-cubes"></i>
          <span>Productos</span>
        </a>
        <div id="productCollapse" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Opciones de Productos:</h6>
            <a class="collapse-item" href="{{route('product.index')}}">Productos</a>
            <a class="collapse-item" href="{{route('product.create')}}">Agregar Productos</a>
          </div>
        </div>
    </li>

    {{-- Brands --}}
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#brandCollapse" aria-expanded="true" aria-controls="brandCollapse">
          <i class="fas fa-table"></i>
          <span>Marcas</span>
        </a>
        <div id="brandCollapse" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Opciones de Marcas :</h6>
            <a class="collapse-item" href="{{route('brand.index')}}">Marcas</a>
            <a class="collapse-item" href="{{route('brand.create')}}">Agregar Marcas</a>
          </div>
        </div>
    </li>

    {{-- Shipping --}}
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#shippingCollapse" aria-expanded="true" aria-controls="shippingCollapse">
          <i class="fas fa-truck"></i>
          <span>Envío</span>
        </a>
        <div id="shippingCollapse" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Opciones de Envío:</h6>
            <a class="collapse-item" href="{{route('shipping.index')}}">Envío</a>
            <a class="collapse-item" href="{{route('shipping.create')}}">Añadir Envío</a>
          </div>
        </div>
    </li>

    <!--Pedidos -->
    <li class="nav-item">
        <a class="nav-link" href="{{route('order.index')}}">
            <i class="fas fa-hammer fa-chart-area"></i>
            <span>Pedidos</span>
        </a>
    </li>

    <!-- Reseñas -->
    <li class="nav-item">
        <a class="nav-link" href="{{route('review.index')}}">
            <i class="fas fa-comments"></i>
            <span>Reseñas</span></a>
    </li>
    

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
      Publicaciones
    </div>

    <!-- Publicaciones -->
    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#postCollapse" aria-expanded="true" aria-controls="postCollapse">
        <i class="fas fa-fw fa-folder"></i>
        <span>Publicaciones</span>
      </a>
      <div id="postCollapse" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Opciones de Publicación:</h6>
          <a class="collapse-item" href="{{route('post.index')}}">Publicaciones</a>
          <a class="collapse-item" href="{{route('post.create')}}">Agregar Publicación</a>
        </div>
      </div>
    </li>

     <!-- Categoría -->
     <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#postCategoryCollapse" aria-expanded="true" aria-controls="postCategoryCollapse">
          <i class="fas fa-sitemap fa-folder"></i>
          <span>Categoría</span>
        </a>
        <div id="postCategoryCollapse" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Opciones de Categoría:</h6>
            <a class="collapse-item" href="{{route('post-category.index')}}">Categoría</a>
            <a class="collapse-item" href="{{route('post-category.create')}}">Agregar Categoría</a>
          </div>
        </div>
      </li>

      <!-- Etiquetas -->
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#tagCollapse" aria-expanded="true" aria-controls="tagCollapse">
            <i class="fas fa-tags fa-folder"></i>
            <span>Etiquetas</span>
        </a>
        <div id="tagCollapse" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Opciones de Etiquetas:</h6>
            <a class="collapse-item" href="{{route('post-tag.index')}}">Etiquetas</a>
            <a class="collapse-item" href="{{route('post-tag.create')}}">Agregar Etiquetas</a>
            </div>
        </div>
    </li>

      <!-- Comentarios -->
      <li class="nav-item">
        <a class="nav-link" href="{{route('comment.index')}}">
            <i class="fas fa-comments fa-chart-area"></i>
            <span>Comentarios</span>
        </a>
      </li>

 <!-- Divider -->

    <hr class="sidebar-divider d-none d-md-block">
      <!-- Heading -->
    <div class="sidebar-heading">
        Herramienta de vasos
    </div>
    <li class="nav-item">
      <a class="nav-link" href="{{ route('images_categories.index') }}">
          <i class="fas fa-angle-double-up"></i>
          <span>Categorías de Imagenes</span></a>
    </li>
    {{-- <li class="nav-item">
      <a class="nav-link" href="{{route('inspirate.index')}}">
          <i class="fas fa-paint-roller"></i>
          <span>Temas</span></a>
    </li> --}}
 
      <li class="nav-item">
        <a class="nav-link" href="{{route('elements.index')}}">
            <i class="fas fa-list-ul"></i>
            <span>Elementos</span></a>
    </li>

      <li class="nav-item">
        <a class="nav-link" href="{{route('colors.index')}}">
            <i class="fas fa-palette"></i>
            <span>Colores</span></a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="{{route('tipografias.index')}}">
            <i class="fas fa-signature"></i>
            <span>Tipografías</span></a>
    </li>



    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block">
     <!-- Heading -->
    <div class="sidebar-heading">
        Configuración General
    </div>
    <li class="nav-item">
      <a class="nav-link" href="{{route('coupon.index')}}">
          <i class="fas fa-table"></i>
          <span>Cupón</span></a>
    </li>
     <!-- Usuarios -->
     <li class="nav-item">
        <a class="nav-link" href="{{route('users.index')}}">
            <i class="fas fa-users"></i>
            <span>Usuarios</span></a>
    </li>
     <!-- Configuración General -->
     <li class="nav-item">
        <a class="nav-link" href="{{route('settings')}}">
            <i class="fas fa-cog"></i>
            <span>Ajustes</span></a>
    </li>
    

   
    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

</ul>