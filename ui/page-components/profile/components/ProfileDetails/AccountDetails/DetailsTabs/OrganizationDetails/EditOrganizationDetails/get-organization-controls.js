import { IcMCloudUpload } from '@cogoport/icons-react';

const fields = [
	{
		name        : 'city_id',
		labelKey    : 'display_name',
		valueKey    : 'id',
		label       : 'City',
		placeholder : 'Enter city',
		type        : 'select',
		style       : { width: '300px' },
	},
	{
		name         : 'website',
		label        : 'Website',
		placeholder  : 'Enter Website',
		type         : 'text',
		showOptional : false,
		style        : { width: '300px' },
	},
	{
		name        : 'logo',
		label       : 'Company Logo',
		placeholder : 'logo',
		type        : 'file',
		drag        : true,
		accept:
      'image/*,.pdf,.doc,.docx,application/msword,application/'
      + 'vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType : 'aws',
		format     : ' ',
		rules      : { required: 'Required' },
		style      : { width: '300px' },
		uploadIcon : <IcMCloudUpload width={40} height={40} />,
	},
	{
		name         : 'about',
		label        : 'Enter About',
		placeholder  : 'about',
		type         : 'textarea',
		showOptional : false,
		style        : { width: '300px' },
	},
];

const getOrganizationControls = ({ cityOptions = {} }) => fields.map((control) => {
	const { name } = control;
	let newControl = { ...control };

	if (name === 'city_id') {
		newControl = { ...newControl, ...cityOptions };
	}

	return { ...newControl };
});
export default getOrganizationControls;
