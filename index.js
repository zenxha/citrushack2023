const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');

const app = express();
const upload = multer();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/views/index.html');
})



app.post('/filter', upload.single('file'), (req, res) => {
  const file = req.file.buffer;
  const cutoffFreq = parseFloat(req.body.cutoffFreq); // assuming cutoff frequency is passed as a request body parameter

  // create ffmpeg instance and set input file
  const ffmpegInstance = ffmpeg(file);

  // apply high pass filter to input file
  ffmpegInstance.audioFilter(`highpass=f=${cutoffFreq}`);

  // stream processed audio back to client
  res.setHeader('Content-Type', 'audio/mpeg');
  ffmpegInstance.format('mp3').pipe(res);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});