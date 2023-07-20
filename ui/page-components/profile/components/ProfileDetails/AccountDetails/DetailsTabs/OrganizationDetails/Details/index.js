import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function Details({ organizationData = {} }) {
	const { t } = useTranslation(['settings']);

	return (
		<div className={styles.wrapper}>
			<div>
				<div className={styles.heading}>{t('settings:organization_details_text_1')}</div>
				<Image
					src={organizationData.logo || GLOBAL_CONSTANTS.image_url.company_logo}
					width={64}
					height={64}
					alt="companyLogo"
				/>
			</div>
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>{t('settings:organization_details_text_2')}</div>
						<div className={styles.value}>
							{organizationData.business_name || '-'}
							{' '}
						</div>
					</div>
				</div>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>{t('settings:organization_details_text_3')}</div>
						<div className={styles.value}>{organizationData.country?.display_name || '-'}</div>
					</div>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>{t('settings:organization_details_text_4')}</div>
						<div className={styles.value}>
							{organizationData.registration_number || '-'}
						</div>
					</div>
				</div>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>{t('settings:organization_details_text_5')}</div>
						<div className={styles.value}>
							{organizationData.website || '-'}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>{t('settings:organization_details_text_6')}</div>
						<div className={styles.value}>
							{organizationData.branches?.[GLOBAL_CONSTANTS.zeroth_index].branch_name || '-'}
						</div>
					</div>
				</div>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>{t('settings:organization_details_text_7')}</div>
						<div className={styles.value}>
							{organizationData.branches?.[GLOBAL_CONSTANTS.zeroth_index].branch_code || '-'}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Details;
