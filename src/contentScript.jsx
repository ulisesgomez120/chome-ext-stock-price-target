const stockChartSymbolContainer = document.getElementById("symbol");
const yahooSymbol = document.querySelector("#quote-header-info h1");

if (stockChartSymbolContainer) {
  chrome.storage.local.set({ ticker: stockChartSymbolContainer.value });
  chrome.runtime.sendMessage(null, {
    ticker: stockChartSymbolContainer.value,
    msg: "Ticker saved to local storage",
  });
} else if (yahooSymbol) {
  let textArr = yahooSymbol.innerText.split(" ");
  let value = textArr[textArr.length - 1].replace(/[\(\)]/g, "");
  chrome.storage.local.set({ ticker: value });
  chrome.runtime.sendMessage(null, {
    ticker: value,
    msg: "Ticker saved to local storage",
  });
} else {
  chrome.storage.local.set({ ticker: "" });
}

// add yahoo finance and check for stock ticker
//probably have to check url and get ele depending on the site. #symbol is input type = text on stockcharts.com
