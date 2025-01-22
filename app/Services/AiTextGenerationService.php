<?php

// app/Services/AiTextGenerationService.php

namespace App\Services;

use OpenAI;

// use OpenAI\OpenAI;

class AiTextGenerationService
{
    protected $client;

    public function __construct()
    {
        $OPENAI_API_KEY = "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";
        // Initialize OpenAI client correctly with the API key from the environment
        $this->client = OpenAI::client($OPENAI_API_KEY);
    }

    /**
     * Generate a short product description using AI.
     *
     * @param string $productName
     * @return string
     */
    public function generateDescription(string $productName): string
    {
        // Request AI model for a short description of the product
        $response = $this->client->chat()->create([
            'model' => 'gpt-3.5-turbo', // Using GPT-3.5 model (newer than text-davinci-003)
            'messages' => [
                ['role' => 'system', 'content' => 'You are a helpful assistant.'],
                ['role' => 'user', 'content' => "Write a short, catchy description (max 70 characters) for the product: $productName."],
            ],
            'max_tokens' => 60, // Approximate length of the response
            'temperature' => 0.7, // Controls creativity
        ]);

        // Extract the description from the response
        $description = $response['choices'][0]['message']['content'];

        // Trim the description to 70 characters if necessary
        return substr(trim($description), 0, 70);
    }
}
