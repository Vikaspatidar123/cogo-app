import { Checkbox, Toggle } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

const style = {
	cursor     : 'pointer',
	marginLeft : '6px',
};

const itemFunction = ({ status, statusChangeHandler, loading }) => ({
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
});

export default itemFunction;
