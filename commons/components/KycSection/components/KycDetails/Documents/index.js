import FormLayout from '@/temp/form/FormLayout';
import Button from '@/commons/components/UI/Button';
import { Flex } from '@cogoport/front/components';
import { SubHeading, LayoutContainer, ButtonContainer } from './styles';
import useDocuments from './useDocuments';

function Documents({ kycDetails = {}, setKycDetails = () => {} }) {
	const {
		fields = {},
		handleSubmit = () => {},
		onSubmit = () => {},
		controls = [],
		formState = {},
		loading = false,
	} = useDocuments({ kycDetails, setKycDetails });

	return (
		<Flex direction="column">
			<SubHeading>
				We need these documents to check the legitamacy of your organization
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
					disabled={loading}
					onClick={handleSubmit(onSubmit)}
				>
					Save And Continue
				</Button>
			</ButtonContainer>
		</Flex>
	);
}

export default Documents;
