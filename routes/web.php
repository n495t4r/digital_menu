<?php

// routes/web.php

use App\Http\Controllers\EstablishmentController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [EstablishmentController::class, 'index'])->name('dashboard');
    Route::get('/establishments/create', [EstablishmentController::class, 'create'])->name('establishments.create');
    Route::post('/establishments', [EstablishmentController::class, 'store'])->name('establishments.store');
    Route::get('/establishments/{establishment}', [EstablishmentController::class, 'show'])->name('establishments.show');
    Route::get('/establishments/{establishment}/edit', [EstablishmentController::class, 'edit'])->name('establishments.edit');
    Route::put('/establishments/{establishment}', [EstablishmentController::class, 'update'])->name('establishments.update');

    Route::get('/establishments/{establishment}/menu', [MenuController::class, 'edit'])->name('menu.edit');
    Route::put('/establishments/{establishment}/menu', [MenuController::class, 'update'])->name('menu.update');

    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
});

Route::get('/{slug}', [EstablishmentController::class, 'guestView'])->name('establishment.guest');