import FormLayout from '@/temp/form/FormLayout';
import Button from '@/commons/components/UI/Button';
import { Flex } from '@cogoport/front/components';
import { SubHeading, LayoutContainer, ButtonContainer } from './styles';
import useCompanyDetails from './useCompanyDetails';

function CompanyDetails({ kycDetails = {}, setKycDetails = () => {} }) {
	const {
		controls = [],
		fields = {},
		handleSubmit = () => {},
		onSubmit = () => {},
		updateOrganizationAPILoading = false,
		formState = {},
	} = useCompanyDetails({ setKycDetails, kycDetails });

	return (
		<Flex direction="column">
			<SubHeading>Kindly check the details before you proceed</SubHeading>

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
					Save And Continue
				</Button>
			</ButtonContainer>
		</Flex>
	);
}

export default CompanyDetails;
