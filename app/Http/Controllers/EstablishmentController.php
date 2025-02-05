<?php
// app/Http/Controllers/EstablishmentController.php

namespace App\Http\Controllers;

use App\Models\Establishment;
use App\Services\ProductApiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EstablishmentController extends Controller
{
    private ProductApiService $apiService;

    public function __construct(ProductApiService $apiService)
    {
        $this->apiService = $apiService;
    }
    public function index()
    {
        $establishments = auth()->user()->establishments;
        return Inertia::render('Dashboard', ['establishments' => $establishments]);
    }

    public function create()
    {
        return Inertia::render('Establishments/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:establishments',
            'currency' => 'required|string|max:3',
            'address' => 'required|string',
            'phone' => 'required|string',
            'description' => 'string',
        ]);

        $establishment = auth()->user()->establishments()->create($validated);

        return redirect()->route('establishments.show', $establishment);
    }

    public function show(Establishment $establishment)
    {
        return Inertia::render('Establishments/Show', ['establishment' => $establishment]);
    }

    public function edit(Establishment $establishment)
    {
        return Inertia::render('Establishments/Edit', ['establishment' => $establishment]);
    }

    public function update(Request $request, Establishment $establishment)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:establishments,slug,' . $establishment->id,
            'currency' => 'required|string|max:3',
            'address' => 'required|string',
            'phone' => 'required|string',
            'description' => 'nullable|string',
            'color_theme' => 'nullable|in:light,dark',
            'color' => 'nullable|string',
            'bg_image' => 'nullable|image|mimes:jpeg,png,webp,jpg,gif,svg|max:2048',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048', // Example: max 2MB            'bg_image' => 'nullable|image',
            'wifi_pass' => 'nullable|string',
            'can_make_orders' => '',
            'google_maps_link' => 'nullable|url',
            'tiktok' => 'nullable|url',
            'instagram' => 'nullable|url',
            'facebook' => 'nullable|url',
            'twitter' => 'nullable|url',
            'api_endpoint' => 'nullable|string',
            'api_key' => 'nullable|string'
        ]);

        $establishment->fill($validated);


        // Handle the logo upload if present
        if ($request->hasFile('logo')) {
            // Delete the old logo if it exists

            $originalLogo = $establishment->getOriginal('logo');

            // Check if the original bg_image is different from the new one
            if ($originalLogo && $originalLogo !== $establishment->logo) {

                // Check if the file exists before trying to delete
                if (Storage::disk('public')->exists($originalLogo)) {
                    // Attempt to delete the old background image
                    try {
                        if (Storage::disk('public')->delete($originalLogo)) {
                            // Log::info("Successfully deleted old background image: " . $originalBgImage);
                        } else {
                            // Log::error("Failed to delete old background image: " . $originalBgImage);
                        }
                    } catch (\Exception $e) {
                        // Log any exceptions thrown during deletion
                        Log::error("Error deleting old background image: " . $e->getMessage());
                    }
                } else {
                    // Log::warning("Old background image does not exist: " . $originalBgImage);
                }

            // Store the new logo
            $logoPath = $request->file('logo')->store('img/establishment/logo', 'public');
            $establishment->logo = $logoPath; // Save the file path in the database
        }

        // Handle the background image upload if present
        if ($request->hasFile('bg_image')) {
            // Get the original bg_image path before updating
            $originalBgImage = $establishment->getOriginal('bg_image');

            // Check if the original bg_image is different from the new one
            if ($originalBgImage && $originalBgImage !== $establishment->bg_image) {

                // Check if the file exists before trying to delete
                if (Storage::disk('public')->exists($originalBgImage)) {
                    // Attempt to delete the old background image
                    try {
                        if (Storage::disk('public')->delete($originalBgImage)) {
                            // Log::info("Successfully deleted old background image: " . $originalBgImage);
                        } else {
                            // Log::error("Failed to delete old background image: " . $originalBgImage);
                        }
                    } catch (\Exception $e) {
                        // Log any exceptions thrown during deletion
                        Log::error("Error deleting old background image: " . $e->getMessage());
                    }
                } else {
                    // Log::warning("Old background image does not exist: " . $originalBgImage);
                }

                // Store the new background image
                $bgImagePath = $request->file('bg_image')->store('img/establishment/bg', 'public');
                $establishment->bg_image = $bgImagePath; // Save the file path in the database
            }
        }
        if ($establishment->isDirty()) {
            $establishment->save();
        }

        return redirect()->route('establishments.show', $establishment);
    }

    public function guestView($slug)
    {
        // Get establishment data from database
        $establishment = Establishment::where('slug', $slug)->firstOrFail();

        // Try to get products from API
        $apiProducts = $this->apiService->getProducts($establishment);
        // dd($apiProducts);
        if ($apiProducts && $apiProducts->isNotEmpty()) {
            // Merge establishment data with API products
            $formattedData = $this->apiService->formatApiProducts($apiProducts, $establishment);

            // dd($formattedData);
            return Inertia::render('GuestView', ['establishment' => $formattedData]);
        }

        // Fallback to database products if API fails or returns no data
        $establishmentWithProducts = Establishment::where('slug', $slug)
            ->with(['categories' => function ($query) {
                $query->whereHas('products', function ($query) {
                    $query->where('status', true);
                });
            }, 'categories.products' => function ($query) {
                $query->where('status', true)->orderBy('name');
            }])
            ->firstOrFail();

        return Inertia::render('GuestView', ['establishment' => $establishmentWithProducts]);
    }
}
