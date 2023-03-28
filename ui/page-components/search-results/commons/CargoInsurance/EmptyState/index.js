import { IcMVerySad } from '@cogoport/icons-react';

import styles from './styles.module.css';

const TEXT_MAPPING = {
	blocked_country:
		'We are sorry , We do not offer insurance for this port pair yet.',
	non_indian_search:
		'We are sorry , We offer insurance only for shipments that operates from/to India only',
	not_valid_search:
		'We are sorry, we offer insurance only for shipments that operates from INDIA or to INDIA',
};

function EmptyState({ reason }) {
	return (
		<div className={styles.no_support}>
			<div className={styles.sad_container}>
				<IcMVerySad style={{ marginTop: '10px' }} width={40} height={40} />
				<div className={styles.sad_text}>{TEXT_MAPPING[reason]}</div>
			</div>
		</div>
	);
}
export default EmptyState;
