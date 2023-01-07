const express = require("express");
const app = express();
const postBank = require("./postBank")

const morgan = require("morgan");
app.use(morgan("dev"));




app.get("/", (req, res) => {
  const posts = postBank.list();
  // postBank.list grabs our list module frome the module exports

  const html = `<!DOCTYPE html>
    <html>
      <head>
        <title>Wiz News</title>
        <link rel="stylesheet" href="style.css">
      </head>

      <body>
        <ul>
          ${posts.map(post => 
            `<li className="post_title">${post.title}
                <p>By: ${post.name}</p>
            </li>`
          )}
        </ul>
      </body>
    </html>
  `
  // cannot get the styling to apply however
  // There is some weird concatenation within the <ul>, different than JSX but similar kinda style with the html within a js and we can use methods like .map inside them. cool stuff.
  // List is comma separated however there are MDN docs on it, still needs to be done. I added a class to the list items so we can add links to them later on or for now i want them to color when hovered.

  res.send(html);
})


const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
