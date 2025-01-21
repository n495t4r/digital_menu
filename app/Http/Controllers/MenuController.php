<?php
// app/Http/Controllers/MenuController.php

namespace App\Http\Controllers;

use App\Models\Establishment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function edit(Establishment $establishment)
    {
        $menu = $establishment->load('categories.products');
        return Inertia::render('Menu/Edit', ['menu' => $menu]);
    }

    public function update(Request $request, Establishment $establishment)
    {
        // Validate and update menu structure
        // This would involve updating categories and products
        // The exact implementation depends on how you structure your menu data
    }
}