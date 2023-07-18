import { IcMCloudUpload } from '@cogoport/icons-react';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

export const formControls = [
	{
		name  : 'doc_number',
		label : 'Document Number',
		type  : 'text',
		span  : 4,
		size  : 'sm',
		rules : { required: { value: true, message: 'Document Number is required' } },
	},
	{
		name        : 'doc_validity',
		component   : 'datepicker',
		label       : 'Document Validity Till',
		dateFormat  : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
		span        : 4,
		placeholder : 'dd/MM/yyyy',
		size        : 'sm',
		rules       : { required: { value: true, message: 'Document Validity is required' } },
	},
	{
		name      : 'doc_file',
		component : 'file',
		drag      : true,
		label     : 'Upload Certificate',
		type      : 'card',
		accept:
                'image/*,.pdf,.doc,.docx,application/msword'
                + ',application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType : 'aws',
		span       : 4,
		uploadIcon : <IcMCloudUpload height={45} width={45} />,
		rules      : { required: { value: true, message: 'Document File is required' } },
	},
];
