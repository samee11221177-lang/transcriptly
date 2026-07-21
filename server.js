import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { YoutubeTranscript } from "youtube-transcript";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Transcriptly Backend Running"
  });
});

app.post("/transcript", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "YouTube URL is required."
      });
    }

    const transcript = await YoutubeTranscript.fetchTranscript(url);

    const cleanText = transcript
      .map(item => item.text)
      .join(" ");

    res.json({
      success: true,
      transcript: cleanText
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Transcript not available.",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});