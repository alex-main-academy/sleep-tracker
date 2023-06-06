import { useSelector } from 'react-redux';
import css from './Information.module.scss';

const Information = () => {
  const isDarkMode = useSelector(state => state.isDarkMode);

  return (
    <section className={css.information}>
      <h2
        className={css.information__title}
        style={isDarkMode ? { color: '#FFFFFF' } : { color: '#232B36' }}
      >
        information
        <span style={isDarkMode ? { color: '#FFFFFF' } : { color: '#667481' }}>
          panel
        </span>
      </h2>
    </section>
  );
};

export default Information;
