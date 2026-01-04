import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: 'YOUR_API_KEY_HERE',
    dangerouslyAllowBrowser: true
})

const messages = [{"role": "user", "content": "What's the weather like in Boston today?"}];
const tools = [
    {
    "type": "function",
    "function": {
        "name": "get_current_weather",
        "description": "Get the current weather in a given location",
        "parameters": {
        "type": "object",
        "properties": {
            "location": {
            "type": "string",
            "description": "The city and state, e.g. San Francisco, CA",
            },
            "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
        },
        "required": ["location"],
        },
    }
    }
];

const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: messages,
    tools: tools,
    tool_choice: "auto",
});

console.log(response);

/* const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "low" },
    input: [
        {
            role: "developer",
            content: "Explain things in language a 10-year-old can understand keeping answers under 100 words"
        },
        {
            role: "user",
            content: "What is Quantum Computing?",
        },
    ],
}); */

// console.log(response)
    // output[0].content[0].text
    // .choices[0].message.content