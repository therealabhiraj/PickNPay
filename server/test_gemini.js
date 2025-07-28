// test_gemini.js
require('dotenv').config(); // Load environment variables from .env
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGeminiSdk() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error("Error: GEMINI_API_KEY not found in .env file.");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    console.log("--- DEBUGGING genAI INSTANCE in test_gemini.js ---");
    console.log("DEBUG: GEMINI_API_KEY loaded:", apiKey ? "Key present" : "Key NOT present!");
    console.log("DEBUG: Type of genAI:", typeof genAI);
    console.log("DEBUG: Does genAI have listModels method?", typeof genAI.listModels === 'function');
    console.log("DEBUG: genAI object itself:", genAI);
    console.log("--------------------------------------------------");

    try {
        const { models } = await genAI.listModels();
        console.log("\n--- Available Gemini Models for your API Key (from test_gemini.js) ---");
        for (const model of models) {
            console.log(`Name: ${model.name}`);
            console.log(`  DisplayName: ${model.displayName}`);
            console.log(`  SupportedMethods: ${model.supportedGenerationMethods.join(', ')}`);
            console.log(`  PromptTokenLimit: ${model.inputTokenLimit}`);
            console.log(`  OutputTokenLimit: ${model.outputTokenLimit}`);
            console.log(`-----------------------------------`);
        }
        console.log("-----------------------------------\n");
    } catch (error) {
        console.error("Error listing models in test_gemini.js:", error);
    }
}

testGeminiSdk();