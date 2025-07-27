const express = require('express');
const router = express.Router();
const submissionQueue = require('../queue/queue');

router.post('/', async (req, res) => {
  const { name, commitCount, timestamp, filename, content } = req.body;

  if (!name || !timestamp || !filename || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await submissionQueue.add('code-submissions', {
      name,
      commitCount,
      timestamp,
      filename,
      content
    });

    return res.status(200).json({ message: 'Queued successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Queueing failed' });
  }
});

module.exports = router;
