import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import s from "./PriceSection.module.scss";

import btc from "../../assets/btc.svg";
import pi from "../../assets/pi-network.svg";
import eth from "../../assets/eth.svg";
import xrp from "../../assets/xrp.svg";
import ada from "../../assets/cardano.svg";
import sol from "../../assets/sol.svg";
import doge from "../../assets/doge.svg";
import ltc from "../../assets/ltc.svg";

function PriceSection() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [previousData, setPreviousData] = useState({});
  const [binanceCounter, setBinanceCounter] = useState(0); // counter for syncing Pi fetch

  const navigate = useNavigate();

  const cryptoIcons = {
    BTC: btc,
    PI: pi,
    ETH: eth,
    XRP: xrp,
    ADA: ada,
    SOL: sol,
    DOGE: doge,
    LTC: ltc,
  };

  // Fetch prices from Binance
  const fetchBinance = async () => {
    try {
      const symbols = [
        "BTCUSDT",
        "ETHUSDT",
        "XRPUSDT",
        "ADAUSDT",
        "SOLUSDT",
        "DOGEUSDT",
        "LTCUSDT",
      ];

      const responses = await Promise.all(
        symbols.map((symbol) =>
          fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
        )
      );

      const results = await Promise.all(responses.map((r) => r.json()));

      setData((prevData) => {
        setPreviousData(prevData); // update previousData before setting new
        return {
          ...prevData,
          BTC: { USD: parseFloat(results[0].price) },
          ETH: { USD: parseFloat(results[1].price) },
          XRP: { USD: parseFloat(results[2].price) },
          ADA: { USD: parseFloat(results[3].price) },
          SOL: { USD: parseFloat(results[4].price) },
          DOGE: { USD: parseFloat(results[5].price) },
          LTC: { USD: parseFloat(results[6].price) },
        };
      });

      setLastUpdated(new Date());
      setLoading(false);

      // Update binance counter
      setBinanceCounter((prev) => {
        const next = prev + 1;
        if (next >= 12) {
          fetchPi(); // fetch Pi price every 12th Binance fetch (~60s)
          return 0;
        }
        return next;
      });
    } catch (e) {
      setError(e);
    }
  };

  // Fetch PI price from CoinGecko (supports multiple sources)
  const fetchPi = async () => {
    try {
      // ❌ Skip Netlify function when running locally (uncomment if needed)
      // if (window.location.hostname === "localhost") {
      //   console.warn("Skipping PI fetch in local mode");
      //   return;
      // }
      // ✅ Option A – Local Netlify function (use when deployed on Netlify)
      // const piResponse = await fetch("/.netlify/functions/pi");

      // ✅ Option B – Hosted Netlify Function (production only)
      // const piResponse = await fetch(
      //   "https://cryptoip.netlify.app/.netlify/functions/pi"
      // );

      // ✅ Option C – Direct public CoinGecko API (works locally and in production)
      const piResponse = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=pi-network&vs_currencies=usd"
      );
      const piResult = await piResponse.json();

      const price =
        piResult?.["pi-network"]?.usd !== undefined
          ? parseFloat(piResult["pi-network"].usd)
          : null;

      if (price !== null) {
        setData((prevData) => {
          setPreviousData((prevPrev) => ({
            ...prevPrev,
            PI: prevData.PI, // store current PI as previous
          }));

          return {
            ...prevData,
            PI: { USD: price },
          };
        });
      }
    } catch (e) {
      console.error("PI fetch error:", e);
    }
  };

  useEffect(() => {
    fetchBinance(); // initial load
    fetchPi(); // initial load

    const binanceInterval = setInterval(fetchBinance, 5000);
    return () => clearInterval(binanceInterval);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const displayOrder = ["BTC", "PI", "ETH", "XRP", "ADA", "SOL", "DOGE", "LTC"];

  return (
    <section className={s.container}>
      <h1 className={s.container__header}>
        Cryptocurrency <span className={s.container__header__span}>Prices</span>
      </h1>

      {lastUpdated && (
        <p className={s.lastUpdated}>
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}

      <section className={s.container__iconsWrapper}>
        {displayOrder.map((crypto) => {
          if (!data[crypto]) return null;

          const current = data[crypto]?.USD;
          const previous = previousData[crypto]?.USD;

          let priceClass = "";
          if (previous !== undefined && current !== undefined) {
            if (current > previous) priceClass = s.priceUp;
            else if (current < previous) priceClass = s.priceDown;
          }

          return (
            <div
              key={crypto}
              className={s.container__iconsWrapper__iconBox}
              onClick={() => navigate(`/chart/${crypto}`)}
              style={{ cursor: "pointer" }}
              title={`Click to view ${crypto} chart`}
            >
              <img
                className={s.container__iconsWrapper__iconBox__img}
                src={cryptoIcons[crypto]}
                alt={`${crypto} icon`}
              />
              <span
                className={`${s.container__iconsWrapper__iconBox__price} ${priceClass}`}
              >
                $ {current !== undefined ? current.toFixed(5) : "?"}
              </span>
            </div>
          );
        })}
      </section>
    </section>
  );
}

export default PriceSection;
