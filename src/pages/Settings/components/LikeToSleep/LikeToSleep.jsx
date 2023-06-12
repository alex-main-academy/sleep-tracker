import { useState } from "react";
import css from "./LikeToSleep.module.scss";
import changeIcon from "../../img/change-icon.png";
import LikeModal from "../LikeModal/LikeModal";
import sprite from "../../../../assets/img/sprite.svg";
import { useSelector } from "react-redux";

const LikeToSleep = () => {
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const userLike = useSelector((state) => state.user.like);
  const [modalLike, setModalLike] = useState(false);

  const handleOpenModal = () => {
    setModalLike(true);
  };

  const handleCloseModal = () => {
    setModalLike(false);
  };

  return (
    <div
      className={css.like}
      style={
        isDarkMode
          ? { backgroundColor: "#360A46", color: "#FFFFFF" }
          : { backgroundColor: "#FFFFFF", color: "#000000" }
      }
    >
      <p className={css.like__title}>How many hours would you like to sleep</p>
      <div className={css.like__block}>
        <p className={css.like__target}>Target</p>
        <p
          className={css.like__item}
          onClick={handleOpenModal}
          style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}
        >
          <img src={changeIcon} alt="" />
          <span
            style={isDarkMode ? { color: "#FFFFFF" } : { color: "#000000" }}
          >
            {userLike || 0}
          </span>
          / 9 hours
        </p>
      </div>
      <div className={css.like__progress}>
        <div
          className={css.like__progress_active}
          style={{ width: `${(100 / 9) * Number(userLike) || 0}%` }}
        ></div>
      </div>
      {modalLike && <LikeModal />}
      {modalLike && (
        <button className={css.like__close} onClick={handleCloseModal}>
          <svg width={40} height={40}>
            <use href={`${sprite}#icon-close`}></use>
          </svg>
        </button>
      )}
    </div>
  );
};

export default LikeToSleep;
