
var timeAgo = require("node-time-ago");

const postList = (posts) => {
    const html =
        `<!DOCTYPE html>
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
        
          <main>  
            ${posts.map(post => `
              <div class="news-item">

                <p>
                  <span class="news-position">${post.id}. ▲</span>
                  <a href="/posts/${post.id}">${post.title}</a>
                  <small>(by: ${post.name})</small>
                </p>

                <small class="news-info">
                  ${post.upvotes} upvotes | ${timeAgo(post.date)}
                </small>

              </div>`).join('')}
          </main>

        </div>

      </body>

    </html>`;

    return (html);
}

module.exports = postList;