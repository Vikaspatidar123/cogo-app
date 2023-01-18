import { Button } from '@cogoport/front/components/admin';
import FormLayout from '@/temp/form/FormLayout';
import {
	SpinnerIconContainer,
	Container,
	Form,
	ButtonContainer,
	CardContainer,
} from './styles';
import useRegionTruckTypeForm from './hooks/useRegionTruckTypeForm';
import Spinner from '../../../../Spinner';

function RegionTruckTypeForm({
	props,
	serviceType = '',
	frieghtType = '',
	setShowServicesForm = () => {},
}) {
	const {
		errors = {},
		controls = [],
		fields = {},
		handleSubmit = () => {},
		onSubmit = () => {},
		componentLoading = false,
		LoadingUpdateChannelPartner = false,
	} = useRegionTruckTypeForm({
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
			<Form onSubmit={handleSubmit(onSubmit)}>
				<CardContainer>
					<div className="title">
						In which region do you need service the most?
					</div>

					<FormLayout controls={controls} fields={fields} errors={errors} />
				</CardContainer>

				<ButtonContainer>
					<Button
						type="submit"
						className="primary md"
						disabled={LoadingUpdateChannelPartner}
					>
						SAVE
					</Button>
				</ButtonContainer>
			</Form>
		</Container>
	);
}

export default RegionTruckTypeForm;
