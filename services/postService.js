const db = require('../db/models');
console.log('Modelos cargados en db:', Object.keys(db)); 
const Post = db.Post;

const getAllPosts = async () => {
  try {
    return await Post.findAll({
      attributes: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']],
    });
  } catch (error) {
    console.error('Error en getAllPosts:', error);
    throw new Error('No se pudo obtener la lista de posts');
  }
};

const getPostById = async (id) => {
  try {
    const post = await Post.findByPk(id, {
      attributes: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
    });
    return post;
  } catch (error) {
    console.error('Error en getPostById:', error);
    throw new Error('No se pudo obtener el post');
  }
};

const createPost = async (data) => {
  try {
    return await Post.create({
      name: data.name,
      description: data.description,
    });
  } catch (error) {
    console.error('Error en createPost:', error);
    throw new Error('No se pudo crear el post');
  }
};

const updatePost = async (id, data) => {
  try {
    const [updated] = await Post.update(data, {
      where: { id },
    });

    if (!updated) return null;
    return await getPostById(id);
  } catch (error) {
    console.error('Error en updatePost:', error);
    throw new Error('No se pudo actualizar el post');
  }
};

const deletePost = async (id) => {
  try {
    const deleted = await Post.destroy({
      where: { id },
    });
    return deleted;
  } catch (error) {
    console.error('Error en deletePost:', error);
    throw new Error('No se pudo eliminar el post');
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
