const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.json()); // Parse JSON requests
const db = new sqlite3.Database(':memory:'); // Use ':memory:' for in-memory database
// Create a posts table
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)');
  // Create a post
  app.post('/posts', (req, res) => {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    const stmt = db.prepare('INSERT INTO posts (content) VALUES (?)');
    stmt.run(content, function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create post' });
      }
      res.json({ message: 'Post created successfully', postId: this.lastID });
    });
    stmt.finalize();
    
  });
  app.put('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { content } = req.body;
    if (isNaN(postId) || !content) {
      return res.status(400).json({ error: 'Invalid post data' });
    }
    const stmt = db.prepare('UPDATE posts SET content = ? WHERE id = ?');
    stmt.run(content, postId, function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to edit post' });
      }
      res.json({ message: 'Post edited successfully' });
    });
    stmt.finalize();
});
  });
  // Get all posts
  app.get('/posts', (req, res) => {
    db.all('SELECT * FROM posts', (err, posts) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch posts' });
      }
      res.json(posts);
    });
  });
  // Start the server
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
