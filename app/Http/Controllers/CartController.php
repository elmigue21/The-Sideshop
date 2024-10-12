<?php

namespace App\Http\Controllers;
use App\Models\CartItem;

use Illuminate\Http\Request;

class CartController extends Controller
{
    //
    public function LogCart(Request $request){
        $cartItem = CartItem::create([
            'item_id'=>$request->id,
            // "instance_id"=>,
            "title"=>$request->title,
            "price"=>$request->price,
            "createdAt"=>$request->createdAt,
            "imageLink"=>$request->imageLink,
            "seller"=>$request->seller,
            "quantity"=>$request->quantity,
            "cart_user_id"=>$request->userId,
        ]);
        $cartItem->save();

         return response()->json(['message' => 'Product created successfully', 'cart_item' => $cartItem], 201);
    }

}
