const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;
const messagesPath = path.join(__dirname, 'messages.json');

// Enable CORS middleware for cross-origin and file:// requests
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && origin !== 'null') {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-password');
  
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// Ensure messages.json exists safely
try {
  if (!fs.existsSync(messagesPath)) {
    fs.writeFileSync(messagesPath, JSON.stringify([], null, 2));
  }
} catch (err) {
  console.error('[Storage Warning] Could not initialize messages.json:', err);
}

app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Health check endpoint required for Render deployments
app.get(['/health', '/api/health'], (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Karthik Gowda Portfolio API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Helper to safely read messages
function readMessages() {
  try {
    if (!fs.existsSync(messagesPath)) return [];
    const data = fs.readFileSync(messagesPath, 'utf8');
    return JSON.parse(data) || [];
  } catch (err) {
    console.error('[Storage Error] Read failed:', err);
    return [];
  }
}

// Helper to safely write messages
function writeMessages(messages) {
  try {
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error('[Storage Error] Write failed:', err);
  }
}

// POST Contact Form Submission
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields (Name, Email, Message) are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const newMessage = {
    id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    receivedAt: new Date().toISOString()
  };

  const messages = readMessages();
  messages.unshift(newMessage); // put newest first
  writeMessages(messages);

  console.log(`[Contact API] New message received from ${newMessage.name} (${newMessage.email})`);

  return res.status(200).json({
    message: 'Thank you! Your message has been received. Karthik will get back to you shortly.'
  });
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'karthik123';

// Auth Middleware for private message endpoints
function verifyAdminPassword(req, res, next) {
  const providedPassword = req.headers['x-admin-password'] || req.query.password;
  if (providedPassword === ADMIN_PASSWORD) {
    return next();
  }
  return res.status(401).json({ error: 'Incorrect admin password. Access denied.' });
}

// GET Admin Messages (Password Protected)
app.get('/api/messages', verifyAdminPassword, (req, res) => {
  const messages = readMessages();
  res.json(messages);
});

// DELETE Admin Message by ID (Password Protected)
app.delete('/api/messages/:id', verifyAdminPassword, (req, res) => {
  const msgId = req.params.id;
  let messages = readMessages();

  const initialCount = messages.length;
  messages = messages.filter((m) => m.id !== msgId);

  if (messages.length === initialCount) {
    return res.status(404).json({ error: 'Message ID not found.' });
  }

  writeMessages(messages);
  return res.json({ message: 'Message deleted successfully.' });
});

// Admin Route
app.get('/admin/messages', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Fallback to index.html for SPA / root navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`===================================================`);
  console.log(` Karthik Gowda Portfolio Server running on port ${PORT}`);
  console.log(` Live Website: http://localhost:${PORT}`);
  console.log(` Health Endpoint: http://localhost:${PORT}/health`);
  console.log(` Admin Portal: http://localhost:${PORT}/admin/messages`);
  console.log(`===================================================`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[Server Error] Port ${PORT} is already in use by another process.`);
  } else {
    console.error('[Server Error]', err);
  }
});
