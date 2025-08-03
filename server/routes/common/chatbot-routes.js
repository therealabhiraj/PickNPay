require('dotenv').config();
const express = require('express');
const router = express.Router();

const { GoogleGenerativeAI } = require('@google/generative-ai');
const Product = require('../../models/Product'); 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGeminiConnectivity() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("🔴 ERROR: GEMINI_API_KEY is NOT set in your .env file!");
        console.error("Please ensure you have a .env file at the root of your server directory with GEMINI_API_KEY=YOUR_API_KEY_HERE.");
        return false;
    }
    console.log("🟢 GEMINI_API_KEY is present and loaded. Attempting basic connectivity test with 'gemini-2.5-pro'...");

    try {
        const testModel = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
        const result = await testModel.generateContent("Hello, how are you today?");
        const response = result.response;
        const text = response.text();
        if (text) {
            console.log(`✅ Gemini basic connectivity test successful with 'gemini-2.5-pro'.`);
            console.log(`   Response snippet: "${text.substring(0, Math.min(text.length, 50))}..."`);
            return true;
        } else {
            console.error("⚠️ Gemini basic connectivity test returned empty text response, but no error was thrown.");
            console.error("Full response object from test (raw parts):", JSON.stringify(response.candidates?.[0]?.content?.parts || response, null, 2));
            console.error("Check for 'safetyRatings' or 'promptFeedback' in the raw response above.");
            return false;
        }
    } catch (error) {
        console.error("❌ Gemini basic connectivity test FAILED!");
        console.error("Gemini connectivity error details:");
        if (error.response?.status) {
            console.error(`  Status: ${error.response.status}`);
            console.error(`  Data: ${JSON.stringify(error.response.data, null, 2)}`);
            if (error.response.status === 403) {
                console.error("   Reason: 403 Forbidden. This often means your API key is invalid, or the model 'gemini-2.5-pro' is not accessible to your project/billing account.");
                console.error("   ACTION: Double-check your API key in Google AI Studio/Cloud Console. Ensure billing is enabled for your project and that 'Generative Language API' or 'Vertex AI API' is enabled for the correct project.");
            } else if (error.response.status === 400) {
                 console.error("   Reason: 400 Bad Request. This might indicate an incorrect model name or a malformed request.");
            }
        } else {
            console.error(`  General Error Message: ${error.message}`);
            console.error("   This could be a network issue, DNS problem, or another client-side problem before the API is hit.");
        }
        console.error("   Please investigate your Google Cloud Console / Google AI Studio dashboard for more detailed error logs and API key status.");
        return false;
    }
}


const productSearchTool = {
    functionDeclarations: [
        {
            name: "getProducts",
            description: "Search for products specifically on the PickNPay e-commerce website database. Use this tool *whenever* a user asks to find, list, or inquire about products, categories, or brands available on *this* store. Do NOT search external websites or provide product information if this tool can be used. Parameters are optional but try to extract keywords, categories, or brands from the user's query.",
            parameters: {
                type: "object",
                properties: {
                    category: { type: "string", description: "The product category (e.g., 'Clothing', 'Footwear', 'Accessories')." },
                    brand: { type: "string", description: "The brand name (e.g., 'Nike', 'Adidas')." },
                    keywords: { type: "string", description: "General keywords to search for in product titles or descriptions (e.g., 'shoes', 'bag')." },
                    limit: { type: "number", description: "Maximum number of products to return, defaults to 5." }
                },
            },
        },
    ],
};

const modelWithTools = genAI.getGenerativeModel({
    model: "gemini-2.5-pro",
    tools: [productSearchTool],
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
    ],
});

const chatSessions = {};

(async () => {
    console.log("\n--- Starting Gemini API Pre-flight Connectivity Check ---");
    await testGeminiConnectivity();
    console.log("--- Gemini API Pre-flight Check Complete ---\n");
})();


async function searchProducts(keywords, category, brand, limit = 5) {
    console.log(`[DB DEBUG] searchProducts called - Raw Inputs: keywords='${keywords}', category='${category}', brand='${brand}', limit=${limit}`);
    try {
        let findQuery = {};
        let $orConditions = [];

        keywords = keywords === null || keywords === undefined ? undefined : String(keywords).trim();
        category = category === null || category === undefined ? undefined : String(category).trim();
        brand = brand === null || brand === undefined ? undefined : String(brand).trim();

        if (keywords === '') keywords = undefined;
        if (category === '') category = undefined;
        if (brand === '') brand = undefined;

        console.log(`[DB DEBUG] searchProducts - Cleaned Inputs: keywords='${keywords}', category='${category}', brand='${brand}'`);


        if (keywords) {
            $orConditions.push(
                { title: { $regex: keywords, $options: 'i' } },
                { description: { $regex: keywords, $options: 'i' } } 
            );

            if (!category) {
                $orConditions.push({ category: { $regex: keywords, $options: 'i' } });
            }
            if (!brand) {
                $orConditions.push({ brand: { $regex: keywords, $options: 'i' } });
            }
        }

        if ($orConditions.length > 0) {
            findQuery.$or = $orConditions;
        }

        if (category) {
            findQuery.category = { $regex: category, $options: 'i' };
        }

        if (brand) {
            findQuery.brand = { $regex: brand, $options: 'i' };
        }
        
        console.log("[DB] Final MongoDB Query:", JSON.stringify(findQuery));

        const products = await Product.find(findQuery).limit(limit);

        console.log(`[DB] Found ${products.length} products.`);

        if (products.length === 0) {
            return { message: "No products found matching your criteria." };
        }

        return products.map(p => ({
            id: p._id.toString(),
            name: p.title, 
            brand: p.brand,
            category: p.category,
            price: p.price,
            link: `${process.env.FRONTEND_BASE_URL}/shop/product/${p._id.toString()}`
        }));
    } catch (error) {
        console.error("❌ DB Error during product search:", error);
        return { error: "An error occurred while searching for products in the database. Please try again." };
    }
}

router.post('/message', async (req, res) => {
    const { userId, message } = req.body;

    console.log(`\n--- Incoming Chat Message ---`);
    console.log(`[Request] userId: ${userId}, message: "${message}"`);

    if (!userId || !message) {
        console.error("[Error] Missing userId or message in request.");
        return res.status(400).json({ success: false, message: 'userId and message are required.' });
    }

    if (!chatSessions[userId]) {
        console.log(`[Chatbot] 🔄 New session started for user ${userId}`);
        chatSessions[userId] = modelWithTools.startChat({
            history: [
                // {
                //     role: "user",
                //     parts: [{ text: `
                //         You are a dedicated e-commerce product assistant for the PickNPay online store.
                //         Your ONLY goal is to help users find products available on this website.
                //         When a user asks about products, categories, or brands, you MUST use the 'getProducts' tool.
                //         Do NOT attempt to answer product-related questions using your general knowledge or search external websites.
                //         If the 'getProducts' tool returns no results, inform the user that no matching products were found on PickNPay.
                //         **IMPORTANT: Under no circumstances should you provide any links (URLs) in your responses.**
                //         If a user asks for product details or wants to see a product, describe it or guide them to the relevant section of the website without providing a direct link.
                //         For example, instead of a link, you could say: "You can find the Nike GPS Cellular Smartwatch on our 'Smartwatches' category page."
                //         Keep your responses helpful and informative, but strictly avoid URLs.
                //     ` }],
                // },
                {
                    role: "user",
                    parts: [{ text: `You are a dedicated e-commerce product assistant for the PickNPay online store. Your ONLY goal is to help users find products available on this website. When a user asks about products, categories, or brands, you MUST use the 'getProducts' tool. Do NOT attempt to answer product-related questions using your general knowledge or search external websites. If the 'getProducts' tool returns no results, inform the user that no matching products were found on PickNPay.` }],
                },
                {
                    role: "model",
                    parts: [{ text: "Hello! How can I help you find products on PickNPay today?" }],
                },
                {
                    role: "user",
                    parts: [{ text: "Can you find me some running shoes?" }],
                },
                {
                    role: "model",
                    parts: [{
                        functionCall: {
                            name: "getProducts",
                            args: { keywords: "running shoes", limit: 5 },
                        },
                    }],
                },
                {
                    role: "function",
                    parts: [{
                        functionResponse: {
                            name: "getProducts",
                            response: {
                                products: [
                                    { id: "123", name: "Nike Air Zoom", brand: "Nike", price: 120, link: "${process.env.FRONTEND_BASE_URL}/shop/product/123" },
                                    { id: "124", name: "Adidas Ultraboost", brand: "Adidas", price: 150, link: "${process.env.FRONTEND_BASE_URL}/shop/product/124" },
                                ],
                            },
                        },
                    }],
                },
                {
                    role: "model",
                    parts: [{ text: "Sure, I found a few running shoes for you: Nike Air Zoom, Adidas Ultraboost. Would you like links or more details?" }],
                },
                {
                    role: "user",
                    parts: [{ text: "Are there any products from 'XYZ Brand'?" }],
                },
                {
                    role: "model",
                    parts: [{
                        functionCall: {
                            name: "getProducts",
                            args: { brand: "XYZ Brand" },
                        },
                    }],
                },
                {
                    role: "function",
                    parts: [{
                        functionResponse: {
                            name: "getProducts",
                            response: {
                                message: "No products found matching your criteria."
                            },
                        },
                    }],
                },
                {
                    role: "model",
                    parts: [{ text: "I'm sorry, I couldn't find any products from XYZ Brand on PickNPay. Please try another brand or search term." }],
                },
            ],
            generationConfig: { maxOutputTokens: 500 },
        });
        console.log(`[Chatbot] New chat session initialized for user ${userId} with example history.`);
    }

    try {
        console.log(`[Chatbot] Sending message to Gemini model...`);
        const chat = chatSessions[userId];
        const result = await chat.sendMessage(message);
        const response = result.response;

        console.log("\n--- Gemini Model Raw Response Analysis ---");
        console.log("[Chatbot] Raw response.candidates?.[0]?.content?.parts:", JSON.stringify(response.candidates?.[0]?.content?.parts, null, 2));
        console.log("[Chatbot] Raw response.promptFeedback:", JSON.stringify(response.promptFeedback, null, 2));
        console.log("[Chatbot] Raw response.safetyRatings:", JSON.stringify(response.safetyRatings, null, 2));

        const aiText = response.text();
        let extractedToolCalls = [];

        const rawContentParts = response.candidates?.[0]?.content?.parts;
        if (rawContentParts) {
            for (const part of rawContentParts) {
                if (part.functionCall) {
                    extractedToolCalls.push(part.functionCall);
                }
            }
        }

        console.log("[Chatbot] 🧠 AI Reply Text (from response.text()):", aiText || "[No direct text response from model]");
        console.log("[Chatbot] 🛠️ Extracted Tool Calls (from raw parts):", extractedToolCalls.length > 0 ? JSON.stringify(extractedToolCalls) : "[No tool calls extracted from raw parts]");
        console.log("--- End Gemini Model Raw Response Analysis ---\n");

        if (extractedToolCalls.length > 0) {
            console.log(`[Chatbot] Detected ${extractedToolCalls.length} tool call(s). Executing functions...`);
            let toolOutputs = [];

            for (const toolCall of extractedToolCalls) {
                const { name, args } = toolCall;
                console.log(`🔍 AI requested tool: '${name}' with args:`, args);

                if (name === "getProducts") {
                    console.log("[Chatbot] Executing getProducts tool...");
                    const productsResult = await searchProducts(args.keywords, args.category, args.brand, args.limit);
                    console.log("[Chatbot] getProducts tool result:", JSON.stringify(productsResult).substring(0, Math.min(JSON.stringify(productsResult).length, 200)) + (JSON.stringify(productsResult).length > 200 ? "..." : ""));
                    toolOutputs.push({ toolCall, result: productsResult });
                } else {
                    const errorResult = { error: `Unknown tool: ${name}` };
                    toolOutputs.push({ toolCall, result: errorResult });
                    console.error(`❌ Tool '${name}' is unknown. Result:`, errorResult);
                }
            }
            console.log("[Chatbot] Sending tool outputs back to AI for final response generation...");
            
       
            const partsToSend = toolOutputs.map(output => {
                const functionResponsePayload = {};
                if (Array.isArray(output.result)) {
                    functionResponsePayload.products = output.result;
                } else if (typeof output.result === 'object' && output.result !== null) {
                    Object.assign(functionResponsePayload, output.result);
                } else {
                    functionResponsePayload.data = output.result;
                }

                return {
                    functionResponse: {
                        name: output.toolCall.name,
                        response: functionResponsePayload 
                    }
                };
            });
            console.log("[Chatbot DEBUG] Parts being sent to sendMessage:", JSON.stringify(partsToSend));

            const toolResponse = await chat.sendMessage(partsToSend);


            const finalResponse = toolResponse.response;
            const finalAiMessage = finalResponse.text() || "I processed your request using my tools, but I don't have a direct text response for this specific action. Please check the product listings.";
            console.log("[Chatbot] Final AI Response after tool execution:", finalAiMessage);
            return res.json({ success: true, aiMessage: finalAiMessage });
        } else {
            const finalAiMessage = aiText || "I couldn't generate a response or find a relevant product. Can you please rephrase?";
            console.log("[Chatbot] No tool calls extracted. Direct AI response:", finalAiMessage);
            res.json({ success: true, aiMessage: finalAiMessage });
        }

    } catch (error) {
        console.error("❌ Chatbot processing failed in main try-catch block:");
        if (error.response?.status) {
            console.error("Gemini API error details (from sendMessage call):");
            console.error(`  Status: ${error.response.status}`);
            console.error(`  Data: ${JSON.stringify(error.response.data, null, 2)}`);
            if (error.response.status === 403) {
                res.status(500).json({ success: false, message: 'Chatbot API Error: Forbidden. Your API key might not have access to this model or billing is not enabled. Please check Google Cloud Console.' });
            } else if (error.response.status === 429) {
                res.status(500).json({ success: false, message: 'Chatbot API Error: Rate limit exceeded. Please try again in a moment.' });
            } else {
                res.status(500).json({ success: false, message: `Chatbot API error: ${error.response.status} - ${error.response.data?.message || 'Unknown Gemini API error.'}` });
            }
        } else if (error.message.includes("blocked")) {
             console.error("Content safety block detected:", error.message);
             res.status(500).json({ success: false, message: 'Your message was blocked by content safety policies. Please try rephrasing.' });
        }
        else {
            console.error("General Chatbot Error:", error);
            res.status(500).json({ success: false, message: 'Chatbot processing failed due to an unexpected error. Please try again later. (Check backend logs for details)' });
        }
    }
});

module.exports = router;