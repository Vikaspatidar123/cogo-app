import { IcMEdit } from '@cogoport/icons-react';

import MobileHeader from '../../../../MobileHeader';

import EditOrganizationDetails from './EditOrganizationDetails';
import useOrganizationDetails from './hooks/useOrganizationDetails';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';

function OrganizationDetails() {
	const geo = getGeoConstants();
	const REGISTRATION_LABEL = geo.others.registration_number.label;

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
									Branch
									{' '}
									{REGISTRATION_LABEL}
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
											// eslint-disable-next-line max-len
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

			<MobileHeader
				heading="Company Details"
				onClickBackButton={onClickBackButton}
			/>

			{renderOrganizationDetails()}
		</>
	);
}

export default OrganizationDetails;
