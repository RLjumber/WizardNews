const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("<h1>WIZARDS ONLY FOOLS</h1><h2>Testing</h2>"));

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
