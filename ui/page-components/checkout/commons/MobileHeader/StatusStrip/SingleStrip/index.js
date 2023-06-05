import { IcMTick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function SingleStrip({
	title,
	count = 1,
	setPage,
	item_key,
	page,
	statuses,
}) {
	const status = page[item_key];
	const activeView = Object.keys(page).find((key) => page[key] === 'active');
	const activeKeyCount = statuses.find(
		(stage) => stage.item_key === activeView,
	);

	const handleOnClick = () => {
		if (count === 1) {
			setPage({
				detail    : 'active',
				invoice   : 'inactive',
				quotation : 'inactive',
			});
		} else if (count === 2) {
			setPage({
				detail    : 'success',
				invoice   : 'active',
				quotation : 'inactive',
			});
		} else if (count === 3) {
			setPage({
				detail    : 'success',
				invoice   : 'success',
				quotation : 'active',
			});
		}
	};
	return (
		<div className={styles.flex}>
			{status === 'active' && (
				<div
					className={styles.count}
					style={{
						background : '#66ACF7',
						padding    : '6px 11px',
						color      : '#ffffff',
						border:
							status === 'active' ? '1px solid  #66ACF7' : '1px solid #BDBDBD',
					}}
				>
					{count}
				</div>
			)}
			{status === 'success' && (
				<div
					className={styles.count}
					style={{
						padding : '5px 5px',
						border  : '1px solid  #66ACF7',
					}}
					role="presentation"
					onClick={handleOnClick}
				>
					<IcMTick height={24} width={24} fill="#2C3E50" />
				</div>
			)}
			{status === 'inactive' && (
				<div className={styles.count} style={{ padding: '6px 11px' }}>{count}</div>
			)}
			<div
				className={styles.title}
				style={{
					color  : status === 'active' ? '#333333' : '#828282',
					cursor : activeKeyCount.count > count ? 'pointer' : 'default',
				}}
			>
				{title}
			</div>
			{count !== 3 ? <div className={styles.line} /> : null}
		</div>
	);
}
export default SingleStrip;
