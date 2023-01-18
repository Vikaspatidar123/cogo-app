import Button from '@/commons/components/UI/Button';
import FormLayout from '@/temp/form/FormLayout';
import { Flex } from '@cogoport/front/components';
import {
	ButtonContainer,
	LayoutContainer,
	SubHeading,
	ControlContainer,
	ControlHeader,
	VerificationText,
	ValueText,
	ValueContainer,
	VerifiedIconTextContainer,
	VerifiedText,
} from './styles';
import VerifiedIcon from '../../../icons/verified-icon.svg';
import MobileNoVerificationModal from './MobileVerificationModal';
import useUserDetails from './useUserDetails';

function UserDetails({ kycDetails = {}, setKycDetails = () => {} }) {
	const {
		isMobile,
		profile = {},
		setShowMobileVerificationModal = () => {},
		showMobileVerificationModal,
		fields = {},
		formState = {},
		handleSubmit = () => {},
		onSubmit = () => {},
		loading = false,
		verifyEmailId = () => {},
		controls = [],
		company_type = '',
	} = useUserDetails({ setKycDetails, kycDetails });

	return (
		<Flex direction="column">
			<SubHeading>
				We will be communicating with you via phone and email during shipment
				execution. So we need to verify your contact information to make the
				entire shipment process smooth
			</SubHeading>

			<LayoutContainer>
				<Flex direction={isMobile && 'column'}>
					<ControlContainer>
						<ControlHeader>Phone Number</ControlHeader>

						<ValueContainer>
							<ValueText>
								{profile.mobile_number
									? `${profile.mobile_country_code} ${profile.mobile_number}`
									: '-'}
							</ValueText>

							{profile.mobile_verified && (
								<VerifiedIconTextContainer>
									<VerifiedIcon style={{ marginRight: 4 }} />
									<VerifiedText>Verified</VerifiedText>
								</VerifiedIconTextContainer>
							)}
						</ValueContainer>

						{profile.mobile_number && !profile.mobile_verified ? (
							<VerificationText
								onClick={() => setShowMobileVerificationModal('verify')}
							>
								Verify
							</VerificationText>
						) : null}

						{profile.mobile_number && profile.mobile_verified ? (
							<VerificationText
								onClick={() => setShowMobileVerificationModal('change')}
							>
								Change
							</VerificationText>
						) : null}
					</ControlContainer>

					<ControlContainer>
						<ControlHeader>Email</ControlHeader>

						<ValueContainer>
							<ValueText>{profile.email || '-'}</ValueText>

							{profile.email_verified ? (
								<VerifiedIconTextContainer>
									<VerifiedIcon style={{ marginRight: 4 }} />
									<VerifiedText>Verified</VerifiedText>
								</VerifiedIconTextContainer>
							) : (
								<VerificationText onClick={() => verifyEmailId()}>
									Verify
								</VerificationText>
							)}
						</ValueContainer>
					</ControlContainer>
				</Flex>

				{(company_type === 'partnership' ||
					company_type === 'proprietorship') && (
					<FormLayout
						controls={controls}
						fields={fields}
						errors={formState.errors}
					/>
				)}
			</LayoutContainer>

			{(company_type === 'partnership' ||
				company_type === 'proprietorship') && (
				<ButtonContainer>
					<Button
						className="primary md"
						disabled={loading}
						onClick={handleSubmit(onSubmit)}
					>
						Save And Continue
					</Button>
				</ButtonContainer>
			)}

			{showMobileVerificationModal !== null && (
				<MobileNoVerificationModal
					showMobileVerificationModal={showMobileVerificationModal}
					setShowMobileVerificationModal={setShowMobileVerificationModal}
				/>
			)}
		</Flex>
	);
}

export default UserDetails;
