import { Tooltip, Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

function Item({ item, fields, loading = false, functions = {}, isMobile = false }) {
	const newFunctions = functions;
	const infoData = (singleItem, itm) => {
		if (singleItem.toolTip) {
			return (
				<Tooltip
					content={(
						<div style={{ color: 'grey' }}>
							{getValue(itm, singleItem, isMobile, newFunctions)}
						</div>
					)}
					theme="light"
				>
					<div className={styles.info}>
						{isMobile
								&& ['Created At', 'Transit Start Date', 'Commodity'].includes(
									singleItem.label,
								)
								&& singleItem.label}
						{getValue(itm, singleItem, isMobile, newFunctions)}
					</div>
				</Tooltip>
			);
		}
		return (
			<>
				{isMobile
					&& ['Created At', 'Transit Start Date', 'Commodity'].includes(singleItem.label)
					&& singleItem.label}
				{getValue(itm, singleItem, isMobile, newFunctions)}
			</>
		);
	};
	const renderItem = (itm) => (
		<div className={isMobile ? styles.row_mobile : styles.row}>
			{fields.map((singleItem) => (
				<div
					style={singleItem.styles}
					key={singleItem?.key}
					className={styles.col}
				>
					{loading && (
						<Placeholder style={{ height: '20px', width: '100%' }} />
					)}
					{singleItem.render && !loading ? singleItem.render(itm) : null}
					{infoData(singleItem, itm)}
				</div>
			))}
		</div>
	);

	return renderItem(item);
}

export default Item;
