// This service would integrate with OpenAI or another AI provider.
// For now, it returns a mock response.

const getAiResponse = async (question, context) => {
  // TODO: Integrate actual AI API (e.g., OpenAI)
  // const prompt = `
  // Explain this concept for a student with cognitive difficulties:
  // - Use very simple language
  // - Break into steps
  // - Give one example
  // - Ask one question at the end
  // 
  // Concept: ${question}
  // Context: ${context}
  // `;
  
  return {
    explanation: `This is a simple explanation for: ${question}. It is broken down into easy steps.`,
    example: "For example, if you have 1 apple and get 1 more, you have 2 apples.",
    question: "How many apples do you have now?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
  };
};

module.exports = {
  getAiResponse,
};
