<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Establecer la longitud predeterminada de la cadena para la compatibilidad con versiones anteriores de MySQL
        Schema::defaultStringLength(191);

        // Compartir el token CSRF con todas las vistas
        View::share('csrfToken', csrf_token());
    }
}
