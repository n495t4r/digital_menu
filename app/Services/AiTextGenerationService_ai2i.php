<?php

// app/Services/AiTextGenerationService.php

namespace App\Services;

use GuzzleHttp\Client;

// use OpenAI\OpenAI;

class AiTextGenerationService_ai2i
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    /**
     * Generate a short product description using AI.
     *
     * @param string $productName
     * @return string
     */
    public function generateDescription(string $productName): string
    {
        $AI21_API_KEY = "kyJ4af85EqzWf6lTH16UsR5u1GRqei5C";
        $response = $this->client->post('https://api.ai21.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer '.$AI21_API_KEY,
            ],
            'json' => [
                'model' => 'jamba-1.5-mini', // You can change this to 'jamba-1.5-large' if preferred
                'messages' => [
                    ['role' => 'system', 'content' => 'You are a helpful assistant.'],
                    ['role' => 'user', 'content' => "Write a short, catchy description (max 70 characters) for the product: $productName."]
                ],
                'max_tokens' => 60, // Limit the length of the output
                'temperature' => 0.7, // Controls creativity
            ]
        ]);

        $body = json_decode($response->getBody(), true);
        return substr($body['choices'][0]['message']['content'], 0, 70); // Ensure the description does not exceed 70 characters
    }
}
