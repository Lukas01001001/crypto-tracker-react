import React, { useEffect, useState } from "react";

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

  // Fetch prices from Binance (every 5 seconds)
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
        setPreviousData(prevData);
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
    } catch (e) {
      setError(e);
    }
  };

  // Fetch PI price from CoinGecko via Netlify function (every 60 seconds)
  const fetchPi = async () => {
    try {
      const piResponse = await fetch("/.netlify/functions/pi");
      const piResult = await piResponse.json();

      const price =
        piResult?.["pi-network"]?.usd !== undefined
          ? parseFloat(piResult["pi-network"].usd)
          : null;

      if (price !== null) {
        setData((prevData) => {
          setPreviousData(prevData);
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
    // Initial fetch
    fetchBinance();
    fetchPi();

    // Binance: every 5 seconds
    const binanceInterval = setInterval(fetchBinance, 5000);

    // Pi Network: every 60 seconds
    const piInterval = setInterval(fetchPi, 20000);

    return () => {
      clearInterval(binanceInterval);
      clearInterval(piInterval);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
        {Object.keys(data).map((crypto) => {
          const current = data[crypto]?.USD;
          const previous = previousData[crypto]?.USD;

          let priceClass = "";
          if (previous !== undefined && current !== undefined) {
            if (current > previous) priceClass = s.priceUp;
            else if (current < previous) priceClass = s.priceDown;
          }

          return (
            <div key={crypto} className={s.container__iconsWrapper__iconBox}>
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
