import { IcMArrowRotateRight, IcMArrowRotateLeft } from '@cogoport/icons-react';

import styles from '../styles.module.css';

function SortableArrow({ orderBy, columnKey }) {
	const isAscending = orderBy.key === columnKey && orderBy.order === 'asc';

	return (
		<div
			className={styles.flex}
			direction="column"
			style={{
				flexDirection : 'column',
				transform     : isAscending ? 'rotate(180deg)' : '',
			}}
		>
			<IcMArrowRotateRight
				size={12.6}
				style={{ transform: 'rotate(270deg)', cursor: 'pointer' }}
			/>
			<IcMArrowRotateLeft
				fill="#BDBDBD"
				size={12.6}
				style={{ transform: 'rotate(270deg)', cursor: 'pointer' }}
			/>
		</div>
	);
}

export default SortableArrow;
