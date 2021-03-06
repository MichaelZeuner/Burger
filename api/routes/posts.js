const express = require('express');
const Post = require('../models/post');
const multer = require('multer');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if(isValid) {
      error = null;
    }
    cb(error, "api/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('', multer(storage).single('image'), (req, res, next) => {
  const post = new Post({
      name: req.body.name,
      content: req.body.content
  });
  post.save().then(createdPost => {
      res.status(200).json(createdPost);
  });
});

router.get('', (req, res, next) => {
  Post.find().then(documents => {
      console.log(documents);
      res.status(200).json(documents);
  });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
      if(post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
  });
});

router.delete('/:id', (req, res, next) => {
  console.log(req.params);
  Post.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: 'Post deleted!' });
  });
});

module.exports = router;
