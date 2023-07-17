import { IcMCloudUpload } from '@cogoport/icons-react';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

export const InnerUploadControls = [
	{
		name      : 'doc_number',
		component : 'text',
		label     : 'Document Number',
		size      : 'sm',
		rules     : { required: { value: true, message: 'Document is required' } },
		type      : 'number',
	},
	{
		name       : 'doc_validity',
		component  : 'datepicker',
		label      : 'Document Validity Till',
		size       : 'sm',
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
		rules      : { required: { value: true, message: 'Document Validity is required' } },
	},

	{
		name      : 'doc_file',
		component : 'file',
		drag      : true,
		label     : 'Upload Certificate',
		rules     : { required: { value: true, message: 'Document File is required' } },
		type      : 'card',
		accept:
			'.pdf,.doc,.docx,application/msword,',
		uploadType : 'aws',
		uploadIcon : <IcMCloudUpload height={30} width={30} />,
	},
];
