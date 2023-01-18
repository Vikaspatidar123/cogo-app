import { Button } from '@cogoport/front/components/admin';
import FormLayout from '@/temp/form/FormLayout';
import {
	SpinnerIconContainer,
	Form,
	ButtonContainer,
	LayoutContainer,
} from './styles';
import useRegionServiceForm from './hooks/useRegionServiceForm';
import Spinner from '../../../../Spinner';

function RegionServiceForm({
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
		showElements = () => {},
		componentLoading = false,
		loading = false,
	} = useRegionServiceForm({
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
		<div>
			<Form>
				<LayoutContainer>
					<FormLayout
						controls={controls}
						fields={fields}
						errors={errors}
						showElements={showElements}
					/>
				</LayoutContainer>

				<ButtonContainer>
					<Button
						type="submit"
						className="primary md"
						onClick={handleSubmit(onSubmit)}
						disabled={loading}
					>
						SAVE
					</Button>
				</ButtonContainer>
			</Form>
		</div>
	);
}

export default RegionServiceForm;
