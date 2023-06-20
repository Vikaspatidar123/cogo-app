import { Checkbox, Toggle } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { format, isEmpty, upperCase } from '@cogoport/utils';

import { formatDateTime } from './formatDateTime';

const style = {
	cursor        : 'pointer',
	marginLeft    : '6px',
	verticalAlign : 'middle',
};

const itemFunction = ({
	status = '', statusChangeHandler = () => {},
	loading = false, selectedShipments, checkboxChangeHandler, editHandler,
}) => ({
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
			<IcMEdit width={12} height={12} style={style} onClick={() => editHandler({ itemData, key: config.key })} />
		</span>
	),
	renderCheckbox: (itemData) => (
		<Checkbox
			checked={selectedShipments.includes(itemData?.id)}
			onChange={(e) => checkboxChangeHandler({ id: itemData?.id, val: e.target.checked })}
			disabled={loading}
		/>
	),
	renderDataTime: (itemData, config) => (
		<span>
			{formatDateTime({
				date       : itemData?.[config.key],
				dateFormat : 'dd MMM yyyy',
				timeFormat : 'hh:mm aaa',
			})}
		</span>
	),
	renderShipperConsignee: (itemData, config) => {
		const { poc_details = [] } = itemData || {};
		if (isEmpty(poc_details)) return '--';

		const filteredArr = poc_details.filter((item) => item?.user_type === upperCase(config?.key));
		return <span>{filteredArr[0]?.name || '--'}</span>;
	},
	renderPortPair: (itemData) => {
		const { itinerary = [] } = itemData || {};
		return (
			<span>
				{`${itinerary?.origin || 'Origin'} > ${itinerary?.destination || 'Destination'} `}
			</span>
		);
	},
});

export default itemFunction;
