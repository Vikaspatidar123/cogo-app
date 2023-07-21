import { IcMCloudUpload } from '@cogoport/icons-react';

const getOrganizationControls = ({ cityOptions = {}, t }) => {
	const fields = [
		{
			name        : 'city_id',
			labelKey    : 'display_name',
			valueKey    : 'id',
			label       : t('settings:organization_control_label_1'),
			placeholder : t('settings:organization_control_placeholder_1'),
			type        : 'select',
			style       : { width: '300px' },
		},
		{
			name         : 'website',
			label        : t('settings:organization_control_label_2'),
			placeholder  : t('settings:organization_control_placeholder_2'),
			type         : 'text',
			showOptional : false,
			style        : { width: '300px' },
		},
		{
			name        : 'logo',
			label       : t('settings:organization_control_label_3'),
			placeholder : t('settings:organization_control_placeholder_3'),
			type        : 'file',
			drag        : true,
			accept      : 'image/*,.pdf,.doc,.docx,application/msword,application/'
		+ 'vnd.openxmlformats-officedocument.wordprocessingml.document',
			uploadType : 'aws',
			format     : ' ',
			rules      : { required: 'Required' },
			style      : { width: '300px' },
			uploadIcon : <IcMCloudUpload width={40} height={40} />,
		},
		{
			name         : 'about',
			label        : t('settings:organization_control_label_4'),
			placeholder  : t('settings:organization_control_placeholder_4'),
			type         : 'textarea',
			showOptional : false,
			style        : { width: '300px' },
		},
	];

	return fields.map((control) => {
		const { name } = control;
		let newControl = { ...control };

		if (name === 'city_id') {
			newControl = { ...newControl, ...cityOptions };
		}

		return { ...newControl };
	});
};
export default getOrganizationControls;
