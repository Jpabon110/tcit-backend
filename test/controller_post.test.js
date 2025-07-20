

const {
  getPosts,
  getPost,
  createNewPost,
  updateExistingPost,
  deleteExistingPost,
} = require('../controllers/controller_post.js');
const postService = require('../services/postService.js');

jest.mock('../services/postService.js');

describe('Post Controller', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPosts', () => {
    it('debe devolver todos los posts y un status 200', async () => {
      const mockPosts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
      postService.getAllPosts.mockResolvedValue(mockPosts);

      await getPosts(mockReq, mockRes);

      expect(postService.getAllPosts).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, data: mockPosts });
    });

    it('debe devolver un array vacío y un status 200 si no hay posts', async () => {
      postService.getAllPosts.mockResolvedValue([]);

      await getPosts(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'No hay posts disponibles.',
        data: [],
      });
    });

    it('debe devolver un error 500 si el servicio falla', async () => {
      const error = new Error('Error de base de datos');
      postService.getAllPosts.mockRejectedValue(error);

      await getPosts(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ success: false, message: error.message });
    });
  });

  describe('getPost', () => {
    it('debe devolver un post por ID y un status 200', async () => {
      const mockPost = { id: 1, title: 'Test Post' };
      mockReq.params.id = '1';
      postService.getPostById.mockResolvedValue(mockPost);

      await getPost(mockReq, mockRes);

      expect(postService.getPostById).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, data: mockPost });
    });

    it('debe devolver un error 404 si el post no se encuentra', async () => {
      mockReq.params.id = '99';
      postService.getPostById.mockResolvedValue(null);

      await getPost(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ success: false, message: 'Post no encontrado' });
    });
  });

  describe('createNewPost', () => {
    it('debe crear un nuevo post y devolverlo con un status 201', async () => {
      const newPostData = { title: 'Nuevo Post', content: 'Contenido...' };
      const createdPost = { id: 3, ...newPostData };
      mockReq.body = newPostData;
      postService.createPost.mockResolvedValue(createdPost);

      await createNewPost(mockReq, mockRes);

      expect(postService.createPost).toHaveBeenCalledWith(newPostData);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, data: createdPost });
    });
  });

  describe('updateExistingPost', () => {
    it('debe actualizar un post y devolverlo con un status 200', async () => {
      const updateData = { title: 'Post Actualizado' };
      const updatedPost = { id: 1, title: 'Post Actualizado', content: 'Contenido original' };
      mockReq.params.id = '1';
      mockReq.body = updateData;
      postService.updatePost.mockResolvedValue(updatedPost);

      await updateExistingPost(mockReq, mockRes);

      expect(postService.updatePost).toHaveBeenCalledWith('1', updateData);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, data: updatedPost });
    });

    it('debe devolver un error 404 si el post a actualizar no se encuentra', async () => {
      mockReq.params.id = '99';
      mockReq.body = { title: 'No importa' };
      postService.updatePost.mockResolvedValue(null);

      await updateExistingPost(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ success: false, message: 'Post no encontrado' });
    });
  });

  describe('deleteExistingPost', () => {
    it('debe eliminar un post y devolver un mensaje de éxito con status 200', async () => {
      mockReq.params.id = '1';
      postService.deletePost.mockResolvedValue(true);

      await deleteExistingPost(mockReq, mockRes);

      expect(postService.deletePost).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, record: true, message: 'Post eliminado correctamente' });
    });

    it('debe devolver un error 404 si el post a eliminar no se encuentra', async () => {
      mockReq.params.id = '99';
      postService.deletePost.mockResolvedValue(false);

      await deleteExistingPost(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ success: false, message: 'Post no encontrado' });
    });
  });
});