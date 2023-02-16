import toast from '@cogoport/components';

const transportFn = ({
	setRotate,
	setPortDetails,
	setFormData,
	setStepper,
	setFormStepper,
	setValues,
	error,
	transportMode,
	portDetails = {},
	origin = '',
	destination = '',
	setPrevHs,
}) => {
	const interchangeValuesHandler = () => {
		setRotate((prev) => !prev);
		const obj = {
			originPort      : destination,
			destinationPort : origin,
		};
		setValues({ ...obj });
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
			toast.error('Same Port selected !', {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
			return true;
		}
		if (
			portDetails?.origin?.countryId === portDetails?.destination?.countryId
			&& transportMode === 'OCEAN'
		) {
			toast.error('Ports of same Country selected!', {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
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
			toast.error('Please enter Origin and Destination Country', {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
		} else if (error?.originPort) {
			toast.error('Please enter Origin Country', {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
		} else if (error?.destinationPort) {
			toast.error('Please enter Destination Country', {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
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
