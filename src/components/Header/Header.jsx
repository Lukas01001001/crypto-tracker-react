import s from "./Header.module.scss";

//import image from "../../assets/logo.png";
//import image from "../../assets/charts-logo.svg";
import Hamburger from "./Hamburger/Hamburger";
import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";
import LogActions from "./LogActions/LogActions";

function Header() {
  return (
    <header className={s.headerContainer}>
      <Logo />
      <Menu />
      <Hamburger />
      <LogActions />
    </header>
  );
}

export default Header;
