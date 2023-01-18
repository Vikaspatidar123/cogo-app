import Button from '@/commons/components/UI/Button';
import FormLayout from '@/temp/form/FormLayout';
import {
	StyledSpinner,
	Container,
	Form,
	FormContainer,
	ButtonContainer,
	CardContainer,
} from './styles';
import useOriginDestinationTeuForm from './hooks/useOriginDestinationTeuForm';

function OriginDestinationForm({
	props,
	serviceType = '',
	frieghtType = '',
	setShowServicesForm = () => {},
}) {
	const {
		controls = [],
		fields = {},
		errors = {},
		handleSubmit = () => {},
		onSubmit = () => {},
		loading = false,
	} = useOriginDestinationTeuForm({
		props,
		serviceType,
		frieghtType,
		setShowServicesForm,
	});

	return (
		<Container>
			<CardContainer>
				<div className="title">
					In which trade lanes you need services the most?
				</div>

				<FormContainer>
					<Form>
						<FormLayout controls={controls} fields={fields} errors={errors} />
					</Form>
				</FormContainer>
			</CardContainer>

			<ButtonContainer>
				{loading ? (
					<StyledSpinner size={22} />
				) : (
					<Button
						className="primary md"
						type="submit"
						onClick={handleSubmit(onSubmit)}
					>
						save
					</Button>
				)}
			</ButtonContainer>
		</Container>
	);
}

export default OriginDestinationForm;
