const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

const getAiResponse = async (question, context, mode) => {
  console.log(`[AI Request] Question: "${question}", Mode: "${mode}"`);
  try {
    // 1. Initialize Gemini (requires GEMINI_API_KEY in .env)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 2. Learning Mode Controls AI (The Prompt Engine)
    let promptInstructions = "";
    
    if (mode && mode.includes("Focus")) {
      promptInstructions = "Explain briefly in 2–3 lines and ask a question. IMPORTANT: Set imageKeyword and videoKeyword to null.";
    } else if (mode && mode.includes("Easy Read")) {
      promptInstructions = "Use simple words and short sentences. Make it easy to read. IMPORTANT: Set videoKeyword to null, you may provide an imageKeyword.";
    } else if (mode && mode.includes("Step-by-Step")) {
      promptInstructions = "Explain this in a step-by-step format using clear, simple steps. IMPORTANT: Set imageKeyword and videoKeyword to null. Do NOT return image or video keywords.";
    } else if (mode && mode.includes("Structured")) {
      promptInstructions = "Provide a structured explanation with headings, bullet points, and a summary. Provide both an imageKeyword and a videoKeyword.";
    } else {
      promptInstructions = "Explain clearly and provide an example. Set imageKeyword and videoKeyword to null.";
    }

    const prompt = `
    You are an adaptive AI teacher.
    INSTRUCTIONS: ${promptInstructions}
    
    Question: ${question}
    Context: ${context || 'None'}
    
    Return a JSON object exactly with the following format (no markdown code blocks, just raw JSON):
    {
      "explanation": "your adaptive explanation here",
      "example": "an example demonstrating the concept",
      "imageKeyword": "a 1-2 word specific keyword to search for an educational illustration",
      "videoKeyword": "a short keyword phrase to search for an educational video on youtube",
      "quiz": "A simple question to check understanding",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A"
    }
    `;

    let aiData;
    
    if (process.env.GEMINI_API_KEY) {
      console.log(`[AI] Calling Gemini API...`);
      // Use real Gemini API
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      console.log(`[AI] Raw Response:`, responseText);
      const cleanJsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      try {
        aiData = JSON.parse(cleanJsonString);
        console.log(`[AI] Successfully parsed JSON.`);
      } catch (parseError) {
        console.error(`[AI Error] JSON Parse Failed. Using static fallback.`);
        aiData = {
          explanation: responseText, // Use raw text as fallback explanation
          example: "Please refer to the explanation.",
          imageKeyword: "learning",
          videoKeyword: "education",
          quiz: "Did you understand the concept?",
          options: ["Yes", "No", "Maybe", "Not sure"],
          correctAnswer: "Yes"
        };
      }
    } else {
      console.log(`[AI] Using Mock Data (No API Key)`);
      // Fallback to mock data if no API key is provided yet
      aiData = {
        explanation: `(Mock Data - Please add GEMINI_API_KEY to .env) ${promptInstructions} for: ${question}`,
        example: `Example related to ${question}`,
        imageKeyword: "education",
        videoKeyword: "learning",
        quiz: `Mock quiz about ${question}?`,
        options: ["A", "B", "C", "D"],
        correctAnswer: "A"
      };
    }

    // 3. Fetch Image from Unsplash (if API key exists)
    let imageUrl = null;
    if (process.env.UNSPLASH_ACCESS_KEY && aiData.imageKeyword) {
      console.log(`[API] Fetching Unsplash image for: ${aiData.imageKeyword}`);
      try {
        const unsplashRes = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: aiData.imageKeyword, per_page: 1, orientation: 'landscape' },
          headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
        });
        if (unsplashRes.data.results && unsplashRes.data.results.length > 0) {
          imageUrl = unsplashRes.data.results[0].urls.regular;
        }
      } catch (err) {
        console.error("[Unsplash API Error]:", err.message);
      }
    }

    // 4. Fetch Video from YouTube (if API key exists)
    let videoId = null;
    if (process.env.YOUTUBE_API_KEY && aiData.videoKeyword) {
      console.log(`[API] Fetching YouTube video for: ${aiData.videoKeyword}`);
      try {
        const youtubeRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            q: `${aiData.videoKeyword} education`,
            type: 'video',
            maxResults: 1,
            key: process.env.YOUTUBE_API_KEY
          }
        });
        if (youtubeRes.data.items && youtubeRes.data.items.length > 0) {
          videoId = youtubeRes.data.items[0].id.videoId;
        }
      } catch (err) {
        console.error("[YouTube API Error]:", err.message);
      }
    }

    return {
      ...aiData,
      imageUrl: imageUrl,
      videoId: videoId,
      promptUsed: prompt
    };

  } catch (error) {
    console.error("[AI System Error]:", error);
    throw new Error("Failed to process AI request. Check console for details.");
  }
};

module.exports = {
  getAiResponse,
};
