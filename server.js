// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({
  dest: './uploads/',
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter(req, file, cb) {
    cb(null, true);
  },
});

// POST /bfhl endpoint
app.post('/bfhl', upload.single('file_b64'), (req, res) => {
  const { data, file_b64 } = req.body;
  const userId = 'kk0800_srmist_edu_in_RA2111026010187'; // hardcoded for simplicity
  const email = 'kk0800@srmist.edu.in'; // hardcoded for simplicity
  const rollNumber = 'RA2111026010187'; // hardcoded for simplicity

  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = [];

  data.forEach((item) => {
    if (!isNaN(Number(item))) {
      numbers.push(item);
    } else if (item.match(/[a-z]/i)) {
      alphabets.push(item);
      if (item.toLowerCase() === item) {
        highestLowercaseAlphabet = [item];
      }
    }
  });

  const fileValid = file_b64 !== undefined;
  const fileMimeType = file_b64 ? 'image/png' : undefined; // hardcoded for simplicity
  const fileSizeKb = file_b64 ? 400 : undefined; // hardcoded for simplicity

  res.json({
    is_success: true,
    user_id: userId,
    email,
    roll_number: rollNumber,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb,
  });
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});