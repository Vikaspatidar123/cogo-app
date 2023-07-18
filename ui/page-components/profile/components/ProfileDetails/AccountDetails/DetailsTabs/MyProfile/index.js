import { Modal, Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';

import MobileHeader from '../../../../MobileHeader';
import getWorkScopes from '../../../configurations/work-scopes';

import EditProfileDetails from './EditProfileDetails';
import useMyProfile from './hooks/useMyProfile';
import LoadingState from './LoadingState';
import MobileVerificationModal from './MobileVerificationModal';
import ProfileDetails from './ProfileDetails';
import ResetPassword from './ResetPassword';
import styles from './styles.module.css';

function MyProfile() {
	const {
		loading = false,
		userDetails = {},
		showEditProfileDetails = false,
		setShowEditProfileDetails = () => {},
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
			<MobileHeader
				heading="My Profile"
				onClickBackButton={onClickBackButton}
			/>
			<div className={styles.main_container}>
				{!showEditProfileDetails ? (
					<div className={styles.flex}>
						<IcMEdit onClick={() => setShowEditProfileDetails(true)} />
					</div>
				) : null}

				<div className={styles.header_container}>
					<div className={styles.header_text}>
						My Profile
					</div>
					{!showEditProfileDetails ? (
						<Button themeType="secondary" onClick={() => setShowEditProfileDetails(true)}>
							<div>Edit</div>
							<IcMEdit
								width={14}
								height={14}
								className={styles.edit_icon}
							/>
						</Button>

					) : null}
				</div>

				{showEditProfileDetails ? (
					<EditProfileDetails
						getChannelPartnerUser={getChannelPartnerUser}
						setShowEditProfileDetails={setShowEditProfileDetails}
						userDetails={userDetails}
					/>
				) : (
					<ProfileDetails
						userDetails={userDetails}
						renderWorkScopes={renderWorkScopes}
						setShowPasswordModal={setShowPasswordModal}
					/>
				)}
			</div>

			{showPasswordModal && (
				<Modal
					show={showPasswordModal}
					onClose={setShowPasswordModal}
					onOuterClick={() => setShowPasswordModal(false)}
					size="sm"
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
