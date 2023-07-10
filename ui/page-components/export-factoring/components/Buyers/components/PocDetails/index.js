import styles from './styles.module.css';

import StatusBox from '@/ui/page-components/export-factoring/common/StatusBox';

function PocDetails({
	poc = {},
}) {
	const { name = '', designation = '', email_id = '', mobile_number = {}, poc_status = '' } = poc || {};
	return (
		<div className={styles.flexDiv}>
			<div className={styles.dataDiv} style={{ width: '15%' }}>
				<div className={styles.labelText}>
					Name
				</div>
				<div className={styles.valueText}>
					{name}
				</div>
			</div>

			<div className={styles.dataDiv} style={{ width: '15%' }}>
				<div className={styles.labelText}>
					Designation
				</div>
				<div className={styles.valueText}>
					{designation}
				</div>
			</div>

			<div className={styles.dataDiv} style={{ width: '25%' }}>
				<div className={styles.labelText}>
					Email ID
				</div>
				<div className={styles.valueText}>
					{email_id}
				</div>
			</div>

			<div className={styles.dataDiv} style={{ width: '15%' }}>
				<div className={styles.labelText}>
					Contact No.
				</div>
				<div className={styles.valueText}>
					{mobile_number?.country_code}
					-
					{mobile_number?.number}
					{' '}
				</div>
			</div>

			<div className={styles.dataDiv} style={{ width: '15%' }}>
				<div className={styles.labelText}>
					Status
				</div>
				<div className={styles.valueText} style={{ width: 'fit-content' }}>
					<StatusBox status={poc_status} />
				</div>
			</div>

		</div>
	);
}

export default PocDetails;
