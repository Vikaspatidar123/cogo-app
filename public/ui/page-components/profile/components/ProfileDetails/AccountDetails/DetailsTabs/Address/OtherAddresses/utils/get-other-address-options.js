const getOtherAddressOptions = ({ t }) => {
	const OTHER_ADDRESSES_MAPPING = {
		office_address: {
			label            : t('settings:other_addresses_options_label_1'),
			api_property_key : 'office',
		},
		factory_address: {
			label            : t('settings:other_addresses_options_label_2'),
			api_property_key : 'factory',
		},
		warehouse_address: {
			label            : t('settings:other_addresses_options_label_3'),
			api_property_key : 'warehouse',
		},
	};

	return OTHER_ADDRESSES_MAPPING;
};
export default getOtherAddressOptions;
