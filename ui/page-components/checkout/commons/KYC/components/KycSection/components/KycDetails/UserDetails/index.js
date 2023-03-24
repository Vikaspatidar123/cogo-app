// import Layout from '@cogo/business-modules/form/Layout';

import { Button, Popover } from '@cogoport/components';

import VerifiedIcon from '../../../icons/verified-icon.svg';
import useGenerateMobileVerificationLink from '../hooks/useGenerateMobileVerificationLink';
import useSendMobileVerificationEmail from '../hooks/useSendMobileVerificationEmail';

import MobileNoVerificationModal from './MobileVerificationModal';
import styles from './styles.module.css';
import useUserDetails from './useUserDetails';

function UserDetails({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) {
	const {
		usersList = [],
		selectedUser = {},
		handleChangeUser = () => {},
		setShowMobileVerificationModal = () => {},
		showMobileVerificationModal,
		fields = {},
		formState = {},
		handleSubmit = () => {},
		onSubmit = () => {},
		createChannelPartnerVerificationDocumentLoading = false,
		verifyEmailId = () => {},
		loadingResendEmail = false,
		controls = [],
	} = useUserDetails({ channelPartnerDetails, kycDetails, setKycDetails });

	const {
		generateVerificationLink,
		mobileVerificationLink,
		loadingMobileVerificationLink,
	} = useGenerateMobileVerificationLink({
		user_id: selectedUser.user_id,
	});
	const { sendVerificationLink } = useSendMobileVerificationEmail({
		user_id: selectedUser.user_id,
	});

	const { company_type: companyType } = channelPartnerDetails;

	const showUserDetailsForm =		['partnership', 'proprietorship'].includes(companyType)
		&& !isEmpty(selectedUser);

	const renderGeneratedLink = () => (
		<div className={styles.flex}>
			<div className={styles.link_container}>{mobileVerificationLink}</div>
		</div>
	);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ display: 'flex', width: '85%' }}>
				<div style={{ fontSize: '14px', color: '#333333' }}>
					We will be communicating with you via phone and email during shipment
					execution. So we need to verify your contact information to make the
					entire shipment process smooth
				</div>
			</div>

			<div className={styles.layout_container}>
				<div className={styles.select_container}>
					<Select
						placeholder="Select User"
						type="select"
						options={usersList}
						themeType="new"
						onChange={handleChangeUser}
						valueKey="user_id"
						labelKey="name"
						size="lg"
						value={selectedUser.user_id}
						error={!selectedUser.user_id ? 'User is required' : ''}
					/>
				</div>

				{!isEmpty(selectedUser) && (
					<div style={{ display: 'flex' }}>
						<div className={styles.control_container}>
							<div className={styles.control_hseader}>Phone Number</div>
							<div className={styles.value_container}>
								<div>
									{selectedUser.mobile_number
										? `${selectedUser.mobile_country_code} ${selectedUser.mobile_number}`
										: '-'}
								</div>

								{selectedUser.mobile_verified && (
									<div className={styles.verified_iocon_text_container}>
										<VerifiedIcon style={{ marginRight: 4 }} />
										<div className={styles.verified_text}>Verified</div>
									</div>
								)}
							</div>

							{!selectedUser.mobile_verified && selectedUser.email_verified && (
								<div className={style.text_icon_container}>
									<div
										className={styles.verification_text}
										onClick={() => setShowMobileVerificationModal('verify')}
									>
										Verify
									</div>
								</div>
							)}

							{selectedUser.email_verified
							&& selectedUser.mobile_number
							&& !selectedUser.mobile_verified ? (
								<div className={styles.text_icon_container}>
									<Popover
										placement="bottom"
										content={
											!loadingMobileVerificationLink && renderGeneratedLink()
										}
									>
										<div
											className={styles.verification_text}
											onClick={() => {
												generateVerificationLink();
											}}
										>
											Generate Link
										</div>
									</Popover>
								</div>
								) : null}

							{selectedUser.mobile_number
							&& !selectedUser.mobile_verified
							&& selectedUser.email_verified ? (
								<div className={styles.text_icon_container}>
									<div className={styles.verification_text} onClick={sendVerificationLink}>
										Send Link on Email
									</div>
								</div>
								) : null}

							{selectedUser.mobile_number && selectedUser.mobile_verified && (
								<div
									className={styles.verification_text}
									onClick={() => setShowMobileVerificationModal('change')}
								>
									Change
								</div>
							)}
						</div>

						<div className={styles.control_container}>

							<div className={styles.control_header}>Email</div>

							<div className={styles.value_container}>
								<div>{selectedUser.email || '-'}</div>

								{selectedUser.email_verified && (
									<div className={styles.verified_icon_text_container}>

										<VerifiedIcon style={{ marginRight: 4 }} />
										<div className={styles.verified_text}>Verified</div>
									</div>
								)}
							</div>

							{!selectedUser.email_verified && (
								<div className={styles.text_icon_container}>
									<div
										className={styles.verification_text}

										showLoading={loadingResendEmail}
										onClick={() => verifyEmailId()}
									>
										Verify
									</div>
								</div>
							)}
						</div>
					</div>
				)}

				{/* {showUserDetailsForm ? (
					<Layout
						controls={controls}
						fields={fields}
						errors={formState.errors}
					/>
				) : null} */}
			</div>

			{showUserDetailsForm ? (
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button
						disabled={createChannelPartnerVerificationDocumentLoading}
						onClick={handleSubmit(onSubmit)}
					>
						SAVE AND CONTINUE
					</Button>
				</div>
			) : null}

			{showMobileVerificationModal !== null && (
				<MobileNoVerificationModal
					channelPartnerDetails={channelPartnerDetails}
					selectedUser={selectedUser}
					showMobileVerificationModal={showMobileVerificationModal}
					setShowMobileVerificationModal={setShowMobileVerificationModal}
				/>
			)}
		</div>
	);
}

export default UserDetails;
