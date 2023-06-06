import { StyledLink } from "./Menu.styled";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/auth/actions";
import css from "./Menu.module.scss";
import logoImage from "../../../assets/img/menu/logo.svg";
import sprite from "../../../assets/img/sprite.svg";

const Menu = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.isDarkMode);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <div
      className={css.menu}
      style={
        isDarkMode
          ? { backgroundColor: "#360A46" }
          : { backgroundColor: "#FFFFFF" }
      }
    >
      <img src={logoImage} alt="logo" className={css.menu__logo} />
      <ul className={css.menu__list}>
        <li className={css.menu__item}>
          <StyledLink
            to=""
            end
            style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}
          >
            <svg width={20} height={20} className={css.menu__icon}>
              <use href={`${sprite}#icon-analytics`}></use>
            </svg>
          </StyledLink>
        </li>
        <li className={css.menu__item}>
          <StyledLink
            to="information"
            style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}
          >
            <svg width={24} height={24} className={css.menu__icon}>
              <use href={`${sprite}#icon-document`}></use>
            </svg>
          </StyledLink>
        </li>
        <li className={css.menu__item}>
          <StyledLink
            to="health"
            style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}
          >
            <svg width={20} height={17} className={css.menu__icon}>
              <use href={`${sprite}#icon-shoes`}></use>
            </svg>
          </StyledLink>
        </li>
        <li className={css.menu__item}>
          <StyledLink
            to="settings"
            style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}
          >
            <svg width={20} height={20} className={css.menu__icon}>
              <use href={`${sprite}#icon-settings`}></use>
            </svg>
          </StyledLink>
        </li>
      </ul>
      <button type="button" className={css.menu__logout} onClick={handleLogout}>
        LOG OUT
      </button>
    </div>
  );
};

export default Menu;
