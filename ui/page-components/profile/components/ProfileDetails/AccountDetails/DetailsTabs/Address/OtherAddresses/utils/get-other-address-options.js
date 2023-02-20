const getOtherAddressOptions = () => {
	const OTHER_ADDRESSES_MAPPING = {
		office_address: {
			label            : 'Office Address',
			api_property_key : 'office',
		},
		factory_address: {
			label            : 'Factory Address',
			api_property_key : 'factory',
		},
		warehouse_address: {
			label            : 'Warehouse Address',
			api_property_key : 'warehouse',
		},
	};

	return OTHER_ADDRESSES_MAPPING;
};
export default getOtherAddressOptions;
