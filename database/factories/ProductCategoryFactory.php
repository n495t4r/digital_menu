<?php
// database/factories/ProductCategoryFactory.php

namespace Database\Factories;

use App\Models\Establishment;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductCategoryFactory extends Factory
{
    public function definition()
    {
        $foodAndDrinkCategories = [
            'Food' => ['Soups', 'Swallows', 'Snacks'],
            'Meat' => [],
            'Seafood' => [],
            'Swallows' => [],
            'Snacks' => [],
            'Drinks' => ['Water', 'Soft Drinks', 'Alcoholic Beverages', 'Juices', 'Cocktails'],
        ];

        // Flatten categories and subcategories into a single array
        $flattenedCategories = [];
        foreach ($foodAndDrinkCategories as $category => $subcategories) {
            $flattenedCategories[$category] = $subcategories;  // Keep main category with its subcategories
        }

        $mainCategory = $this->faker->randomElement(array_keys($flattenedCategories));  // Select a random main category

        // Create the main category entry first
        $mainCategoryId = Establishment::create([
            'establishment_id' => Establishment::factory(),
            'name' => $mainCategory,
            'parent_id' => null,  // Main category has no parent
        ])->id;

        // Now create the subcategories, each with the parent_id set to the main category's id
        foreach ($flattenedCategories[$mainCategory] as $subcategory) {
            Establishment::create([
                'establishment_id' => Establishment::factory(),
                'name' => $subcategory,
                'parent_id' => $mainCategoryId,  // Set parent_id to the main category's ID
            ]);
        }

        return [
            'establishment_id' => Establishment::factory(),
            'name' => $mainCategory,  // Return the main category name here as the final name
            'parent_id' => null,
        ];
    }
}
