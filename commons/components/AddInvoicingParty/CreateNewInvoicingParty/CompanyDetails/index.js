import FormLayout from '@/temp/form/FormLayout';
import Button from '@/commons/components/UI/Button';
import { Container, BtnGrp, LayoutContainer, Title } from './styles';
import useCompanyDetails from '../hooks/useCompanyDetails';

function CompanyDetails({
	filledDetails = {},
	setFilledDetails = () => {},
	setCurrentStep = () => {},
	showBackButton = false,
	onClickBack = () => {},
}) {
	const {
		errors = {},
		orgControls = [],
		onSubmitOfCompanyDetails,
		companyDetailsFormProps = {},
	} = useCompanyDetails({
		filledDetails,
		setFilledDetails,
		setCurrentStep,
	});
	const { handleSubmit = () => {}, fields = {} } = companyDetailsFormProps;

	return (
		<Container>
			<Title>Company Details</Title>

			<LayoutContainer>
				<FormLayout controls={orgControls} fields={fields} errors={errors} />
			</LayoutContainer>

			<BtnGrp>
				{showBackButton && (
					<Button
						className="secondary md"
						onClick={() => onClickBack()}
						style={{
							marginRight: '8px',
						}}
					>
						Back
					</Button>
				)}

				<Button
					className="primary md"
					onClick={handleSubmit(onSubmitOfCompanyDetails)}
				>
					Proceed
				</Button>
			</BtnGrp>
		</Container>
	);
}

export default CompanyDetails;
