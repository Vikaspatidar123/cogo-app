import Layout from '@cogo/business-modules/form/Layout';
import { Flex } from '@cogoport/front/components';
import { Button } from '@cogoport/front/components/admin';

// import { ButtonContainer, LayoutContainer, SubHeading } from './styles';

import styles from './styles.module.css';
import useTradeBodyInformation from './useTradeBodyInformation';

function TradeBodyInformation({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) {
	const {
		controls = [],
		fields = {},
		handleSubmit = () => {},
		onSubmit = () => {},
		updateOrganizationAPILoading = false,
		formState = {},
	} = useTradeBodyInformation({
		channelPartnerDetails,
		kycDetails,
		setKycDetails,
	});

	return (
		<Flex direction="column">
			<SubHeading>
				Please confirm the trade bodies, this is for smooth shipment for all
				your future bookings. We will keep in touch with you via phone or email
				if required.
			</SubHeading>

			<LayoutContainer>
				<Layout controls={controls} fields={fields} errors={formState.errors} />
			</LayoutContainer>

			<ButtonContainer>
				<Button
					className="primary md"
					disabled={updateOrganizationAPILoading}
					onClick={handleSubmit(onSubmit)}
				>
					Save and Continue
				</Button>
			</ButtonContainer>
		</Flex>
	);
}

export default TradeBodyInformation;
