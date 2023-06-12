import { IcMArrowDown } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function TableHeader({ setOrderBy }) {
	const [sortDate, setSortDate] = useState('asc');
	const [sortUsage, setSortUsage] = useState('asc');

	const sortfn = (entity) => {
		if (entity === 'date') {
			setSortDate((prev) => (prev === 'asc' ? 'desc' : 'asc'));
			setOrderBy({
				key   : 'created_at',
				order : sortDate,
			});
		}
		if (entity === 'usage') {
			setSortUsage((prev) => (prev === 'asc' ? 'desc' : 'asc'));
			setOrderBy({
				key   : 'created_at',
				order : sortUsage,
			});
		}
	};

	return (
		<div className={`${styles.row} ${styles.table_head}`}>
			<div className={styles.wd_100}> Sr.No.</div>
			<div className={styles.wd_150}> Feature Name</div>
			<div className={styles.wd_150}>Event Name</div>
			<div className={`${styles.wd_150} ${styles.flex}`}>
				Date
				<div
					role="presentation"
					className={`${sortDate === 'asc' ? styles.asc : styles.desc}`}
					onClick={() => sortfn('date')}
				>
					<IcMArrowDown />
				</div>
			</div>
			<div className={`${styles.wd_150} ${styles.flex}`}>
				Usage
				<div
					role="presentation"
					className={`${sortUsage === 'asc' ? styles.asc : styles.desc}`}
					onClick={() => sortfn('usage')}
				>
					<IcMArrowDown />
				</div>
			</div>
		</div>
	);
}
export default TableHeader;
