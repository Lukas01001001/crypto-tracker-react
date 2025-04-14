import Home from "./components/HomePage/Home";
import Header from "./components/Header/Header";
import PriceSection from "./components/PriceSection/PriceSection";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CryptoChartPage from "./components/CryptoChartPage/CryptoChartPage"; // nowy komponent

function App() {
  return (
    // <>
    <Router>
      <Header />
      {/* <PriceSection />
        <Home /> */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PriceSection />
              <Home />
            </>
          }
        />
        <Route path="/chart/:symbol" element={<CryptoChartPage />} />
      </Routes>
    </Router>
    //</>
  );
}

export default App;
