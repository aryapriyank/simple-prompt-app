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
    temperature: 1.1, // goes from 0 to 2, higher values like 1.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic
    presence_penalty: 0, // -2.0 to 2.0, positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics
    frequency_penalty: 0, // -2.0 to 2.0, positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim
    stop: ["\n\n"], // Example stop sequence, the model will stop generating further output when it encounters this sequence
    // Fine tuning is a last resort when you need very specific behavior that cannot be achieved through prompt engineering or other parameters like temperature, few-shot examples, etc.
    // need at least 50 items in JSONL format (more is better) for fine tuning to be effective
});

console.log(response);

/* 
// Temperature, "Few shot" approach, Stop sequence, Frequency and Presence penalties
const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "low" },
    input: [
        {
            role: "developer",
            // content: "Explain things in language a 10-year-old can understand keeping answers under 100 words"
            content: 'You are a trading guru. Given data on share prices over the past 3 days, write a report of 
            no more than 150 words describing the stocks performance and recommending whether to buy, hold or 
            sell. Use the examples provided between ### to set the style your response.'
        },
        {
            role: "user",
            //content: "What is Quantum Computing?",
            content: `${data}
            ###
            OK baby, hold on tight! You are going to haate this! Over the past three days, Tesla (TSLA) shares have 
            plummetted. The stock opened at $223.98 and closed at $202.11 on the third day, with some jumping around 
            in the meantime. This is a great time to buy, baby! But not a great time to sell! But I'm not done! Apple 
            (AAPL) stocks have gone stratospheric! This is a seriously hot stock right now. They opened at $166.38 and 
            closed at $182.89 on day three. So all in all, I would hold on to Tesla shares tight if you already have 
            them - they might bounce right back up and head to the stars! They are volatile stock, so expect the 
            unexpected. For APPL stock, how much do you need the money? Sell now and take the profits or hang on and 
            wait for more! If it were me, I would hang on because this stock is on fire right now!!! Apple are throwing 
            a Wall Street party and y'all invited!
            ###
            Apple (AAPL) is the supernova in the stock sky – it shot up from $150.22 to a jaw-dropping $175.36 by the 
            close of day three. We’re talking about a stock that’s hotter than a pepper sprout in a chilli cook-off, 
            and it’s showing no signs of cooling down! If you’re sitting on AAPL stock, you might as well be sitting on 
            the throne of Midas. Hold on to it, ride that rocket, and watch the fireworks, because this baby is just 
            getting warmed up! Then there’s Meta (META), the heartthrob with a penchant for drama. It winked at us with 
            an opening of $142.50, but by the end of the thrill ride, it was at $135.90, leaving us a little lovesick. 
            It’s the wild horse of the stock corral, bucking and kicking, ready for a comeback. META is not for the 
            weak-kneed So, sugar, what’s it going to be? For AAPL, my advice is to stay on that gravy train. As for META, 
            keep your spurs on and be ready for the rally.
            ###
            `
        },
    ],
}); */

// console.log(response)
    // output[0].content[0].text
    // .choices[0].message.content