const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../services/postService.js');

const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    if (!posts.length) {
      return res.status(200).json({
        success: true,
        message: 'No hay posts disponibles.',
        data: [],
      });
    }
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post no encontrado' });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createNewPost = async (req, res) => {
  try {
    const newPost = await createPost(req.body);
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateExistingPost = async (req, res) => {
  try {
    const updatedPost = await updatePost(req.params.id, req.body);
    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post no encontrado' });
    }
    res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteExistingPost = async (req, res) => {
  try {
    const deleted = await deletePost(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Post no encontrado' });
    }
    res.status(200).json({ success: true, message: 'Post eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPosts,
  getPost,
  createNewPost,
  updateExistingPost,
  deleteExistingPost,
};
