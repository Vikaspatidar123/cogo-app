import { Checkbox, Toggle } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import formatDateTime from './formatDateTime';

const style = {
	cursor     : 'pointer',
	marginLeft : '6px',
};

const itemFunction = ({ status = '', statusChangeHandler = () => {}, loading = false }) => ({
	renderName: (itemData) => {
		const { poc_details = {} } = itemData || {};
		return <span>{poc_details?.name}</span>;
	},
	renderStatus: () => (
		<Toggle size="md" checked={status} onChange={statusChangeHandler} disabled={loading} />
	),
	renderDate: (itemData, config) => (
		format(itemData?.[config.key], 'dd MMM yyyy')
	),
	renderEdit: (itemData, config) => (
		<span>
			{itemData?.[config.key]}
			<IcMEdit width={12} height={12} style={style} />
		</span>
	),
	renderCheckbox: () => (
		<Checkbox checked={status} />
	),
	renderDataTime: (itemData, config) => (
		<span>
			{formatDateTime({
				date       : itemData?.[config.key],
				formatDate : 'dd MMM yyyy',
				formatTime : 'hh:mm aaa',
			})}
		</span>
	),
});

export default itemFunction;
