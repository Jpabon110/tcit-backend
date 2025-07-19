const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const postsRouter = require("../routes/posts");
const postService = require("../services/postService");
require("dotenv").config();

jest.mock("../services/postService", () => ({
  getAllPosts: jest.fn(),
  getPostById: jest.fn(),
  createPost: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use("/posts", postsRouter);

const validToken = jwt.sign(
  { id: 1, username: "tcit" },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN }
);

describe("Rutas de Posts con autenticación JWT", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /posts debe llamar a getAllPosts", async () => {
    postService.getAllPosts.mockResolvedValue([{ id: 1, name: "Post 1" }]);

    const res = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${validToken}`);

    console.log("Respuesta GET /posts:", res.body);
    expect(res.status).toBe(200);
    expect(postService.getAllPosts).toHaveBeenCalled();
  });

  it("GET /posts/:id debe llamar a getPostById", async () => {
    postService.getPostById.mockResolvedValue({ id: 1, name: "Post 1" });

    const res = await request(app)
      .get("/posts/1")
      .set("Authorization", `Bearer ${validToken}`);

    console.log("Respuesta GET /posts/1:", res.body);
    expect(res.status).toBe(200);
    expect(postService.getPostById).toHaveBeenCalledWith("1");
  });

  it("POST /posts debe llamar a createPost", async () => {
    postService.createPost.mockResolvedValue({ id: 1, name: "Nuevo Post" });

    const res = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${validToken}`)
      .send({ name: "Nuevo Post", description: "Descripción" });

    console.log("Respuesta POST /posts:", res.body);
    expect(res.status).toBe(201);
    expect(postService.createPost).toHaveBeenCalledWith({
      name: "Nuevo Post",
      description: "Descripción",
    });
  });

  it("PUT /posts/:id debe llamar a updatePost", async () => {
    postService.updatePost.mockResolvedValue({ id: 1, name: "Post Actualizado" });

    const res = await request(app)
      .put("/posts/1")
      .set("Authorization", `Bearer ${validToken}`)
      .send({ name: "Post Actualizado" });

    console.log("Respuesta PUT /posts/1:", res.body);
    expect(res.status).toBe(200);
    expect(postService.updatePost).toHaveBeenCalledWith("1", {
      name: "Post Actualizado",
    });
  });

  it("DELETE /posts/:id debe llamar a deletePost", async () => {
    postService.deletePost.mockResolvedValue(true);

    const res = await request(app)
      .delete("/posts/1")
      .set("Authorization", `Bearer ${validToken}`);

    console.log("Respuesta DELETE /posts/1:", res.body);
    expect(res.status).toBe(200);
    expect(postService.deletePost).toHaveBeenCalledWith("1");
  });

  it("debe devolver 401 si no se envía el token", async () => {
    const res = await request(app).get("/posts");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No autorizado, token no proporcionado");
  });

  it("debe devolver 401 si el token es inválido", async () => {
    const res = await request(app)
      .get("/posts")
      .set("Authorization", "Bearer token_invalido");

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Token inválido o expirado");
  });
});
