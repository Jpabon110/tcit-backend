const sinon = require('sinon');
const db = require('../db/models');
const postService = require('../services/postService');

describe('postService', () => {
  let Post;

  beforeAll(() => {
    Post = db.Post;
  });

  afterEach(() => {
    sinon.restore();
  });

  test('getAllPosts debe llamar a Post.findAll y devolver posts', async () => {
    const fakePosts = [{ id: 1, name: 'Post', description: 'Desc' }];
    sinon.stub(Post, 'findAll').resolves(fakePosts);

    const result = await postService.getAllPosts();
    expect(result).toEqual(fakePosts);
    expect(Post.findAll.calledOnce).toBe(true);
  });

  test('getPostById debe llamar a Post.findByPk y devolver un post', async () => {
    const fakePost = { id: 1, name: 'Post', description: 'Desc' };
    sinon.stub(Post, 'findByPk').resolves(fakePost);

    const result = await postService.getPostById(1);
    expect(result).toEqual(fakePost);
    expect(Post.findByPk.calledOnceWith(1)).toBe(true);
  });

  test('createPost debe llamar a Post.create y devolver el nuevo post', async () => {
    const input = { name: 'Nuevo', description: 'Texto' };
    const fakePost = { id: 2, ...input };
    sinon.stub(Post, 'create').resolves(fakePost);

    const result = await postService.createPost(input);
    expect(result).toEqual(fakePost);
    expect(Post.create.calledOnceWith(input)).toBe(true);
  });

test('updatePost debe llamar a Post.update y devolver el post actualizado', async () => {
  const id = 1;
  const data = { name: 'Actualizado' };
  const fakeUpdatedPost = { id, name: 'Actualizado', description: 'Desc' };

  sinon.stub(Post, 'update').resolves([1]);
  sinon.stub(Post, 'findByPk').resolves(fakeUpdatedPost);

  const result = await postService.updatePost(id, data);

  expect(Post.update.calledOnceWith(data, { where: { id } })).toBe(true);
  expect(Post.findByPk.calledOnceWith(id)).toBe(true);
  expect(result).toEqual(fakeUpdatedPost);
});


  test('deletePost debe llamar a Post.destroy y devolver cantidad eliminada', async () => {
    const id = 1;
    sinon.stub(Post, 'destroy').resolves(1);

    const result = await postService.deletePost(id);
    expect(Post.destroy.calledOnceWith({ where: { id } })).toBe(true);
    expect(result).toBe(1);
  });
});
