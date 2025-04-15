import React, { useEffect, useState } from "react";
import styles from "./FearGreed.module.scss";

import FearGreedGauge from "../FearGreedGauge/FearGreedGauge";

function FearGreed() {
  const [index, setIndex] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFearGreed = async () => {
      try {
        const response = await fetch("https://api.alternative.me/fng/");
        const result = await response.json();
        setIndex(result.data[0]); // current value
      } catch (err) {
        console.error("Error fetching Fear & Greed Index:", err);
        setError("Failed to load Fear & Greed Index.");
      }
    };

    fetchFearGreed();
  }, []);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!index) return <p className={styles.loading}>Loading...</p>;

  const formattedDate = new Date(index.timestamp * 1000).toLocaleString(
    "en-EN",
    {
      dateStyle: "long",
      timeStyle: "short",
    }
  );

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Fear & Greed Index</h2>
      {/* )( */}
      <FearGreedGauge
        value={parseInt(index.value)}
        label={index.value_classification}
      />

      {/* aktual */}
      <p className={styles.date}>Updated: {formattedDate}</p>
      <section className={styles.legend}>
        <h3 className={styles.legendTitle}>Legend:</h3>
        <ul>
          <li>
            <span
              className={styles.dot}
              style={{ background: "#ff4e4e" }}
            ></span>{" "}
            0–25: Extreme Fear
          </li>
          <li>
            <span
              className={styles.dot}
              style={{ background: "#ffae00" }}
            ></span>{" "}
            26–45: Fear
          </li>
          <li>
            <span
              className={styles.dot}
              style={{ background: "#ffe600" }}
            ></span>{" "}
            46–55: Neutral
          </li>
          <li>
            <span
              className={styles.dot}
              style={{ background: "#a3e635" }}
            ></span>{" "}
            56–75: Greed
          </li>
          <li>
            <span
              className={styles.dot}
              style={{ background: "#22c55e" }}
            ></span>{" "}
            76–100: Extreme Greed
          </li>
        </ul>
      </section>
    </section>
  );
}

export default FearGreed;
