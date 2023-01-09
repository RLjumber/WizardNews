const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const postList = require("./views/postList");

const app = express();
const PORT = 1337;

app.use(morgan("dev"));

app.use(express.static('public'))

app.get("/", (req, res) => {
  const posts = postBank.list();
  res.send(postList(posts));
})

app.get("/posts/:id", (req, res, next) => {
  const post = postBank.find(req.params.id);


  if (post.id) {

    const postDetails = `<!DOCTYPE html>
    <html>

      <head>
        <title>Wiz News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>

      <header class="header-main">
        <img src="/logo.png"/>
        <h3 id="title"> WIZARDS ONLY FOOLS </h3>
      </header>

      <body>
      
        <div class="news-list">

          <h2><img src="/logo.png"/> ${post.title} </h2>
        
          <main>  
            
              <div class ="news-item">

                <p>
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

    res.send(postDetails)

  } else {
    next(err)
  }
}
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404)

  const errorHTML = `
  <!DOCTYPE html>
    <html>

      <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>

      <body>
        <header><img src="/logo.png"/>Wizard News</header>

        <div class="not-found">
          <h2>Accio Page! 🧙‍♀️ ... 404 - Page Not Found</h2>
          <img class="confused-travolta" src="https://i.imgur.com/e1IneGq.jpg" />
        </div>

      </body>

    </html>`

  res.send(errorHTML)
})

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});