import LeftSection from './LeftSection';
import RightSection from './RightSection';
import styles from './styles.module.css';

function Container() {
	return (
		<div className={styles.container}>
			<div className={styles.seation_1}>
				<LeftSection />
			</div>
			<div className={styles.seation_2}>
				<RightSection />
			</div>
		</div>
	);
}
export default Container;
