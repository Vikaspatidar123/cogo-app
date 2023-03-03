import { Placeholder, cl } from '@cogoport/components';

import tooltipConfig from '../../../../configurations/tooltipConfig';
import itemFunction from '../../../../utils/itemFunction';
import styles from '../styles.module.css';

const tooltipContent = ({ documentStatus, quotationId, setShowDeleteModal, setQuoteId }) => {
	const tooltipContentConfig = tooltipConfig({ documentStatus, quotationId, setShowDeleteModal, setQuoteId });
	return (
		<div>
			{(tooltipContentConfig || []).map((item, index) => (
				item?.condition && (
					<div
						style={{ borderTop: `${index > 0 && '1px solid #d3d3d3'}` }}
						className={cl`${styles.info} ${styles[item?.className]}`}
					>
						{item?.icon}
						<span
							className={styles.text}
							onClick={item?.onClick}
							role="presentation"
						>
							{item?.name}
						</span>
					</div>
				)
			))}
		</div>
	);
};
const getData = ({ item, data, renderFunction, loading = true, setShowDeleteModal, setQuoteId }) => {
	if (loading) {
		return <Placeholder />;
	}
	if (item?.renderFunc === 'renderToolTip') {
		return renderFunction[item?.renderFunc](data, tooltipContent, item, setShowDeleteModal, setQuoteId);
	}
	if (item?.renderFunc) {
		return renderFunction[item?.renderFunc](data[item?.key], data);
	}
	return data[item?.key];
};

function CardRow({ data, config, loading, setShowDeleteModal, setQuoteId }) {
	const renderFunction = itemFunction();
	return (
		<div className={cl`${styles.card_row} ${styles.row_item}`}>
			{config.map((item) => (
				<div className={cl`${styles.col} ${styles[item?.className]}`} style={{ width: `${item?.width}` }}>
					{getData({ item, data, renderFunction, loading, setShowDeleteModal, setQuoteId })}
				</div>
			))}

		</div>
	);
}

export default CardRow;
