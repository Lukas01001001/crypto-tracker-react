import React, { useEffect, useState } from "react";
import styles from "./BtcDominance.module.scss";

function BtcDominance() {
  const [dominance, setDominance] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // <- brakowało tego!

  useEffect(() => {
    const fetchDominance = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/global");
        const result = await response.json();

        const btcDom =
          result?.data?.market_cap_percentage?.btc ??
          result?.data?.market_cap_percentage?.bitcoin;

        if (btcDom !== undefined) {
          setDominance(parseFloat(btcDom).toFixed(2));
          setLastUpdated(new Date().toLocaleTimeString());
        } else {
          throw new Error("BTC dominance not found in response.");
        }

        setLoading(false);
      } catch (e) {
        console.error(e);
        setError("Failed to fetch BTC dominance.");
        setLoading(false);
      }
    };

    fetchDominance();
  }, []);

  if (error) return <p className={styles.error}>{error}</p>;
  if (loading)
    return <p className={styles.loading}>Loading BTC dominance...</p>;

  return (
    <div className={styles.container}>
      <h2>// BTC Dominance</h2>
      <p className={styles.value}>{dominance}%</p>
      {lastUpdated && (
        <p className={styles.timestamp}>Updated: {lastUpdated}</p>
      )}
    </div>
  );
}

export default BtcDominance;
