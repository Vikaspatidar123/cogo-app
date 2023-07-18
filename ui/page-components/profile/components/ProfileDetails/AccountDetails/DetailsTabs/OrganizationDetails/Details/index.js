import styles from './styles.module.css';

import { Image } from '@/packages/next';

function Details({ organizationData = {} }) {
	return (
		<div className={styles.wrapper}>
			<div>
				<div className={styles.heading}>Company Logo</div>
				<Image
					src={organizationData.logo
					// eslint-disable-next-line max-len
					|| 'https:cogoport-production.sgp1.digitaloceanspaces.com92f7f7340ff071a93fcacfca9956b32a/company-info-icon.svg'}
					width={64}
					height={64}
				/>
			</div>
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>Company Name</div>
						<div className={styles.value}>
							{organizationData.business_name || '-'}
							{' '}
						</div>
					</div>
				</div>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>Country</div>
						<div className={styles.value}>{organizationData.country?.display_name || '-'}</div>
					</div>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>PAN Number</div>
						<div className={styles.value}>
							{organizationData.registration_number || '-'}
						</div>
					</div>
				</div>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>Website</div>
						<div className={styles.value}>
							{organizationData.website || '-'}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>Branch Name</div>
						<div className={styles.value}>
							{organizationData.branches?.[0].branch_name || '-'}
						</div>
					</div>
				</div>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>Branch Code</div>
						<div className={styles.value}>
							{organizationData.branches?.[0].branch_code || '-'}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Details;
