const express = require("express");
const app = express();
const postBank = require("./postBank")

const morgan = require("morgan");
app.use(morgan("dev"));

app.use(express.static('public'))
// this is cool and its what i was missing for the css

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
              <div class="news-item">

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

  res.send(html);
})

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id)

  if (!post.id) {
    // If the post wasn't found, set the HTTP status to 404 and send Not Found HTML
    res.status(404)
    // this whole bit in here i just pasted from the site but my gf is on me to leave so we are gonna head out but the error isworking, may be better approach however.
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
        <img src="/dumbledore-404.gif" />
      </div>
    </body>
    </html>`
    res.send(html)
  } else {

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

  }}
);


const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});