import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={css.loader}>
      <ThreeDots
        height="100"
        width="120"
        radius="9"
        color="#ffffff"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
