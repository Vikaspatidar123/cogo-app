import { Button } from '@cogoport/components';

import ComingSoonIcon from '../../assets/comingsoon-icon.svg';
import DocumentIcon2 from '../../assets/document2-icon.svg';

import styles from './styles.module.css';

function ExportFactoring() {
	return (
		<div className={styles.Container}>
			<div className={styles.IconContainer}>
				<ComingSoonIcon size={10.0} />
			</div>
			<div className={styles.Header}>
				<span className="yellow">Export factoring </span>
				is right around the corner.
				<div> Easily apply online in just a few minutes</div>
			</div>

			<div className={styles.InfoContainer}>
				<div className={styles.SvgContainer}>
					<DocumentIcon2 size={4.0} />
				</div>
				<div className={styles.text} size={12}>
					Finance up to 90% of your commercial invoice value and avail
					collateral free insured limits.
				</div>
			</div>

			<div className={styles.ButtonContainer}>
				<Button>Show Interest</Button>
			</div>
		</div>
	);
}
export default ExportFactoring;
