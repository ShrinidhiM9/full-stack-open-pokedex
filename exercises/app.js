// server.js
const express = require('express');
const path = require('path');

const app = express();

// --- Middleware ---
app.use(express.json());

// --- Example routes ---
// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Example API route
app.get('/api/message', (req, res) => {
  res.json({ message: 'API is working!' });
});

// --- Health check endpoint for Render ---
app.get('/health', (req, res) => {
  res.send('ok');
});

// --- Serve frontend (optional, if you have a React/Vite build) ---
const buildPath = path.join(__dirname, 'build'); // Adjust if your frontend build folder is different
app.use(express.static(buildPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
