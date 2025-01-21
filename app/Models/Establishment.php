<?php
// app/Models/Establishment.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Establishment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'currency',
        'address',
        'phone',
        'color_theme',
        'color',
        'logo',
        'bg_image',
        'wifi_pass',
        'can_make_orders',
        'google_maps_link',
        'tiktok',
        'instagram',
        'facebook',
        'twitter',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->hasMany(ProductCategory::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}