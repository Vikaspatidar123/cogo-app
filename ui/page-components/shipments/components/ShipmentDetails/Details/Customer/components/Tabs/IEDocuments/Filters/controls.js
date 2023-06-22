import { IcMSearchlight } from '@cogoport/icons-react';

const getControls = (organizationOptions, ServiceOptions) => [
	{
		name        : 'q',
		placeholder : 'Search for a document',
		type        : 'input',
		className   : 'primary md',
		suffix      : <IcMSearchlight width={17} height={17} />,
	},
	{
		name        : 'uploaded_by_org_id',
		placeholder : 'Filter by Source',
		type        : 'select',
		className   : 'primary md',
		isClearable : true,
		options     : organizationOptions,
	},
	{
		name        : 'service_type',
		placeholder : 'Filter by Service',
		type        : 'select',
		className   : 'primary md',
		isClearable : true,
		options     : ServiceOptions,
	},
];

export default getControls;
