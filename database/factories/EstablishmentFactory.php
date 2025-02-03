<?php

// database/factories/EstablishmentFactory.php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class EstablishmentFactory extends Factory
{

    public function getImageURL($q = ''){
        $path = public_path('img/establishment/'.$q);
        // $path = public_path('public/img/establishment/'.$q.'/*.{jpg,jpeg,png,gif}', GLOB_BRACE);

         // Use File facade to retrieve all image files
         $imageFiles = File::allFiles($path);
         $imageFiles = array_filter($imageFiles, function ($file) {
             return in_array($file->getExtension(), ['jpg', 'jpeg', 'png', 'gif']);
         });
 
         // Debug the image files
        //  dd($imageFiles);
         
         // If there are image files available, select one at random
        $randomImage = $this->getRandomImage($imageFiles, $q);

        return $randomImage;
    }

    private function getRandomImage(array $imageFiles, $q)
    {
        // If the directory contains images, return a random one
        if (!empty($imageFiles)) {
            return 'img/establishment/'.$q.'/' . basename($imageFiles[array_rand($imageFiles)]);
        }

        // Fallback to a default image if no images are found
        return 'img/placeholder.svg';
    }
    public function definition()
    {
        $name = $this->faker->company;
        $url = "https://pevaltd.com";
        $description = "Welcome to ".$name.'. Enjoy your visit';

        return [
            'user_id' => User::factory(),
            'name' => $name,
            'description' => $description,
            'slug' => Str::slug($name),
            'currency' => 'NGN',
            'address' => $this->faker->address,
            'phone' => $this->faker->phoneNumber,
            'color_theme' => $this->faker->randomElement(['light', 'dark']),
            'color' => $this->faker->hexColor,
            'logo' => $this->getImageURL('logo'), // Random image for logo
            'bg_image' => $this->getImageURL('bg'), // Random image for background
            'wifi_pass' => $this->faker->password,
            // 'wifi_pass' => '',
            'can_make_orders' => $this->faker->boolean,
            'google_maps_link' => $url,
            'tiktok' => '',
            'instagram' => $url,
            'facebook' => $url,
            'twitter' => $url,
        ];
    }
}