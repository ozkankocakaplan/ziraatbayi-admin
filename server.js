const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.NODE_ENV === "development" ? 3000 : 3001;

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
