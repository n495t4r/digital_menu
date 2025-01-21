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
         // Data for categories and products
         $categories = [
             'Food' => [
                 'Grains' => ['Jollof Rice', 'Beans', 'White Rice'],
                 'Pasta' => ['Spagetti'],
                 'Soups' => ['Egusi', 'Vegetable soup', 'Okra Soup', 'Afang Soup'],
                 'Swallows' => ['Poundo yam', 'Eba', 'Semo', 'Fufu']
             ],
             'Proteins' => ['Chicken', 'Beef', 'Goat', 'Turkey', 'Fish'],
             'Drinks' => [
                 'Water' => ['Water 75cl', 'Water 50cl'],
                 'Soft Drinks' => ['Coca Cola', 'Fanta', 'Hollandia'],
                 'Juices' => ['Orange Juice', 'Apple Juice', 'Carrot Juice', 'Berry Juice', 'Chi Exotic']
             ],
             'Alcoholic Beverages' => [
                 'Beer' => ['Legend', 'Star', 'Guiness smooth', 'Heineken'],
                 'Wine' => ['Four cousins', 'Andre'],
                 'Vodka' => ['Black bullet'],
                 'Cocktails' => ['Mojito', 'Martini', 'Pina Colada', 'Margarita']
             ]
         ];
     
         // Create 3 users and their establishments
         User::factory(3)->create()->each(function ($user) use ($categories) {
             // Create establishments and associate with the user
             Establishment::factory(rand(1, 3))->create(['user_id' => $user->id])->each(function ($establishment) use ($categories) {
                 
                 // Create categories and products for each establishment
                 $this->createCategoriesAndProducts($establishment, $categories);
             });
         });
     }
     
     /**
      * Helper method to create categories and products
      */
     private function createCategoriesAndProducts(Establishment $establishment, array $categories): void
     {
         foreach ($categories as $mainCategoryName => $subCategories) {
             // Create the main category
             $mainCategory = $this->createCategory($establishment, $mainCategoryName);
     
             // Handle subcategories or products under the main category
             foreach ($subCategories as $subCategoryName => $products) {
                 // If it's an array, it's a subcategory
                 if (is_array($products)) {
                     $subCategory = $this->createCategory($establishment, $subCategoryName, $mainCategory->id);
                     // Create products for the subcategory
                     $this->createProducts($subCategory, $products, $establishment);
                 } else {
                     // It's a product category directly under the main category
                     $this->createProducts($mainCategory, [$subCategoryName => $products], $establishment);
                 }
             }
         }
     }
     
     /**
      * Helper method to create a product category (main or sub)
      */
     private function createCategory(Establishment $establishment, string $name, ?int $parentId = null): ProductCategory
     {
         return ProductCategory::create([
             'name' => $name,
             'parent_id' => $parentId, // Null for main categories, parent_id for subcategories
             'establishment_id' => $establishment->id,
         ]);
     }
     
     /**
      * Helper method to create products for a category
      */
     private function createProducts(ProductCategory $category, array $products, Establishment $establishment): void
     {
         foreach ($products as $productName) {
             Product::create([
                 'name' => $productName,
                 'description' => $productName . ' description', // Placeholder description
                 'price' => rand(5, 50), // Random price
                 'quantity' => rand(10, 100), // Random quantity
                 'status' => true, // Default to active
                 'product_category_id' => $category->id,
                 'establishment_id' => $establishment->id,
             ]);
         }
     }
     
}
