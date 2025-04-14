import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { ArrowLeft } from "lucide-react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function CryptoChartPage() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(null);
  const [range, setRange] = useState("1"); // default: 24h

  useEffect(() => {
    // Clean up old cached chart data on component mount
    const now = Date.now();

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("chartData_")) {
        try {
          const item = JSON.parse(localStorage.getItem(key));
          if (!item?.timestamp) continue;

          const is24h = key.includes("_1");
          const age = now - item.timestamp;
          const maxAge = is24h ? 30 * 60 * 1000 : 24 * 60 * 60 * 1000;

          if (age > maxAge) {
            localStorage.removeItem(key);
          }
        } catch (err) {
          console.warn("Invalid localStorage item:", key);
        }
      }
    }

    const fetchHistory = async () => {
      try {
        const coinIdMap = {
          BTC: "bitcoin",
          ETH: "ethereum",
          XRP: "ripple",
          ADA: "cardano",
          SOL: "solana",
          DOGE: "dogecoin",
          LTC: "litecoin",
          PI: "pi-network",
        };

        const id = coinIdMap[symbol.toUpperCase()];
        if (!id) return;

        const cacheKey = `chartData_${symbol}_${range}`;
        const cache = localStorage.getItem(cacheKey);

        if (cache) {
          const parsed = JSON.parse(cache);
          const now = Date.now();
          const age = now - parsed.timestamp;
          //const maxAge = 30 * 60 * 1000; // 30 minutes
          const maxAge = range === "1" ? 30 * 60 * 1000 : 24 * 60 * 60 * 1000;

          if (age < maxAge && parsed.data) {
            setChartData(parsed.data);
            return;
          } else {
            localStorage.removeItem(cacheKey); // clear expired
          }
        }

        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${
            range === "max" ? "365" : range
          }`
        );

        /*const res = await fetch(
          `/.netlify/functions/cryptoChart?id=${id}&vs_currency=usd&days=${range}`
        );*/

        const data = await res.json();

        const formatted = {
          labels: data.prices.map(([timestamp]) =>
            new Date(timestamp).toLocaleTimeString([], {
              month: "short",
              day: "numeric",
              hour: range === "1" ? "2-digit" : undefined,
              minute: range === "1" ? "2-digit" : undefined,
            })
          ),
          datasets: [
            {
              label: `${symbol}/USD (${range === "1" ? "24h" : range + "D"})`,
              data: data.prices.map(([, price]) => price),
              borderColor: "#f6b133",
              tension: 0.4,
              pointRadius: 0,
            },
          ],
        };

        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            timestamp: Date.now(),
            data: formatted,
          })
        );

        setChartData(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, [symbol, range]);

  if (!chartData)
    return <p style={{ textAlign: "center" }}>Loading {symbol} chart...</p>;

  return (
    <section style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 1rem",
          marginBottom: "1rem",
          background: "#f6b133",
          border: "none",
          color: "#000",
          fontWeight: "bold",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <ArrowLeft size={18} /> Back
      </button>

      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        {symbol} {range === "1" ? "24h" : range + "D"} Chart
      </h2>

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        {["1", "7", "30", "365", "max"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            style={{
              margin: "0 5px",
              padding: "6px 12px",
              background: range === r ? "#f6b133" : "#eee",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: range === r ? "bold" : "normal",
            }}
            title={
              r === "max" ? "Due to free API limits, shows 1 year data" : ""
            }
          >
            {r === "1" && "24h"}
            {r === "7" && "7D"}
            {r === "30" && "30D"}
            {r === "365" && "1Y"}
            {r === "max" && "ALL"}
          </button>
        ))}
      </div>

      <Line data={chartData} />
    </section>
  );
}

export default CryptoChartPage;
