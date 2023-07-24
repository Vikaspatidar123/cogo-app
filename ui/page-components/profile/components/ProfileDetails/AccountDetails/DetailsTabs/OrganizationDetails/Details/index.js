import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function SubContainer({ title, children }) {
	return (
		<div className={styles.sub_container}>
			<div>
				<div className={styles.heading}>{title}</div>
				<div className={styles.value}>
					{children}
					{' '}
				</div>
			</div>
		</div>
	);
}

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
				<SubContainer title={t('settings:organization_details_text_2')}>
					{organizationData.business_name || '-'}
				</SubContainer>
				<SubContainer title={t('settings:organization_details_text_3')}>
					{organizationData.country?.display_name || '-'}
				</SubContainer>
			</div>
			<div className={styles.container}>
				<SubContainer title={t('settings:organization_details_text_4')}>
					{organizationData.registration_number || '-'}
				</SubContainer>
				<SubContainer title={t('settings:organization_details_text_5')}>
					{organizationData.website || '-'}
				</SubContainer>
			</div>
			<div className={styles.container}>
				<SubContainer title={t('settings:organization_details_text_6')}>
					{organizationData.branches?.[GLOBAL_CONSTANTS.zeroth_index].branch_name || '-'}
				</SubContainer>
				<SubContainer title={t('settings:organization_details_text_7')}>
					{organizationData.branches?.[GLOBAL_CONSTANTS.zeroth_index].branch_code || '-'}
				</SubContainer>
			</div>
		</div>
	);
}

export default Details;
