import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function ToolTipContent({ data }) {
	return (
		<div className={styles.tooltip_container}>
			{data.map((itm = '') => (
				<div className={styles.tag}>{itm?.valueText}</div>
			))}
		</div>
	);
}

function CommodityMapping({ tagData }) {
	return (
		<div className={styles.container}>
			{tagData.slice(0, 5).map((itm = '') => (
				<div className={styles.tag}>{itm?.valueText}</div>
			))}

			{tagData.length > 5 && (
				<Tooltip
					content={<ToolTipContent data={tagData.slice(5)} />}
					maxWidth={290}
					theme="light-border"
				>
					<div className={styles.extra}>
						+
						{tagData.length - 5}
						{' '}
						More
					</div>
				</Tooltip>
			)}
		</div>
	);
}

export default CommodityMapping;
