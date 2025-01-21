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

        // $foodImageProvider = new FoodImageProvider(Generator $faker);  // Pass the $faker object here

        $foodImageProvider = app(FoodImageProvider::class);

        $foodAndDrinkCategories = [
            'Grains' => ['Jollof Rice', 'Beans', 'White Rice'],
            'Pasta' => ['Spagetti'],
            'Soups' => ['Egusi', 'Vegetable soup', 'Okra Soup', 'Afang Soup'],
            'Proteins' => ['Chicken', 'Beef', 'Goat', 'Turkey', 'Fish'],
            'Swallows' => ['Poundo yam', 'Eba', 'Semo', 'Fufu'],
            'Soft drinks' => ['Coca Cola', 'Fanta', 'Hollandia', ],
            'Water' => ['Water 75cl', 'Water 50cl'],
            'Juices' => ['Orange Juice', 'Apple Juice', 'Carrot Juice', 'Berry Juice', 'Chi Exotic',],
            'Beer' => ['Legend', 'Star', 'Guiness smooth', 'Heineken'],
            'Wine' => ['Four cousins', 'Andre',],
            'Vodka' => ['Black bullet'],
            'Cocktails' => ['Mojito', 'Martini', 'Pina Colada', 'Margarita'],
        ];
        
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