import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// API routes
import sessionRoutes from "./routes/session.js";
import authRoutes from "./routes/auth.js";

app.use("/api/v1/session", sessionRoutes);
app.use("/api/v1/auth", authRoutes);

// React build serve karo
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
