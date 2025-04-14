import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`
        );
        const data = await res.json();

        setChartData({
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
              borderColor: "orange",
              tension: 0.4,
            },
          ],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, [symbol]);

  if (!chartData) return <p>Loading {symbol} chart...</p>;

  return (
    <section style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>{symbol} 24h Chart</h2>
      <Line data={chartData} />
    </section>
  );
}

export default CryptoChartPage;
