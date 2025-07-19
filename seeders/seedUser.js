require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../db/models");

async function createUser() {
  try {
    await User.sync();

    const hashedPassword = await bcrypt.hash(process.env.CLAVE_LG, 10);

    const newUser = await User.create({
      username: "tcit",
      password: hashedPassword,
    });

    console.log("Usuario creado:", newUser.username);
    process.exit();
  } catch (error) {
    console.error("Error al crear usuario:", error);
    process.exit(1);
  }
}

createUser();
