import { Tooltip } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Features({ feature }) {
	return (
		<div className={styles.container}>
			{(feature || []).map((item) => (
				<div key={item} className={styles.text_container}>
					<IcCFtick width={20} height={20} />
					<Tooltip placement="top" content={item}>
						<div className={styles.text_div}>{item}</div>
					</Tooltip>
				</div>
			))}
		</div>
	);
}

export default Features;
