const express = require('express');
const {
  getPosts,
  getPost,
  createNewPost,
  updateExistingPost,
  deleteExistingPost,
} = require('../controllers/controller_post.js');

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createNewPost);
router.put('/:id', updateExistingPost);
router.delete('/:id', deleteExistingPost);

module.exports = router;
