const axios = require('axios'); // axios追加
require('dotenv').config(); // .envの読み込み

app.use(express.json()); // JSONで受け取れるようにする

app.post('/ask', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
