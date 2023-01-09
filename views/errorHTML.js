const errorHTML = (err) => {
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
            <h2>Accio Page! 🧙‍♀️ ... 404 - Page Not Found</h2>
            <img class="confused-travolta" src="https://i.imgur.com/e1IneGq.jpg" />
          </div>
  
        </body>
  
      </html>`;

    return (html);
}

module.exports = errorHTML;