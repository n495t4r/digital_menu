<?php

namespace Database\Seeders;

use App\Models\Establishment;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\User;
use App\Services\AiTextGenerationService;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

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
            // 'Protein' => ['Grilled Chicken', 'Fried Beef'],
            'Protein' => ['Grilled Chicken', 'Fried Beef', 'Fried Goat', 'Turkey', 'Fish'],
            'Drinks' => [
                'Water' => ['Water 75cl', 'Water 50cl'],
                'Coca Cola', 'Fanta', 'Hollandia',
                'Juices' => ['Orange Juice', 'Apple Juice', 'Carrot Juice', 'Berry Juice', 'Chi Exotic']
            ],
            'Alcoholic' => [
                'Beer' => ['Legend', 'Star', 'Guiness smooth', 'Heineken'],
                'Wine' => ['Four cousins', 'Andre'],
                'Vodka' => ['Black bullet'],
                'Cocktails' => ['Mojito', 'Martini', 'Pina Colada', 'Margarita']
            ]
        ];

        // Create 3 users and their establishments
        User::factory(1)->create()->each(function ($user) use ($categories) {
            // Create establishments and associate with the user
            Establishment::factory(rand(3, 3))->create(['user_id' => $user->id])->each(function ($establishment) use ($categories) {

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


    public function getImageURL($q = '')
    {
        $path = public_path('img/establishment/' . $q);
        // Use File facade to retrieve all image files
        $imageFiles = File::allFiles($path);
        $imageFiles = array_filter($imageFiles, function ($file) {
            return in_array($file->getExtension(), ['jpg', 'jpeg', 'png', 'gif']);
        });

        // If there are image files available, select one at random
        $randomImage = $this->getRandomImage($imageFiles, $q);

        return $randomImage;
    }

    private function getRandomImage(array $imageFiles, $q)
    {
        // If the directory contains images, return a random one
        if (!empty($imageFiles)) {
            return 'img/establishment/' . $q . '/' . basename($imageFiles[array_rand($imageFiles)]);
        }

        // Fallback to a default image if no images are found
        return 'img/establishment/bg/wine_glass.jpg';
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

        $desc = new AiTextGenerationService;

        foreach ($products as $productName) {

            // try {
            //     $description = $desc->generateDescription($productName);
            // } catch (\Exception $e) {
            //     // Fallback description during development
                $description = "Delicious $productName prepared with the finest ingredients.";
                
                // Optional: Log the error
            //     \Log::error('OpenAI API Error: ' . $e->getMessage());
            // }

            Product::create([
                'name' => $productName,
                'description' => $description, // Placeholder description
                'price' => rand(500, 5000), // Random price
                'quantity' => rand(10, 100), // Random quantity
                'image' => $this->getImageURL($this->CategoryName($category)),
                'status' => true, // Default to active
                'product_category_id' => $category->id,
                'establishment_id' => $establishment->id,
            ]);
        }
    }

    // In Category.php model
    private function CategoryName(ProductCategory $category)
    {
        // If the category exists, check the parent_id
        if ($category) {
            // If parent_id is null, return the category's name
            if ($category->parent_id === null) {
                return $category->name;
            }

            // Otherwise, find the parent category by the parent_id and return its name
            $parentCategory = $category::find($category->parent_id);
            return $parentCategory ? $parentCategory->name : null;
        }

        return null; // If the category with the given ID doesn't exist
    }
}
