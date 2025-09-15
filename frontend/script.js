const phSlider = document.getElementById("ph");
const phValue = document.getElementById("phValue");
const advisoryText = document.getElementById("advisoryText");

phSlider.addEventListener("input", () => {
  phValue.textContent = phSlider.value;
});

document.getElementById("getAdvisory").addEventListener("click", async () => {
  const location = document.getElementById("location").value;
  const crop = document.getElementById("crop").value;
  const ph = phSlider.value;

  if (!location || !crop) {
    advisoryText.textContent = "⚠️ Please fill in all fields!";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/advisory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location, crop, ph })
    });
    const data = await res.json();
    advisoryText.textContent = data.advisory;
  } catch (error) {
    advisoryText.textContent = "❌ Error fetching advisory. Is backend running?";
  }
});

document.getElementById("reset").addEventListener("click", () => {
  document.getElementById("location").value = "";
  document.getElementById("crop").value = "";
  phSlider.value = 7;
  phValue.textContent = 7;
  advisoryText.textContent = "No advisory yet — enter details and click Get Advisory.";
});
