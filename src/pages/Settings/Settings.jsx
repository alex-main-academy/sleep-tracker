import { useSelector } from "react-redux";
import css from "./Settings.module.scss";
import Features from "./components/Features/Features";
import LikeToSleep from "./components/LikeToSleep/LikeToSleep";
import Profile from "./components/Profile/Profile";

const Settings = () => {
  const isDarkMode = useSelector((state) => state.isDarkMode);

  return (
    <section className={css.settings}>
      <h2
        className={css.settings__title}
        style={isDarkMode ? { color: "#FFFFFF" } : { color: "#232B36" }}
      >
        Settings
        <span style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}>
          Profile
        </span>
      </h2>
      <div className={css.settings__top}>
        <Features />
        <LikeToSleep />
      </div>
      <Profile />
    </section>
  );
};

export default Settings;
