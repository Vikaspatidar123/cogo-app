import { Checkbox } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { forwardRef } from 'react';

import styles from './styles.module.css';

export const SCROLL_VALUE = 220;

function Body({ values, props, header, index }, ref) {
	const { current } = ref;
	current.body[index] = {};
	const { isEdit } = props || {};

	if (isEmpty(values)) {
		return <div className={styles.empty}>No Ongoing Shipments</div>;
	}
	return (
		(values || []).map((item, i) => (
			<div className={styles.container}>
				<div className={styles.icon_check}>
					<Checkbox disabled={!isEdit} />
				</div>
				<div
					className={styles.list}
					ref={(r) => {
						current.body[index][i] = r;
					}}
				>
					{(header || []).map((value) => (
						<div className={styles.text}>
							{item[value]}
						</div>
					))}

				</div>
				<div className={styles.icon} />
			</div>
		))
	);
}
export default forwardRef(Body);
