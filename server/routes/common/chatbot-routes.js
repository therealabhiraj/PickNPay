// // C:\Users\abhi1\Downloads\PickNPay\PickNPay\server\routes\common\chatbot-routes.js

// require('dotenv').config(); // Load environment variables
// const express = require('express');
// const router = express.Router(); // Create a new router instance

// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const Product = require('../../models/Product'); // IMPORTANT: Adjust this path if your Product.js is elsewhere relative to THIS file!

// // Initialize Gemini API client ONCE at the top
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Helper function to query your MongoDB database for products
// async function searchProducts(keywords, category, brand, limit = 5) {
//     try {
//         let findQuery = {};
//         if (keywords) {
//             findQuery.$or = [
//                 { title: { $regex: keywords, $options: 'i' } },
//                 { description: { $regex: keywords, $options: 'i' } },
//                 { category: { $regex: keywords, $options: 'i' } },
//                 { brand: { $regex: keywords, $options: 'i' } },
//             ];
//         }
//         if (category) {
//             if (findQuery.$or) {
//                 findQuery = { ...findQuery, category: new RegExp(category, 'i') };
//             } else {
//                 findQuery.category = new RegExp(category, 'i');
//             }
//         }
//         if (brand) {
//             findQuery.brand = new RegExp(brand, 'i');
//         }

//         const products = await Product.find(findQuery).limit(limit);

//         if (products.length === 0) {
//             return { message: "No products found matching your criteria." };
//         }

//         return products.map(p => ({
//             id: p._id.toString(),
//             name: p.title,
//             brand: p.brand,
//             category: p.category,
//             price: p.price,
//             link: `http://localhost:5173/shop/product/${p._id.toString()}`
//         }));
//     } catch (error) {
//         console.error("Error searching products in database:", error);
//         return { error: "An error occurred while searching for products in the database. Please try again." };
//     }
// }

// // Define the tool that Gemini can use to search for products in your database
// const productSearchTool = {
//     functionDeclarations: [
//         {
//             name: "getProducts",
//             description: "Retrieves products from the database based on category, brand, or keywords. Can also list all available categories or brands if requested.",
//             parameters: {
//                 type: "object",
//                 properties: {
//                     category: {
//                         type: "string",
//                         description: "The product category (e.g., 'Clothing', 'Footwear', 'Accessories'). Optional.",
//                     },
//                     brand: {
//                         type: "string",
//                         description: "The brand name (e.g., 'Nike', 'Adidas'). Optional.",
//                     },
//                     keywords: {
//                         type: "string",
//                         description: "General keywords to search for in product titles or descriptions (e.g., 'shoes', 'bag'). Optional.",
//                     },
//                     limit: {
//                         type: "number",
//                         description: "Maximum number of products to return. Defaults to 5. Optional.",
//                     }
//                 },
//             },
//         },
//     ],
// };


// console.log("--- DEBUGGING genAI INSTANCE ---");
// console.log("DEBUG: GEMINI_API_KEY loaded:", process.env.GEMINI_API_KEY ? "Key present" : "Key NOT present!");
// console.log("DEBUG: Type of genAI:", typeof genAI);
// console.log("DEBUG: Does genAI have listModels method?", typeof genAI.listModels === 'function');
// console.log("DEBUG: genAI object itself:", genAI); // This will print the full object if possible
// console.log("----------------------------------");
// // --- START OF ADDED BLOCK FOR LISTING MODELS ---
// // This function will run automatically when the server starts
// async function listAvailableModels() {
//     try {
//         const { models } = await genAI.listModels(); // Using the genAI declared at the top
//         console.log("\n--- Available Gemini Models for your API Key ---");
//         for (const model of models) {
//             console.log(`Name: ${model.name}`);
//             console.log(`  DisplayName: ${model.displayName}`);
//             console.log(`  SupportedMethods: ${model.supportedGenerationMethods.join(', ')}`);
//             console.log(`  PromptTokenLimit: ${model.inputTokenLimit}`);
//             console.log(`  OutputTokenLimit: ${model.outputTokenLimit}`);
//             console.log(`-----------------------------------`);
//         }
//         console.log("-----------------------------------\n");
//     } catch (error) {
//         console.error("Error listing models:", error);
//     }
// }
// listAvailableModels(); // Call the function to execute on server startup
// // --- END OF ADDED BLOCK ---


// // Initialize Gemini API with the tool (using "gemini-pro" for now, will adjust after listModels output)
// // THIS IS THE ONLY PLACE modelWithTools should be defined after the single genAI declaration
// const modelWithTools = genAI.getGenerativeModel({
//     model: "gemini-pro", // Will be replaced with the correct name from listModels output
//     tools: [productSearchTool],
// });

// // This object will store conversation history for each session/user in memory.
// const chatSessions = {};

// // The chatbot API route
// router.post('/message', async (req, res) => {
//     const { userId, message } = req.body;

//     if (!userId || !message) {
//         return res.status(400).json({ success: false, message: 'userId and message are required.' });
//     }

//     // This block correctly initializes the chat session AND sends the system prompt ONCE
//     if (!chatSessions[userId]) {
//         chatSessions[userId] = modelWithTools.startChat({
//             history: [],
//             generationConfig: {
//                 maxOutputTokens: 500,
//             },
//             tools: [productSearchTool],
//         });

//         // SYSTEM PROMPT - UNCOMMENTED AND ACTIVE
//         await chatSessions[userId].sendMessage(`
//             You are a helpful e-commerce assistant for PickNPay. Your main goal is to help users find products using the 'getProducts' tool.
//         `);
//         console.log(`[Chatbot] New chat session initialized for user ${userId} with system prompt.`);
//     }

//     try {
//         const chat = chatSessions[userId];
//         console.log(`[Chatbot] User ${userId} sent: "${message}"`);
//         const result = await chat.sendMessage(message);
//         const response = result.response;

//         console.log("[Chatbot] Raw AI Response Text:", response.text());
//         console.log("[Chatbot] Raw AI Response ToolCalls:", response.toolCalls);

//         const toolCalls = response.toolCalls;

//         if (toolCalls && toolCalls.length > 0) {
//             let toolOutputs = [];
//             for (const toolCall of toolCalls) {
//                 const { name, args } = toolCall;
//                 if (name === "getProducts") {
//                     console.log("Gemini requested getProducts with args:", args);
//                     const productsResult = await searchProducts(args.keywords, args.category, args.brand, args.limit);
//                     toolOutputs.push({
//                         toolCall: toolCall,
//                         result: productsResult
//                     });
//                 } else {
//                     toolOutputs.push({
//                         toolCall: toolCall,
//                         result: { error: `Unknown tool: ${name}` }
//                     });
//                 }
//             }

//             const toolResponseResult = await chat.sendMessage({
//                 toolOutputs: toolOutputs
//             });
//             const finalResponse = await toolResponseResult.response;
//             res.json({ success: true, aiMessage: finalResponse.text() });

//         } else {
//             console.log("[Chatbot] No tool call generated by AI for this message.");
//             res.json({ success: true, aiMessage: response.text() });
//         }

//     } catch (error) {
//         console.error('Error in chatbot message processing:', error);
//         if (error.response && error.response.status) {
//             console.error('Gemini API Response Error Details:', error.response.status, error.response.data);
//             res.status(500).json({ success: false, message: `Chatbot API error: ${error.response.status}. Please check backend logs.` });
//         } else {
//             res.status(500).json({ success: false, message: 'Failed to get a response from the chatbot. Please try again later.' });
//         }
//     }
// });

// module.exports = router;

// require('dotenv').config();
// const express = require('express');
// const router = express.Router();

// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const Product = require('../../models/Product');

// // --- START: API Key Initialization & Core Diagnostic Function ---
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function testGeminiConnectivity() {
//     const apiKey = process.env.GEMINI_API_KEY;
//     if (!apiKey) {
//         console.error("🔴 ERROR: GEMINI_API_KEY is NOT set in your .env file!");
//         console.error("Please ensure you have a .env file at the root of your server directory with GEMINI_API_KEY=YOUR_API_KEY_HERE.");
//         return false;
//     }
//     console.log("🟢 GEMINI_API_KEY is present and loaded. Attempting basic connectivity test with 'gemini-2.5-pro'...");

//     try {
//         const testModel = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
//         const result = await testModel.generateContent("Hello, how are you today?");
//         const response = result.response;
//         const text = response.text();
//         if (text) {
//             console.log(`✅ Gemini basic connectivity test successful with 'gemini-2.5-pro'.`);
//             console.log(`   Response snippet: "${text.substring(0, Math.min(text.length, 50))}..."`);
//             return true;
//         } else {
//             console.error("⚠️ Gemini basic connectivity test returned empty text response, but no error was thrown.");
//             console.error("Full response object from test (raw parts):", JSON.stringify(response.candidates?.[0]?.content?.parts || response, null, 2));
//             console.error("Check for 'safetyRatings' or 'promptFeedback' in the raw response above.");
//             return false;
//         }
//     } catch (error) {
//         console.error("❌ Gemini basic connectivity test FAILED!");
//         console.error("Gemini connectivity error details:");
//         if (error.response?.status) {
//             console.error(`  Status: ${error.response.status}`);
//             console.error(`  Data: ${JSON.stringify(error.response.data, null, 2)}`);
//             if (error.response.status === 403) {
//                 console.error("   Reason: 403 Forbidden. This often means your API key is invalid, or the model 'gemini-2.5-pro' is not accessible to your project/billing account.");
//                 console.error("   ACTION: Double-check your API key in Google AI Studio/Cloud Console. Ensure billing is enabled for your project and that 'Generative Language API' or 'Vertex AI API' is enabled for the correct project.");
//             } else if (error.response.status === 400) {
//                  console.error("   Reason: 400 Bad Request. This might indicate an incorrect model name or a malformed request.");
//             }
//         } else {
//             console.error(`  General Error Message: ${error.message}`);
//             console.error("   This could be a network issue, DNS problem, or another client-side problem before the API is hit.");
//         }
//         console.error("   Please investigate your Google Cloud Console / Google AI Studio dashboard for more detailed error logs and API key status.");
//         return false;
//     }
// }
// // --- END: API Key and Model Connectivity Test Function ---


// const productSearchTool = {
//     functionDeclarations: [
//         {
//             name: "getProducts",
//             description: "Search for products specifically on the PickNPay e-commerce website database. Use this tool *whenever* a user asks to find, list, or inquire about products, categories, or brands available on *this* store. Do NOT search external websites or provide product information if this tool can be used. Parameters are optional but try to extract keywords, categories, or brands from the user's query.",
//             parameters: {
//                 type: "object",
//                 properties: {
//                     category: { type: "string", description: "The product category (e.g., 'Clothing', 'Footwear', 'Accessories')." },
//                     brand: { type: "string", description: "The brand name (e.g., 'Nike', 'Adidas')." },
//                     keywords: { type: "string", description: "General keywords to search for in product titles or descriptions (e.g., 'shoes', 'bag')." },
//                     limit: { type: "number", description: "Maximum number of products to return, defaults to 5." }
//                 },
//             },
//         },
//     ],
// };

// const modelWithTools = genAI.getGenerativeModel({
//     model: "gemini-2.5-pro",
//     tools: [productSearchTool],
//     safetySettings: [
//       { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
//       { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
//       { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
//       { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
//     ],
// });

// const chatSessions = {};

// // Run connectivity test on server start
// (async () => {
//     console.log("\n--- Starting Gemini API Pre-flight Connectivity Check ---");
//     await testGeminiConnectivity();
//     console.log("--- Gemini API Pre-flight Check Complete ---\n");
// })();


// async function searchProducts(keywords, category, brand, limit = 5) {
//     console.log(`[DB DEBUG] searchProducts called - Raw Inputs: keywords='${keywords}', category='${category}', brand='${brand}', limit=${limit}`);
//     try {
//         let findQuery = {};
//         let $orConditions = [];

//         // Normalize inputs to ensure they are strings or null/undefined, not empty objects from Mongoose
//         keywords = keywords === null || keywords === undefined ? undefined : String(keywords).trim();
//         category = category === null || category === undefined ? undefined : String(category).trim();
//         brand = brand === null || brand === undefined ? undefined : String(brand).trim();

//         // Ensure keywords is not an empty string after trimming
//         if (keywords === '') keywords = undefined;
//         if (category === '') category = undefined;
//         if (brand === '') brand = undefined;

//         console.log(`[DB DEBUG] searchProducts - Cleaned Inputs: keywords='${keywords}', category='${category}', brand='${brand}'`);


//         // If keywords are provided, they should search title, description.
//         if (keywords) {
//             $orConditions.push(
//                 { title: { $regex: keywords, $options: 'i' } },
//                 { description: { $regex: keywords, $options: 'i' } }
//             );

//             // Only add category to $or if it's not provided as a separate filter
//             if (!category) {
//                 $orConditions.push({ category: { $regex: keywords, $options: 'i' } });
//             }
//             // Only add brand to $or if it's not provided as a separate filter
//             if (!brand) {
//                 $orConditions.push({ brand: { $regex: keywords, $options: 'i' } });
//             }
//         }

//         // If any $or conditions exist, add them to the query
//         if ($orConditions.length > 0) {
//             findQuery.$or = $orConditions;
//         }

//         // If category is explicitly provided AND is not empty, add it as a top-level AND condition
//         if (category) {
//             findQuery.category = { $regex: category, $options: 'i' };
//         }

//         // If brand is explicitly provided AND is not empty, add it as a top-level AND condition
//         if (brand) {
//             findQuery.brand = { $regex: brand, $options: 'i' };
//         }
        
//         console.log("[DB] Final MongoDB Query:", JSON.stringify(findQuery));

//         const products = await Product.find(findQuery).limit(limit);

//         console.log(`[DB] Found ${products.length} products.`);

//         if (products.length === 0) {
//             return { message: "No products found matching your criteria." };
//         }

//         return products.map(p => ({
//             id: p._id.toString(),
//             name: p.title,
//             brand: p.brand,
//             category: p.category,
//             price: p.price,
//             link: `http://localhost:5173/shop/product/${p._id.toString()}`
//         }));
//     } catch (error) {
//         console.error("❌ DB Error during product search:", error);
//         return { error: "An error occurred while searching for products in the database. Please try again." };
//     }
// }

// router.post('/message', async (req, res) => {
//     const { userId, message } = req.body;

//     console.log(`\n--- Incoming Chat Message ---`);
//     console.log(`[Request] userId: ${userId}, message: "${message}"`);

//     if (!userId || !message) {
//         console.error("[Error] Missing userId or message in request.");
//         return res.status(400).json({ success: false, message: 'userId and message are required.' });
//     }

//     if (!chatSessions[userId]) {
//         console.log(`[Chatbot] 🔄 New session started for user ${userId}`);
//         chatSessions[userId] = modelWithTools.startChat({
//             history: [
//                 {
//                     role: "user",
//                     parts: [{ text: `You are a dedicated e-commerce product assistant for the PickNPay online store. Your ONLY goal is to help users find products available on this website. When a user asks about products, categories, or brands, you MUST use the 'getProducts' tool. Do NOT attempt to answer product-related questions using your general knowledge or search external websites. If the 'getProducts' tool returns no results, inform the user that no matching products were found on PickNPay.` }],
//                 },
//                 {
//                     role: "model",
//                     parts: [{ text: "Hello! How can I help you find products on PickNPay today?" }],
//                 },
//                 {
//                     role: "user",
//                     parts: [{ text: "Can you find me some running shoes?" }],
//                 },
//                 {
//                     role: "model",
//                     parts: [{
//                         functionCall: {
//                             name: "getProducts",
//                             args: { keywords: "running shoes", limit: 5 },
//                         },
//                     }],
//                 },
//                 {
//                     role: "function",
//                     parts: [{
//                         functionResponse: {
//                             name: "getProducts",
//                             response: {
//                                 products: [
//                                     { id: "123", name: "Nike Air Zoom", brand: "Nike", price: 120, link: "http://localhost:5173/shop/product/123" },
//                                     { id: "124", name: "Adidas Ultraboost", brand: "Adidas", price: 150, link: "http://localhost:5173/shop/product/124" },
//                                 ],
//                             },
//                         },
//                     }],
//                 },
//                 {
//                     role: "model",
//                     parts: [{ text: "Sure, I found a few running shoes for you: Nike Air Zoom, Adidas Ultraboost. Would you like links or more details?" }],
//                 },
//                 {
//                     role: "user",
//                     parts: [{ text: "Are there any products from 'XYZ Brand'?" }],
//                 },
//                 {
//                     role: "model",
//                     parts: [{
//                         functionCall: {
//                             name: "getProducts",
//                             args: { brand: "XYZ Brand" },
//                         },
//                     }],
//                 },
//                 {
//                     role: "function",
//                     parts: [{
//                         functionResponse: {
//                             name: "getProducts",
//                             response: {
//                                 message: "No products found matching your criteria."
//                             },
//                         },
//                     }],
//                 },
//                 {
//                     role: "model",
//                     parts: [{ text: "I'm sorry, I couldn't find any products from XYZ Brand on PickNPay. Please try another brand or search term." }],
//                 },
//             ],
//             generationConfig: { maxOutputTokens: 500 },
//         });
//         console.log(`[Chatbot] New chat session initialized for user ${userId} with example history.`);
//     }

//     try {
//         console.log(`[Chatbot] Sending message to Gemini model...`);
//         const chat = chatSessions[userId];
//         const result = await chat.sendMessage(message);
//         const response = result.response;

//         console.log("\n--- Gemini Model Raw Response Analysis ---");
//         console.log("[Chatbot] Raw response.candidates?.[0]?.content?.parts:", JSON.stringify(response.candidates?.[0]?.content?.parts, null, 2));
//         console.log("[Chatbot] Raw response.promptFeedback:", JSON.stringify(response.promptFeedback, null, 2));
//         console.log("[Chatbot] Raw response.safetyRatings:", JSON.stringify(response.safetyRatings, null, 2));

//         const aiText = response.text();
//         let extractedToolCalls = [];

//         const rawContentParts = response.candidates?.[0]?.content?.parts;
//         if (rawContentParts) {
//             for (const part of rawContentParts) {
//                 if (part.functionCall) {
//                     extractedToolCalls.push(part.functionCall);
//                 }
//             }
//         }

//         console.log("[Chatbot] 🧠 AI Reply Text (from response.text()):", aiText || "[No direct text response from model]");
//         console.log("[Chatbot] 🛠️ Extracted Tool Calls (from raw parts):", extractedToolCalls.length > 0 ? JSON.stringify(extractedToolCalls) : "[No tool calls extracted from raw parts]");
//         console.log("--- End Gemini Model Raw Response Analysis ---\n");

//         if (extractedToolCalls.length > 0) {
//             console.log(`[Chatbot] Detected ${extractedToolCalls.length} tool call(s). Executing functions...`);
//             let toolOutputs = [];

//             for (const toolCall of extractedToolCalls) {
//                 const { name, args } = toolCall;
//                 console.log(`🔍 AI requested tool: '${name}' with args:`, args);

//                 if (name === "getProducts") {
//                     console.log("[Chatbot] Executing getProducts tool...");
//                     const productsResult = await searchProducts(args.keywords, args.category, args.brand, args.limit);
//                     console.log("[Chatbot] getProducts tool result:", JSON.stringify(productsResult).substring(0, Math.min(JSON.stringify(productsResult).length, 200)) + (JSON.stringify(productsResult).length > 200 ? "..." : ""));
//                     toolOutputs.push({ toolCall, result: productsResult });
//                 } else {
//                     const errorResult = { error: `Unknown tool: ${name}` };
//                     toolOutputs.push({ toolCall, result: errorResult });
//                     console.error(`❌ Tool '${name}' is unknown. Result:`, errorResult);
//                 }
//             }
//             console.log("[Chatbot] Sending tool outputs back to AI for final response generation...");
            
//             // Debugging: Log what is being sent to sendMessage
//             const partsToSend = toolOutputs.map(output => ({
//                 functionResponse: {
//                     name: output.toolCall.name,
//                     response: output.result
//                 }
//             }));
//             console.log("[Chatbot DEBUG] Parts being sent to sendMessage:", JSON.stringify(partsToSend));

//             // Fix for TypeError: request is not iterable - ensure sendMessage receives an array of FunctionResponsePart objects directly.
//             const toolResponse = await chat.sendMessage(partsToSend); // Pass the array directly


//             const finalResponse = toolResponse.response;
//             const finalAiMessage = finalResponse.text() || "I processed your request using my tools, but I don't have a direct text response for this specific action. Please check the product listings.";
//             console.log("[Chatbot] Final AI Response after tool execution:", finalAiMessage);
//             return res.json({ success: true, aiMessage: finalAiMessage });
//         } else {
//             const finalAiMessage = aiText || "I couldn't generate a response or find a relevant product. Can you please rephrase?";
//             console.log("[Chatbot] No tool calls extracted. Direct AI response:", finalAiMessage);
//             res.json({ success: true, aiMessage: finalAiMessage });
//         }

//     } catch (error) {
//         console.error("❌ Chatbot processing failed in main try-catch block:");
//         if (error.response?.status) {
//             console.error("Gemini API error details (from sendMessage call):");
//             console.error(`  Status: ${error.response.status}`);
//             console.error(`  Data: ${JSON.stringify(error.response.data, null, 2)}`);
//             if (error.response.status === 403) {
//                 res.status(500).json({ success: false, message: 'Chatbot API Error: Forbidden. Your API key might not have access to this model or billing is not enabled. Please check Google Cloud Console.' });
//             } else if (error.response.status === 429) {
//                 res.status(500).json({ success: false, message: 'Chatbot API Error: Rate limit exceeded. Please try again in a moment.' });
//             } else {
//                 res.status(500).json({ success: false, message: `Chatbot API error: ${error.response.status} - ${error.response.data?.message || 'Unknown Gemini API error.'}` });
//             }
//         } else if (error.message.includes("blocked")) {
//              console.error("Content safety block detected:", error.message);
//              res.status(500).json({ success: false, message: 'Your message was blocked by content safety policies. Please try rephrasing.' });
//         }
//         else {
//             console.error("General Chatbot Error:", error);
//             res.status(500).json({ success: false, message: 'Chatbot processing failed due to an unexpected error. Please try again later. (Check backend logs for details)' });
//         }
//     }
// });

// module.exports = router;

require('dotenv').config();
const express = require('express');
const router = express.Router();

const { GoogleGenerativeAI } = require('@google/generative-ai');
const Product = require('../../models/Product'); // Assuming Product model is correctly linked

// --- START: API Key Initialization & Core Diagnostic Function ---
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
// --- END: API Key and Model Connectivity Test Function ---


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

// Run connectivity test on server start
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

        // Normalize inputs to ensure they are strings or null/undefined, not empty objects from Mongoose
        keywords = keywords === null || keywords === undefined ? undefined : String(keywords).trim();
        category = category === null || category === undefined ? undefined : String(category).trim();
        brand = brand === null || brand === undefined ? undefined : String(brand).trim();

        // Ensure keywords is not an empty string after trimming
        if (keywords === '') keywords = undefined;
        if (category === '') category = undefined;
        if (brand === '') brand = undefined;

        console.log(`[DB DEBUG] searchProducts - Cleaned Inputs: keywords='${keywords}', category='${category}', brand='${brand}'`);


        // If keywords are provided, they should search title, description.
        if (keywords) {
            $orConditions.push(
                { title: { $regex: keywords, $options: 'i' } },
                { description: { $regex: keywords, $options: 'i' } } // FIXED: Changed 'options' to '$options'
            );

            // Only add category to $or if it's not provided as a separate filter
            if (!category) {
                $orConditions.push({ category: { $regex: keywords, $options: 'i' } });
            }
            // Only add brand to $or if it's not provided as a separate filter
            if (!brand) {
                $orConditions.push({ brand: { $regex: keywords, $options: 'i' } });
            }
        }

        // If any $or conditions exist, add them to the query
        if ($orConditions.length > 0) {
            findQuery.$or = $orConditions;
        }

        // If category is explicitly provided AND is not empty, add it as a top-level AND condition
        if (category) {
            findQuery.category = { $regex: category, $options: 'i' };
        }

        // If brand is explicitly provided AND is not empty, add it as a top-level AND condition
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
            name: p.title, // Assuming 'title' is the product name in your schema
            brand: p.brand,
            category: p.category,
            price: p.price,
            link: `http://localhost:5173/shop/product/${p._id.toString()}`
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
                {
                    role: "user",
                    parts: [{ text: `
                        You are a dedicated e-commerce product assistant for the PickNPay online store.
                        Your ONLY goal is to help users find products available on this website.
                        When a user asks about products, categories, or brands, you MUST use the 'getProducts' tool.
                        Do NOT attempt to answer product-related questions using your general knowledge or search external websites.
                        If the 'getProducts' tool returns no results, inform the user that no matching products were found on PickNPay.
                        **IMPORTANT: Under no circumstances should you provide any links (URLs) in your responses.**
                        If a user asks for product details or wants to see a product, describe it or guide them to the relevant section of the website without providing a direct link.
                        For example, instead of a link, you could say: "You can find the Nike GPS Cellular Smartwatch on our 'Smartwatches' category page."
                        Keep your responses helpful and informative, but strictly avoid URLs.
                    ` }],
                },
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
                                    { id: "123", name: "Nike Air Zoom", brand: "Nike", price: 120, link: "http://localhost:5173/shop/product/123" },
                                    { id: "124", name: "Adidas Ultraboost", brand: "Adidas", price: 150, link: "http://localhost:5173/shop/product/124" },
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
            
            // Fix for the "Proto field is not repeating" error (ensuring 'response' is always an object)
            const partsToSend = toolOutputs.map(output => {
                const functionResponsePayload = {};
                if (Array.isArray(output.result)) {
                    // If the result is an array of products, put it under a 'products' key
                    functionResponsePayload.products = output.result;
                } else if (typeof output.result === 'object' && output.result !== null) {
                    // If the result is an object (like {message: "..."} or {error: "..."}), merge its properties
                    Object.assign(functionResponsePayload, output.result);
                } else {
                    // Fallback for any other unexpected primitive result (shouldn't happen with current setup)
                    functionResponsePayload.data = output.result;
                }

                return {
                    functionResponse: {
                        name: output.toolCall.name,
                        response: functionResponsePayload // Ensure this is always a JSON object
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