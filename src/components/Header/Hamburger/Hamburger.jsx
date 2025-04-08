import { useState } from "react";
import hamburger from "../../../assets/hamburger.svg";
import s from "./Hamburger.module.scss";

import MobileMenu from "./MobileMenu";

function Hamburger() {
  const [clikState, setClickState] = useState(false);

  const clickToggleHandler = () => {
    setClickState((prev) => !prev);
  };

  //console.log(clikState);

  return (
    <nav className={s.container}>
      <img
        onClick={clickToggleHandler}
        className={s.container__hamburgerIcon}
        src={hamburger}
        alt="hamburger icon"
      />

      {clikState ? (
        <MobileMenu clickToggleHandler={clickToggleHandler} />
      ) : null}
    </nav>
  );
}

export default Hamburger;
