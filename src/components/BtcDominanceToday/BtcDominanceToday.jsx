import React, { useEffect, useState } from "react";
import styles from "./BtcDominanceToday.module.scss";

function BtcDominanceToday() {
  const [dominance, setDominance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDominance = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/global");
        const result = await response.json();
        const btcDom = result?.data?.market_cap_percentage?.btc;

        if (btcDom !== undefined) {
          setDominance(btcDom.toFixed(2));
        } else {
          throw new Error("No BTC dominance data.");
        }
      } catch (e) {
        console.error(e);
        setError("Could not fetch today's BTC dominance.");
      }
    };

    fetchDominance();
  }, []);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!dominance)
    return <p className={styles.loading}>Loading BTC dominance...</p>;

  return (
    <div className={styles.todayWrapper}>
      <p className={styles.label}>BTC Dominance Today</p>
      <p className={styles.value}>{dominance}%</p>
    </div>
  );
}

export default BtcDominanceToday;
