import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function Details({ users = [] }) {
	const { t } = useTranslation(['settings']);

	const { profile } = useSelector((state) => state);
	const { organization = {} } = profile || {};
	const { kyc_status } = organization || {};

	return (
		<div>
			<div className={styles.name_container}>
				<div className={styles.value_text_2}>{profile.name || '-'}</div>
				<div>
					{kyc_status === 'verified' && (
						<div className={cl`${styles.verified} ${styles.kyc_status}`}>
							{t('settings:settings_kyc_verified_text')}
						</div>
					)}
					{kyc_status === 'rejected' && (
						<div className={cl`${styles.rejected} ${styles.kyc_status}`}>
							{t('settings:settings_kyc_rejcted_text')}
						</div>
					)}
					{kyc_status?.includes('pending') && (
						<div className={cl`${styles.pending} ${styles.kyc_status}`}>
							{t('settings:settings_kyc_pending_text')}
						</div>
					)}
				</div>
			</div>
			<div className={styles.name_container}>
				<div className={styles.header_text}>
					{t('settings:organization_my_team_text_1')}
					{' '}
					(
					{users.length > 0 ? users.length : ''}
					)
				</div>

				{(users || []).map((user) => (
					<div className={styles.container}>
						<div className={styles.sub_container}>
							<div className={styles.value_text}>
								{t('settings:organization_my_team_text_2')}
							</div>
							<div className={styles.label_text}>
								{user?.name || '-'}
							</div>
						</div>

						<div className={styles.sub_container}>
							<div className={styles.value_text}>
								{t('settings:organization_my_team_text_3')}
								{' '}
							</div>
							<div className={styles.label_text}>
								{user?.email || '-'}
							</div>
						</div>

						<div className={styles.sub_container}>
							<div className={styles.value_text}>
								{t('settings:organization_my_team_text_4')}
							</div>
							<div className={styles.label_text}>
								{user?.mobile_number
									? `${user?.mobile_country_code || ''} ${
										user?.mobile_number
									}`
									: '-'}
							</div>
						</div>

						<div className={styles.sub_container}>
							<div className={styles.value_text}>
								{t('settings:organization_my_team_text_5')}
							</div>
							<div className={styles.label_text}>
								{user.status || '-'}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Details;
