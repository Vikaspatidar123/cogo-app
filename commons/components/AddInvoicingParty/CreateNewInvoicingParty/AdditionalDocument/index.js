import Button from '@/commons/components/UI/Button';
import FormLayout from '@/temp/form/FormLayout';
import { BtnGrp, Container, Title, LayoutContainer } from './styles';
import useDocuments from '../hooks/useDocuments';

function AdditionalDocument({
	tradePartyType = {},
	setShowModal = () => {},
	filledDetails = {},
	setFilledDetails = () => {},
	orgResponse = {},
	setCurrentStep = () => {},
	fetchOrganizationTradeParties = () => {},
}) {
	const {
		onSubmit = () => {},
		loading = false,
		documentControls = [],
		documentFormProps = {},
	} = useDocuments({
		filledDetails,
		setFilledDetails,
		orgResponse,
		tradePartyType,
		setShowModal,
		fetchOrganizationTradeParties,
	});

	const {
		fields = {},
		handleSubmit = () => {},
		watch = () => {},
		formState: { errors = {} },
	} = documentFormProps;

	const formValues = watch();

	const onClickBack = () => {
		setCurrentStep('bank_details');
		setFilledDetails({ ...filledDetails, documents: { ...formValues } });
	};

	return (
		<Container>
			<Title>Documents</Title>

			<LayoutContainer>
				<FormLayout
					controls={documentControls}
					fields={fields}
					errors={errors}
				/>
			</LayoutContainer>

			<BtnGrp>
				<Button
					className="secondary md"
					onClick={() => onClickBack()}
					style={{
						marginRight: '8px',
					}}
					disabled={loading}
				>
					Back
				</Button>

				<Button
					className="primary md"
					disabled={loading}
					onClick={handleSubmit(onSubmit)}
				>
					{loading ? 'Submitting...' : 'Submit'}
				</Button>
			</BtnGrp>
		</Container>
	);
}

export default AdditionalDocument;
