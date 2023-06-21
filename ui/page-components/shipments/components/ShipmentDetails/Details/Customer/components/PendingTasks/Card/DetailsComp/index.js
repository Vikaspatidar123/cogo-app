import { startCase, format } from '@cogoport/utils';

import styles from './styles.module.css';

const DETAILS_TO_SHOW = [
	{
		label : 'Status',
		value : 'status',
	},

	{
		label : 'Document Type',
		value : 'document_type',
	},
	{
		label : 'Updated at',
		value : 'updated_at',
	},
];

function DetailsComp({ task }) {
	return (
		<div>
			{DETAILS_TO_SHOW.map((item) => (task?.[item?.value] ? (
				<div className={styles.row}>
					<p className={styles.label}>
						{item.label}
						{' '}
						:
						{' '}
					</p>
					{item?.label === 'Updated at' ? (
						<p className={styles.value}>
							{format(task[item?.value], 'dd MMM yyyy')}
						</p>
					) : (
						<p className={styles.value}>{startCase(task[item?.value])}</p>
					)}
				</div>
			) : null))}
		</div>
	);
}

export default DetailsComp;
