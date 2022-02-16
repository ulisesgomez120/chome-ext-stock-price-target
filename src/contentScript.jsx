const symbolInput = document.getElementById("symbol");
if (symbolInput) {
  chrome.storage.local.set({ ticker: symbolInput.value });
  chrome.runtime.sendMessage(null, {
    ticker: symbolInput.value,
    msg: "Ticker saved to local storage",
  });
} else {
  chrome.storage.local.set({ ticker: "" });
}
