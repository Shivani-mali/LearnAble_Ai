const { getAiResponse } = require('../services/aiService');

const askAi = async (req, res) => {
  try {
    const { question, context } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const response = await getAiResponse(question, context);
    res.json({ success: true, data: response });
  } catch (error) {
    console.error('Error in askAi controller:', error);
    res.status(500).json({ success: false, error: 'Failed to process AI request' });
  }
};

module.exports = {
  askAi,
};
