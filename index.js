const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = 5000;

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/lessons", require("./router/lesson"));
app.use("/api/orders", require("./router/order"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
