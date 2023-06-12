import { useDispatch, useSelector } from "react-redux";
import { baseAPI } from "../../../../components/baseAPI";
import { getCurrentUser } from "../../../../redux/user/userSlice";
import css from "./PressureModal.module.scss";
import axios from "axios";
import Notiflix from "notiflix";

const PressureModal = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const userEmail = useSelector((state) => state.user.email);

  const handleGetCurrentUser = async () => {
    try {
      const response = await axios.get(`${baseAPI}/api/users/${userEmail}`);
      dispatch(getCurrentUser(response.data.data.user));
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangePressure = async (event) => {
    event.preventDefault();
    const pressure = event.target.elements.pressure.value;

    if (pressure == "") {
      Notiflix.Notify.failure("Enter the correct data please");
      return;
    } else {
      try {
        const response = await axios.put(
          `${baseAPI}/api/users/${userEmail}/pressure`,
          { pressure }
        );
        Notiflix.Notify.success("Your pressure has already changed");
        handleGetCurrentUser();
        return response.data;
      } catch (e) {
        console.log(e);
      }
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
          Change your pressure now
        </p>
        <form className={css.modal__form} onSubmit={handleChangePressure}>
          <input
            type="text"
            placeholder="Your pressure..."
            required
            className={css.modal__input}
            name="pressure"
          />
          <button className={css.modal__submit}>Change</button>
        </form>
      </div>
    </div>
  );
};

export default PressureModal;
