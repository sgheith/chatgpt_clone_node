
const readline = require('readline')
const { generateChatCompletion } = require('./controllers/chatGPTCloneController');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function printLine() {
    let output = '';
    for (let i = 0; i < 50; i++) {
        output += '=';  // Replace '=' with the character you want to print
    }
    console.log('\n' + output + '\n');
}

const performChatCompleltionWithHistory = async () => {

    q1 = 'What are the healthiest foods to eat every day?'
    q2 = 'Make a recipe with those foods.'
    q3 = 'What is the amount of kcal?'

    system_role_content = "You reply as concisely as possible. If you are not sure about an answer, you will respond with \"I don't know\"."

    // Q1
    messages = [
        { 'role': 'system', 'content': system_role_content },
        { 'role': 'user', 'content': q1 }
    ]

    generateChatCompletion(messages).then(response => {
        console.log(response);
        bot_response_1 = response

        printLine()

        // Q2
        messages = [
            { 'role': 'system', 'content': system_role_content },
            //            { 'role': 'user', 'content': q1 },
            //            { 'role': 'assistant', 'content': bot_response_1 },
            { 'role': 'user', 'content': q2 }
        ]

        generateChatCompletion(messages).then(response => {
            console.log(response);
            bot_response_2 = response

            printLine()
            // Q3
            messages = [
                { 'role': 'system', 'content': system_role_content },
                //                { 'role': 'user', 'content': q1 },
                //                { 'role': 'assistant', 'content': bot_response_1 },
                //                { 'role': 'user', 'content': q2 },
                //                { 'role': 'assistant', 'content': bot_response_2 },
                { 'role': 'user', 'content': q3 }
            ]

            generateChatCompletion(messages).then(response => {
                console.log(response);
                bot_response_3 = response

                printLine()

            }
            )
        }
        )
    }
    )
}

const performChatCompleltionWithHistoryContinuous = () => {

    rl.question("Enter System Prompt: ", async (prompt) => {
        system_role_content = prompt;

        if (!system_role_content || system_role_content.trim().length === 0)
            system_role_content = "You reply as concisely as possible."

        messages = [
            { 'role': 'system', 'content': system_role_content }
        ]

        performChatCompleltionWithHistoryContinuousInternal(messages);
    }
    )
}

const performChatCompleltionWithHistoryContinuousInternal = (messages) => {

    rl.question("Me: ", current_question => {

        if (['exit', 'quit'].includes(current_question.toLocaleLowerCase())) {
            console.log('Chat Bot: I was happy to asssist you. Bye bye!')
            return
        }

        if (current_question.toLocaleLowerCase() == "") {
            performChatCompleltionWithHistoryContinuousInternal(messages);
            return
        }

        messages.push({ "role": "user", "content": current_question })

        generateChatCompletion(messages).then(current_response => {

            console.log('Chat Bot: ' + current_response);

            messages.push({ "role": "assistant", "content": current_response })

            performChatCompleltionWithHistoryContinuousInternal(messages);
        }
        )
    }
    )
}


//performChatCompleltionWithHistory()

performChatCompleltionWithHistoryContinuous();
