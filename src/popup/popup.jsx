import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import "./popup.css";
import { TickerData } from "./TickerData";
import { fetchTickerData } from "../utils/getSiteData";

const App = () => {
  const [state, setState] = useState({
    ticker: "",
    tickerData: {},
    isLoading: true,
  });
  // add listener to chrome messages. Coming from contentScript.js
  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);
  // get available data on load
  useEffect(() => {
    chrome.storage.local.get(["ticker", "tickerData"], (res) => {
      const { ticker, tickerData } = res;
      if (ticker.includes("$") || ticker === "") {
        let noTickerData = {
          price: "Go To Stock Page",
          ratings: {
            total: "0",
            consensus: "--",
          },
          dataAvailable: false,
          percentage: "--",
          ticker: ticker || "--",
          createdOn: new Date().toISOString(),
          url: `https://www.tipranks.com/`,
        };
        setState({
          isLoading: false,
          tickerData: noTickerData,
          ticker: ticker,
        });
        chrome.storage.local.set({ tickerData: noTickerData });
        return;
      } else if (ticker && ticker === tickerData.ticker) {
        setState({
          isLoading: false,
          tickerData: tickerData,
          ticker: ticker,
        });
      } else {
        fetchTickerData(ticker)
          .then((data) => {
            setState({
              isLoading: false,
              tickerData: data,
              ticker: ticker,
            });
            chrome.storage.local.set({ tickerData: data });
          })
          .catch((err) => console.log(err));
      }
    });
  }, []);

  function handleMessage(msg) {
    if (!msg.ticker) {
      return;
    }
    if (msg.ticker.includes("$") || msg.ticker === "") {
      let noTickerData = {
        price: "Go To Stock Page",
        ratings: {
          total: "0",
          consensus: "--",
        },
        dataAvailable: false,
        percentage: "--",
        ticker: msg.ticker,
        createdOn: new Date().toISOString(),
        url: `https://www.tipranks.com/`,
      };
      setState({
        isLoading: false,
        tickerData: noTickerData,
        ticker: msg.ticker,
      });
      chrome.storage.local.set({ tickerData: noTickerData });
      return;
    } else {
      chrome.storage.local.get(["tickerData"], (res) => {
        const { tickerData } = res;
        if (msg.ticker === tickerData.ticker) {
          setState({
            isLoading: false,
            tickerData: tickerData,
            ticker: msg.ticker,
          });
        } else if (msg.ticker) {
          setState((state) => ({ ...state, ...{ isLoading: true } }));
          fetchTickerData(msg.ticker)
            .then((data) => {
              setState({
                isLoading: false,
                tickerData: data,
                ticker: msg.ticker,
              });
              chrome.storage.local.set({ tickerData: data });
            })
            .catch((err) => console.log(err));
        }
      });
    }
  }
  return (
    <TickerData
      ticker={state.ticker}
      tickerData={state.tickerData}
      isLoading={state.isLoading}
    />
  );
};

const root = document.createElement("div");
root.style.width = "100%";
root.style.height = "100%";
document.body.appendChild(root);
ReactDom.render(<App />, root);
