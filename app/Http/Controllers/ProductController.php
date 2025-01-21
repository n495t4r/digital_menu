<?php

// app/Http/Controllers/ProductController.php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image',
            'price' => 'required|numeric|min:0',
            'quantity' => 'nullable|integer|min:0',
            'est_id' => 'required|exists:establishments,id',
            'product_category_id' => 'required|exists:product_categories,id',
            'status' => 'boolean',
        ]);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image',
            'price' => 'required|numeric|min:0',
            'quantity' => 'nullable|integer|min:0',
            'product_category_id' => 'required|exists:product_categories,id',
            'status' => 'boolean',
        ]);

        $product->update($validated);

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}