const express = require('express');
const {
  getPosts,
  getPost,
  createNewPost,
  updateExistingPost,
  deleteExistingPost,
} = require('../controllers/controllerPost.js');

const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get('/', authMiddleware, getPosts);
router.get('/:id', authMiddleware, getPost);
router.post('/', authMiddleware, createNewPost);
router.put('/:id', authMiddleware, updateExistingPost);
router.delete('/:id', authMiddleware, deleteExistingPost);

module.exports = router;
