import { cl, Placeholder } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ShippingLineInfo({
	shippingLinesDetails,
	operatorsLoading,
	serviceType,
}) {
	let mapLines = [];
	if (serviceType === 'air_freight') {
		mapLines = ['preferred_air_lines', 'excluded_air_lines'];
	} else {
		mapLines = ['preferred_shipping_lines', 'excluded_shipping_lines'];
	}

	function Tags({ tags = [] }) {
		return (
			<div className={styles.container}>
				{(tags || []).map((item) => <div className={styles.tag}>{item.short_name}</div>)}
			</div>
		);
	}
	const renderData = (type) => (!isEmpty(shippingLinesDetails?.[type]) ? (
		<Tags tags={shippingLinesDetails?.[type] || []} />
	) : (
		<div className={styles.empty}>
			No
			{startCase(type)}
		</div>
	));
	return (
		<div className={styles.section}>
			{mapLines.map((type) => (
				<div className={cl`${styles.container_details} ${styles.map_line}`}>
					<div className={styles.index_list}>
						{startCase(type)}
						:
					</div>
					{operatorsLoading ? (
						<Placeholder width="100px" height="18px" />
					) : (
						renderData(type)
					)}
				</div>
			))}
		</div>
	);
}

export default ShippingLineInfo;
