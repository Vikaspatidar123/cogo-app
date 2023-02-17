// import LoadingBtn from '../../../../common/icons/loading.svg';
import { Loading } from '../../configuration/icon-configuration';

// import { LoaderContainer } from './styles';
import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.loader_container}>
			<img src={Loading} alt="" className={styles.cogoloader} />
			<div className={styles.modal} />
		</div>
	);
}

export default Loader;
