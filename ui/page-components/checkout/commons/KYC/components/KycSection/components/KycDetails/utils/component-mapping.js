import { IcCFcrossInCircle, IcCFtick, IcMFtimer, IcMProvision } from '@cogoport/icons-react';

import styles from '../../styles.module.css';

const TAG_COMPONENT_MAPPING = {
	verified: (
		<div className={styles.verified_tag}>
			<IcCFtick style={{ width: 12, height: 12, marginRight: 8 }} />
			Verified
		</div>
	),
	rejected: (
		<div className={styles.rejected_tag}>
			<IcCFcrossInCircle style={{ width: 12, height: 12, marginRight: 8 }} />
			Rejected
		</div>
	),
	pending: (
		<div className={styles.pending_tag}>
			<IcMProvision style={{ width: 12, height: 12, marginRight: 8 }} />
			Pending verification
		</div>
	),
	incomplete: (
		<div className={styles.incomplete_tag}>
			<IcMFtimer style={{ width: 12, height: 12, marginRight: 8 }} />
			Incomplete
		</div>
	),
};

export default TAG_COMPONENT_MAPPING;
