const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POSTメソッドを使ってください" });
  }

  const { message } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: "メッセージがありません" });
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "あなたは親切なアシスタントです。" },
        { role: "user", content: message }
      ],
    });

    const reply = response.data.choices[0].message.content;
    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
