<?php

// app/Models/Product.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}