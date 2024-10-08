<?php

    use Illuminate\Support\Facades\Route;
    use Illuminate\Support\Facades\Artisan;
    use App\Http\Controllers\AdminController;
    use App\Http\Controllers\AdminWordpressRedirectController;
    use App\Http\Controllers\FrontendController;
    use App\Http\Controllers\Auth\LoginController;
    use App\Http\Controllers\MessageController;
    use App\Http\Controllers\CartController;
    use App\Http\Controllers\WishlistController;
    use App\Http\Controllers\OrderController;
    use App\Http\Controllers\ProductReviewController;
    use App\Http\Controllers\PostCommentController;
    use App\Http\Controllers\CouponController;
    use App\Http\Controllers\PayPalController;
    use App\Http\Controllers\NotificationController;
    use App\Http\Controllers\HomeController;
    use \UniSharp\LaravelFilemanager\Lfm;
    use App\Http\Controllers\ImagesCategoryController;
    use App\Http\Controllers\InspirateController;
    use App\Http\Controllers\ElementController;
    use App\Http\Controllers\DisenioController;
    use App\Http\Controllers\ColorController;
    use App\Http\Controllers\TipografiaController;
    use App\Http\Controllers\Modelo3DController;
    use App\Http\Controllers\PdfController;

    /*
    |--------------------------------------------------------------------------
    | Web Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register web routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | contains the "web" middleware group. Now create something great!
    |
    */

    // CACHE CLEAR ROUTE
    Route::get('cache-clear', function () {
        Artisan::call('optimize:clear');
        request()->session()->flash('success', 'Successfully cache cleared.');
        return redirect()->back();
    })->name('cache.clear');


    // STORAGE LINKED ROUTE
    Route::get('storage-link',[AdminController::class,'storageLink'])->name('storage.link');


    Auth::routes(['register' => false]);

    Route::get('user/login', [FrontendController::class, 'login'])->name('login.form');
    Route::post('user/login', [FrontendController::class, 'loginSubmit'])->name('login.submit');
    Route::get('user/logout', [FrontendController::class, 'logout'])->name('user.logout');

    Route::get('user/register', [FrontendController::class, 'register'])->name('register.form');
    Route::post('user/register', [FrontendController::class, 'registerSubmit'])->name('register.submit');
// Reset password
    Route::post('password-reset', [FrontendController::class, 'showResetForm'])->name('password.reset');
// Socialite
    Route::get('login/{provider}/', [LoginController::class, 'redirect'])->name('login.redirect');
    Route::get('login/{provider}/callback/', [LoginController::class, 'Callback'])->name('login.callback');

    Route::get('/', [FrontendController::class, 'home'])->name('home');

// Frontend Routes
    Route::get('/home', [FrontendController::class, 'index']);
    Route::get('/about-us', [FrontendController::class, 'aboutUs'])->name('about-us');
    // Route::get('/faq', [FrontendController::class, 'faq'])->name('faq');
    Route::get('/contact', [FrontendController::class, 'contact'])->name('contact');
    Route::post('/contact/message', [MessageController::class, 'store'])->name('contact.store');
    Route::get('product-detail/{slug}', [FrontendController::class, 'productDetail'])->name('product-detail');
    Route::post('/product/search', [FrontendController::class, 'productSearch'])->name('product.search');
    Route::get('/product-cat/{slug}', [FrontendController::class, 'productCat'])->name('product-cat');
    Route::get('/product-sub-cat/{slug}/{sub_slug}', [FrontendController::class, 'productSubCat'])->name('product-sub-cat');
    Route::get('/product-brand/{slug}', [FrontendController::class, 'productBrand'])->name('product-brand');
    // Modelo 3d
    Route::get('/modelo3d', [FrontendController::class, 'modelo3d'])->name('modelo3d');


// Cart section
    Route::get('/add-to-cart/{slug}', [CartController::class, 'addToCart'])->name('add-to-cart')->middleware('user');
    Route::post('/add-to-cart', [CartController::class, 'singleAddToCart'])->name('single-add-to-cart')->middleware('user');
    Route::get('cart-delete/{id}', [CartController::class, 'cartDelete'])->name('cart-delete');
    Route::post('cart-update', [CartController::class, 'cartUpdate'])->name('cart.update');

    Route::get('/cart', function () {
        return view('frontend.pages.cart');
    })->name('cart');
    Route::get('/checkout', [CartController::class, 'checkout'])->name('checkout')->middleware('user');
// Wishlist
    Route::get('/wishlist', function () {
        return view('frontend.pages.wishlist');
    })->name('wishlist');
    Route::get('/wishlist/{slug}', [WishlistController::class, 'wishlist'])->name('add-to-wishlist')->middleware('user');
    Route::get('wishlist-delete/{id}', [WishlistController::class, 'wishlistDelete'])->name('wishlist-delete');
    Route::post('cart/order', [OrderController::class, 'store'])->name('cart.order');
    Route::get('order/pdf/{id}', [OrderController::class, 'pdf'])->name('order.pdf');
    Route::get('/income', [OrderController::class, 'incomeChart'])->name('product.order.income');
// Route::get('/user/chart',[AdminController::class, 'userPieChart'])->name('user.piechart');
    Route::get('/product-grids', [FrontendController::class, 'productGrids'])->name('product-grids');
    Route::get('/product-lists', [FrontendController::class, 'productLists'])->name('product-lists');
    Route::match(['get', 'post'], '/filter', [FrontendController::class, 'productFilter'])->name('shop.filter');
// Order Track
    Route::get('/product/track', [OrderController::class, 'orderTrack'])->name('order.track');
    Route::post('product/track/order', [OrderController::class, 'productTrackOrder'])->name('product.track.order');
// Blog
    Route::get('/blog', [FrontendController::class, 'blog'])->name('blog');
    Route::get('/blog-detail/{slug}', [FrontendController::class, 'blogDetail'])->name('blog.detail');
    Route::get('/blog/search', [FrontendController::class, 'blogSearch'])->name('blog.search');
    Route::post('/blog/filter', [FrontendController::class, 'blogFilter'])->name('blog.filter');
    Route::get('blog-cat/{slug}', [FrontendController::class, 'blogByCategory'])->name('blog.category');
    Route::get('blog-tag/{slug}', [FrontendController::class, 'blogByTag'])->name('blog.tag');

// NewsLetter
    Route::post('/subscribe', [FrontendController::class, 'subscribe'])->name('subscribe');

// Product Review
    Route::resource('/review', 'ProductReviewController');
    Route::post('product/{slug}/review', [ProductReviewController::class, 'store'])->name('review.store');

// Post Comment
    Route::post('post/{slug}/comment', [PostCommentController::class, 'store'])->name('post-comment.store');
    Route::resource('/comment', 'PostCommentController');
// Coupon
    Route::post('/coupon-store', [CouponController::class, 'couponStore'])->name('coupon-store');
// Payment
    Route::get('payment', [PayPalController::class, 'payment'])->name('payment');
    Route::get('cancel', [PayPalController::class, 'cancel'])->name('payment.cancel');
    Route::get('payment/success', [PayPalController::class, 'success'])->name('payment.success');
// Diseño (N7 Team)
Route::get('/disenio', function () {
    return view('frontend.pages.disenio2');
})->name('disenio');
    //SVG SAVE
Route::post('/guardar-svg', [DisenioController::class, 'guardarSVG'])->name('svg_save');
Route::get('/disenio', [DisenioController::class, 'index'])->name('disenio');
// Backend section start

    Route::group(['prefix' => '/admin', 'middleware' => ['auth', 'admin']], function () {
        Route::get('/', [AdminController::class, 'index'])->name('admin');
        Route::get('/file-manager', function () {
            return view('backend.layouts.file-manager');
        })->name('file-manager');
        // user route
        Route::resource('users', 'UsersController');
        // Banner
        Route::resource('banner', 'BannerController');
        // Brand
        Route::resource('brand', 'BrandController');
        // Profile
        Route::get('/profile', [AdminController::class, 'profile'])->name('admin-profile');
        Route::post('/profile/{id}', [AdminController::class, 'profileUpdate'])->name('profile-update');
        // Category
        Route::resource('/category', 'CategoryController');
        // Product
        Route::resource('/product', 'ProductController');
        // Ajax for sub category
        Route::post('/category/{id}/child', 'CategoryController@getChildByParent');
        // POST category
        Route::resource('/post-category', 'PostCategoryController');
        // Post tag
        Route::resource('/post-tag', 'PostTagController');
        // Post
        Route::resource('/post', 'PostController');
        // Message
        Route::resource('/message', 'MessageController');
        Route::get('/message/five', [MessageController::class, 'messageFive'])->name('messages.five');

        // Order
        Route::resource('/order', 'OrderController');
        // Shipping
        Route::resource('/shipping', 'ShippingController');
        // Coupon
        Route::resource('/coupon', 'CouponController');
        // Settings
        Route::get('settings', [AdminController::class, 'settings'])->name('settings');
        Route::post('setting/update', [AdminController::class, 'settingsUpdate'])->name('settings.update');

        // Notification
        Route::get('/notification/{id}', [NotificationController::class, 'show'])->name('admin.notification');
        Route::get('/notifications', [NotificationController::class, 'index'])->name('all.notification');
        Route::delete('/notification/{id}', [NotificationController::class, 'delete'])->name('notification.delete');
        // Password Change
        Route::get('change-password', [AdminController::class, 'changePassword'])->name('change.password.form');
        Route::post('change-password', [AdminController::class, 'changPasswordStore'])->name('change.password');


        
        //--------------------IMAGES CATEGORIES-------------
        // Route::resource('images_categories', ImagesCategoryController::class);

        // Route::get('images_categories/create-custom', [ImagesCategoryController::class, 'create'])->name('images_categories.create-custom');
        
        // Route::post('images_categories/store', [ImagesCategoryController::class, 'store'])->name('images_categories.store');
        // Route::get('images_categories/{image_category}/edit-custom', [ImagesCategoryController::class, 'edit'])->name('images_categories.edit-custom');
        // Route::put('images_categories/{image_category}/update-custom', [ImagesCategoryController::class, 'update'])->name('images_categories.update-custom');

        //----------------------INSPIRATE-----------------------

        // Route::resource('inspirate', InspirateController::class);

        // Route::get('inspirate/create-custom', [InspirateController::class, 'create'])->name('inspirate.create-custom');
        // Route::get('inspirate/{id}/edit', [InspirateController::class, 'edit'])->name('inspirate.edit');
        // Route::put('inspirate/{id}', [InspirateController::class, 'update'])->name('inspirate.update');
        // Route::delete('inspirate/{id}', [InspirateController::class, 'destroy'])->name('inspirate.destroy');

        // //----------------------ELEMENTS-----------------------

        // Route::resource('elements', ElementController::class);

        // Route::get('elements/create-custom', [ElementController::class, 'create'])->name('elements.create-custom');
        // Route::get('elements/{id}/edit', [ElementController::class, 'edit'])->name('elements.edit');
        // Route::put('elements/{id}', [ElementController::class, 'update'])->name('elements.update');
        // Route::delete('elements/{id}', [ElementController::class, 'destroy'])->name('elements.destroy');

        // //----------------------COLORS-VASO-DESIGN-----------------------
        // Route::resource('colors', ColorController::class);
        
        // Route::get('colors/create-custom', [ColorController::class, 'create'])->name('colors.create-custom');
        // Route::get('colors/{id}/edit', [ColorController::class, 'edit'])->name('colors.edit');
        // Route::put('colors/{id}', [ColorController::class, 'update'])->name('colors.update');
        // Route::delete('colors/{id}', [ColorController::class, 'destroy'])->name('colors.destroy');
        
        // //----------------------TIPOGRAFIAS-----------------------
        // Route::resource('tipografias', TipografiaController::class);

        // // Rutas adicionales
        // Route::get('tipografias/create-custom', [TipografiaController::class, 'create'])->name('tipografias.create-custom');
        // Route::get('tipografias/{id}/edit', [TipografiaController::class, 'edit'])->name('tipografias.edit');
        // Route::put('tipografias/{id}', [TipografiaController::class, 'update'])->name('tipografias.update');
        // Route::delete('tipografias/{id}', [TipografiaController::class, 'destroy'])->name('tipografias.destroy');       
    });


// User section start
    Route::group(['prefix' => '/user', 'middleware' => ['user']], function () {
        Route::get('/', [HomeController::class, 'index'])->name('user');
        // Profile
        Route::get('/profile', [HomeController::class, 'profile'])->name('user-profile');
        Route::post('/profile/{id}', [HomeController::class, 'profileUpdate'])->name('user-profile-update');
        //  Order
        Route::get('/order', "HomeController@orderIndex")->name('user.order.index');
        Route::get('/order/show/{id}', "HomeController@orderShow")->name('user.order.show');
        Route::delete('/order/delete/{id}', [HomeController::class, 'userOrderDelete'])->name('user.order.delete');
        // Product Review
        Route::get('/user-review', [HomeController::class, 'productReviewIndex'])->name('user.productreview.index');
        Route::delete('/user-review/delete/{id}', [HomeController::class, 'productReviewDelete'])->name('user.productreview.delete');
        Route::get('/user-review/edit/{id}', [HomeController::class, 'productReviewEdit'])->name('user.productreview.edit');
        Route::patch('/user-review/update/{id}', [HomeController::class, 'productReviewUpdate'])->name('user.productreview.update');

        // Post comment
        Route::get('user-post/comment', [HomeController::class, 'userComment'])->name('user.post-comment.index');
        Route::delete('user-post/comment/delete/{id}', [HomeController::class, 'userCommentDelete'])->name('user.post-comment.delete');
        Route::get('user-post/comment/edit/{id}', [HomeController::class, 'userCommentEdit'])->name('user.post-comment.edit');
        Route::patch('user-post/comment/udpate/{id}', [HomeController::class, 'userCommentUpdate'])->name('user.post-comment.update');

        // Password Change
        Route::get('change-password', [HomeController::class, 'changePassword'])->name('user.change.password.form');
        Route::post('change-password', [HomeController::class, 'changPasswordStore'])->name('change.password');

    });

    //ADMINISTRACION DE WORDPRESS

    Route::group(['prefix' => '/admin-ncilcoperc'], function () {

        Route::get('/', [AdminWordpressRedirectController::class, 'index'])->name('admin');

        //--------------------IMAGES CATEGORIES-------------
        Route::resource('images_categories', ImagesCategoryController::class);

        Route::get('images_categories/create-custom', [ImagesCategoryController::class, 'create'])->name('images_categories.create-custom');
        
        Route::post('images_categories/store', [ImagesCategoryController::class, 'store'])->name('images_categories.store');
        Route::get('images_categories/{image_category}/edit-custom', [ImagesCategoryController::class, 'edit'])->name('images_categories.edit-custom');
        Route::put('images_categories/{image_category}/update-custom', [ImagesCategoryController::class, 'update'])->name('images_categories.update-custom');

        //----------------------ELEMENTS-----------------------

        Route::resource('elements', ElementController::class);

        Route::get('elements/create-custom', [ElementController::class, 'create'])->name('elements.create-custom');
        Route::get('elements/{id}/edit', [ElementController::class, 'edit'])->name('elements.edit');
        Route::put('elements/{id}', [ElementController::class, 'update'])->name('elements.update');
        Route::delete('elements/{id}', [ElementController::class, 'destroy'])->name('elements.destroy');

        //----------------------COLORS-VASO-DESIGN-----------------------
        Route::resource('colors', ColorController::class);
        
        Route::get('colors/create-custom', [ColorController::class, 'create'])->name('colors.create-custom');
        Route::get('colors/{id}/edit', [ColorController::class, 'edit'])->name('colors.edit');
        Route::put('colors/{id}', [ColorController::class, 'update'])->name('colors.update');
        Route::delete('colors/{id}', [ColorController::class, 'destroy'])->name('colors.destroy');
        
        //----------------------TIPOGRAFIAS-----------------------
        Route::resource('tipografias', TipografiaController::class);

        // Rutas adicionales
        Route::get('tipografias/create-custom', [TipografiaController::class, 'create'])->name('tipografias.create-custom');
        Route::get('tipografias/{id}/edit', [TipografiaController::class, 'edit'])->name('tipografias.edit');
        Route::put('tipografias/{id}', [TipografiaController::class, 'update'])->name('tipografias.update');
        Route::delete('tipografias/{id}', [TipografiaController::class, 'destroy'])->name('tipografias.destroy');       
    });

    Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web', 'auth']], function () {
        Lfm::routes();
    });

    // Para guardar el json del modelo 3d de manera temporal

    Route::post('/guardar-modelo', [Modelo3DController::class, 'guardarModelo'])->name('guardar.modelo');
    Route::get('/modelo3d/visualizar/{fileName}', [Modelo3DController::class, 'visualizarModelo'])->name('modelo3d.visualizar');

    //APIS WORDPRESS

    Route::get('/api/colors', [ColorController::class, 'indexApi']);
    Route::get('/api/elements', [ElementController::class, 'indexApi']);

    // Rutas para que los clientes puedan subir sus pdfs
    Route::get('/pdf/create', [PdfController::class, 'create'])->name('pdf.create');
    // backend
    Route::post('/pdf/store', [PdfController::class, 'store'])->name('pdf.store');
    Route::get('/pdf/view/{filename}', [PdfController::class, 'view'])->name('pdf.view');
    Route::get('/pdf/download/{id}', [PdfController::class, 'download'])->name('pdf.download');
    Route::get('/pdf', [PdfController::class, 'index'])->name('pdf.index');
    Route::delete('/pdf/{id}', [PdfController::class, 'destroy'])->name('pdf.destroy');

