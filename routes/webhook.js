const express = require('express');
const router = express.Router();
const submissionQueue = require('../queue/queue');

router.post('/', async (req, res) => {
  const { name, commitCount, timestamp, files } = req.body;

  if (!name || !timestamp || !files || !Array.isArray(files)) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    for (const file of files) {
      await submissionQueue.add('code-submissions', {
        name,
        commitCount,
        timestamp,
        content: content,
        filename: filename,
      });
    }

    return res.status(200).json({ message: 'Queued all files successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Queueing failed' });
  }
});

module.exports = router;
