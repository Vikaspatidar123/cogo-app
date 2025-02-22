import getGeoConstants from '@/ui/commons/constants/geo';

const getControls = () => {
	const geo = getGeoConstants();
	const IDENTIFICAITON_LABEL = geo.others.identification.label;
	return [
		{
			name        : 'country_id',
			type        : 'async_select',
			asyncKey    : 'locations',
			span        : 4,
			label       : 'Organization’s registration country',
			params      : { filters: { type: ['country'] } },
			placeholder : 'Select country',
			rules       : { required: 'Required' },
			initialCall : true,
		},
		{
			name        : 'registration_number',
			type        : 'text',
			span        : 4,
			label       : `Organization’s ${IDENTIFICAITON_LABEL}`,
			placeholder : `Type your organization’s ${IDENTIFICAITON_LABEL}`,
			rules       : { required: 'Required' },
		},
		{
			name          : 'preferred_languages',
			label         : 'Preferred Languages',
			multiple      : true,
			type          : 'select',
			span          : 4,
			autoCloseMenu : false,
			optionKey     : 'languages',
			placeholder   : 'Select preferred language(s)',
			rules         : { required: 'Required' },
		},
		{
			name            : 'utility_bill_document_url',
			type            : 'file',
			span            : 8,
			drag            : true,
			showProgress    : true,
			onlyURLOnChange : true,
			docName         : 'Business Address proof',
			lowerlabel      : `You can upload any of the following documents - 
						Electricity Bill, Water Bill, Telephone Landline Bill, Property 
						tax receipt, Current registered sale/lease/rent agreement, Gas connection bill, 
						Credit card statement ( not older than 6 months )`,
			label  : 'Business Address Proof',
			accept : 'image/*,.pdf,.doc,.docx,application/msword,'
			+ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			rules: { required: 'Required' },
		},
	];
};

export default getControls;
