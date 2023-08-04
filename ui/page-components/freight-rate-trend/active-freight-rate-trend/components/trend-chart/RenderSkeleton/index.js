import { Placeholder } from '@cogoport/components';
import { IcMUpwardGraph } from '@cogoport/icons-react';

import styles from '../styles.module.css';

function RenderSkeleton() {
	return (
		<div className={styles.card}>
			<Placeholder height="450px" width="100%" margin="20px 0px 20px 0px">
				<IcMUpwardGraph width={200} height={200} fill="#828282" />
			</Placeholder>
		</div>
	);
}

export default RenderSkeleton;
