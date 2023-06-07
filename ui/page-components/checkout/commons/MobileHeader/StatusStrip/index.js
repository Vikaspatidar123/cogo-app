import React from 'react';

import SingleStrip from './SingleStrip';
import styles from './styles.module.css';

const statuses = [
	{
		title    : 'Add Services',
		count    : 1,
		key      : 'detail',
		item_key : 'detail',
	},
	{
		title    : 'Invoicing Parties',
		count    : 2,
		key      : 'invoice',
		item_key : 'invoice',
	},
	{
		title    : 'Checkout',
		count    : 3,
		key      : 'quotation',
		item_key : 'quotation',
	},
];

function StatusStrip({ page, setPage }) {
	return (
		<div className={styles.container}>
			{statuses.map((item) => (
				<SingleStrip
					{...item}
					page={page}
					setPage={setPage}
					statuses={statuses}
				/>
			))}
		</div>
	);
}

export default StatusStrip;
