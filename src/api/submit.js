import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // or global fetch if you're using Node 18+

const app = express();
const PORT = 3001; // Or whatever you want

app.use(cors()); // Allow your React frontend
app.use(express.json());

app.post("/api/submit", async (req, res) => {
  try {
    const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    console.log(req.body);

    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
