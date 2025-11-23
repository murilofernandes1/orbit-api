import express from "express";
import auth from "./src/middleware/auth.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import followRoutes from "./src/routes/followRoutes.js";
const app = express();
app.use(express.json());

const PORT = "3000";

//AUTH ROUTES
app.use("/auth", authRoutes);

//USER ROUTES
app.use("/me", auth, userRoutes);

//POST ROUTES
app.use("/post", auth, postRoutes);

//FOLLOW ROUTES
app.use("/follow", auth, followRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
