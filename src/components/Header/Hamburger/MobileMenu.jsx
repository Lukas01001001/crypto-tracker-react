import React from "react";
import closeIcons from "../../../assets/xmark-circle.svg";
import s from "./MobileMenu.module.scss";

import { NavLink } from "react-router-dom";

function MobileMenu({ clickToggleHandler }) {
  return (
    <section className={s.container}>
      <img
        onClick={clickToggleHandler}
        src={closeIcons}
        alt="close icons"
        className={s.container__closeIcon}
      />
      <ul className={s.container__menuList}>
        <li className={s.container__menuList__menuItem}>
          <NavLink to="/" onClick={clickToggleHandler}>
            Prices
          </NavLink>
        </li>
        <li className={s.container__menuList__menuItem}>
          <NavLink to="/home" onClick={clickToggleHandler}>
            Home
          </NavLink>
        </li>
      </ul>

      {/* <ul className={s.container__logActionsList}>
        <li className={s.container__logActionsList__item}>Sign Up</li>
        <li
          className={`${s.container__logActionsList__item} ${s.container__logActionsList__item_login}`}
        >
          Log in
        </li>
      </ul> */}
    </section>
  );
}

export default MobileMenu;
