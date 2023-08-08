import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import OrganizationForm from './OrganizationForm';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function Organization({ setBillingAddressDetails, setOrg, setOrgBranchId }) {
	const { push } = useRouter();
	const { t } = useTranslation(['common', 'getStarted']);

	const handleBack = () => {
		push('/dashboard');
	};

	const { organizations } = useSelector(({ profile }) => profile);
	const checkPoint = organizations.length > 0;
	return (
		<div className={styles.right_container}>
			<div className={styles.header_container}>
				<div className={styles.header_container_bold}>{t('getStarted:rightPanel_get_started_text_1')}</div>
				{t('getStarted:rightPanel_get_started_text_2')}
				{checkPoint && (
					<Button
						size="md"
						themeType="accent"
						className={styles.button}
						onClick={handleBack}
					>
						{t('getStarted:rightPanel_get_started_go_to_dashboard_button_label')}
					</Button>
				)}
			</div>

			<div className={styles.text_container}>
				{t('getStarted:rightPanel_get_started_is_service_provider')}
				<a
					className={styles.text_container_span}
					href={t('getStarted:rightPanel_get_started_lsp_partners_href_link')}
					target="_blank"
					rel="noreferrer"
				>
					{t('getStarted:rightPanel_get_started_text_click_here_href')}
				</a>
				{' '}
				{t('getStarted:rightPanel_get_started_text_3')}
			</div>
			<div className={styles.organization_form_container}>
				<OrganizationForm
					setBillingAddressDetails={setBillingAddressDetails}
					setOrg={setOrg}
					setOrgBranchId={setOrgBranchId}
				/>
			</div>
		</div>
	);
}

export default Organization;
