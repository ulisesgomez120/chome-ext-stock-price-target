import React from "react";
import "./popup.css";

export const TickerData = ({ ticker, tickerData, isLoading }) => {
  return isLoading ? (
    <>
      <header>
        <h2 className='skeleton'>
          <div></div>
        </h2>
        <h2 className='skeleton'>
          <div></div>
        </h2>
      </header>
      <main>
        <section id='price-target' className='skeleton'>
          <div></div>
          <div></div>
        </section>
        <section id='ratings' className='skeleton'>
          <div></div>
          <div></div>
        </section>
      </main>
    </>
  ) : (
    <>
      <header>
        <h2>{tickerData?.ticker}</h2>
        <h2
          className={
            tickerData?.percentage?.includes("Up")
              ? "percentage upside"
              : tickerData?.percentage?.includes("Down")
              ? "percentage downside"
              : "percentage"
          }>
          {tickerData?.percentage}
        </h2>
      </header>
      <main>
        <section
          id='price-target'
          className={
            tickerData?.percentage?.includes("Up")
              ? "upside"
              : tickerData?.percentage?.includes("Down")
              ? "downside"
              : ""
          }>
          <p className='section-title'>Price Target:</p>
          <h1>{tickerData?.price}</h1>
        </section>
        <section id='ratings'>
          <p className='section-title'>Consensus:</p>
          <h3 className={!tickerData.dataAvailable ? "no-data" : null}>
            {tickerData?.ratings?.consensus}
          </h3>
          <h3>{tickerData?.ratings?.total} Ratings</h3>
        </section>
      </main>
    </>
  );
};
