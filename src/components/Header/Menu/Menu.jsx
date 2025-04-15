import { NavLink } from "react-router-dom";
import s from "./Menu.module.scss";

function Menu() {
  return (
    <nav className={s.menu}>
      <ul className={s.menuList}>
        <li className={s.menuList__menuItem}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.active}` : s.link
            }
          >
            Prices
          </NavLink>
        </li>
        <li className={s.menuList__menuItem}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.active}` : s.link
            }
          >
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
