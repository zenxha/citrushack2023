const express = require('express');
const path = require('path')
const fs = require('fs')
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Database connected'))
.catch((err) => console.log(err));

const postSchema = new mongoose.Schema({
  username: String,
  title: String,
  audioPath: String,
  timestamp: Date,
  upvotes: Number
});

const Post = mongoose.model('Post', postSchema);


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      const dir = './src/audio-storage/';
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
      cb(null, dir);
    },
    filename: function(req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  });
  const upload = multer({ storage: storage })

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/upload', upload.single('audio'), async (req, res) => {
    const audio = req.file; // File object
    const title = req.body.title; // Text data from form field
    console.log(title);
    console.log('Audio uploaded')
    console.log(audio);

  const post = new Post({
    username: req.body.username,
    title: title,
    audioPath: audio.path,
    timestamp: new Date(),
    upvotes: 0
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;