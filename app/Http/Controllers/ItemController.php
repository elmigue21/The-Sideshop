<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Exception;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class ItemController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'createdAt' => 'required|date',
            'imageLink' => 'required|string',
        ]);

                // Create a new Item instance with validated data
        $item = new Item($validatedData);

        // Set the user_id (seller) to the ID of the currently authenticated user
        $item->seller = Auth::id(); 

        // Save the item to the database
        $item->save();

        return response()->json($item, 201);
    }

    public function addToCart(Request $request){
        try{
            $data = $request->all();
            $userId = 1;
            $user = User::findOrFail($userId);
            $cart = json_decode($user->cart, true);
            // $items_array = $cart['cart'];

            // $data['quantity'] = 1;

            // $items = Item::whereIn('id', $item_ids)->get();

            array_push($cart['cart'], $data);

             $user->cart = json_encode($cart);

            // Save the updated cart to the database
            $user->save();


            return response()->json($cart['cart']);
        }catch (Exception $e) {
            return response()->json(['error'=> 'cart not found'],404);
        }
    }

 public function getItems()
    {
        try {
            // Fetch 20 items from the items table using Eloquent
            $items = Item::take(20)->get();
            //  Log::info('getItems() is called');

            // Return the items as JSON
            return response()->json($items);
        } catch (Exception $e) {
            // Log the error for debugging purposes
            Log::error('Error fetching items: ' . $e->getMessage());

            // Return a JSON response with the error message
            return response()->json([
                'error' => 'There was an error fetching the items.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
     public function getOneItem($id)
    {
        try {
            // Retrieve the item by its ID
            $item = Item::findOrFail($id);

            // Return the item
            return response()->json($item);
        } catch (Exception $e) {
            // Handle the error
            return response()->json(['error' => 'Item not found'], 404);
        }
    }
    public function getCart(){
        try{
            $userId = 1;
            $user = User::findOrFail($userId);
            $cart = json_decode($user->cart, true);
            $items_array = $cart['cart'];
            
            // $items = Item::whereIn('id', $items_array)->get();
            return response()->json($items_array);
        }catch (Exception $e) {
            return response()->json(['error'=> 'cart not found'],404);
        }
    }

        public function cartQuantityChanged(Request $request){
        try{
            $cart_item = $request->all();

            $userId = 1;
            $user = User::findOrFail($userId);
            $cart = json_decode($user->cart, true);
            $items_array = $cart['cart'];
            
            // $items = Item::whereIn('id', $items_array)->get();
            return response()->json($cart_item);
        }catch (Exception $e) {
            return response()->json(['error'=> 'cart not found'],404);
        }
    }

    public function getUser($id){
        try{
            $user = $user = User::findOrFail($id);
            return response()->json($user);
        }catch(Exception $e) {
            return response()->json(['error'=> 'User not found'],404);
        }
    }

    public function search(){
        $searchVal = $_GET['query'];
        $searches = Item::where('title','LIKE','%'.$searchVal.'%')->get();

        return response()->json($searches);
    }

    public function show($id){
        return view(
            'items',
            ['items'=>Item::findOrFail( $id ) ]
        );
    }
}
