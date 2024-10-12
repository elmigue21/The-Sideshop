<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 20) as $index) {
            DB::table('users')->insert([
                'name' => $faker->name, // Generates a random name
                'email' => $faker->unique()->safeEmail, // Generates a unique email address
                'email_verified_at' => null, // Email verification timestamp (nullable)
                'password' => Hash::make('password'), // Password hash (use a default password or a generated one)
                'remember_token' => null, // Remember token (nullable)
                'created_at' => now(), // Current timestamp
                'updated_at' => now(), // Current timestamp
            ]);
        }
    }
}
