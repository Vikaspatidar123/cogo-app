import Button from '@/commons/components/UI/Button';
import FormLayout from '@/temp/form/FormLayout';
import { Flex } from '@cogoport/front/components';
import { ButtonContainer, LayoutContainer, SubHeading } from './styles';
import useTradeBodyInformation from './useTradeBodyInformation';

function TradeBodyInformation({ kycDetails = {}, setKycDetails = () => {} }) {
	const {
		controls = [],
		fields = {},
		handleSubmit = () => {},
		onSubmit = () => {},
		updateOrganizationAPILoading = false,
		formState = {},
	} = useTradeBodyInformation({ kycDetails, setKycDetails });

	return (
		<Flex direction="column">
			<SubHeading>
				Please confirm the trade bodies, this is for smooth shipment for all
				your future bookings. We will keep in touch with you via phone or email
				if required.
			</SubHeading>

			<LayoutContainer>
				<FormLayout
					controls={controls}
					fields={fields}
					errors={formState.errors}
				/>
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
