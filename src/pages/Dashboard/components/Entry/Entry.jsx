import { baseAPI } from "../../../../components/baseAPI";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../../redux/user/userSlice";
import Notiflix from "notiflix";
import axios from "axios";
import css from "./Entry.module.scss";

const Entry = () => {
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const userEmail = useSelector((state) => state.user.email);
  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    if (event.target.name === "reset") {
      event.currentTarget.elements.date.value = "";
      event.currentTarget.elements.time.value = "";
      event.currentTarget.elements.time2.value = "";
    }
  };

  const handleFormSend = (event) => {
    event.preventDefault();
    const date = event.currentTarget.elements.date.value;
    const timeGo = event.currentTarget.elements.time.value;
    const timeGot = event.currentTarget.elements.time2.value;

    const bedtimeHours = parseInt(timeGo.split(":")[0]);
    const bedtimeMinutes = parseInt(timeGo.split(":")[1]);

    const wakeupTimeHours = parseInt(timeGot.split(":")[0]);
    const wakeupTimeMinutes = parseInt(timeGot.split(":")[1]);

    let durationHours, durationMinutes;

    if (
      wakeupTimeHours > bedtimeHours ||
      (wakeupTimeHours === bedtimeHours && wakeupTimeMinutes >= bedtimeMinutes)
    ) {
      durationHours = wakeupTimeHours - bedtimeHours;
      durationMinutes = wakeupTimeMinutes - bedtimeMinutes;
    } else {
      durationHours = 24 - bedtimeHours + wakeupTimeHours;
      durationMinutes = wakeupTimeMinutes - bedtimeMinutes;
    }

    if (durationMinutes < 0) {
      durationHours--;
      durationMinutes = 60 - Math.abs(durationMinutes);
    }

    const sleepDuration = `${durationHours}h ${durationMinutes}m`;

    handleAddTimeToUser({
      date,
      timeGo,
      timeGot,
      sleepDuration,
      durationHours,
    });

    handleGetCurrentUser();
    Notiflix.Notify.success("You added this data to your diary");
  };

  const handleAddTimeToUser = async ({
    date,
    timeGo,
    timeGot,
    sleepDuration,
    durationHours,
  }) => {
    try {
      const response = await axios.post(
        `${baseAPI}/api/users/${userEmail}/sleep`,
        { date, timeGo, timeGot, sleepDuration, durationHours }
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetCurrentUser = async () => {
    try {
      const response = await axios.get(`${baseAPI}/api/users/${userEmail}`);
      dispatch(getCurrentUser(response.data.data.user));
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={css.overlay}>
      <div
        className={css.modal}
        style={
          isDarkMode
            ? { backgroundColor: "#360A46" }
            : { backgroundColor: "#FFFFFF" }
        }
      >
        <p
          className={css.modal__title}
          style={isDarkMode ? { color: "#FFFFFF" } : { color: "#000000" }}
        >
          Set your sleep time
        </p>
        <form onClick={handleFormSubmit} onSubmit={handleFormSend}>
          <ul className={css.modal__list}>
            <li className={css.modal__item}>
              <span className={css.modal__number}>01</span>
              <p
                className={css.modal__subtitle}
                style={isDarkMode ? { color: "#FFFFFF" } : { color: "#000000" }}
              >
                Select a date
              </p>
              <input
                type="date"
                name="date"
                className={css.modal__calendar}
                required
                max={new Date().toISOString().split("T")[0]}
              />
            </li>
            <li className={css.modal__item}>
              <span className={css.modal__number}>02</span>
              <p
                className={css.modal__subtitle}
                style={isDarkMode ? { color: "#FFFFFF" } : { color: "#000000" }}
              >
                Specify the time you fell asleep
              </p>
              <input
                type="time"
                name="time"
                className={css.modal__time}
                required
              />
            </li>
            <li className={css.modal__item}>
              <span className={css.modal__number}>03</span>
              <p
                className={css.modal__subtitle}
                style={isDarkMode ? { color: "#FFFFFF" } : { color: "#000000" }}
              >
                Specify the time you woke up
              </p>
              <input
                type="time"
                name="time2"
                className={css.modal__time}
                required
              />
            </li>
          </ul>
          <div className={css.modal__buttons}>
            <button
              type="button"
              className={css.modal__button}
              name="reset"
              style={isDarkMode ? { color: "#FFFFFF" } : { color: "#000000" }}
            >
              RESET
            </button>
            <button
              className={css.modal__button}
              name="submit"
              style={isDarkMode ? { color: "#FFFFFF" } : { color: "#000000" }}
            >
              SELECT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Entry;
