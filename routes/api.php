<?php

use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
// use App\Http\Controllers\SearchController;
use App\Http\Controllers\CartController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/items', [ItemController::class, 'getItems']);
Route::get('/item/{id}', [ItemController::class,'getOneItem']);
Route::post('/item', [ItemController::class,'addToCart']);
Route::post('/cartChanged',[ItemController::class,'cartQuantityChanged']);
Route::get('/user/{id}', [ItemController::class,'getUser']);
Route::get('/cart', [ItemController::class,'getCart']);
Route::get('/search/suggestions', [SearchController::class, 'searchSuggestions']);
Route::get('/search/results', [SearchController::class,'searchResults']);

Route::post('logcart',[CartController::class,'LogCart']);
