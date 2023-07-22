import { cl } from '@cogoport/components';
import { IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ListHeader({ fields, setOrderBy, setParams, params, orderBy }) {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{(fields || []).map((field) => (
					<div key={field?.key} className={cl`${styles.card_header_col} ${styles?.[field.key]}`}>
						{field.sort ? (
							<div className={styles.card_title}>
								<IcMArrowRotateUp
									onClick={() => {
										setOrderBy((prev) => ({
											key   : field.key,
											order : prev.order === 'asc' ? 'desc' : 'asc',
										}));
										setParams({ ...params, page: 1 });
									}}
									className={cl`${styles.show_cursor}
									${orderBy.key === field.key && orderBy.order === 'asc' ? styles.rotate_icn : ''}`}
								/>
								{field.label}
							</div>
						) : (
							<div className={styles.card_title}>{field.label}</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default ListHeader;
