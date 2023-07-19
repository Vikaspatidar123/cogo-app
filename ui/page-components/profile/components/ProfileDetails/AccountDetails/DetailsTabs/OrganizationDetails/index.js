import { Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import MobileHeader from '../../../../MobileHeader';

import Details from './Details';
import EditOrganizationDetails from './EditOrganizationDetails';
import useOrganizationDetails from './hooks/useOrganizationDetails';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function OrganizationDetails() {
	const { t } = useTranslation(['settings']);

	const {
		loading = false,
		organizationData = {},
		setShowEditOrganizationDetails = () => { },
		showEditOrganizationDetails = false,
		onClickBackButton,
	} = useOrganizationDetails({});

	const renderOrganizationDetails = () => {
		if (loading) {
			return <LoadingState />;
		}
		return (
			<div className={styles.main_container}>
				{!showEditOrganizationDetails ? (
					<div className={styles.flex}>
						<IcMEdit onClick={() => setShowEditOrganizationDetails(true)} />
					</div>
				) : null}

				<div className={styles.header_container}>
					<div className={styles.header_text}>
						{t('settings:organization_details_heading')}
					</div>

					{!showEditOrganizationDetails ? (
						<Button onClick={() => setShowEditOrganizationDetails(true)} themeType="secondary">
							<div>{t('settings:edit_or_add_button_label_2')}</div>
							<IcMEdit
								style={{ width: 16, height: 16, marginLeft: '5px' }}
							/>
						</Button>
					) : null}
				</div>

				{showEditOrganizationDetails ? (
					<EditOrganizationDetails
						organizationData={organizationData}
						setShowEditOrganizationDetails={setShowEditOrganizationDetails}
					/>
				) : (
					<Details organizationData={organizationData} />
				)}
			</div>
		);
	};

	return (
		<>

			<MobileHeader
				heading={t('settings:organization_details_mobile_heading')}
				onClickBackButton={onClickBackButton}
			/>

			{renderOrganizationDetails()}
		</>
	);
}

export default OrganizationDetails;
