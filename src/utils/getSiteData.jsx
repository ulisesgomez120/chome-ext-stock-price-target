import "regenerator-runtime/runtime.js";

export async function fetchTickerData(ticker) {
  if (!ticker || typeof ticker !== "string") {
    throw new Error("ticker must be a string in fetchTickerData");
  }

  const res = await fetch(
    `https://testext.netlify.app/api/getSite?ticker=${ticker}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    }
  );
  if (!res.ok) {
    console.log(res);
    throw new Error("ticker not found");
  }
  const data = await res.json();
  return data;
}
