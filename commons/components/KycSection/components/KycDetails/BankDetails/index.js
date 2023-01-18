import Button from '@/commons/components/UI/Button';
import FormLayout from '@/temp/form/FormLayout';
import { ButtonContainer, Form, Container } from './styles';
import useBankDetails from './hooks/useBankDetails';

function BankDetails(props) {
	const {
		controls = [],
		formProps = {},
		errors = {},
		onSubmit = () => {},
		createBankDetailsApiLoading = false,
		isFormSaved = false,
	} = useBankDetails(props);
	const { handleSubmit = () => {}, fields = {} } = formProps;

	return (
		<Container>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormLayout controls={controls} fields={fields} errors={errors} />

				<ButtonContainer>
					<Button
						type="submit"
						className="primary md"
						disabled={createBankDetailsApiLoading || isFormSaved}
					>
						{createBankDetailsApiLoading ? 'Submitting' : 'Submit'}
					</Button>
				</ButtonContainer>
			</Form>
		</Container>
	);
}

export default BankDetails;
