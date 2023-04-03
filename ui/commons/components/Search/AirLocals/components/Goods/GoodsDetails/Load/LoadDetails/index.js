import PerPackageCargoDetails from './PerPackageCargoDetails';
import styles from './styles.module.css';

function LoadDetails({
	setShowPopover = () => {},
	showFilledValues = {},
	setShowFilledValues = () => {},
	getCargoReadyDate = '',
	getCommodity,
	getCommoditySubtype,
}) {
	return (
		<div className={styles.Container}>
			<PerPackageCargoDetails
				showFilledValues={showFilledValues}
				setShowFilledValues={setShowFilledValues}
				setShowPopover={setShowPopover}
				getCargoReadyDate={getCargoReadyDate}
				getCommodity={getCommodity}
				getCommoditySubtype={getCommoditySubtype}
			/>
		</div>
	);
}

export default LoadDetails;
