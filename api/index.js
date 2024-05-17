const OpenAI = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const {messages} = require('./messages')

const app = express();
app.use(bodyParser.json());
app.use(cors());


const openai = new OpenAI({
    apiKey: process.env.API_TOKEN
});

app.get('/', (req, res) => {
    res.send('Welcome to the Coding Nexus API')
})

app.post('/message', async(req, res) => {
    try{
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [...messages,{"role": "user", "content": req.body.message},]
        });
        const message = chatCompletion.choices[0].message.content;
        // console.log({message})
        res.send({message});
    } catch(error) {
        // console.log({error})
        res.send(error.message);
    }
});

app.listen(3000, () => console.log('Listening on port 3000'));