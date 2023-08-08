import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { forwardRef } from 'react';

import styles from './styles.module.css';

export const SCROLL_VALUE = 220;
const LOADER_ARRAY = [...Array(6).keys()];

function Body({ values, header, index, shipmentLoading }, ref) {
	const { current } = ref;

	current.body[index] = {};

	const { t } = useTranslation(['settings']);

	if (shipmentLoading) {
		return (
			<div>
				{LOADER_ARRAY.map(() => (
					<div className={styles.loading}>
						{LOADER_ARRAY.map((ele) => (
							<Placeholder
								className={styles.placeholder}
								width={100}
								height={20}
								key={ele}
							/>
						))}
					</div>
				))}
			</div>
		);
	}

	if (isEmpty(values)) {
		return <div className={styles.empty}>{t('settings:shipment_alerts_text_15')}</div>;
	}

	return (
		<div className={styles.main_container}>
			{(values || []).map((item, i) => (
				<div className={styles.container} key={item?.serial_id}>
					<div className={styles.icon_check} />
					<div
						className={styles.list}
						ref={(r) => {
							current.body[index][i] = r;
						}}
					>
						{(header || []).map((value) => (
							<div className={styles.text} key={value}>
								{item[value] ? item[value] : '---'}
							</div>
						))}

					</div>
					<div className={styles.icon} />
				</div>

			))}
		</div>
	);
}
export default forwardRef(Body);
