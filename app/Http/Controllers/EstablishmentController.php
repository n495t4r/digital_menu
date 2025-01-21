<?php
// app/Http/Controllers/EstablishmentController.php

namespace App\Http\Controllers;

use App\Models\Establishment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EstablishmentController extends Controller
{
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
        $establishment = Establishment::where('slug', $slug)
            ->with(['categories.products' => function ($query) {
                $query->where('status', true)->orderBy('name');
            }])
            ->firstOrFail();

        return Inertia::render('GuestView', ['establishment' => $establishment]);
    }
}
