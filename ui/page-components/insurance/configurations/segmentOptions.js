import { IcMExportfile, IcMImportfile } from '@cogoport/icons-react';

export const options = [
	{
		suffix          : 'Import',
		key             : 'IMPORT',
		prefix          : <IcMImportfile height={25} width={25} />,
		backgroundColor : '#7278AD',
		color           : '#eee7e7',
	},
	{
		suffix          : 'Export',
		key             : 'EXPORT',
		prefix          : <IcMExportfile height={25} width={25} />,
		backgroundColor : '#7278AD',
		color           : '#eee7e7',
	},
];
