import { IcMPreview } from '@cogoport/icons-react';

const { startCase } = require('@cogoport/utils');

const columns = [
	{
		Header   : 'Document Name',
		accessor : 'name',
		Cell     : ({ row }) => startCase(row?.original?.name),
	},
	{
		Header   : 'Verification Status',
		accessor : 'verification_status',
		Cell     : ({ row }) => startCase(row?.original?.verification_status),
	},
	{
		Header   : 'View',
		accessor : 'image_url',
		Cell     : ({ row }) => (
			<IcMPreview onClick={() => window.open(row?.original?.image_url, '_blank')} />
		),
	},
];

export default columns;
