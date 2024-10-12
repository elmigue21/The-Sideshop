<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
      protected $table = 'items';

    //   protected $fillable = [
    //     'id',
    //     'title',
    //     'price',
    //     'createdAt',
    //     'imageLink',
    //     'seller',
    //     'updated_at'

    // ];
}
