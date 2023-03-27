import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { getFormattedData } from '../utils/getFormattedData';

import styles from './styles.module.css';

function ShowPackageInfo({
	loadData = {},
	setShowPopover = () => {},
	showPopover = false,
}) {
	const cargo = getFormattedData(loadData);
	// className={index === (cargo || []).length - 1 ? 'no-margin' : ''}
	const ToolTipDisplay = () => (cargo || []).map((item, index) => (
		<div className={styles.tool_tip_content}>
			{index + 1}
			{' '}
			- PKG type -
			{item?.packing_type}
			{' '}
			|| QTY -
			{' '}
			{item?.packages_count}
			{' '}
			|| WT-
			{item?.package_weight}
			{' '}
			kgs || VOL -
			{item?.dimensions?.length
						* item?.dimensions?.width
						* item?.dimensions.height}
		</div>
	));

	return (
		<Tooltip
			content={ToolTipDisplay()}
			placement="top"
			animation="shift-away"
		>
			<div className={styles.container} role="presentation" onClick={() => setShowPopover(!showPopover)}>
				{!cargo?.length ? (
					<div className="text">What are you shipping</div>
				) : (
					<div className={styles.details_container}>
						{(cargo || []).map((item) => (
							<div className={styles.display_container}>
								<div className={styles.details}>
									{startCase(item?.packing_type)}
									{' '}
									x
									{item?.packages_count}
								</div>

								<div className={styles.details}>
									Weight:
									{item?.package_weight}
								</div>

								<div className={styles.details}>
									{' '}
									{startCase(item?.handling_type)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</Tooltip>
	);
}

export default ShowPackageInfo;
