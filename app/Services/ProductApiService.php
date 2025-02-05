<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Collection;
use App\Models\Establishment;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class ProductApiService
{
    private Client $client;
    
    public function __construct()
    {
        $this->client = new Client();
    }

    public function getProducts(Establishment $establishment): ?Collection
    {
        // Skip API fetch if endpoint or key not configured
        if (!$establishment->api_endpoint || !$establishment->api_key) {
            // dd('api information not found');
            return null;
        }

        $cacheKey = "products_establishment_{$establishment->id}";
        
        return Cache::remember($cacheKey, now()->addMinutes(5), function () use ($establishment) {
            try {
                $perPage = 200;

                $api_endpoint = 'https://pevaltd.com/api/v1/products?per_page='.$perPage;
                // $api_key = '4rau6W5aG6YQbZ3O6f4fTWF2xVrvLobCo0a0Ac9tgyFPUOXAFAslUZGaBsxiv8aA';
                $response = $this->client->get($establishment->api_endpoint, [
                // $response = $this->client->get($api_endpoint, [
                    'headers' => [
                        'X-API-Key' => $establishment->api_key,
                        // 'X-API-Key' => $api_key,
                        'Accept' => 'application/json'
                    ]
                ]);
                
                $data = json_decode($response->getBody(), true);
                // dd($data);
                return collect($data['data']);
            } catch (GuzzleException $e) {
                Log::error("Failed to fetch products from API for establishment {$establishment->id} {$establishment->name}: " . $e->getMessage());
                return null;
            }
        });
    }

    public function formatApiProducts(Collection $products, Establishment $establishment): array
    {
        // Group products by category
        $groupedProducts = $products->groupBy(function ($product) {
            return $product['category']['name'] ?? 'Uncategorized';
        });

        // Format categories with their products
        $categories = $groupedProducts->map(function ($products, $categoryName) use ($establishment) {
            return [
                'id' => $products->first()['category']['id'] ?? null,
                'establishment_id' => $establishment->id,
                'name' => $categoryName,
                'parent_id' => $products->first()['category']['parent_id'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
                'products' => $products->map(function ($product) use ($establishment) {
                    return [
                        'id' => $product['id'],
                        'establishment_id' => $establishment->id,
                        'product_category_id' => $product['category']['id'] ?? null,
                        'name' => $product['name'],
                        'description' => $product['description'],
                        'image' => $product['image'],
                        'price' => $product['price'],
                        'quantity' => $product['quantity'],
                        'status' => $product['status'],
                        'created_at' => $product['created_at'],
                        'updated_at' => $product['updated_at']
                    ];
                })->values()->all()
            ];
        })->values();

        // Merge establishment data with formatted categories
        return array_merge(
            $establishment->toArray(),
            ['categories' => $categories]
        );
    }
}