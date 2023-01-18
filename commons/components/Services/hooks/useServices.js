import { useFormCogo } from '@cogoport/front/hooks';
import { getControls } from '../utils/controls';

const getErrors = ({ errors = {} }) => {
	const newErrors = {};
	Object.entries(errors).forEach(([controlName, error]) => {
		let newError = { ...error };

		if (['sellServices', 'buyServices'].includes(controlName)) {
			newError = {
				...newError,
				type: 'custom',
				message: 'This is Required',
			};
		}

		newErrors[controlName] = newError;
	});

	return newErrors;
};

const useServices = ({
	CONSTANTS = {},
	state = {},
	updateChannelPartner = () => {},
	isProfile,
}) => {
	const {
		COMPONENT_KEYS: { PLAN, SERVICES },
	} = CONSTANTS;

	const { formValues: planFormValues = {} } = state[PLAN] || {};
	const { planService = '' } = planFormValues;

	const { formValues: servicesFormValues = {} } = state[SERVICES] || {};

	const controls = getControls({
		planService,
		values: servicesFormValues,
		isProfile,
	});

	const formProps = useFormCogo(controls);

	const onSubmit = (values = {}) => {
		updateChannelPartner({ values });
	};

	return {
		controls,
		formProps,
		errors: getErrors({ errors: formProps.formState.errors }),
		onSubmit,
	};
};

export default useServices;
