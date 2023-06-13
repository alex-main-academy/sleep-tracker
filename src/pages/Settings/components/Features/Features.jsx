import { useSelector } from "react-redux";
import { useState } from "react";
import css from "./Features.module.scss";
import userImage from "../../img/user.png";
import changeIcon from "../../img/change-icon.png";
import sprite from "../../../../assets/img/sprite.svg";
import HeightModal from "../HeightModal/HeightModal";
import WeightModal from "../WeightModal/WeightModal";
import AgeModal from "../AgeModal/AgeModal";

const Features = () => {
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const userName = useSelector((state) => state.user.name);
  const userHeight = useSelector((state) => state.user.height);
  const userWeight = useSelector((state) => state.user.weight);
  const userAge = useSelector((state) => state.user.age);

  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  const [modalHeight, setModalHeight] = useState(false);
  const [modalWeight, setModalWeight] = useState(false);
  const [modalAge, setModalAge] = useState(false);

  const handleOpenHeightModal = () => {
    setModalHeight(true);
    setIsAnyModalOpen(true);
  };

  const handleOpenWeightModal = () => {
    setModalWeight(true);
    setIsAnyModalOpen(true);
  };

  const handleOpenAgeModal = () => {
    setModalAge(true);
    setIsAnyModalOpen(true);
  };

  const handleCloseAllModal = () => {
    setModalHeight(false);
    setModalWeight(false);
    setModalAge(false);
    setIsAnyModalOpen(false);
  };

  return (
    <div
      className={css.features}
      style={
        isDarkMode
          ? { backgroundColor: "#360A46", color: "#FFFFFF" }
          : { backgroundColor: "#FFFFFF", color: "#000000" }
      }
    >
      <div className={css.features__user}>
        <img src={userImage} alt="" width={150} height={150} />
        <span>{userName}</span>
      </div>
      <div className={css.features__block} onClick={handleOpenHeightModal}>
        <p className={css.features__title}>Height</p>
        <span className={css.features__item}>{userHeight || 0} cm</span>
        <button type="button" className={css.features__change}>
          <img src={changeIcon} alt="" />
          <span
            style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}
          >
            Change
          </span>
        </button>
      </div>
      <div className={css.features__block} onClick={handleOpenWeightModal}>
        <p className={css.features__title}>Weight</p>
        <span className={css.features__item}>{userWeight || 0} kg</span>
        <button type="button" className={css.features__change}>
          <img src={changeIcon} alt="" />
          <span
            style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}
          >
            Change
          </span>
        </button>
      </div>
      <div className={css.features__block} onClick={handleOpenAgeModal}>
        <p className={css.features__title}>Age</p>
        <span className={css.features__item}>{userAge || 0}</span>
        <button type="button" className={css.features__change}>
          <img src={changeIcon} alt="" />
          <span
            style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}
          >
            Change
          </span>
        </button>
      </div>
      {modalHeight && <HeightModal />}
      {modalWeight && <WeightModal />}
      {modalAge && <AgeModal />}
      {isAnyModalOpen && (
        <button className={css.features__close} onClick={handleCloseAllModal}>
          <svg width={40} height={40}>
            <use href={`${sprite}#icon-close`}></use>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Features;
