import FormLayout from '@/temp/form/FormLayout';
import useServices from './hooks/useServices';
import { Form } from '../../styles/Form';
import ProceedButton from '../../../components/Onboarding/commons/ProceedButton';

function Services(props) {
	const {
		controls = [],
		formProps = {},
		errors = {},
		onSubmit = () => {},
	} = useServices(props);
	const { handleSubmit = () => {}, fields = {} } = formProps;

	const { updateChannelPartnerApiLoading = false, buttonText = 'proceed' } =
		props;

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormLayout controls={controls} fields={fields} errors={errors} />

			<ProceedButton
				type="submit"
				text={buttonText}
				color="primary"
				size="lg"
				loading={updateChannelPartnerApiLoading}
				loadingText="Proceeding..."
			/>
		</Form>
	);
}

export default Services;
