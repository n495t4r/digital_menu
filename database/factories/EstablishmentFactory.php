<?php

// database/factories/EstablishmentFactory.php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class EstablishmentFactory extends Factory
{
    public function definition()
    {
        $name = $this->faker->company;
        return [
            'user_id' => User::factory(),
            'name' => $name,
            'slug' => Str::slug($name),
            'currency' => $this->faker->randomElement(['NGN', 'USD', 'EUR']),
            'address' => $this->faker->address,
            'phone' => $this->faker->phoneNumber,
            'color_theme' => $this->faker->randomElement(['light', 'dark']),
            'color' => $this->faker->hexColor,
            'logo' => $this->faker->imageUrl(200, 200),
            'bg_image' => $this->faker->imageUrl(1920, 1080),
            'wifi_pass' => $this->faker->password,
            'can_make_orders' => $this->faker->boolean,
            'google_maps_link' => $this->faker->url,
            'tiktok' => $this->faker->url,
            'instagram' => $this->faker->url,
            'facebook' => $this->faker->url,
            'twitter' => $this->faker->url,
        ];
    }
}