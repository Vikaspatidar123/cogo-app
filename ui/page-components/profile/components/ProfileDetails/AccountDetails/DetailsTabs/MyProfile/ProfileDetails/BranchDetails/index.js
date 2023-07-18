import styles from './styles.module.css';

function BranchDetails({ userDetails = {} }) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.text_1}>
				BRANCH DETAILS
			</div>
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>Branch Name</div>
						<div className={styles.value}>
							{userDetails?.branch?.branch_name ? userDetails?.branch?.branch_name : '-'}
						</div>
					</div>
				</div>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>Tax Number</div>
						<div className={styles.value}>
							{userDetails?.branch?.tax_number ? userDetails?.branch?.tax_number : '-'}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BranchDetails;
