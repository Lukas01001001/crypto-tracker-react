import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/HomePage/Home";
import Header from "./components/Header/Header";
import PriceSection from "./components/PriceSection/PriceSection";
import CryptoChartPage from "./components/CryptoChartPage/CryptoChartPage";
import FearGreed from "./components/FearGreed/FearGreed";

function App() {
  return (
    // <>
    <Router>
      <Header />
      {/* <PriceSection />
        <Home /> */}
      <Routes>
        <Route path="/" element={<PriceSection />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chart/:symbol" element={<CryptoChartPage />} />
        <Route path="/fear-greed" element={<FearGreed />} />
      </Routes>
    </Router>
    //</>
  );
}

export default App;
