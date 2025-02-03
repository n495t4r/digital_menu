<?php
// app/Http/Controllers/EstablishmentController.php

namespace App\Http\Controllers;

use App\Models\Establishment;
use App\Services\ProductApiService;
use Illuminate\Http\Request;
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
            'color_theme' => 'required|in:light,dark',
            'color' => 'required|string',
            'logo' => 'nullable|image',
            'bg_image' => 'nullable|image',
            'wifi_pass' => 'nullable|string',
            'can_make_orders' => 'boolean',
            'google_maps_link' => 'nullable|url',
            'tiktok' => 'nullable|url',
            'instagram' => 'nullable|url',
            'facebook' => 'nullable|url',
            'twitter' => 'nullable|url',
        ]);

        $establishment->update($validated);

        return redirect()->route('establishments.show', $establishment);
    }

    public function guestView($slug)
    {
        // Get establishment data from database
        $establishment = Establishment::where('slug', $slug)->firstOrFail();
        
        // Try to get products from API
        $apiProducts = $this->apiService->getProducts($establishment);
        
        if ($apiProducts && $apiProducts->isNotEmpty()) {
            // Merge establishment data with API products
            $formattedData = $this->apiService->formatApiProducts($apiProducts, $establishment);
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
