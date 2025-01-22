<?php

namespace Database\Seeders;

use App\Models\Establishment;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Onah Francis',
        //     'email' => 'onahfa@gmail.com',
        // ]);

        User::factory(3)->create()->each(function ($user) {
            Establishment::factory(rand(1, 3))->create(['user_id' => $user->id])->each(function ($establishment) {
                ProductCategory::factory(rand(3, 5))->create([
                    'establishment_id' => $establishment->id,
                    ])->each(function ($category) {
                    Product::factory(rand(5, 10))->create([
                        'establishment_id' => $category->establishment_id,
                        'product_category_id' => $category->id,
                    ]);
                });
            });
        });
    }
}
