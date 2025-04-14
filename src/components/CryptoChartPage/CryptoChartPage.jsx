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

  useEffect(() => {
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

        const cacheKey = `chartData_${symbol}`;
        const cache = localStorage.getItem(cacheKey);

        if (cache) {
          const parsed = JSON.parse(cache);
          const now = Date.now();
          const age = now - parsed.timestamp;
          const maxAge = 30 * 60 * 1000; // 30 minutes

          if (age < maxAge && parsed.data) {
            setChartData(parsed.data);
            return;
          } else {
            localStorage.removeItem(cacheKey); // clear expired
          }
        }

        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`
        );
        const data = await res.json();

        const formatted = {
          labels: data.prices.map(([timestamp]) =>
            new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          ),
          datasets: [
            {
              label: `${symbol}/USD (24h)`,
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
  }, [symbol]);

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
        {symbol} 24h Chart
      </h2>
      <Line data={chartData} />
    </section>
  );
}

export default CryptoChartPage;
