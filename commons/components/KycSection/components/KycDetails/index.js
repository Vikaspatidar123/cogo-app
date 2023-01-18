import { Flex, Text, ToolTip } from '@cogoport/front/components';
import { isEmpty } from '@cogoport/front/utils';
import {
	Container,
	HeaderText,
	RejectedLabel,
	RejectedText,
	RejectedSubText,
	RejectionReason,
	Header,
	ListContainer,
	ItemContainer,
	ItemStroke,
	ItemHeader,
	FadeIn,
} from './styles';
import RejectedIcon from '../../icons/alert-rejected.svg';
import useKycDetails from './hooks/useKycDetails';
import InfoIcon from '../../icons/info-icon.svg';
import CaretUp from '../../icons/caret-up.svg';
import CaretDown from '../../icons/caret-down.svg';
import TAG_COMPONENT_MAPPING from './utils/component-mapping';
import LoadingState from '../LoadingState';

function KycDetails({ kycDetails = {}, setKycDetails = () => {} }) {
	const { kyc_status, verification_progress } = kycDetails;

	const {
		isMobile,
		COMPONENTS_MAPPING,
		showComponents,
		componentProps,
		showHiddenComponentContents,
		setShowHiddenComponentContents,
		componentsRef,
		channelPartnerState,
	} = useKycDetails({ kycDetails, setKycDetails });

	const renderRejectedKycStatusHeader = () => {
		if (kycDetails.kyc_status !== 'rejected') {
			return null;
		}

		return (
			<RejectedLabel>
				<Header>
					<Flex>
						<RejectedIcon style={{ width: 20, height: 20, marginRight: 8 }} />

						<RejectedText>Your KYC has been Rejected!</RejectedText>
					</Flex>

					<Flex>
						<RejectedSubText>
							Kindly resubmit the details to proceed further.
						</RejectedSubText>
					</Flex>
				</Header>

				<RejectionReason>
					{`Reason : ${kycDetails.kyc_rejection_reason}`}
				</RejectionReason>
			</RejectedLabel>
		);
	};

	const renderKycStatusHeader = () => {
		if (kyc_status === 'rejected') {
			return <HeaderText>Re-Submit your KYC</HeaderText>;
		}

		return <HeaderText>Complete your KYC</HeaderText>;
	};

	if (isEmpty(channelPartnerState)) {
		return <LoadingState />;
	}

	return (
		<>
			{renderRejectedKycStatusHeader()}

			<Container>
				{renderKycStatusHeader()}

				<ListContainer>
					{Object.entries(COMPONENTS_MAPPING).map(([key, value]) => {
						const { title, tooltip, component: Component } = value;

						if (!showComponents[key] || !Component) {
							return null;
						}

						const showHiddenComponentContent = showHiddenComponentContents[key];

						const status =
							TAG_COMPONENT_MAPPING[(verification_progress || {})[key]] || null;

						return (
							<ItemContainer
								key={key}
								ref={(element) => {
									componentsRef.current[key] = element;
								}}
							>
								<ItemStroke />

								<ItemHeader
									onClick={() =>
										setShowHiddenComponentContents((previousState) => ({
											...previousState,
											[key]: !previousState[key],
										}))
									}
								>
									<Flex>
										<Text color="#333333" size={16} bold={500}>
											{title}
										</Text>

										{!isMobile ? (
											<ToolTip
												content={<Text size={12}>{tooltip}</Text>}
												animation="scale"
												placement="top"
											>
												<div>
													<InfoIcon
														style={{ marginLeft: 8, marginBottom: -2 }}
													/>
												</div>
											</ToolTip>
										) : null}
									</Flex>

									<Flex>
										{status}

										{showHiddenComponentContent ? <CaretUp /> : <CaretDown />}
									</Flex>
								</ItemHeader>

								{showHiddenComponentContent && (
									<FadeIn type="enter">
										<div>
											<Component key={key} {...(componentProps[key] || {})} />
										</div>
									</FadeIn>
								)}
							</ItemContainer>
						);
					})}
				</ListContainer>
			</Container>
		</>
	);
}

export default KycDetails;
