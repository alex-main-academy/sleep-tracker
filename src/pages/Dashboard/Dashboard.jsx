import { useSelector } from 'react-redux';
import css from './Dashboard.module.scss';

const Dashboard = () => {
  const isDarkMode = useSelector(state => state.isDarkMode);

  return (
    <section className={css.dashboard}>
      <h2
        className={css.dashboard__title}
        style={isDarkMode ? { color: '#FFFFFF' } : { color: '#232B36' }}
      >
        Dashboard
        <span style={isDarkMode ? { color: '#FFFFFF' } : { color: '#667481' }}>
          All instruments
        </span>
      </h2>
    </section>
  );
};

export default Dashboard;
