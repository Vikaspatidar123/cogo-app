const getOtherAddressOptions = () => {
	const OTHER_ADDRESSES_MAPPING = {
		office_address: {
			label: 'addressMapping.office.label',
			api_property_key: 'office_address',
		},
		factory_address: {
			label: 'addressMapping.factoryAddress.label',
			api_property_key: 'factory_address',
		},
		warehouse_address: {
			label: 'addressMapping.warehouseAddress.label',
			api_property_key: 'warehouse_address',
		},
	};

	return OTHER_ADDRESSES_MAPPING;
};
export default getOtherAddressOptions;
