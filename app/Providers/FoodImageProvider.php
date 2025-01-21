<?php 

namespace App\Providers;

// use Faker\Generator;
use Faker\Provider\Base;

class FoodImageProvider
{
    protected $unsplashApiUrl = 'https://api.unsplash.com/photos/random';
    protected $accessKey = 'HIpnRLJEGZ5Rhw--xVaaMGdQenaIxVXm-ODilEbrbAg'; // You need to sign up for an Unsplash API key


    // public function __construct(Generator $generator)
    // {
    //     parent::__construct($generator); // Pass the Faker Generator to the parent constructor
    // }

    public function foodImageUrl($width = 200, $height = 200, $query = 'food')
    {
        // Build the URL to fetch random food images
        $url = $this->unsplashApiUrl . '?query='.$query.'&width=' . $width . '&height=' . $height . '&client_id=' . $this->accessKey;

        // Make a request to Unsplash API and get a random food image
        $response = file_get_contents($url);
        $data = json_decode($response, true);

        // Return the URL of the food image
        return $data[0]['urls']['regular'] ?? 'https://via.placeholder.com/' . $width . 'x' . $height;
    }
}
