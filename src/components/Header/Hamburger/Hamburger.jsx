import { useState } from "react";
import hamburger from "../../../assets/hamburger.svg";
import s from "./Hamburger.module.scss";

import MobileMenu from "./MobileMenu";

function Hamburger() {
  const [clikState, setClickState] = useState(false);

  const clickToggleHandler = () => {
    setClickState((prev) => !prev);
  };

  console.log(clikState);

  return (
    <>
      <img
        onClick={clickToggleHandler}
        className={s.hamburgerIcon}
        src={hamburger}
        alt="hamburger icon"
      />
      {clikState ? (
        <MobileMenu clickToggleHandler={clickToggleHandler} />
      ) : null}
    </>
  );
}

export default Hamburger;
