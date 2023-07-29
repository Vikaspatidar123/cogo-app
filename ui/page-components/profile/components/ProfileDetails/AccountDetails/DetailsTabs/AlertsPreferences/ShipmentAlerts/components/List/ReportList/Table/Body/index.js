import { Checkbox } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function Body({ values, header }) {
	if (isEmpty(values)) {
		return <div className={styles.empty}>No Ongoing Shipments</div>;
	}
	return (
		<div className={styles.container}>
			<div className={styles.icon_check}>
				<Checkbox />
			</div>
			<div className={styles.list}>
				{values.map((item) => (
					<div className={styles.text}>
						{header.map((value) => item[value])}
					</div>
				))}
			</div>
			<div className={styles.icon} />
		</div>
	);
}
export default Body;
