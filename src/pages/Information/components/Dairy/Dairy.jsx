import { useSelector } from "react-redux";
import css from "./Dairy.module.scss";
import timeIcon from "../../img/time-icon.png";
import dairyTimerImage from "../../img/dairy-timer.png";

const Dairy = () => {
  const sleepsArray = useSelector((state) => state.user.sleeps);
  const isDarkMode = useSelector((state) => state.isDarkMode);

  return (
    <div
      className={css.dairy}
      style={
        isDarkMode
          ? { backgroundColor: "#360A46" }
          : { backgroundColor: "#FFFFFF" }
      }
    >
      <div className={css.dairy__header}>
        <p
          className={css.dairy__title}
          style={isDarkMode ? { color: "#FFFFFF" } : { color: "#000000" }}
        >
          Dream Diary
        </p>
        <ul
          className={css.dairy__list}
          style={isDarkMode ? { color: "#FFFFFF" } : { color: "#000000" }}
        >
          {sleepsArray.length
            ? sleepsArray.map(
                ({ _id, sleepDuration, date, timeGo, timeGot }) => {
                  return (
                    <li
                      className={css.dairy__item}
                      key={_id}
                      style={
                        isDarkMode
                          ? { borderColor: "#cbcbcb" }
                          : { borderColor: "rgba(21, 115, 255, 0.1)" }
                      }
                    >
                      <span className={css.dairy__icon}>
                        <img src={timeIcon} alt="" width={24} height={24} />
                      </span>
                      <p
                        className={css.dairy__subtitle}
                        style={
                          isDarkMode
                            ? { color: "#FFFFFF" }
                            : { color: "#232B36" }
                        }
                      >
                        {date}
                      </p>
                      <img
                        src={dairyTimerImage}
                        alt=""
                        width={24}
                        height={24}
                        className={css.dairy__timer}
                      />
                      <p
                        className={css.dairy__date}
                        style={
                          isDarkMode
                            ? { color: "#FFFFFF" }
                            : { color: "#667481" }
                        }
                      >
                        {timeGo} - {timeGot} : {sleepDuration}
                      </p>
                    </li>
                  );
                }
              )
            : "Your dairy is empty now..."}
        </ul>
      </div>
    </div>
  );
};

export default Dairy;
