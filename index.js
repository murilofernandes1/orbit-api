import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
const app = express();
app.use(express.json());

const PORT = "3000";

app.use("/auth", authRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
