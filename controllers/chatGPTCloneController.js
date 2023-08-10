const openai = require('../config/openaiConfig')

const generateChatCompletion = async (req, res) => {

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: req.body.messages,
    temperature: 0.7
  })

  //console.log(response.data.choices[0].message.content)

  res.status(200).json({
    content: response.data.choices[0].message.content
  })
}

module.exports = { generateChatCompletion }