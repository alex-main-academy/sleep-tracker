import { useSelector } from 'react-redux';
import css from './Health.module.scss';

const Health = () => {
  const isDarkMode = useSelector(state => state.isDarkMode);

  return (
    <section className={css.health}>
      <h2
        className={css.health__title}
        style={isDarkMode ? { color: '#FFFFFF' } : { color: '#232B36' }}
      >
        Health
        <span style={isDarkMode ? { color: '#FFFFFF' } : { color: '#667481' }}>
          indicators
        </span>
      </h2>
    </section>
  );
};

export default Health;
