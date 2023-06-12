import { useDispatch, useSelector } from "react-redux";
import css from "./Profile.module.scss";
import { useState } from "react";
import { darkMode, lightMode } from "../../../../redux/theme/actions";

const Profile = () => {
  const isDarkMode = useSelector((state) => state.isDarkMode);
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
    <div
      className={css.profile}
      style={
        isDarkMode
          ? { backgroundColor: "#360A46", color: "#FFFFFF" }
          : { backgroundColor: "#FFFFFF", color: "#000000" }
      }
    >
      <p className={css.profile__title}>Profile settings</p>
      <div className={css.profile__block}>
        <span className={css.profile__number}>01</span>
        <p className={css.profile__subtitle}>Change the topic</p>
        <button
          type="button"
          className={css.profile__theme}
          onClick={handleChangeToggle}
          style={
            isDarkMode
              ? { backgroundColor: "#220C2B" }
              : { backgroundColor: "#8367D6" }
          }
        >
          <span
            className={css.profile__toggle}
            style={isDarkMode ? { left: "calc(100% - 32px)" } : { left: "4px" }}
          ></span>
          <span
            className={css.profile__toggle_name}
            style={isDarkMode ? { left: "12px" } : { left: "40px" }}
          >
            {isDarkMode ? "BLACK" : "WHITE"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
