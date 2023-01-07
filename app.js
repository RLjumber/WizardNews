const express = require("express");
const app = express();
const postBank = require("./postBank")

const morgan = require("morgan");
app.use(morgan("dev"));

app.use(express.static('public'))

// app.get("/", (req, res) => res.send("<h1>WIZARDS ONLY FOOLS!!!</h1><h2>Testing</h2>")); 

//I commeneted out the app.get on line 8 and the get request below rendered. I guess each get request has to have a unique route, otherwise it will only load the first one it reads. I reformatted the HTML a bit and added a <main> section. Posts are now showing


app.get("/", (req, res) => {
  const posts = postBank.list();
  // postBank.list grabs our list module frome the module exports

  const html = `<!DOCTYPE html>
    <html>

      <head>
        <title>Wiz News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>

      <body>
      
        <div class="news-list">

          <h1><img src="/logo.png"/> WIZARDS ONLY FOOLS!!!</h1>
        
          <main>  
            ${posts.map(post => `
              <div class ="news-item">

                <p>
                  <span class="news-position">${post.id}. ▲</span>
                  <a href="/posts/${post.id}">${post.title}</a>
                  <small>(by: ${post.name})</small>
                </p>

                <small class="news-info">
                  ${post.upvotes} upvotes | ${post.date}
                </small>

              </div>`).join('')}
          </main>

        </div>

      </body>

    </html>`;
  // cannot get the styling to apply however
  // There is some weird concatenation within the <ul>, different than JSX but similar kinda style with the html within a js and we can use methods like .map inside them. cool stuff.
  // List is comma separated however there are MDN docs on it, still needs to be done. I added a class to the list items so we can add links to them later on or for now i want them to color when hovered.

  res.send(html);
})

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id)

  const html = `<!DOCTYPE html>
    <html>

      <head>
        <title>Wiz News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>

      <body>
      
        <div class="news-list">

          <h1><img src="/logo.png"/> WIZARDS ONLY FOOLS!!!</h1>
        
          <main>  
            
              <div class ="news-item">

                <p>
                  ${post.title}
                  <small>(by: ${post.name})</small>
                </p>

                <p>
                  ${post.content}
                </p>

              </div>
          </main>

        </div>

      </body>

    </html>`;

  res.send(html)

});


const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});