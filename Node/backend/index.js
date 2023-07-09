import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  organization: "",
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

app.post("/", async (request, response) => {
  const { chats } = request.body;
  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a EbereGPT. You can help with graphic design tasks",
      },
      ...chats,
    ],
  });

  response.json({
    output: result.data.choices[0].message,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// import { error } from "console";
// import { Configuration, OpenAIApi } from "openai";
// import readline from "readline";

// const configuration = new Configuration({
//     organization : 'org-gNGh2t2WYIC9ERDLsocPHEI3',
//     apiKey : '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'
// });

// const openai = new OpenAIApi(configuration);

// const userInterface = readline.createInterface({
//     input : process.stdin ,
//     output: process.stdout
// });

// userInterface.on('line' , async (input)=>{
//  await   openai.createChatCompletion({
//         model : 'gpt-3.5-turbo',
//         messages : [{role : 'user' , content: input}]
//     }).then((result)=>{
//         console.log(result.data.choices[0].message.content);
//         userInterface.prompt();
//     }).catch(error => console.log(error))

// })
