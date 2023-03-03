import { Placeholder, cl } from '@cogoport/components';

import tooltipConfig from '../../../../configurations/tooltipConfig';
import itemFunction from '../../../../utils/itemFunction';
import styles from '../styles.module.css';

const tooltipContent = ({ documentStatus, quotationId }) => {
	const tooltipContentConfig = tooltipConfig({ documentStatus, quotationId });
	return (
		<div>
			{(tooltipContentConfig || []).map((item, index) => (
				item?.condition && (
					<div
						style={{ borderTop: `${index > 0 && '1px solid #d3d3d3'}` }}
						className={cl`${styles.info} ${styles[item?.className]}`}
					>
						{item?.icon}
						<span className={styles.text}>{item?.name}</span>
					</div>
				)
			))}
		</div>
	);
};
const getData = ({ item, data, renderFunction, loading = true }) => {
	if (loading) {
		return <Placeholder />;
	}
	if (item?.renderFunc === 'renderToolTip') {
		return renderFunction[item?.renderFunc](data, tooltipContent, item);
	}
	if (item?.renderFunc) {
		return renderFunction[item?.renderFunc](data[item?.key], data);
	}
	return data[item?.key];
};

function CardRow({ data, config, loading }) {
	const renderFunction = itemFunction();
	return (
		<div className={cl`${styles.card_row} ${styles.row_item}`}>
			{config.map((item) => (
				<div className={`${styles.col} ${styles[item?.className]}`} style={{ width: `${item?.width}` }}>
					{getData({ item, data, renderFunction, loading })}
				</div>
			))}
		</div>
	);
}

export default CardRow;
