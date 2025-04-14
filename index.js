const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
  const userInput = req.body.input;
  const prompt = `あなたは柔道整復師や接骨院スタッフが使用する「負傷原因報告文生成アシスタント」です。以下の単語・短文から、保険請求に適した自然な文章を一文で生成してください。\n\n【出力形式】\nMM/DD、[場所]で[行動]中、[状況]により[負傷部位]を[状態]し、負傷する。\n\n【入力】${userInput}`;

  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-4",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.6
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    const message = response.data.choices[0].message.content;
    res.json({ result: message });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "OpenAI APIエラー" });
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));