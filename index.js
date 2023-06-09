const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path')
const fs = require('fs')

const dbRouter = require('./src/db/db')
const { Post, mongoose } = require('./src/db/db')

const app = express();
// const upload = multer();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/src/views'));
app.set('view engine', 'ejs')
app.set('views', './src/views')


app.use('/api/v1', dbRouter);

const multerConfig = {
    
  storage: multer.diskStorage({
   //Setup where the user's file will go
   destination: function(req, file, next){
      const folderPath = path.join(__dirname, '/src/audio-storage');
      // Create the directory if it doesn't exist
      if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
     next(null, '/src/audio-storage');
     },   
      
      //Then give the file a unique name
      filename: function(req, file, next){
          console.log(file);
          const ext = file.mimetype.split('/')[1];
          next(null, file.fieldname + '-' + Date.now() + '.'+ext);
        }
      }),   
      
      //A means of ensuring only audio is uploaded. 
      fileFilter: function(req, file, next){
            if(!file){
              next();
            }
          const image = file.mimetype.startsWith('audio/');
          if(image){
            console.log('audio uploaded');
            next(null, true);
          }else{
            console.log("file not supported");
            
            //TODO:  A better message response to user on failure.
            return next();
          }
      }
    };
    

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
    

app.use('/audio', express.static(path.join(__dirname, 'src/audio-storage'))); // serve static audio files
app.get('/tune/:id', async (req, res) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const postID = new ObjectId(req.params.id);
    const post = await Post.findById(postID)
    if (post) {
      res.render('tune', { post });
    } else {
      res.status(404).send('Post not found');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})
app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/src/views/index.html');
  res.render('index')
})

app.get('/top', async (req, res) => {
  try {
    const posts = await Post.find();
    posts.sort((a, b) => b.upvotes - a.upvotes)
    res.render('top2', {posts})
  } catch(e) {
    res.status(500).json({message: err.message})
  }
})








const upload = multer({ storage: storage })

// app.post('/api/upload', upload.single('audio'), (req, res) => {
//   const audio = req.file; // File object
//   const textData = req.body.textData; // Text data from form field
//   console.log(textData);
//   console.log('Audio uploaded')
//   console.log(audio);
  
//   res.send('File uploaded successfully');
// })




app.post('/api/filter', upload.single('file'), (req, res) => {
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