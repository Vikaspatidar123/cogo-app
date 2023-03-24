import IncompleteIcon from '../../../icons/incomplete-icon.svg';
import PendingIcon from '../../../icons/pending-icon.svg';
import RejectedIcon from '../../../icons/rejected-icon.svg';
import VerifiedIcon from '../../../icons/verified-icon.svg';
import styles from '../../styles.module.css';

const TAG_COMPONENT_MAPPING = {
	verified: (
		<div className={styles.verified_tag}>
			<VerifiedIcon style={{ width: 12, height: 12, marginRight: 8 }} />
			Verified
		</div>
	),
	rejected: (
		<div className={styles.rejected_tag}>
			<RejectedIcon style={{ width: 12, height: 12, marginRight: 8 }} />
			Rejected
		</div>
	),
	pending: (
		<div className={styles.pending_tag}>
			<PendingIcon style={{ width: 12, height: 12, marginRight: 8 }} />
			Pending verification
		</div>
	),
	incomplete: (
		<div className={styles.incomplete_tag}>
			<IncompleteIcon style={{ width: 12, height: 12, marginRight: 8 }} />
			Incomplete
		</div>
	),
};

export default TAG_COMPONENT_MAPPING;
