import { Toast } from '@cogoport/components';

const transportFn = ({
	t,
	setRotate,
	setPortDetails,
	setFormData,
	setStepper,
	setFormStepper,
	setValue,
	transportMode,
	portDetails = {},
	origin = '',
	destination = '',
	setPrevHs,
}) => {
	const interchangeValuesHandler = () => {
		setRotate((prev) => !prev);

		setValue('originPort', destination);
		setValue('destinationPort', origin);
		setPortDetails((prev) => ({
			origin      : prev?.destination,
			destination : prev?.origin,
		}));
		setPrevHs('');
	};

	const portDetailsHandler = (data, type) => {
		setPortDetails((prev) => ({
			...prev,
			[type]: {
				id          : data?.id,
				name        : data?.name,
				countryId   : data?.country_id,
				displayName : data?.display_name,
				countryCode : data?.country_code,
				latitude    : data?.latitude,
				longitude   : data?.longitude,
			},
		}));
	};

	const checkPort = () => {
		if (origin === destination) {
			Toast.error(t('dutiesTaxesCalculator:transport_err_msg_4'));
			return true;
		}
		if (
			portDetails?.origin?.countryId === portDetails?.destination?.countryId
      && transportMode === 'OCEAN'
		) {
			Toast.error(t('dutiesTaxesCalculator:transport_err_msg_5'));
			return true;
		}
		return false;
	};

	const submitHandler = (data) => {
		const isSamePort = checkPort();
		if (!isSamePort) {
			setFormData((prev) => ({
				...prev,
				...data,
			}));
			setStepper((prev) => ({
				...prev,
				productDetails: true,
			}));
			setFormStepper((prev) => ({
				...prev,
				formTransportDetails : false,
				formProductDetails   : true,
			}));
		}
	};

	const errorHandler = (errors) => {
		if (errors?.originPort && errors?.destinationPort) {
			Toast.error(t('dutiesTaxesCalculator:transport_err_msg_1'));
		} else if (errors?.originPort) {
			Toast.error(t('dutiesTaxesCalculator:transport_err_msg_2'));
		} else if (errors?.destinationPort) {
			Toast.error(t('dutiesTaxesCalculator:transport_err_msg_3'));
		}
	};

	return {
		interchangeValuesHandler,
		portDetailsHandler,
		checkPort,
		submitHandler,
		errorHandler,
	};
};

export default transportFn;
