<?php
// database/factories/ProductCategoryFactory.php

namespace Database\Factories;

use App\Models\Establishment;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductCategoryFactory extends Factory
{
    public function definition()
    {
        return [
            'establishment_id' => Establishment::factory(),
            'name' => $this->faker->word,
            'parent_id' => null,
        ];
    }
}