const openai = require('../config/openaiConfig')

const generateChatCompletion = async (messages) => {

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7
  })

  //console.log(response.data.choices[0].message.content)

  return response.data.choices[0].message.content

}

module.exports = { generateChatCompletion }