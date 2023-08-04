import { IcMExportfile, IcMImportfile } from '@cogoport/icons-react';

const FIRST_INDEX = 1;

const getChipOptions = ({ activeStepper = [], sid = 'false' }) => [
	{
		suffix          : 'Import',
		key             : 'IMPORT',
		prefix          : <IcMImportfile height={25} width={25} />,
		backgroundColor : '#7278AD',
		color           : '#eee7e7',
		disabled        : (activeStepper?.[FIRST_INDEX] !== 'pro' || sid === 'true'),
	},
	{
		suffix          : 'Export',
		key             : 'EXPORT',
		prefix          : <IcMExportfile height={25} width={25} />,
		backgroundColor : '#7278AD',
		color           : '#eee7e7',
		disabled        : (activeStepper?.[FIRST_INDEX] !== 'pro' || sid === 'true'),
	},
];

export default getChipOptions;
