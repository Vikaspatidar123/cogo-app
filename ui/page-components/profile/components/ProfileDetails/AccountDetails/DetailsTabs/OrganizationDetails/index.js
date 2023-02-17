import { IcMEdit } from '@cogoport/icons-react';

import EditOrganizationDetails from './EditOrganizationDetails';
import useOrganizationDetails from './hooks/useOrganizationDetails';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

// import SlidingTabs from '@/commons/components/UI/SlidingTabs';
// import MobileHeader from '@/components/Profile/components/MobileHeader';

function OrganizationDetails() {
	const {
		isMobile,
		loading = false,
		organizationData = {},
		setShowEditOrganizationDetails = () => { },
		showEditOrganizationDetails = false,
		// onClickBackButton,
	} = useOrganizationDetails({});

	const renderOrganizationDetails = () => {
		if (loading) {
			return <LoadingState />;
		}
		return (
			<div className={styles.main_container}>
				{isMobile && !showEditOrganizationDetails ? (
					<div className={styles.flex}>
						<IcMEdit
							style={{
								width       : 16,
								height      : 16,
								cursor      : 'pointer',
								marginRight : isMobile && 12,
							}}
							onClick={() => setShowEditOrganizationDetails(true)}
						/>
					</div>
				) : null}

				<div className={styles.header_container}>
					<div className={styles.header_text}>
						Organization Details
					</div>

					{!showEditOrganizationDetails ? (
						<IcMEdit
							onClick={() => setShowEditOrganizationDetails(true)}
							style={{ width: 16, height: 16, cursor: 'pointer' }}
						/>
					) : null}
				</div>

				{showEditOrganizationDetails ? (
					<EditOrganizationDetails
						organizationData={organizationData}
						setShowEditOrganizationDetails={setShowEditOrganizationDetails}
					/>
				) : (
					<div className={styles.content}>
						<div className={styles.details_container}>
							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									Company Name
								</div>
								<div className={styles.value_text}>{organizationData.business_name || '-'}</div>
							</div>

							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									Country
								</div>
								<div className={styles.value_text}>
									{organizationData.country?.display_name || '-'}
								</div>
							</div>

							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									City
								</div>
								<div className={styles.value_text}>{organizationData.city?.name || '-'}</div>
							</div>

							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									PAN Number
								</div>
								<div className={styles.value_text}>
									{organizationData.registration_number || '-'}
								</div>
							</div>
						</div>

						<div className={styles.details_container}>
							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									Branch Name
								</div>
								<div className={styles.value_text}>
									{organizationData.branches?.[0].branch_name || '-'}
								</div>
							</div>

							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									Branch Code
								</div>
								<div className={styles.value_text}>
									{organizationData.branches?.[0].branch_code || '-'}
								</div>
							</div>

							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									Branch GST
								</div>
								<div className={styles.value_text}>
									{organizationData.branches?.[0].tax_number || '-'}
								</div>
							</div>
						</div>

						<div className={styles.details_container}>
							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									Company Logo
								</div>
								<div style={{ width: 50, height: 50 }}>
									<img
										src={
											organizationData.logo
											|| 'https://cogoport-production.sgp1.digitaloceanspaces.com/92f7f7340ff071a93fcacfca9956b32a/company-info-icon.svg'
										}
										alt="Your Logo"
										width={50}
										height={50}
									/>
								</div>
							</div>

							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									Website

								</div>
								<div className={styles.value_text}>{organizationData.website || '-'}</div>
							</div>
						</div>

						<div className={styles.about_container}>
							<div className={styles.label_text}>
								About Company
							</div>
							<div className={styles.description}>{organizationData.about || '-'}</div>
						</div>
					</div>
				)}
			</div>
		);
	};

	return (
		<>
			{/* {isMobile && (
				<MobileHeader
					heading={t(
						'profile:accountDetails.tabOptions.organization.mobileHeading',
					)}
					onClickBackButton={onClickBackButton}
				/>
			)} */}

			{/* {is_importer_exporter && is_service_provider && (
				<div className={styles.toggle_container}>
					<SlidingTabs
						options={[
							{
								label: t(
									'profile:accountDetails.tabOptions.organization.toggle.1',
								),
								value: 'importer_exporter',
							},
							{
								label: t(
									'profile:accountDetails.tabOptions.organization.toggle.2',
								),
								value: 'service_provider',
							},
						]}
						activeTab={organizationType}
						setActiveTab={setOrganizationType}
					/>

					{isMobile && !showEditOrganizationDetails ? (
						<IcMEdit
							onClick={() => setShowEditOrganizationDetails(true)}
							style={{ width: 16, height: 16, cursor: 'pointer' }}
						/>
					) : null}
				</div>
			)} */}

			{renderOrganizationDetails()}
		</>
	);
}

export default OrganizationDetails;
