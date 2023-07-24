import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function Validity({ validity_left_days, validity_end, validity_start, contractStatus }) {
	return (
		<div className={styles.container}>
			<div className={styles.valid_container}>
				Validity :
				{' '}
				{formatDate({
					date       : validity_start,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
				{' '}
				to
				{' '}
				{formatDate({
					date       : validity_end,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
				{validity_left_days && contractStatus === 'active' && (
					<span>
						{validity_left_days}
						{' '}
						Days left
					</span>
				)}
			</div>
		</div>
	);
}

export default Validity;
