import { Button } from '@cogoport/front/components/admin';
import FormLayout from '@/temp/form/FormLayout';
import {
	Container,
	Form,
	ButtonContainer,
	SpinnerIconContainer,
} from './styles';
import useFclCfsForm from './hooks/useFclCfsForm';
import Spinner from '../../../../Spinner';

function FclCfsTypeForm({
	props,
	serviceType = '',
	frieghtType = '',
	setShowServicesForm = () => {},
}) {
	const {
		handleSubmit = () => {},
		onSubmit = () => {},
		FclCfs,
		fields = {},
		componentLoading = false,
		errors = {},
	} = useFclCfsForm({
		props,
		serviceType,
		frieghtType,
		setShowServicesForm,
	});

	if (componentLoading) {
		return (
			<SpinnerIconContainer>
				<Spinner size={20} />
			</SpinnerIconContainer>
		);
	}
	return (
		<Container>
			<Form>
				<FormLayout controls={FclCfs} fields={fields} errors={errors} />
			</Form>

			<ButtonContainer>
				<Button
					type="submit"
					className="primary md"
					onClick={handleSubmit(onSubmit)}
				>
					SAVE
				</Button>
			</ButtonContainer>
		</Container>
	);
}

export default FclCfsTypeForm;
