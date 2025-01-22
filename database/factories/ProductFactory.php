<?php
// database/factories/ProductFactory.php

namespace Database\Factories;

use App\Models\Establishment;
use App\Models\ProductCategory;
use App\Providers\FoodImageProvider;
// use Generator;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition()
    {

        $foodImageProvider = app(FoodImageProvider::class);
        
        return [
            'establishment_id' => Establishment::factory(),
            'product_category_id' => ProductCategory::factory(),
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'image' => $foodImageProvider->foodImageUrl(400, 300),
            'price' => $this->faker->randomFloat(2, 5, 100),
            'quantity' => $this->faker->numberBetween(0, 100),
            'status' => $this->faker->boolean,
        ];
    }
}