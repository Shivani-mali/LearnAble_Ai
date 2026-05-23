// This service would integrate with OpenAI or another AI provider.
// For now, it returns a simulated adaptive response based on the "model" logic.

const getAiResponse = async (question, context, mode) => {
  // 🧠 1. Learning Mode Controls AI (The Prompt Engine)
  let promptInstructions = "";
  
  if (mode && mode.includes("Focus")) {
    promptInstructions = "Explain briefly in 2–3 lines and ask a question.";
  } else if (mode && mode.includes("Easy Read")) {
    promptInstructions = "Use simple words and short sentences. Make it easy to read.";
  } else if (mode && mode.includes("Step-by-Step")) {
    promptInstructions = "Explain this in a step-by-step format using clear, simple steps.";
  } else if (mode && mode.includes("Structured")) {
    promptInstructions = "Provide a structured explanation with headings, bullet points, and a summary.";
  } else {
    promptInstructions = "Explain clearly and provide an example.";
  }

  // The actual prompt to OpenAI would look like this:
  const prompt = `
  You are an adaptive AI teacher.
  INSTRUCTIONS: ${promptInstructions}
  
  Question: ${question}
  Context: ${context || 'None'}
  
  Return a JSON object exactly with the following format (no markdown):
  {
    "explanation": "your adaptive explanation here",
    "imageKeyword": "keyword for unsplash",
    "videoKeyword": "keyword for youtube",
    "quiz": "A simple question to check understanding",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "A"
  }
  `;

  // 🧠 2. Simulated Dynamic Response (What OpenAI would return)
  // Here we mock the AI response based on the selected mode.
  let explanation = `This is a standard explanation of ${question}.`;
  
  if (mode && mode.includes("Focus")) {
    explanation = `${question} is essentially a fundamental concept in this topic. It allows us to understand how things work together simply.`;
  } else if (mode && mode.includes("Easy Read")) {
    explanation = `${question} is very easy to understand. Imagine you have a box of toys. It is like organizing those toys so you can find them fast!`;
  } else if (mode && mode.includes("Step-by-Step")) {
    explanation = `1. First, we identify what ${question} is.\n2. Next, we see how it applies to our problem.\n3. Finally, we use it to get the solution.`;
  } else if (mode && mode.includes("Structured")) {
    explanation = `**Introduction**\n${question} is a core principle.\n\n**Key Points**\n- It is useful.\n- It is efficient.\n\n**Summary**\nMastering it helps you learn faster.`;
  }

  return {
    explanation: explanation,
    example: `Example related to ${question} (${mode || 'Default Mode'})`,
    imageKeyword: `${question} educational illustration`,
    videoKeyword: `${question} simple explanation`,
    quiz: `Based on what you just learned, what is the most important part of ${question}?`,
    options: ["Part A", "Part B", "Part C", "Part D"],
    correctAnswer: "Part B",
    promptUsed: prompt // Included to demonstrate the Prompt Engine works
  };
};

module.exports = {
  getAiResponse,
};
