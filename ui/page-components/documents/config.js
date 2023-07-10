import { IcMDownload, IcMEyeopen } from '@cogoport/icons-react';

import downloadFile from './common/downloadFile';
import styles from './styles.module.css';

const { startCase, format } = require('@cogoport/utils');

const columns = [
	{
		Header   : 'FILE NAME',
		accessor : 'name',
		Cell     : ({ row }) => <div className={styles.file_name}>{startCase(row?.original?.name)}</div>,
	},
	{
		Header   : 'DOCUMENT TYPE',
		accessor : 'document_type',
		Cell     : ({ row }) => startCase(row?.original?.document_type),
	},
	{
		Header   : 'DATE UPLOADED',
		accessor : 'updated_at',
		Cell     : ({ row }) => format(row?.original?.updated_at, 'dd LLL yyyy'),
	},
	{
		Header   : 'ACTION',
		accessor : 'image_url',
		Cell     : ({ row }) => (
			<>
				<IcMEyeopen onClick={() => window.open(row?.original?.image_url, '_blank')} className={styles.icon} />
				<IcMDownload className={styles.icon} onClick={() => downloadFile(row?.original?.image_url)} />
			</>
		),
	},
];

export default columns;
