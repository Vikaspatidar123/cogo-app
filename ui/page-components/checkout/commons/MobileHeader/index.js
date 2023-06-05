import StatusStrip from './StatusStrip';
import styles from './styles.module.css';

function MobileHeader({ currentView, setCurrentView }) {
	return (
		<div className={styles.container}>
			<StatusStrip
				firstLoading={false}
				page={currentView}
				setPage={setCurrentView}
			/>
		</div>
	);
}
export default MobileHeader;
