import iconUrl from '../../../utils/iconUrl.json';

import styles from './styles.module.css';

function Watermark() {
	return (
		<div className={styles.container}>
			<img src={iconUrl.cogoportLogo} alt="logo" className={styles.logo} />
		</div>
	);
}

export default Watermark;
