import { Placeholder, Tooltip, cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { forwardRef } from 'react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

export const SCROLL_VALUE = 220;

const LOADER_ARRAY = [...Array(6).keys()];

const MAX_DESC_LENGTH = 30;

const renderItem = (name = '') => {
	if (name.length > MAX_DESC_LENGTH) {
		return (
			<Tooltip content={name} interactive>
				<div>
					{name.substring(0, MAX_DESC_LENGTH)}
					...
				</div>
			</Tooltip>
		);
	}
	return name;
};

function Body({ values, header, index, shipmentLoading }, ref) {
	const { current } = ref;

	current.body[index] = {};
	const { query } = useRouter();
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
						className={cl`${styles.list} ${query.type === 'shipment' && styles.shipment}`}
						ref={(r) => {
							current.body[index][i] = r;
						}}
					>
						{(header || []).map((value) => (
							<div className={styles.text} key={value}>
								{item[value] ? (renderItem(item[value])
								) : '---'}
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
