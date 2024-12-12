const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000;
const SECRET_KEY = "your-secret-key"; // You should choose a more secure key

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

// Middleware
app.use(bodyParser.json());

// Mock user database
const users = [];

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send("User registered");
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const accessToken = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "20min",
    });
    res.json({ accessToken });
  } else {
    res.send("Not Allowed");
  }
});

// Protected route
app.get("/resume", authenticateToken, (req, res) => {
  res.send(`Hello ${req.user.username}, this is a protected route!`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
