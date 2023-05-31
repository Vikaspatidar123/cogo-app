import { IcMDownload, IcMPreview } from '@cogoport/icons-react';

import styles from './styles.module.css';

const { startCase, format } = require('@cogoport/utils');

const columns = [
	{
		Header   : 'File Name',
		accessor : 'name',
		Cell     : ({ row }) => startCase(row?.original?.name),
	},
	{
		Header   : 'Document Type',
		accessor : 'document_type',
		Cell     : ({ row }) => startCase(row?.original?.document_type),
	},
	{
		Header   : 'Date Uploaded',
		accessor : 'updated_at',
		Cell     : ({ row }) => format(row?.original?.updated_at, 'dd LLL yyyy'),
	},
	{
		Header   : 'Action',
		accessor : 'image_url',
		Cell     : ({ row }) => (
			<>
				<IcMPreview onClick={() => window.open(row?.original?.image_url, '_blank')} className={styles.icon} />
				<IcMDownload className={styles.icon} />
			</>
		),
	},
];

export default columns;
