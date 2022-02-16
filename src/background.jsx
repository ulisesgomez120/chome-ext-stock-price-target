chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({ ticker: "", tickerData: {} });
  chrome.contextMenus.create({
    title: "Price Target",
    id: "search",
    contexts: ["page"],
    documentUrlPatterns: ["https://stockcharts.com/*"],
  });
});

chrome.contextMenus.onClicked.addListener((menu) => {
  navToTipRanks();
});
chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  if (msg === "See More") {
    navToTipRanks();
  }
});
function navToTipRanks() {
  chrome.storage.local.get(["ticker"], (res) => {
    const ticker = res.ticker;
    if (ticker && ticker[0] !== "$") {
      chrome.tabs.create({
        url: `https://www.tipranks.com/stocks/${ticker}/forecast`,
      });
    } else {
      chrome.tabs.create({
        url: "https://www.tipranks.com",
      });
    }
  });
}
