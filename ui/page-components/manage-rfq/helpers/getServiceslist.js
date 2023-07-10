import getConfiguration from '../configurations/SearchFormControls/getConfiguration';

const getServiceslist = ({
	mode = 'fcl_freight',
	incoTerm = '',
	originDetails = {},
	handleIndex = 0,
	destinationDetails = {},
	formValues = {},
	services = {},
	setServices = () => {},
}) => {
	const servicesList = [mode];
	const mapping = getConfiguration('services', mode);
	const servicesListConfig = mapping[incoTerm] || [];

	if (servicesListConfig?.length > 0) {
		servicesList.pop();
	}
	servicesListConfig?.forEach((service) => {
		if (service === 'export_haulage_freight') {
			if (originDetails?.[mode]?.[handleIndex]?.is_icd) {
				servicesList.push(service);
			}
		} else if (service === 'import_haulage_freight') {
			if (destinationDetails?.[mode]?.[handleIndex]?.is_icd) {
				servicesList.push(service);
			}
		} else servicesList.push(service);
	});

	const handleServices = () => {
		let newServices = {};
		servicesList.forEach((service) => {
			newServices = {
				...newServices,
				[service]:
					formValues?.services?.[service]
					|| services?.[mode]?.[handleIndex]?.[service]
					|| false,
			};
		});

		setServices((prev) => ({
			...prev,
			[mode]: { ...prev?.[mode], [handleIndex]: newServices },
		}));
	};

	return { handleServices };
};

export default getServiceslist;
