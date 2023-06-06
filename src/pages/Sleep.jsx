import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import css from './Sleep.module.scss';
import Menu from './components/Menu/Menu';
import Header from './components/Header/Header';

const SleepApp = () => {
  const isDarkMode = useSelector(state => state.isDarkMode);

  return (
    <section
      className={css.sleep}
      style={
        isDarkMode
          ? { backgroundColor: '#220C2B' }
          : { backgroundColor: '#FDF9FF' }
      }
    >
      <Menu />
      <Header />
      <div className={css.sleep__content}>
        <Outlet />
      </div>
    </section>
  );
};

export default SleepApp;
