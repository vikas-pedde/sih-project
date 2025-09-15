const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Dummy advisory logic
app.post("/api/advisory", (req, res) => {
  const { location, crop, ph } = req.body;

  let message = `Advisory for ${crop} in ${location} with soil pH ${ph}: `;
  if (ph < 6) {
    message += "Soil is acidic. Apply lime and organic matter.";
  } else if (ph > 7.5) {
    message += "Soil is alkaline. Apply gypsum and use acid-forming fertilizers.";
  } else {
    message += "Soil pH is optimal for most crops.";
  }

  res.json({ advisory: message });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
