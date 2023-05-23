chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "generate-response") {
    const prompt = document.getElementById("prompt-input").value;
    const output = document.getElementById("response-output");
    output.innerHTML = "Loading...";
    fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY",
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 60,
        n: 1,
        stop: "\n",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        output.innerHTML = data.choices[0].text;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});