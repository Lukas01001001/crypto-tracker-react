import React from "react";

import s from "./PriceSection.module.scss";

import btc from "../../assets/btc.svg";
import pi from "../../assets/pi-network.svg";
import eth from "../../assets/eth.svg";
import xrp from "../../assets/xrp.svg";
import ada from "../..//assets/cardano.svg";
import sol from "../../assets/sol.svg";
import doge from "../../assets/doge.svg";
import ltc from "../../assets/ltc.svg";

import { useEffect, useState } from "react";

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

  //*********************************************************** */
  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("Twój Endpoit");
        if (!response.ok) {
          throw new Error("Error");
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  //******************************************************* */
  useEffect(() => {
    const fetchData = async () => {
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
            fetch(
              `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
            )
          )
        );
        const results = await Promise.all(responses.map((r) => r.json()));

        ///////////////////////////////////////////////////////////////////
        //const piResponse = await fetch(
        //  "https://api.coingecko.com/api/v3/simple/price?ids=pi-network&vs_currencies=usd"
        //);
        //const piResult = await piResponse.json();

        // netlify/functions/pi.js
        const piResponse = await fetch("/.netlify/functions/pi");
        const piResult = await piResponse.json();

        ///////////////////////////////////////////////////////////////////

        const formattedData = {
          BTC: { USD: parseFloat(results[0].price) },
          PI: { USD: parseFloat(piResult["pi-network"].usd) },
          ETH: { USD: parseFloat(results[1].price) },
          XRP: { USD: parseFloat(results[2].price) },
          ADA: { USD: parseFloat(results[3].price) },
          SOL: { USD: parseFloat(results[4].price) },
          DOGE: { USD: parseFloat(results[5].price) },
          LTC: { USD: parseFloat(results[6].price) },
        };

        //setPreviousData(data);
        //setData(formattedData);

        setData((prevData) => {
          setPreviousData(prevData);
          return formattedData;
        });

        setLastUpdated(new Date());
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;

  //console.log("Crypto:", crypto);
  //console.log("Data:", data[crypto]);
  //console.log("Icon:", cryptoIcons[crypto]);

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
          const current = data[crypto].USD;
          const previous = previousData[crypto]?.USD;

          let priceClass = "";
          if (previous !== undefined) {
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
                $ {current.toFixed(5)}
              </span>
            </div>
          );
        })}
      </section>
    </section>
  );
}

export default PriceSection;
