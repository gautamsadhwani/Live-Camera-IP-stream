
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { time } = require('console');
const stream = require('stream');

const app = express();
const port = 3001;
const uploadFolder = process.env.UPLOAD_FOLDER || 'uploads';

// Ensure the upload folder exists
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

app.use(cors());

// Proxy route for the camera stream

app.get('/proxy', async (req, res) => {
  console.log('Proxying request for:', req.query);
  const url = req.query.url;
  if (!url) {
    console.log('No URL provided');
    return res.status(400).send('URL is required');
  }

  try {
    console.log('Fetching image from:', url);
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });
    
    // Pipe the response directly to the client
    response.data.pipe(res);
    response.data.on('end', () => {
      console.log('Streaming finished');
    });
  } catch (error) {
    console.error('Error fetching image:', error.message);
    res.status(500).send('Error fetching the image');
  }
});


// Route to handle image upload
app.post('/capture', upload.single('image'), (req, res) => {
  if (req.file) {
    res.send({ message: 'Image captured successfully!', file: req.file });
  } else {
    res.status(400).send({ message: 'Image capture failed!' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
