import { Tooltip, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ShowTruckInfo({
	loadData = {},
	setShowPopover = () => {},
	showPopover,
}) {
	const trucks = loadData?.truck_details || [];

	const toolTipDisplay = () => (trucks || []).map((item, index) => (
		<div
			className={cl`{${styles.tool_tip_content}${index === (trucks || []).length - 1 ? styles.no_margin : ''}`}
		>
			{index + 1}
			{' '}
			- Type :
			{startCase(item.truck_type)}
			, Count :
			{' '}
			{item.trucks_count}
		</div>
	));

	return (
		<Tooltip
			placement="top"
			animation="shift-away"
			content={toolTipDisplay()}
		>
			<div className={styles.container} role="presentation" onClick={() => setShowPopover(!showPopover)}>
				{!trucks?.length ? (
					<div className="text">What are you shipping</div>
				) : (
					<div className={styles.details_container}>
						{(trucks || []).map((item) => (
							<>
								<div className={styles.details}>{startCase(item?.truck_type)}</div>

								<div className={styles.details}>{item?.trucks_count}</div>
							</>
						))}
					</div>
				)}
			</div>
		</Tooltip>
	);
}

export default ShowTruckInfo;
