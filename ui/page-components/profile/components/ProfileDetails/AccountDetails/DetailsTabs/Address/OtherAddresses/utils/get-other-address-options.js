const getOtherAddressOptions = () => {
	const OTHER_ADDRESSES_MAPPING = {
		office_address: {
			label            : 'OFFICE ADDRESS',
			api_property_key : 'office',
		},
		factory_address: {
			label            : 'FACTORY ADDRESS',
			api_property_key : 'factory',
		},
		warehouse_address: {
			label            : 'WAREHOUSE ADDRESS',
			api_property_key : 'warehouse',
		},
	};

	return OTHER_ADDRESSES_MAPPING;
};
export default getOtherAddressOptions;
