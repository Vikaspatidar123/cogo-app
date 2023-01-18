import Button from '@/commons/components/UI/Button';
import FormLayout from '@/temp/form/FormLayout';
import { BtnGrp, Container, Title, LayoutContainer } from './styles';
import useBankAccount from '../hooks/useBankAccount';

function BankAccount({
	setCurrentStep = () => {},
	filledDetails = {},
	setFilledDetails = () => {},
}) {
	const {
		onSubmit = () => {},
		bankAccountControls = [],
		bankAccountFormProps = {},
	} = useBankAccount({
		setCurrentStep,
		filledDetails,
		setFilledDetails,
	});

	const {
		fields = {},
		handleSubmit = () => {},
		watch = () => {},
		formState: { errors = {} },
	} = bankAccountFormProps;

	const formValues = watch();

	const onClickBack = () => {
		setCurrentStep('billing_address');
		setFilledDetails({ ...filledDetails, bank_details: { ...formValues } });
	};

	return (
		<Container>
			<Title>Bank Details</Title>

			<LayoutContainer>
				<FormLayout
					controls={bankAccountControls}
					fields={fields}
					errors={errors}
				/>
			</LayoutContainer>

			<BtnGrp>
				<Button
					className="secondary md"
					onClick={() => onClickBack()}
					style={{ marginRight: '8px' }}
				>
					Back
				</Button>

				<Button className="primary md" onClick={handleSubmit(onSubmit)}>
					Proceed
				</Button>
			</BtnGrp>
		</Container>
	);
}

export default BankAccount;
