import { cl, Placeholder } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const AIR_MAPLINE = ['preferred_air_lines', 'excluded_air_lines', 'mandatory_shipping_lines'];
const REST_MAPLINE = ['preferred_shipping_lines', 'excluded_shipping_lines', 'mandatory_shipping_lines'];

function ShippingLineInfo({
	shippingLinesDetails,
	operatorsLoading,
	serviceType,
}) {
	let mapLines = REST_MAPLINE;
	if (serviceType === 'air_freight') {
		mapLines = AIR_MAPLINE;
	}

	function Tags({ tags = [] }) {
		return (
			<div className={styles.container}>
				{(tags || []).map((item) => <div className={styles.tag}>{item.short_name}</div>)}
			</div>
		);
	}
	function RenderData(type) {
		return !isEmpty(shippingLinesDetails?.[type]) ? (
			<Tags tags={shippingLinesDetails?.[type] || []} />
		) : (
			<div className={styles.empty}>
				No
				{' '}
				{startCase(type)}
			</div>
		);
	}
	return (
		<div className={styles.section}>
			{(mapLines || []).map((type) => (
				<div className={cl`${styles.container_details} ${styles.map_line}`}>
					<div className={styles.index_list}>
						{startCase(type)}
						:
					</div>
					{operatorsLoading ? (
						<Placeholder width="100px" height="18px" />
					) : (
						RenderData(type)
					)}
				</div>
			))}
		</div>
	);
}

export default ShippingLineInfo;
