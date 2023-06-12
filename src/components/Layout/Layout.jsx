import { Outlet } from "react-router";
import css from "./Layout.module.scss";
import logo from "../../assets/img/layout/logo.png";

const Layout = () => {
  return (
    <section className={css.layout}>
      <div className={css.layout__content}>
        <img src={logo} alt="logo" className={css.layout__logo} />
        <p className={css.layout__text}>
          Hi! <br />
          Welcome to the world of dreams. <br />
          Sleep Track will help you sleep well.
        </p>
      </div>
      <div className={css.layout__form}>
        <Outlet />
      </div>
    </section>
  );
};

export default Layout;
