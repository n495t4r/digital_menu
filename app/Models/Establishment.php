<?php
// app/Models/Establishment.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Establishment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'currency',
        'address',
        'description',
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
        'api_endpoint',
        'api_key',
    ];

    protected $casts = [
        'can_make_orders' => 'boolean',
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

    protected static function booted()
    {
        // parent::boot();

        // Delete the images when an establishment is deleted
        static::deleting(function ($establishment) {
            // Check if the bg_image exists and delete it from storage
            if ($establishment->bg_image) {
                Storage::delete($establishment->bg_image);
            }

            // Check if the logo exists and delete it from storage
            if ($establishment->logo) {
                Storage::delete($establishment->logo);
            }
        });

        // Delete previous image when updating
        static::updated(function ($establishment) {
            // Check if there's a new background image uploaded
            if ($establishment->isDirty('bg_image')) {
                // If there's a new bg_image and an old one, delete the old one
                $originalBgImage = $establishment->getOriginal('bg_image');
                if ($originalBgImage && $originalBgImage !== $establishment->bg_image) {
                    Storage::delete($originalBgImage);
                }
            }

            // Check if there's a new logo uploaded
            if ($establishment->isDirty('logo')) {
                // If there's a new logo and an old one, delete the old one
                $originalLogo = $establishment->getOriginal('logo');
                if ($originalLogo && $originalLogo !== $establishment->logo) {
                    Storage::delete($originalLogo);
                }
            }
        });
    }
}