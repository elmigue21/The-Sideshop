<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home/Home', [
         'canLogin' => Route::has('login'),
         'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

 Route::get('/item/{id}', function ($id) {
     return Inertia::render('ItemPage/ItemPage',
    ['id'=>(int) $id]);
 });

Route::get('/cart', function () {
    return Inertia::render('Cart/Cart');
})->middleware(['auth','verified'])->name('cart');

// Route::get('/', function () {
//     return Inertia::render('Home/Home');
// })->middleware(['auth','verified'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['web'])->get('test', function () {
    return Inertia::render('Testing');
})->name('test');


Route::get('/search',function(){
    return Inertia::render('SearchPage/SearchPage');
});


require __DIR__.'/auth.php';
