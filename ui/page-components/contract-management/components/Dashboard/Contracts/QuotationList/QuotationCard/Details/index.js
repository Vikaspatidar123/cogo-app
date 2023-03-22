import { Tooltip } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';

import { STATUS, SOURCE_MAPPING } from '../../../../../../constants';

import styles from './styles.module.css';

function Details({ item, activeFilter }) {
	const {
		contract_reference_id = '',
		status = '',
		source = '',
		created_at,
		contract_name = '',
		contract_type = '',
	} = item || {};

	return (
		<div className={styles.container}>
			<div className={styles.contract_details}>
				<div className={styles.contract_id}>
					Contract ID :
					{contract_reference_id}
				</div>
				{contract_name && (
					<Tooltip
						content={<div>{contract_name}</div>}
						animation="shift-away"
						placement="right"
						theme="light-border"
					>
						<div className={styles.contract_name}>
							Contract Name :
							{' '}
							{startCase(contract_name)}
						</div>
					</Tooltip>
				)}
				{status && (
					<div className={`${styles.status} ${styles.status}`}>
						{activeFilter === 'expired' ? 'Expired' : STATUS[status]}
					</div>
				)}
				{source && (
					<div className={`${styles.source} ${styles.source}`}>
						{source === 'manual' && contract_type === 'with_carrier'
							? 'Third Party'
							: SOURCE_MAPPING[source]}
					</div>
				)}
			</div>

			<div className={styles.created_date}>
				Created On :
				{' '}
				{format(created_at, 'dd MMM yyyy')}
			</div>
		</div>
	);
}

export default Details;
