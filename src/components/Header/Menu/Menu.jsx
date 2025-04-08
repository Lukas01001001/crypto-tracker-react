import s from "./Menu.module.scss";

/*_________________________________________________*/
function Menu() {
  return (
    <ul className={s.menuList}>
      <li className={s.menuList__menuItem}>BTC</li>
      <li className={s.menuList__menuItem}>ETH</li>
      <li className={s.menuList__menuItem}>LTH</li>
      <li className={s.menuList__menuItem}>DOG</li>
    </ul>
  );
}

export default Menu;
