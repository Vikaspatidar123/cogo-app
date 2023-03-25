import ToolTip from '@cogoport/front/components/admin/ToolTip';
import { isEmpty, startCase } from '@cogoport/front/utils';
import React from 'react';

import { getGrossFormattedData } from '../utils/getGrossFormattedData';

import styles from './styles.module.css';

function ShowGrossInfo({
	loadData = {},
	setShowPopover = () => {},
	showPopover = false,
}) {
	const cargo = getGrossFormattedData(loadData);

	const toolTipDisplay = () => (
		<div className={styles.tool_tip_content}>
			PKG type -
			{' '}
			{cargo?.packing_type}
			{' '}
			|| QTY -
			{' '}
			{cargo?.packages_count}
			{' '}
			|| WT-
			{cargo?.package_weight}
			{' '}
			kgs VOL -
			{cargo?.volume}
			cc
		</div>
	);

	return (
		<ToolTip
			interactive
			theme="light"
			content={toolTipDisplay()}
			placement="top"
			animation="shift-away"
		>
			<div className={styles.container} onClick={() => setShowPopover(!showPopover)}>
				{isEmpty(cargo) ? (
					<div className="text">What are you shipping</div>
				) : (
					<div className={styles.details_container}>
						<div className={styles.display_container}>
							<div className={styles.details}>
								{startCase(cargo?.packing_type)}
								{' '}
								x
								{cargo?.packages_count}
							</div>
							<div className={styles.details}>
								Weight:
								{cargo?.package_weight}
							</div>
							<div className={styles.details}>
								{' '}
								{startCase(cargo?.handling_type)}
							</div>
						</div>
					</div>
				)}
			</div>
		</ToolTip>
	);
}

export default ShowGrossInfo;
