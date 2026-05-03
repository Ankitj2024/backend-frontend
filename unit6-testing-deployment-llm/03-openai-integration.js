// ============================================================================
// 📘 LESSON 03: OpenAI API & Prompt Engineering
// ============================================================================
//
// 🎯 LLM INTEGRATION
// -------------------
// Large Language Models (like GPT-4) can be integrated into your Node.js app 
// to summarize text, answer customer questions, or generate code.
//
// 🧠 PROMPT ENGINEERING
// ----------------------
// This is the art of "talking" to the AI to get the best results.
// 1. Be Specific: "Summarize this in 3 bullet points" instead of "Summarize this".
// 2. Give Context: "Act as a senior doctor..."
// 3. Chain of Thought: "Think step-by-step before answering".
// ============================================================================

const { OpenAI } = require('openai'); // npm install openai

// In real life, use process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey: 'YOUR_OPENAI_KEY' });

const askAI = async (userInput) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { 
                    role: "system", 
                    content: "You are a helpful teaching assistant for a Node.js course." 
                },
                { 
                    role: "user", 
                    content: userInput 
                }
            ],
            temperature: 0.7, // 0 is logical, 1 is creative
        });

        console.log("🤖 AI Answer:", response.choices[0].message.content);
    } catch (err) {
        console.error("❌ OpenAI Error:", err.message);
    }
};

// Example call:
// askAI("Explain the difference between a Promise and a Callback in one sentence.");

console.log("=== OpenAI Integration Demo Created ===");
