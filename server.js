import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;


// Allow requests from your frontend
app.use(cors());
app.use(bodyParser.json());

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw2UGuKyv9SE041cu0YH14YAIaroBvZdcOZtIJStgEdL1AwG69frXysDKJzuXobCB2_/exec'

app.post('/feedback', async (req, res) => {
  try {
    const submissionData = req.body;

    // Forward to Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData),
    });

    const result = await response.json();

    res.status(200).json(result);
  } catch (err) {
    console.error('Error forwarding feedback:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Feedback proxy running on http://localhost:${PORT}`);
});
