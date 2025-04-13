import s from "./Menu.module.scss";

/*_________________________________________________*/
function Menu() {
  return (
    <ul className={s.menuList}>
      <li className={s.menuList__menuItem}>BTC</li>
      <li className={s.menuList__menuItem}>PI</li>
      <li className={s.menuList__menuItem}>ETH</li>
      <li className={s.menuList__menuItem}>XRP</li>
      <li className={s.menuList__menuItem}>ADA</li>
      <li className={s.menuList__menuItem}>SOL</li>
      <li className={s.menuList__menuItem}>DOG</li>
      <li className={s.menuList__menuItem}>LTH</li>
    </ul>
  );
}

export default Menu;
