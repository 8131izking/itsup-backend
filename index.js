document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userInput = document.getElementById("userInput").value;

  const response = await fetch("/.netlify/functions/generate", {
    method: "POST",
    body: JSON.stringify({ message: userInput }),
  });

  const data = await response.json();

  document.getElementById("response").textContent = data.reply;
});
// 表示に変化がないため再アップロード対応
