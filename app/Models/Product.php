<?php

// app/Models/Product.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'establishment_id',
        'product_category_id',
        'name',
        'description',
        'image',
        'price',
        'quantity',
        'status',
    ];

    public function establishment()
    {
        return $this->belongsTo(Establishment::class);
    }

    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }


    protected static function booted()
    {
        // Listen for when a product is being deleted
        static::deleting(function ($product) {
            // Delete the image from storage if it's present
            if ($product->image) {
                // Remove the image file from storage
                Storage::disk('public')->delete($product->image);
            }
        });

        // Listen for when a product is being updated (image change)
        static::updated(function ($product) {
            // Check if the image was updated
            if ($product->isDirty('image') && $product->getOriginal('image')) {
                // Delete the old image from storage
                Storage::disk('public')->delete($product->getOriginal('image'));
            }
        });
    }
}