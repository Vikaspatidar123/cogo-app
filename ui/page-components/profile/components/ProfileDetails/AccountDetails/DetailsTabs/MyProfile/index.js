import { Modal } from '@cogoport/components';
import { IcCFtick, IcMEdit } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import getWorkScopes from '../../../configurations/work-scopes';

import EditProfileDetails from './EditProfileDetails';
import useMyProfile from './hooks/useMyProfile';
import LoadingState from './LoadingState';
import MobileVerificationModal from './MobileVerificationModal';
import ResetPassword from './ResetPassword';
import styles from './styles.module.css';

// import MobileHeader from '@/components/Profile/components/MobileHeader';
// import GLOBAL_CONSTANTS from '@/constants/globals.json';
// import formatDate from '@/temp/utils/formatDate';

function MyProfile() {
	const {
		isMobile,
		loading = false,
		userDetails = {},
		showEditProfileDetails = false,
		setShowEditProfileDetails = () => {},
		verifyEmailId = () => {},
		showMobileVerificationModal = null,
		setShowMobileVerificationModal = () => {},
		showPasswordModal = false,
		setShowPasswordModal = () => {},
		getChannelPartnerUser = () => {},
		onClickBackButton,
	} = useMyProfile();

	const workScopes = getWorkScopes();

	if (loading) {
		return <LoadingState />;
	}
	console.log(userDetails, 'userDetails');

	const renderWorkScopes = () => {
		if (!userDetails.work_scopes?.length) {
			return '-';
		}
		return (userDetails.work_scopes || []).map((work_scope) => {
			const displayWorkScope = workScopes.find(
				(work) => work.value === work_scope,
			);

			return <div className={styles.value_text}>{displayWorkScope?.label || '-'}</div>;
		});
	};

	return (
		<>
			{/* {isMobile && (
				<MobileHeader
					heading={t('profile:accountDetails.tabOptions.profile.mobileHeading')}
					onClickBackButton={onClickBackButton}
				/>
			)} */}

			<div className={styles.main_container}>
				{isMobile && !showEditProfileDetails ? (
					<div className={styles.flex}>
						<IcMEdit
							style={{
								width       : 16,
								height      : 16,
								cursor      : 'pointer',
								marginRight : isMobile && 12,
							}}
							onClick={() => setShowEditProfileDetails(true)}
						/>
					</div>
				) : null}

				<div className={styles.header_container}>
					<div className={styles.header_text}>
						Personal Details
					</div>
					{!showEditProfileDetails ? (
						<IcMEdit
							width={16}
							height={16}
							onClick={() => setShowEditProfileDetails(true)}
						/>
					) : null}
				</div>

				{showEditProfileDetails ? (
					<EditProfileDetails
						getChannelPartnerUser={getChannelPartnerUser}
						setShowEditProfileDetails={setShowEditProfileDetails}
						userDetails={userDetails}
					/>
				) : (
					<div className={styles.content}>
						<div className={styles.details_container}>
							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									Name
								</div>
								<div className={styles.value_text}>{userDetails.name || '-'}</div>
							</div>

							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									Email
								</div>
								<div className={styles.text_icon_container}>
									<div className={styles.label_text}>{userDetails.email || '-'}</div>
									{userDetails.email_verified && (
										<IcCFtick className={styles.icon} />
									)}
								</div>

								{userDetails.email && !userDetails.email_verified ? (
									<div className={styles.text_icon_container}>
										<div className={styles.verification_text} onClick={() => verifyEmailId()}>
											Email
										</div>
									</div>
								) : null}
							</div>

							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									Mobile
								</div>
								<div className={styles.text_icon_container}>
									<div className={styles.label_text}>
										{userDetails.mobile_number
											? `${userDetails.mobile_country_code} ${userDetails.mobile_number}`
											: '-'}
									</div>
									{userDetails.mobile_verified && (
										<IcCFtick className={styles.icon} />
									)}
								</div>

								{userDetails.mobile_number && !userDetails.mobile_verified ? (
									<div className={styles.text_icon_container}>
										<div
											className={styles.verification_text}
											onClick={() => setShowMobileVerificationModal('verify')}
										>
											Mobile
										</div>
									</div>
								) : null}

								{userDetails.mobile_number && userDetails.mobile_verified ? (
									<div className={styles.text_icon_container}>
										<div
											className={styles.verification_text}
											onClick={() => setShowMobileVerificationModal('change')}
										>
											Change
										</div>
									</div>
								) : null}
							</div>

							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									Work Scopes
								</div>
								<div className={styles.value_text}>{renderWorkScopes()}</div>
							</div>
						</div>

						<div className={styles.details_container}>
							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									Languages
								</div>
								<div className={styles.value_text}>
									<div className={styles.text_icon_container}>
										{userDetails.preferred_languages?.length > 0
											? userDetails.preferred_languages?.map((lang) => <div className={styles.language_tag}>{startCase(lang)}</div>)
											: '-'}
									</div>
								</div>
							</div>

							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									Date of Birth
								</div>
								<div className={styles.value_text}>
									{format(
										userDetails.birth_date,
										'dd MMM yyyy',
									) || '-'}
									{/* formatType : 'date', */}
									{/* dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'], */}
								</div>
							</div>

							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									Alternate Mobile Numbers
								</div>
								<div className={styles.value_text}>
									{userDetails.alternate_mobile_numbers?.length > 0
										? userDetails.alternate_mobile_numbers?.map(
											(mobile_number) => (
												<div className={styles.value_text}>{`${mobile_number.mobile_country_code} ${mobile_number.mobile_number}`}</div>
											),
										  )
										: '-'}
								</div>
							</div>

							<div className={styles.sub_container}>
								<div className={styles.label_text} />
								<div className={styles.link_text} onClick={() => setShowPasswordModal(true)}>
									Change Password

								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{showPasswordModal && (
				<Modal
					show={showPasswordModal}
					onClose={setShowPasswordModal}
					onOuterClick={() => setShowPasswordModal(false)}
				>
					<ResetPassword setShowPasswordModal={setShowPasswordModal} />
				</Modal>
			)}

			{showMobileVerificationModal !== null && (
				<MobileVerificationModal
					showMobileVerificationModal={showMobileVerificationModal}
					setShowMobileVerificationModal={setShowMobileVerificationModal}
				/>
			)}
		</>
	);
}

export default MyProfile;
