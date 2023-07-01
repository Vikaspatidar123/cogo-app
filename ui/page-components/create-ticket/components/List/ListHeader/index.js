import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ListHeader({ fields, setOrderBy, setParams, params, orderBy }) {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{(fields || []).map((field) => (
					<div key={field?.key}>
						{field.sort ? (
							<div className={styles.card_title}>
								<div
									role="presentation"
									onClick={() => {
										setOrderBy((prev) => ({
											key   : field.key,
											order : prev.order === 'asc' ? 'desc' : 'asc',
										}));
										setParams({ ...params, page: 1 });
									}}
									className={styles.show_cursor}
								>
									{orderBy.key === field.key && orderBy.order === 'asc'
										? <IcMArrowRotateDown /> : <IcMArrowRotateUp />}

								</div>

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
