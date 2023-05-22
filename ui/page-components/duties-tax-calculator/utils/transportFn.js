import { Toast } from '@cogoport/components';

const transportFn = ({
	setRotate,
	setPortDetails,
	setFormData,
	setStepper,
	setFormStepper,
	setValue,
	error,
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
			Toast.error('Same Port selected !');
			return true;
		}
		if (
			portDetails?.origin?.countryId === portDetails?.destination?.countryId
      && transportMode === 'OCEAN'
		) {
			Toast.error('Ports of same Country selected!');
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

	const errorHandler = () => {
		if (error?.originPort && error?.destinationPort) {
			Toast.error('Please enter Origin and Destination Country');
		} else if (error?.originPort) {
			Toast.error('Please enter Origin Country');
		} else if (error?.destinationPort) {
			Toast.error('Please enter Destination Country');
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
