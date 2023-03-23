import getRailDomesticFreightServiceAttributes from './servicesAttributes/getRailDomesticFreightServiceAttributes';

const SERVICE_TYPE_SERVICE_ATTRIBUTES_MAPPING = {
	rail_domestic_freight: getRailDomesticFreightServiceAttributes,
};

const getServicesAttributes = ({ searchType, formValues }) => {
	const funRef = SERVICE_TYPE_SERVICE_ATTRIBUTES_MAPPING[searchType];

	return funRef?.({ formValues }) || {};
};

export default getServicesAttributes;
