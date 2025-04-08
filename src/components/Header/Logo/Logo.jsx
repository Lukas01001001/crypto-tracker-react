import s from "./Logo.module.scss";
import image from "../../../assets/logo.png";

function Logo() {
  return <img className={s.logoIcon} src={image} alt="pages Logo" />;
}

export default Logo;
