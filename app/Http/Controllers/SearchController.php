<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Facades\Log;
use App\Models\Item;

class SearchController extends Controller
{
    public function searchSuggestions(){
        try{
            Log::info("search ran");
            $userId = 1;

        $user = User::findOrFail($userId);
         Log::info("user with id $userId found");
        $userSearches = json_decode($user->searches, true);

        return response()->json(['searches'=>$userSearches]);
        }catch(Exception $e){
            return response()->json(['Error in search' => $e->getMessage()],500);
        }
    }
 public function searchResults(Request $request)
    {
        try {
            // Retrieve the query parameter 'q'
            $queryParam = $request->query('q');

            // Ensure the query parameter is not null or empty
            if (!$queryParam) {
                return response()->json(['error' => 'Query parameter is required.'], 400);
            }

            // Query the Item model for records where the title matches the query parameter
            $items = Item::where('title', 'like', "%{$queryParam}%")->get();

            // Return the search results
            return response()->json(['items' => $items]);

        } catch (Exception $e) {
            // Log the error and return a response
            Log::error('Error fetching search results: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while fetching search results.'], 500);
        }
    }
}
