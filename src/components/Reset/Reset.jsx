import { Link } from 'react-router-dom';
import css from './Reset.module.scss';

const Forgot = () => {
  return (
    <section className={css.forgot}>
      <div className={css.forgot__block}>
        <p className={css.forgot__title}>Reset your password</p>
        <form className={css.forgot__form}>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            className={css.forgot__input}
          />
          <button className={css.forgot__submit}>Reset</button>
        </form>
        <Link to="/" className={css.forgot__link}>
          Back
        </Link>
      </div>
    </section>
  );
};

export default Forgot;
