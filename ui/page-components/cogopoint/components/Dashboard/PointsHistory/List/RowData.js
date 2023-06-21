import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function RowData({ config = [], setSortFilter = () => {}, sortFilter = {} }) {
	const handleSortChange = ({ item = {} }) => {
		setSortFilter((prev) => ({
			...prev,
			sort_by   : item?.key,
			sort_type : prev?.sort_type === 'desc' ? 'asc' : 'desc',
		}));
	};

	return (
		<div>
			<div className={styles.row}>
				{(config || []).map((item) => {
					const { width } = item || {};
					return ((item?.sorting ? (
						<div className={styles[width]}>
							{item.name}
							{' '}
							{sortFilter?.sort_type === 'desc' ? (
								<IcMArrowRotateDown
									className="icon"
									onClick={() => handleSortChange({ item })}
								/>
							) : (
								<IcMArrowRotateUp
									className="icon"
									onClick={() => handleSortChange({ item })}
								/>
							)}
						</div>
					) : (
						<div className={styles[width]}>{item.name}</div>
					)));
				})}
			</div>
		</div>
	);
}
export default RowData;
