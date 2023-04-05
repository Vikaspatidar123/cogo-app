import { Popover } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

import getWidth from '@/ui/page-components/shipments/utils/getWidth';

function Field({ field = {}, showCode = false }) {
	const renderHeaderText = () => {
		if (showCode && field.name) {
			return field.name;
		}
		return field.label;
	};
	const width = getWidth(field?.span);
	return (
		<div
			className={styles.col}
			style={{ width: width }}
			key={field?.key || field?.label}
		>
			<div className={styles.card_title}>
				{field.tooltip ? (
					<Popover theme="light" render={field.tooltip} placement="top">
						<span>
							{field.label}
							<IcMInfo />
						</span>
					</Popover>
				) : (
					renderHeaderText()
				)}
			</div>
		</div>
	);
}
export default Field;
