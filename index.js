require("dotenv").config();
const axios = require("axios");
const { Composer } = require("micro-bot");
const bot = new Composer(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.telegram.sendMessage(
    ctx.chat.id,
    `Hey <b><i>${ctx.update.message.from.first_name}</i></b>, welcome to The <b>GrammarBot</b>, Here You can find the exact <i>definitions</i> and <i>uses</i> and much more of any word. type\ /list and send to get the list of all available commands.`,
    {
      parse_mode: "HTML",
    }
  );
});
bot.help((ctx) => {
  ctx.reply("Type /list and send for all the commands available.");
});
bot.hears("hi", (ctx) => {
  // console.log(ctx.update.message.chat);
  ctx.reply(
    `Hey there ${ctx.update.message.from.first_name}, hope everything is fine there.`
  );
});
bot.hears("hy", (ctx) => {
  // console.log(ctx.update.message.chat);
  ctx.reply(
    `Hey there ${ctx.update.message.from.first_name}, hope everything is fine there.`
  );
});
bot.hears("hey", (ctx) => {
  // console.log(ctx.update.message.chat);
  ctx.reply(
    `Hey there ${ctx.update.message.from.first_name}, hope everything is fine there.`
  );
});
bot.hears("hello", (ctx) => {
  // console.log(ctx.update.message.chat);
  ctx.reply(
    `Hey there ${ctx.update.message.from.first_name}, hope everything is fine there.`
  );
});
bot.hears("hlo", (ctx) => {
  // console.log(ctx.update.message.chat);
  ctx.reply(
    `Hey there ${ctx.update.message.from.first_name}, hope everything is fine there.`
  );
});
bot.hears("Hi", (ctx) => {
  // console.log(ctx.update.message.chat);
  ctx.reply(
    `Hey there ${ctx.update.message.from.first_name}, hope everything is fine there.`
  );
});
bot.hears("Hy", (ctx) => {
  // console.log(ctx.update.message.chat);
  ctx.reply(
    `Hey there ${ctx.update.message.from.first_name}, hope everything is fine there.`
  );
});
bot.hears("Hey", (ctx) => {
  // console.log(ctx.update.message.chat);
  ctx.reply(
    `Hey there ${ctx.update.message.from.first_name}, hope everything is fine there.`
  );
});
bot.hears("Hello", (ctx) => {
  // console.log(ctx.update.message.chat);
  ctx.reply(
    `Hey there ${ctx.update.message.from.first_name}, hope everything is fine there.`
  );
});
bot.hears("Hlo", (ctx) => {
  // console.log(ctx.update.message.chat);
  ctx.reply(
    `Hey there ${ctx.update.message.from.first_name}, hope everything is fine there.`
  );
});

bot.command("list", (ctx) =>
  ctx.reply(
    `Here is the list of all the available commands for you
1. \ /word <Your Word Here>
     for example
     /word smile

`
  )
);
bot.command("word", async (ctx) => {
  let word = ctx.update.message.text;
  const wordArray = word.split(" ");
  word = wordArray[1];
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  let res;
  // console.log(res.data[0]);
  if (word) {
    res = await axios.get(url).catch((err) => {
      ctx.reply(
        "Opps, I couldn't find your word , kindly enter a valid english word please!."
      );
    });
    ctx.telegram.sendMessage(ctx.chat.id, `<b>${res.data[0].word}</b>`, {
      parse_mode: "HTML",
    });
    if (res.data[0].phonetic) {
      ctx.telegram.sendMessage(
        ctx.chat.id,
        `<i>Phonetics</i> : <b>${res.data[0].phonetic}</b>`,
        {
          parse_mode: "HTML",
        }
      );
    }
    for (let i = 0; i < res.data[0].meanings.length; i++) {
      const element = res.data[0].meanings[i];
      let message = "<b>Meanings and Uses :</b> \n\n";
      message =
        message +
        "<i>Part Of Speech : </i><b>" +
        element.partOfSpeech +
        "</b> \n\n";
      for (let j = 0; j < element.definitions.length; j++) {
        let num = j + 1;
        const e = element.definitions[j];
        message =
          message + "<b>Definition " + num + ": </b>\n" + e.definition + "\n\n";

        if (e.example) {
          message =
            message + "<i>Example</i> : " + "\n" + e.example + "\n \n \n";
        }
      }
      ctx.telegram.sendMessage(ctx.chat.id, message, {
        parse_mode: "HTML",
      });
    }
  } else {
    ctx.reply("Enter a complete or valid command which includes a word.");
  }
});

// bot.launch();
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
module.exports = bot;


