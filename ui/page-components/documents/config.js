import { IcMDownload, IcMEyeopen } from '@cogoport/icons-react';

import downloadFile from './common/downloadFile';
import styles from './styles.module.css';

const { startCase, format } = require('@cogoport/utils');

const getColumns = ({ t }) => [
	{
		Header   : t('documents:table_column_header_1'),
		accessor : 'name',
		Cell     : ({ row }) => <div className={styles.file_name}>{startCase(row?.original?.name)}</div>,
	},
	{
		Header   : t('documents:table_column_header_2'),
		accessor : 'document_type',
		Cell     : ({ row }) => startCase(row?.original?.document_type),
	},
	{
		Header   : t('documents:table_column_header_3'),
		accessor : 'updated_at',
		Cell     : ({ row }) => format(row?.original?.updated_at, 'dd LLL yyyy'),
	},
	{
		Header   : t('documents:table_column_header_4'),
		accessor : 'image_url',
		Cell     : ({ row }) => (
			<>
				<IcMEyeopen
					onClick={() => window.open(row?.original?.image_url, '_blank')}
					className={styles.icon}
				/>
				<IcMDownload className={styles.icon} onClick={() => downloadFile(row?.original?.image_url)} />
			</>
		),
	},
];

export default getColumns;
