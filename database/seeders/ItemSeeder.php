<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
  public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 20) as $index) {
            DB::table('items')->insert([
                'title' => $faker->sentence, // Generates a random title
                'price' => $faker->randomFloat(2, 1, 100), // Generates a random price
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'), // Generates a random date
                'image_link' => $faker->imageUrl(), // Generates a random image URL
                'seller'=> $faker->numberBetween(1,41),
            ]);
        }
    }
}
