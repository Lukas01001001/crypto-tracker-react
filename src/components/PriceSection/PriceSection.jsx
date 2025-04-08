import React from "react";

import btc from "../../assets/btc.svg";
import eth from "../../assets/eth.svg";
import ltc from "../../assets/ltc.svg";
import doge from "../../assets/doge.svg";

function PriceSection() {
  return (
    <section>
      <h1>Cryptocurency Prices</h1>
      <section>
        <div>
          <img src={btc} alt="btc" />
          <span></span>
        </div>
        <div>
          <img src={eth} alt="" />
          <span></span>
        </div>
        <div>
          <img src={ltc} alt="" />
          <span></span>
        </div>
        <div>
          <img src={doge} alt="" />
          <span></span>
        </div>
      </section>
    </section>
  );
}

export default PriceSection;
