#!/usr/bin/env -S npm run tsn -T

import OpenAI from 'openai';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-xxx',
});

const ListParams = z.object({
  genre: z.enum(['mystery', 'nonfiction', 'memoir', 'romance', 'historical']),
});

const SearchParams = z.object({
  name: z.string(),
});

const GetParams = z.object({
  id: z.string(),
});

const actions = [
  {
    name: 'list',
    description: 'list queries books by genre, and returns a list of names of books',
    parameters: zodToJsonSchema(ListParams),
    parse: zodParseJSON(ListParams),
    function: list,
  },
  {
    name: 'search',
    description: 'search queries books by their name and returns a list of book names and their ids',
    parameters: zodToJsonSchema(SearchParams),
    parse: zodParseJSON(SearchParams),
    function: search,
  },
  {
    name: 'get',
    description:
      "get returns a book's detailed information based on the id of the book. Note that this does not accept names, and only IDs, which you can get by using search.",
    parameters: zodToJsonSchema(GetParams),
    parse: zodParseJSON(GetParams),
    function: get,
  },
];

async function main() {
  const runner = await openai.beta.chat.completions
    .runTools({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'Please use our book database, which you can access using functions to answer the following questions.',
        },
        {
          role: 'user',
          content: 'I really enjoyed reading To Kill a Mockingbird, could you recommend me a book that is similar and tell me why?',
        },
      ],
      tools: Object.values(actions).map((action) => ({ type: "function", function: action })),
    })
    .on('message', (message) => console.log('> message', message))
    .on('content', (diff) => process.stdout.write(diff));

  const result = await runner.finalChatCompletion();
  console.log();
  console.log('> result', result);

  console.log();
  console.log('> messages', runner.messages);
}

const db = [
  {
    id: 'a1',
    name: 'To Kill a Mockingbird',
    genre: 'historical',
    description: `Compassionate, dramatic, and deeply moving, "To Kill A Mockingbird" takes readers to the roots of human behavior - to innocence and experience, kindness and cruelty, love and hatred, humor and pathos. Now with over 18 million copies in print and translated into forty languages, this regional story by a young Alabama woman claims universal appeal. Harper Lee always considered her book to be a simple love story. Today it is regarded as a masterpiece of American literature.`,
  },
  {
    id: 'a2',
    name: 'All the Light We Cannot See',
    genre: 'historical',
    description: `In a mining town in Germany, Werner Pfennig, an orphan, grows up with his younger sister, enchanted by a crude radio they find that brings them news and stories from places they have never seen or imagined. Werner becomes an expert at building and fixing these crucial new instruments and is enlisted to use his talent to track down the resistance. Deftly interweaving the lives of Marie-Laure and Werner, Doerr illuminates the ways, against all odds, people try to be good to one another.`,
  },
  {
    id: 'a3',
    name: 'Where the Crawdads Sing',
    genre: 'historical',
    description: `For years, rumors of the “Marsh Girl” haunted Barkley Cove, a quiet fishing village. Kya Clark is barefoot and wild; unfit for polite society. So in late 1969, when the popular Chase Andrews is found dead, locals immediately suspect her.
But Kya is not what they say. A born naturalist with just one day of school, she takes life's lessons from the land, learning the real ways of the world from the dishonest signals of fireflies. But while she has the skills to live in solitude forever, the time comes when she yearns to be touched and loved. Drawn to two young men from town, who are each intrigued by her wild beauty, Kya opens herself to a new and startling world—until the unthinkable happens.`,
  },
];

async function list({ genre }) {
  return db.filter((item) => item.genre === genre).map((item) => ({ name: item.name, id: item.id }));
}

async function search({ name }) {
  return db.filter((item) => item.name.includes(name)).map((item) => ({ name: item.name, id: item.id }));
}

async function get({ id }) {
  return db.find((item) => item.id === id);
}

function zodParseJSON(schema) {
  return (input) => schema.parse(JSON.parse(input));
}

main();
