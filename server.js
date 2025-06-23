const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); // Parse JSON body

const CHANNEL_ID = -1002484169182;
const DATA_FILE = 'data.txt';

// Handle webhook POST
app.post('/', (req, res) => {
  const payload = req.body;

  if (
    payload.channel_post &&
    payload.channel_post.chat &&
    payload.channel_post.chat.id === CHANNEL_ID &&
    payload.channel_post.text
  ) {
    // Write the text to a file
    fs.writeFile(DATA_FILE, payload.channel_post.text, (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).send('Error writing file');
      } else {
        res.send('OK');
      }
    });
  } else {
    res.send('Ignored');
  }
});

// Read and serve file contents
app.get('/', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.send('No data yet.');
    }
    res.send(data);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
