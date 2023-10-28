import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

//1. GET a random quote
app.get("/random",(req, res) => {
    const randomQuote = quotes[ Math.floor(Math.random() * quotes.length) ]; 
    res.json(randomQuote);
});

//2. GET a quote by id
app.get("/quotes/:id",(req, res) => {
    const id = parseInt(req.params.id);
    const foundQuote = quotes.find((quote) => quote.id === id);
    if(foundQuote !== undefined)
    {
        res.json(foundQuote);

    }else{
        res
        .status(404)
        .json({ error: `Quote with id ${id} not found`});
    }
    
});

//3. GET a quote by filtering on the quote type
app.get("/filter",(req, res) => {
    const type = req.query.type;
    const filterQuotes = quotes.filter((quote) => quote.type === type );
    if(filterQuotes.length !== 0){
        res.json(filterQuotes);
    }else {
        res
        .status(404)
        .json( { error: `Quotes of given type not found.` });
    }
});

//to do include error handling for post put patch
//4. POST a new quote
app.post("/quotes",(req, res) => {
    const newQuote = {
        id: quotes.length + 1,
        text: req.body.text,
        author: req.body.author,
        type: req.body.type,
    };
    quotes.push(newQuote);
    res.json(quotes.slice(-1));
});

//5. PUT a quote
app.put("/quotes/:id",(req, res) => {
    const id = parseInt(req.params.id);
    const replaceQuote = {
        id: id,
        text: req.body.text,
        author: req.body.author,
        type: req.body.type,
    };
    const searchIndex = quotes.findIndex((quote) => quote.id === id);
    quotes[searchIndex] = replaceQuote ;
    res.json(replaceQuote);
});

//6. PATCH a quote
app.patch("/quotes/:id",(req, res) => {
    const id = parseInt(req.params.id);
    const existingQuote = quotes.find((quote) => quote.id === id);
    console.log(existingQuote);
    const patchQuote = {
        id: id,
        text: req.body.text || existingQuote.text,
        author: req.body.author || existingQuote.author,
        type: req.body.type || existingQuote.type,
    };
    const searchIndex = quotes.findIndex((quote) => quote.id === id);
    quotes[searchIndex] = patchQuote ;
    res.json(patchQuote);
});

//7. DELETE quote based on id
app.delete("/quotes/:id",(req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = quotes.findIndex((quote) => quote.id === id);
    if( searchIndex > -1){
        quotes.splice(searchIndex, 1);
        res.json( { message: `Quote with id ${id} deleted.`});
    }else{
        res
        .status(404)
        .json({ error: `Quote with id ${id} not found.`});
    }
});

app.listen(port, () => {
    console.log(`Successfully started server on port ${port}.`);
});

var quotes = [
  {
    id: 1,
    text:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    type: "Life",
  },
  {
    id: 2,
    text:
      "All our dreams can come true; if we have the courage to pursue them.",
    author: "Walt Disney",
    type: "Success",
  },
  {
    id: 3,
    text:
      "Great things come from hard work and perseverance. No excuses.",
    author: "Kobe Bryant",
    type: "Hardwork",
  },
  {
    id: 4,
    text: "You're going to go through tough times—that's life. But I say,Nothing happens to you, it happens for you.See the positive in negative events.",
    author: "Joel Osteen",
    type: "Life",
  },
  {
    id: 5,
    text:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    author: "Wordplay",
    type: "Friendship",
  },
  {
    id: 6,
    text: "It's all about falling in love with yourself and sharing that love with someone who appreciates you, rather than looking for love to compensate for a self love deficit.",
    author: "Eartha Kitt",
    type: "Selflove",
  },
  {
    id: 7,
    text: "Truly great friends are hard to find, difficult to leave, and impossible to forget.",
    author: "G. Randolf",
    type: "Friendship",
  },
  {
    id: 8,
    text:
      "Be a bush if you can't be a tree. If you can't be a highway, just be a trail. If you can't be a sun, be a star. For it isn't by size that you win or fail. Be the best of whatever you are.",
    author: "Martin Luther King Jr.",
    type: "Life",
  },
  {
    id: 9,
    text:
      "I've learned that anything in life worth having comes from patience and hard work.",
    author: "Greg Behrendt",
    type: "Hardwork",
  },
  {
    id: 10,
    text:
      "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
    author: "Buddha",
    type: "Selflove",
  },
  {
    id: 11,
    text:
      "In the sweetness of friendship let there be laughter, for in the dew of little things the heart finds its morning and is refreshed.",
    author: "Khalil Gibran",
    type: "Friendship"
  },
  {
    id: 12,
    text: "Many of life’s failures are people who did not realize how close they were to success when they gave up.",
    author: "Thomas A. Edison",
    type: "Life",
  },
  {
    id: 13,
    text:
      "If you do the work you get rewarded. There are no shortcuts in life.",
    author: "Michael Jordan",
    type: "Hardwork",
  },
  {
    id: 14,
    text:
      "Not how long, but how well you have lived is the main thing.",
    author: "Seneca",
    type: "Life",
  },
  {
    id: 15,
    text: "There are three things that grow more precious with age; old wood to burn, old books to read, and old friends to enjoy.",
    author: "Henry Ford",
    type: "Friendship",
  },
  {
    id: 16,
    text:
      "Success isn't overnight. It's when everyday you get a little better than the day before. It all adds up.",
    author: "Dwayne Johnson",
    type: "Success"
  },
  {
    id: 17,
    text: "Everybody wants to be famous, but nobody wants to do the work. I live by that. You grind hard so you can play hard. At the end of the day, you put all the work in, and eventually it’ll pay off. It could be in a year, it could be in 30 years. Eventually, your hard work will pay off.",
    author: "Kevin Hart",
    type: "Hardwork",
  },
  {
    id: 18,
    text:
      "There are no limits. There are only plateaus, and you must not stay there — you must go beyond them.",
    author: "Bruce Lee",
    type: "Success",
  },
  
];
