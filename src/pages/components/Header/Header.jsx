import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkMode, lightMode } from "../../../redux/theme/actions";
import css from "./Header.module.scss";
import sprite from "../../../assets/img/sprite.svg";
import userImage from "../../../assets/img/header/user.png";

const Header = () => {
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const userName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => {
    setToggle(!toggle);
    localStorage.setItem("isDarkMode", !toggle);

    if (toggle) {
      dispatch(lightMode());
    } else {
      dispatch(darkMode());
    }
  };

  return (
    <header className={css.header}>
      <button
        type="button"
        className={css.header__theme}
        onClick={handleChangeToggle}
        style={
          isDarkMode
            ? { backgroundColor: "#360A46" }
            : { backgroundColor: "#8367D6" }
        }
      >
        <span
          className={css.header__toggle}
          style={isDarkMode ? { left: "calc(100% - 40px)" } : { left: "4px" }}
        ></span>
        <span
          className={css.header__toggle_name}
          style={isDarkMode ? { left: "20px" } : { left: "50px" }}
        >
          {isDarkMode ? "BLACK" : "WHITE"}
        </span>
      </button>
      <button
        type="button"
        className={css.header__entry}
        style={
          isDarkMode
            ? { backgroundColor: "#360A46", color: "#FFFFFF" }
            : { backgroundColor: "#FBFBFB", color: "#657380" }
        }
      >
        <span
          className={css.header__entry_top}
          style={
            isDarkMode
              ? { backgroundColor: "#FFFFFF" }
              : { backgroundColor: "#232B36" }
          }
        ></span>
        <span
          className={css.header__entry_bottom}
          style={
            isDarkMode
              ? { backgroundColor: "#FFFFFF" }
              : { backgroundColor: "#232B36" }
          }
        ></span>
        New Entry
      </button>
      <button
        type="button"
        className={css.header__notification}
        style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}
      >
        <svg width={18} height={18}>
          <use href={`${sprite}#icon-notification`}></use>
        </svg>
      </button>
      <div className={css.header__user}>
        <img src={userImage} alt="" className={css.header__user_photo} />
        <span
          className={css.header__user_name}
          style={isDarkMode ? { color: "#FFFFFF" } : { color: "#232B36" }}
        >
          {userName}
        </span>
      </div>
      <button
        type="button"
        className={css.header__accord}
        style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}
      >
        <svg width={24} height={24}>
          <use href={`${sprite}#icon-accord`}></use>
        </svg>
      </button>
    </header>
  );
};

export default Header;
